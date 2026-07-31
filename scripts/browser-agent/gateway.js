#!/usr/bin/env node

const path = require('node:path');
const readline = require('node:readline');
const {BrowserAgentHarness} = require('./session');
const {startStaticGameServer} = require('./static-server');

function parseArguments(argv) {
  const options = {
    artifactRoot: path.join(
      process.cwd(),
      'artifacts',
      'adversarial-browser',
      'gateway',
    ),
    browser: 'chromium',
    maxSessions: 8,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--browser') options.browser = argv[++index];
    else if (argument === '--artifacts') options.artifactRoot = argv[++index];
    else if (argument === '--max-sessions') {
      options.maxSessions = Math.max(1, Number(argv[++index]) || 1);
    } else if (argument === '--help') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return options;
}

function helpText() {
  return [
    'Rendered-browser agent gateway (JSON Lines over stdin/stdout)',
    '',
    'Requests:',
    '  {"id":1,"method":"create","params":{"sessionId":"agent-1","mode":"accessible"}}',
    '  {"id":2,"method":"observe","params":{"sessionId":"agent-1"}}',
    '  {"id":3,"method":"act","params":{"sessionId":"agent-1","action":{"kind":"activate","role":"link","name":"Begin the campaign"}}}',
    '  {"id":4,"method":"close","params":{"sessionId":"agent-1"}}',
    '  {"id":5,"method":"shutdown"}',
    '',
    'Visual sessions permit click, press, type, wheel, back, and wait.',
    'Accessible sessions additionally permit activation by rendered accessible role/name.',
    'Status, Research Library, Save/Load, and Options are player-only and unavailable.',
    'Persistence and browser reload are disabled for every adversarial session.',
    'No selector, DOM-evaluation, source, Q-state, or arbitrary-navigation method exists.',
  ].join('\n');
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`${helpText()}\n`);
    return;
  }

  const server = await startStaticGameServer();
  const harness = new BrowserAgentHarness({
    artifactRoot: options.artifactRoot,
    browser: options.browser,
    origin: server.origin,
  });
  await harness.start();

  let shuttingDown = false;
  let input;
  const pendingBySession = new Map();
  const respond = (value) => {
    process.stdout.write(`${JSON.stringify(value)}\n`);
  };
  const handleRequest = async (request) => {
    const id = request && request.id;
    try {
      const params = request.params || {};
      let result;
      if (request.method === 'create') {
        if (harness.sessions.size >= options.maxSessions) {
          throw new Error(`At most ${options.maxSessions} sessions may run concurrently.`);
        }
        const session = await harness.createSession({
          id: params.sessionId,
          mode: params.mode,
          viewport: params.viewport,
        });
        result = {
          sessionId: session.id,
          mode: session.mode,
          playerSurface: server.origin,
        };
      } else if (request.method === 'observe') {
        result = await harness.getSession(params.sessionId).observe({
          includeScreenshot: params.includeScreenshot,
        });
      } else if (request.method === 'act') {
        result = await harness.getSession(params.sessionId).act(params.action);
      } else if (request.method === 'close') {
        result = await harness.closeSession(params.sessionId);
      } else if (request.method === 'list') {
        result = [...harness.sessions.values()].map((session) => session.summary());
      } else if (request.method === 'shutdown') {
        shuttingDown = true;
        result = {closing: true};
      } else {
        throw new Error(`Unknown method: ${request && request.method}`);
      }
      respond({id, result});
      if (shuttingDown) {
        await harness.close();
        await server.close();
        input.close();
        process.exitCode = 0;
      }
    } catch (error) {
      respond({
        id,
        error: {
          message: error.message,
          name: error.name,
        },
      });
    }
  };

  input = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity,
  });
  input.on('line', (line) => {
    if (!line.trim() || shuttingDown) return;
    let request;
    try {
      request = JSON.parse(line);
    } catch (error) {
      respond({id: null, error: {message: `Invalid JSON: ${error.message}`}});
      return;
    }
    const queueKey = request.params?.sessionId || '__gateway__';
    const previous = pendingBySession.get(queueKey) || Promise.resolve();
    const pending = previous
      .catch(() => {})
      .then(() => handleRequest(request))
      .finally(() => {
        if (pendingBySession.get(queueKey) === pending) {
          pendingBySession.delete(queueKey);
        }
      });
    pendingBySession.set(queueKey, pending);
  });
  input.on('close', async () => {
    if (!shuttingDown) {
      await harness.close();
      await server.close();
    }
  });

  const shutdown = async () => {
    if (shuttingDown) return;
    shuttingDown = true;
    await harness.close();
    await server.close();
    process.exit(0);
  };
  process.on('SIGINT', () => void shutdown());
  process.on('SIGTERM', () => void shutdown());
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
