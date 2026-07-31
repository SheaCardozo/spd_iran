#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const {BrowserAgentHarness} = require('./session');
const {startStaticGameServer} = require('./static-server');
const {AccessibleAdversarialPolicy} = require('./policies');

function parseArguments(argv) {
  const options = {
    artifacts: path.join(
      process.cwd(),
      'artifacts',
      'adversarial-browser',
      new Date().toISOString().replace(/[:.]/g, '-'),
    ),
    browser: 'chromium',
    maxSteps: 300,
    profiles: ['passage', 'contrarian', 'cancellation', 'first'],
    runs: 4,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--runs') options.runs = Math.max(1, Number(argv[++index]) || 1);
    else if (argument === '--browser') options.browser = argv[++index];
    else if (argument === '--max-steps') {
      options.maxSteps = Math.max(1, Number(argv[++index]) || 1);
    } else if (argument === '--profile') {
      options.profiles = String(argv[++index]).split(',').filter(Boolean);
    } else if (argument === '--artifacts') options.artifacts = argv[++index];
    else if (argument === '--help') options.help = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

function helpText() {
  return [
    'Run rendered-browser adversarial policies in parallel.',
    '',
    'Usage:',
    '  node scripts/browser-agent/batch.js [options]',
    '',
    'Options:',
    '  --runs N                 Number of isolated browser contexts (default 4)',
    '  --browser chromium|firefox',
    '  --max-steps N            Player actions allowed per run (default 300)',
    '  --profile LIST           Comma-separated passage,contrarian,cancellation,first',
    '  --artifacts PATH         Transcript, screenshot, trace, video, and oracle root',
  ].join('\n');
}

async function runPolicy(harness, options, index) {
  const profile = options.profiles[index % options.profiles.length];
  const sessionId = `run-${String(index + 1).padStart(2, '0')}-${profile}`;
  const session = await harness.createSession({
    id: sessionId,
    mode: 'accessible',
  });
  const policy = new AccessibleAdversarialPolicy({profile});
  let terminalReason = 'step limit';
  let policyError = null;

  try {
    for (let step = 0; step < options.maxSteps; step += 1) {
      const observation = await session.observe({includeScreenshot: false});
      const decision = policy.next(observation);
      if (decision.done) {
        terminalReason = decision.reason;
        break;
      }
      await session.act(decision.action);
    }
  } catch (error) {
    policyError = error.message;
  }

  const summary = await harness.closeSession(sessionId);
  return {
    ...summary,
    profile,
    policyError,
    terminalReason,
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`${helpText()}\n`);
    return;
  }

  fs.mkdirSync(options.artifacts, {recursive: true});
  const server = await startStaticGameServer();
  const harness = new BrowserAgentHarness({
    artifactRoot: options.artifacts,
    browser: options.browser,
    origin: server.origin,
  });
  await harness.start();

  let summaries;
  try {
    summaries = await Promise.all(
      Array.from({length: options.runs}, (_, index) =>
        runPolicy(harness, options, index),
      ),
    );
  } finally {
    await harness.close();
    await server.close();
  }

  const report = {
    browser: options.browser,
    generatedAt: new Date().toISOString(),
    runs: summaries,
  };
  const reportPath = path.join(options.artifacts, 'report.json');
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  for (const summary of summaries) {
    const status =
      summary.policyError ||
      summary.failures.length ||
      summary.browserErrors.length ||
      summary.terminalReason !== 'visible ending'
        ? 'FAIL'
        : 'PASS';
    process.stdout.write(
      `${status} ${summary.sessionId}: ${summary.steps} actions, ` +
      `${summary.terminalReason}\n`,
    );
    if (summary.policyError) {
      process.stdout.write(`  policy: ${summary.policyError}\n`);
    }
    if (summary.terminalReason !== 'visible ending') {
      process.stdout.write(`  incomplete: ${summary.terminalReason}\n`);
    }
    for (const failure of summary.failures) {
      process.stdout.write(`  oracle: ${failure}\n`);
    }
    for (const failure of summary.browserErrors) {
      process.stdout.write(`  browser: ${failure}\n`);
    }
  }
  process.stdout.write(`Report: ${reportPath}\n`);

  if (
    summaries.some(
      (summary) =>
        summary.policyError ||
        summary.failures.length ||
        summary.browserErrors.length ||
        summary.terminalReason !== 'visible ending',
    )
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
