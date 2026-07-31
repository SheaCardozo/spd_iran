const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const {
  ALLOWED_ACCESSIBLE_ROLES,
  PLAYER_ONLY_CONTROL_NAMES,
  safeSessionId,
} = require('../scripts/browser-agent/session');
const {
  AccessibleAdversarialPolicy,
  actionable,
  isEnding,
} = require('../scripts/browser-agent/policies');
const {
  resolveRequest,
} = require('../scripts/browser-agent/static-server');

test('browser-agent IDs and static paths remain narrowly scoped', () => {
  assert.equal(safeSessionId('agent_1-passage'), 'agent_1-passage');
  assert.throws(() => safeSessionId(''));
  assert.throws(() => safeSessionId('agent/../../source'));

  const build = path.resolve('out/html');
  assert.equal(resolveRequest(build, '/'), path.join(build, 'index.html'));
  assert.equal(resolveRequest(build, '/game.css'), path.join(build, 'game.css'));
  assert.equal(resolveRequest(build, '/../source/scenes/root.scene.dry'), null);
  assert.equal(resolveRequest(build, '/%2e%2e/source/root.scene.dry'), null);
});

test('the agent-facing gateway exposes player actions but no code backdoor', () => {
  const gateway = fs.readFileSync(
    'scripts/browser-agent/gateway.js',
    'utf8',
  );
  const session = fs.readFileSync(
    'scripts/browser-agent/session.js',
    'utf8',
  );
  for (const forbiddenMethod of [
    "request.method === 'evaluate'",
    "request.method === 'selector'",
    "request.method === 'state'",
    "request.method === 'source'",
    "request.method === 'navigate'",
  ]) {
    assert.doesNotMatch(gateway, new RegExp(forbiddenMethod.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(gateway, /request\.method === 'observe'/);
  assert.match(gateway, /request\.method === 'act'/);
  assert.match(session, /kind === 'click'/);
  assert.match(session, /kind === 'press'/);
  assert.match(session, /kind === 'activate'/);
  assert.match(session, /\.unavailable, \.unavailable-card/);
  assert.match(session, /_installAgentBoundary/);
  assert.match(session, /'autosave'/);
  assert.match(session, /'importSave'/);
  assert.match(session, /'quickLoad'/);
  assert.match(session, /state\.disableSaves = true/);
  assert.match(session, /target\.startsWith\('status\.'\)/);
  assert.match(session, /target\.startsWith\('research_library\.'\)/);
  assert.match(session, /agent surface exposes a player-only utility/);
  assert.match(session, /agent sidebar is missing required tabs/);
  assert.doesNotMatch(session, /kind === 'reload'/);
  assert.match(session, /Browser reload is disabled in adversarial sessions/);
  assert.deepEqual(
    [...ALLOWED_ACCESSIBLE_ROLES].sort(),
    ['button', 'checkbox', 'link', 'option', 'radio', 'tab', 'textbox'],
  );
  assert.deepEqual(
    PLAYER_ONLY_CONTROL_NAMES,
    ['Status', 'Research Library', 'Save/Load', 'Options'],
  );
});

test('accessible policies select only rendered, enabled controls', () => {
  const observation = {
    visibleText: 'Opposition briefing',
    interactions: [
      {
        role: 'link',
        name: 'Historical Primer',
        region: 'navigation',
        disabled: false,
      },
      {
        role: 'link',
        name: 'Oil Committee Preparation',
        region: 'hand',
        disabled: false,
      },
      {
        role: 'link',
        name: 'Unavailable card',
        region: 'hand',
        disabled: true,
      },
    ],
  };
  assert.equal(actionable(observation, 'hand').length, 1);
  const decision = new AccessibleAdversarialPolicy({profile: 'passage'})
    .next(observation);
  assert.deepEqual(decision.action, {
    kind: 'activate',
    role: 'link',
    name: 'Oil Committee Preparation',
    occurrence: 0,
  });
  assert.equal(
    isEnding({...observation, visibleText: 'A Fragile Nationalization'}),
    true,
  );
});
