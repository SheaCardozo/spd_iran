const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const {
  auditGame,
  formatSummary,
  loadGame,
} = require('../scripts/audit-scenes');

test('every compiled scene is classified and passes its scene-class standard', async () => {
  const game = await loadGame();
  const result = auditGame(game);
  const summary = formatSummary(result);

  assert.equal(summary.total, 217);
  assert.deepEqual(result.failures, []);
  assert.deepEqual(summary.counts, {
    framework_internal: 5,
    information_surface: 23,
    visible_consequence: 117,
    deck_container: 3,
    engine_internal: 24,
    continuation_decision: 2,
    decision_menu: 43,
  });
});

test('the independent opposition review records the complete automated audit', async () => {
  const game = await loadGame();
  const result = auditGame(game);
  const report = fs.readFileSync(
    'docs/reviews/2026-07-30-v03-dynamic-convergence-review.md',
    'utf8',
  );
  assert.equal(result.rows.length, 217);
  assert.deepEqual(result.failures, []);
  assert.match(report, /217(?:\/217)? compiled scenes/i);
  assert.match(report, /zero failures|0 failures/i);
  assert.match(report, /Dynamic SPD/i);
  assert.match(report, /pre-formation/i);
});
