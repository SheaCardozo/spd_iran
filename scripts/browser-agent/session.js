const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const {chromium, firefox} = require('@playwright/test');

const ALLOWED_ACCESSIBLE_ROLES = new Set([
  'button',
  'checkbox',
  'link',
  'option',
  'radio',
  'tab',
  'textbox',
]);
const ALLOWED_MODES = new Set(['accessible', 'visual']);
const PLAYER_ONLY_CONTROL_NAMES = Object.freeze([
  'Status',
  'Research Library',
  'Save/Load',
  'Options',
]);

function safeSessionId(value) {
  const result = String(value || '');
  if (
    !result ||
    result.length > 80 ||
    !/^[a-zA-Z0-9_-]+$/.test(result)
  ) {
    throw new Error('Session IDs must contain 1–80 letters, digits, dashes, or underscores.');
  }
  return result;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function appendJsonLine(filePath, value) {
  fs.appendFileSync(filePath, `${JSON.stringify(value)}\n`);
}

function withoutImage(observation) {
  const copy = {...observation};
  if (copy.screenshot) {
    copy.screenshot = {
      bytes: Buffer.from(copy.screenshot, 'base64').length,
      encoding: 'base64 omitted from transcript',
    };
  }
  return copy;
}

class BrowserPlayerSession {
  constructor(options) {
    this.id = safeSessionId(options.id);
    this.mode = options.mode || 'accessible';
    if (!ALLOWED_MODES.has(this.mode)) {
      throw new Error('Session mode must be "accessible" or "visual".');
    }
    this.context = options.context;
    this.page = options.page;
    this.origin = options.origin;
    this.artifactDirectory = options.artifactDirectory;
    this.transcriptPath = path.join(this.artifactDirectory, 'transcript.jsonl');
    this.privateDirectory = path.join(this.artifactDirectory, 'private');
    this.step = 0;
    this.closed = false;
    this.evidenceHash = null;
    this.failures = [];
    this.browserErrors = [];
    this.tracePath = path.join(this.artifactDirectory, 'trace.zip');
  }

  async initialize() {
    this.page.on('console', (message) => {
      if (message.type() === 'error') {
        this.browserErrors.push(`console: ${message.text()}`);
      }
    });
    this.page.on('pageerror', (error) => {
      this.browserErrors.push(`page: ${error.message}`);
    });
    this.page.on('requestfailed', (request) => {
      const failure = request.failure();
      if (failure && !failure.errorText.includes('blockedbyclient')) {
        this.browserErrors.push(
          `request: ${request.url()} — ${failure.errorText}`,
        );
      }
    });

    await this.context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: false,
    });
    await this.page.goto(`${this.origin}/`, {waitUntil: 'networkidle'});
    await this.page.locator('#content').waitFor({state: 'visible'});
    await this._installAgentBoundary();

    const privateState = await this._privateState();
    fs.writeFileSync(
      path.join(this.privateDirectory, 'initial-state.json'),
      `${JSON.stringify(privateState, null, 2)}\n`,
    );
    await this._runOracle('initialize');
  }

  async observe(options = {}) {
    this._assertOpen();
    await this._installAgentBoundary();
    const includeScreenshot = options.includeScreenshot !== false;
    const screenshotPath = path.join(
      this.artifactDirectory,
      `step-${String(this.step).padStart(4, '0')}.png`,
    );
    const screenshot = await this.page.screenshot({
      fullPage: false,
      path: screenshotPath,
    });
    const body = this.page.locator('body');
    const viewport = this.page.viewportSize();
    const focus = await this.page.evaluate(() => {
      const element = document.activeElement;
      if (!element || element === document.body) return null;
      const text = (
        element.getAttribute('aria-label') ||
        element.innerText ||
        element.value ||
        element.title ||
        ''
      ).trim().replace(/\s+/g, ' ');
      return {
        name: text.slice(0, 500),
        role: element.getAttribute('role') ||
          ({A: 'link', BUTTON: 'button', INPUT: 'textbox'}[element.tagName] || null),
      };
    });

    const observation = {
      sessionId: this.id,
      step: this.step,
      mode: this.mode,
      pageTitle: await this.page.title(),
      url: this.page.url().replace(this.origin, ''),
      viewport,
      focus,
      screenshot: includeScreenshot ? screenshot.toString('base64') : null,
    };

    if (this.mode === 'accessible') {
      observation.visibleText = (await body.innerText()).slice(0, 50_000);
      observation.accessibility = await body.ariaSnapshot();
      observation.interactions = await this._accessibleInteractions();
    }

    appendJsonLine(this.transcriptPath, {
      at: new Date().toISOString(),
      kind: 'observation',
      value: withoutImage(observation),
      screenshot: path.basename(screenshotPath),
    });
    return observation;
  }

  async act(action) {
    this._assertOpen();
    if (!action || typeof action !== 'object') {
      throw new Error('An action object is required.');
    }

    const kind = action.kind;
    if (kind === 'click') {
      const viewport = this.page.viewportSize();
      const x = Number(action.x);
      const y = Number(action.y);
      if (
        !Number.isFinite(x) || !Number.isFinite(y) ||
        x < 0 || y < 0 || x > viewport.width || y > viewport.height
      ) {
        throw new Error('Click coordinates must be inside the current viewport.');
      }
      await this.page.mouse.click(x, y, {
        button: ['left', 'middle', 'right'].includes(action.button)
          ? action.button
          : 'left',
      });
    } else if (kind === 'press') {
      const key = String(action.key || '');
      if (!key || key.length > 80 || /[\r\n]/.test(key)) {
        throw new Error('A valid Playwright keyboard key is required.');
      }
      if ([
        'F5',
        'Control+R',
        'Control+Shift+R',
        'Meta+R',
        'Meta+Shift+R',
      ].includes(key)) {
        throw new Error('Browser reload is disabled in adversarial sessions.');
      }
      await this.page.keyboard.press(key);
    } else if (kind === 'type') {
      const text = String(action.text || '');
      if (text.length > 10_000) {
        throw new Error('Typed text is limited to 10,000 characters.');
      }
      await this.page.keyboard.type(text);
    } else if (kind === 'wheel') {
      const deltaX = Math.max(-5000, Math.min(5000, Number(action.deltaX) || 0));
      const deltaY = Math.max(-5000, Math.min(5000, Number(action.deltaY) || 0));
      await this.page.mouse.wheel(deltaX, deltaY);
    } else if (kind === 'activate') {
      if (this.mode !== 'accessible') {
        throw new Error('Accessible activation is unavailable in visual mode.');
      }
      const role = String(action.role || '');
      const name = String(action.name || '');
      const occurrence = Math.max(0, Number(action.occurrence) || 0);
      if (!ALLOWED_ACCESSIBLE_ROLES.has(role) || !name || name.length > 1000) {
        throw new Error('Accessible activation requires an allowed role and name.');
      }
      const target = this.page.getByRole(role, {name, exact: true}).nth(occurrence);
      if (!(await target.isVisible()) || !(await target.isEnabled())) {
        throw new Error(`The requested ${role} is not visibly actionable.`);
      }
      await target.click();
    } else if (kind === 'back') {
      await this.page.goBack({waitUntil: 'domcontentloaded'});
    } else if (kind === 'wait') {
      const milliseconds = Math.max(
        0,
        Math.min(5000, Number(action.milliseconds) || 0),
      );
      await this.page.waitForTimeout(milliseconds);
    } else {
      throw new Error(
        'Allowed actions are click, press, type, wheel, activate, back, and wait.',
      );
    }

    this.step += 1;
    await this.page.waitForTimeout(25);
    await this._installAgentBoundary();
    const oracle = await this._runOracle(kind);
    appendJsonLine(this.transcriptPath, {
      at: new Date().toISOString(),
      kind: 'action',
      value: action,
      oracle: {
        failures: oracle.failures,
        stateHash: oracle.stateHash,
      },
    });
    return {
      accepted: true,
      step: this.step,
      oracleFailures: oracle.failures.length,
    };
  }

  async close() {
    if (this.closed) return this.summary();
    this.closed = true;
    const finalOracle = await this._runOracle('close');
    const finalState = await this._privateState();
    fs.writeFileSync(
      path.join(this.privateDirectory, 'final-state.json'),
      `${JSON.stringify(finalState, null, 2)}\n`,
    );
    await this.context.tracing.stop({path: this.tracePath});
    await this.context.close();
    const summary = {
      sessionId: this.id,
      steps: this.step,
      mode: this.mode,
      failures: [...new Set(this.failures)],
      browserErrors: [...new Set(this.browserErrors)],
      finalStateHash: finalOracle.stateHash,
      artifacts: this.artifactDirectory,
    };
    fs.writeFileSync(
      path.join(this.artifactDirectory, 'summary.json'),
      `${JSON.stringify(summary, null, 2)}\n`,
    );
    return summary;
  }

  summary() {
    return {
      sessionId: this.id,
      steps: this.step,
      mode: this.mode,
      failures: [...new Set(this.failures)],
      browserErrors: [...new Set(this.browserErrors)],
      artifacts: this.artifactDirectory,
    };
  }

  async _accessibleInteractions() {
    return this.page.locator(
      'a, button, input, select, textarea, [role], [tabindex]',
    ).evaluateAll((elements) => {
      const occurrences = {};
      return elements.flatMap((element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          box.width <= 0 ||
          box.height <= 0
        ) {
          return [];
        }
        const tag = element.tagName;
        const role = element.getAttribute('role') || ({
          A: 'link',
          BUTTON: 'button',
          INPUT: element.type === 'checkbox' ? 'checkbox' : 'textbox',
          OPTION: 'option',
          SELECT: 'listbox',
          TEXTAREA: 'textbox',
        }[tag] || 'generic');
        const name = (
          element.getAttribute('aria-label') ||
          element.innerText ||
          element.value ||
          element.title ||
          element.getAttribute('alt') ||
          ''
        ).trim().replace(/\s+/g, ' ');
        let region = 'page';
        if (element.closest('#content')) region = 'scene';
        if (element.closest('ul.hand')) region = 'hand';
        if (element.closest('ul.decks')) region = 'deck';
        if (element.closest('ul.pinned-cards')) region = 'pinned';
        if (element.closest('#stats_sidebar')) region = 'sidebar';
        if (element.closest('header, nav')) region = 'navigation';
        const occurrenceKey = `${role}\u0000${name}`;
        const occurrence = occurrences[occurrenceKey] || 0;
        occurrences[occurrenceKey] = occurrence + 1;
        return [{
          role,
          name: name.slice(0, 1000),
          occurrence,
          region,
          disabled:
            element.matches(':disabled, [aria-disabled="true"]') ||
            Boolean(element.closest('.unavailable, .unavailable-card')),
          box: {
            x: Math.round(box.x),
            y: Math.round(box.y),
            width: Math.round(box.width),
            height: Math.round(box.height),
          },
        }];
      });
    });
  }

  async _privateState() {
    return this.page.evaluate(() => {
      if (!window.dendryUI || !window.dendryUI.dendryEngine) return null;
      return window.dendryUI.dendryEngine.state;
    });
  }

  async _installAgentBoundary() {
    await this.page.evaluate(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (_error) {
        // The loopback page normally provides both stores.
      }

      for (const id of ['options', 'save']) {
        const overlay = document.getElementById(id);
        if (overlay) overlay.remove();
      }
      const isPlayerOnlyLink = function(link) {
        const name = (link.textContent || '').trim().replace(/\s+/g, ' ');
        return (
          link.closest('#header-links') ||
          name === 'Status' ||
          name === 'Full status' ||
          name === 'Save/Load' ||
          name === 'Options' ||
          name.toLowerCase().includes('research library')
        );
      };
      for (const link of document.querySelectorAll('a')) {
        if (isPlayerOnlyLink(link)) link.remove();
      }

      const ui = window.dendryUI;
      if (!ui) return;
      const denyPlayerOnly = function() {
        return false;
      };
      window.showStats = denyPlayerOnly;
      window.showLibrary = denyPlayerOnly;
      window.showOptions = denyPlayerOnly;
      for (const method of [
        'autosave',
        'deleteSlot',
        'exportSlot',
        'importSave',
        'loadSlot',
        'quickLoad',
        'quickSave',
        'saveSlot',
        'showSaveSlots',
      ]) {
        ui[method] = denyPlayerOnly;
      }
      const engine = ui.dendryEngine;
      if (engine && !engine.__agentOriginalGoToScene) {
        Object.defineProperty(engine, '__agentOriginalGoToScene', {
          configurable: false,
          enumerable: false,
          value: engine.goToScene.bind(engine),
          writable: false,
        });
        engine.goToScene = function(sceneId) {
          const target = String(sceneId || '');
          if (
            target === 'status' ||
            target.startsWith('status.') ||
            target === 'research_library' ||
            target.startsWith('research_library.')
          ) {
            return false;
          }
          return engine.__agentOriginalGoToScene(sceneId);
        };
      }
      if (engine && engine.state) {
        engine.state.disableSaves = true;
      }
    });
  }

  async _runOracle(stage) {
    const result = await this.page.evaluate(() => {
      const failures = [];
      const engine = window.dendryUI && window.dendryUI.dendryEngine;
      const state = engine && engine.state;
      const q = state && state.qualities;
      if (!q) {
        return {failures: ['browser engine state is unavailable'], state: null};
      }
      const playerOnlyLink = [...document.querySelectorAll('a')].find((link) => {
        const name = (link.textContent || '').trim().replace(/\s+/g, ' ');
        return (
          link.closest('#header-links') ||
          name === 'Status' ||
          name === 'Full status' ||
          name === 'Save/Load' ||
          name === 'Options' ||
          name.toLowerCase().includes('research library')
        );
      });
      if (
        playerOnlyLink ||
        document.getElementById('options') ||
        document.getElementById('save') ||
        state.sceneId === 'status' ||
        state.sceneId.startsWith('status.') ||
        state.sceneId === 'research_library' ||
        state.sceneId.startsWith('research_library.')
      ) {
        failures.push('agent surface exposes a player-only utility');
      }
      const requiredSidebarTabs = [
        'main_tab',
        'politics_tab',
        'support_tab',
      ];
      if (
        requiredSidebarTabs.some((id) => !document.getElementById(id))
      ) {
        failures.push('agent sidebar is missing required tabs');
      }
      const campaignInitialized = q.save_schema_version === 5;

      const advisers = [
        'mossadegh',
        'saleh',
        'fatemi',
        'makki',
        'kashani',
        'maleki',
      ];
      const activeAdvisers = advisers.filter(
        (name) => q[`advisor_${name}_active`],
      ).length;
      if (activeAdvisers > 3) {
        failures.push(`active adviser count is ${activeAdvisers}`);
      }
      if (q.month_actions < 0 || q.month_actions > 1) {
        failures.push(`month_actions is outside 0–1: ${q.month_actions}`);
      }
      if (q.months_advanced < 0 || q.months_advanced > 27) {
        failures.push(`months_advanced is outside 0–27: ${q.months_advanced}`);
      }
      if (
        campaignInitialized &&
        (!Array.isArray(q.majles_places) || q.majles_places.length !== 136)
      ) {
        failures.push('Majles place ledger does not contain 136 records');
      }
      if (
        campaignInitialized &&
        (!Array.isArray(q.senate_places) || q.senate_places.length !== 60)
      ) {
        failures.push('Senate place ledger does not contain 60 records');
      }

      const majles = Array.isArray(q.majles_places) ? q.majles_places : [];
      const senate = Array.isArray(q.senate_places) ? q.senate_places : [];
      const count = (places, predicate) => places.filter(predicate).length;
      const derived = {
        majlesReturns: count(
          majles,
          (place) => place.scenario.current_return === 'returned',
        ),
        majlesCredentials: count(
          majles,
          (place) => place.scenario.credential === 'approved',
        ),
        majlesUsable: count(
          majles,
          (place) => place.scenario.usability === 'usable',
        ),
        majlesAttending: count(
          majles,
          (place) => place.scenario.attendance === 'attending',
        ),
        senateUsable: count(
          senate,
          (place) => place.scenario.usability === 'usable',
        ),
        senateAttending: count(
          senate,
          (place) => place.scenario.attendance === 'attending',
        ),
      };
      const totalsAreSettled =
        campaignInitialized && (
          state.sceneId === 'main' ||
          state.sceneId === 'campaign_ending' ||
          state.sceneId.startsWith('campaign_ending.')
        );
      if (totalsAreSettled) {
        for (const [quality, actual] of [
          ['majles_returns_recorded', derived.majlesReturns],
          ['majles_credentials_approved', derived.majlesCredentials],
          ['majles_usable_members', derived.majlesUsable],
          ['majles_attending_members', derived.majlesAttending],
          ['senate_usable_members', derived.senateUsable],
          ['senate_attending_members', derived.senateAttending],
        ]) {
          if (Number(q[quality]) !== actual) {
            failures.push(`${quality} is ${q[quality]}, records derive ${actual}`);
          }
        }
      }

      const inspect = (value, path, seen) => {
        if (typeof value === 'number' && !Number.isFinite(value)) {
          failures.push(`${path} is not finite`);
          return;
        }
        if (!value || typeof value !== 'object' || seen.has(value)) return;
        seen.add(value);
        for (const [key, child] of Object.entries(value)) {
          inspect(child, `${path}.${key}`, seen);
        }
      };
      inspect(q, 'Q', new Set());

      if (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 2
      ) {
        failures.push('page has unintended horizontal overflow');
      }

      return {
        failures,
        state,
        evidence: campaignInitialized ? {
          majles: majles.map((place) => place.historical),
          senate: senate.map((place) => place.historical),
        } : null,
      };
    });

    const stateJson = JSON.stringify(result.state ?? null);
    if (result.evidence) {
      const evidenceHash = sha256(JSON.stringify(result.evidence));
      if (this.evidenceHash === null) {
        this.evidenceHash = evidenceHash;
      } else if (this.evidenceHash !== evidenceHash) {
        result.failures.push('immutable historical chamber evidence changed');
      }
    }
    this.failures.push(...result.failures.map((failure) => `${stage}: ${failure}`));
    this.failures.push(...this.browserErrors.map((failure) => `${stage}: ${failure}`));
    return {
      failures: [...result.failures, ...this.browserErrors],
      stateHash: sha256(stateJson),
    };
  }

  _assertOpen() {
    if (this.closed) throw new Error(`Session ${this.id} is closed.`);
  }
}

class BrowserAgentHarness {
  constructor(options = {}) {
    this.browserName = options.browser || 'chromium';
    this.origin = options.origin;
    this.artifactRoot = path.resolve(
      options.artifactRoot ||
      path.join(process.cwd(), 'artifacts', 'adversarial-browser'),
    );
    this.sessions = new Map();
    this.browser = null;
  }

  async start() {
    if (!this.origin) throw new Error('A loopback game origin is required.');
    const launcher = this.browserName === 'firefox' ? firefox : chromium;
    this.browser = await launcher.launch({headless: true});
  }

  async createSession(options = {}) {
    if (!this.browser) throw new Error('Harness has not been started.');
    const id = safeSessionId(options.id);
    if (this.sessions.has(id)) throw new Error(`Session ${id} already exists.`);
    const artifactDirectory = path.join(this.artifactRoot, id);
    const privateDirectory = path.join(artifactDirectory, 'private');
    fs.mkdirSync(privateDirectory, {recursive: true});
    const context = await this.browser.newContext({
      acceptDownloads: false,
      recordVideo: {dir: path.join(artifactDirectory, 'video')},
      viewport: options.viewport || {width: 1280, height: 800},
    });
    await context.addInitScript(() => {
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (_error) {
        // The document may not yet have an origin.
      }
    });
    await context.route('**/*', async (route) => {
      const requestUrl = route.request().url();
      if (
        requestUrl.startsWith(this.origin) ||
        requestUrl.startsWith('data:') ||
        requestUrl === 'about:blank'
      ) {
        await route.continue();
      } else {
        await route.abort('blockedbyclient');
      }
    });
    const page = await context.newPage();
    const session = new BrowserPlayerSession({
      artifactDirectory,
      context,
      id,
      mode: options.mode,
      origin: this.origin,
      page,
    });
    await session.initialize();
    this.sessions.set(id, session);
    return session;
  }

  getSession(id) {
    const session = this.sessions.get(safeSessionId(id));
    if (!session) throw new Error(`Unknown browser session: ${id}`);
    return session;
  }

  async closeSession(id) {
    const safeId = safeSessionId(id);
    const session = this.getSession(safeId);
    const summary = await session.close();
    this.sessions.delete(safeId);
    return summary;
  }

  async close() {
    const summaries = [];
    for (const session of this.sessions.values()) {
      summaries.push(await session.close());
    }
    this.sessions.clear();
    if (this.browser) await this.browser.close();
    this.browser = null;
    return summaries;
  }
}

module.exports = {
  ALLOWED_ACCESSIBLE_ROLES,
  BrowserAgentHarness,
  BrowserPlayerSession,
  PLAYER_ONLY_CONTROL_NAMES,
  safeSessionId,
};
