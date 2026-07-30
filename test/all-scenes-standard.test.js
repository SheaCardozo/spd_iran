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

  assert.equal(summary.total, 182);
  assert.deepEqual(result.failures, []);
  assert.deepEqual(summary.counts, {
    framework_internal: 5,
    information_surface: 18,
    visible_consequence: 110,
    deck_container: 3,
    engine_internal: 4,
    continuation_decision: 2,
    decision_menu: 40,
  });
});

test('the independent audit has a passing row for every compiled scene', async () => {
  const game = await loadGame();
  const result = auditGame(game);
  const report = fs.readFileSync(
    'docs/reviews/2026-07-29-v01-complete-scene-audit.md',
    'utf8',
  );
  const reviewedRows = [...report.matchAll(
    /^\| `([^`]+)` \| `([^`]+)` \| \*\*(PASS|FAIL)\*\* \|/gm,
  )].map((match) => ({
    id: match[1],
    reviewClass: match[2],
    verdict: match[3],
  }));

  assert.equal(reviewedRows.length, result.rows.length);
  assert.deepEqual(
    reviewedRows
      .map(({id, reviewClass}) => ({id, reviewClass}))
      .sort((first, second) => first.id.localeCompare(second.id)),
    result.rows
      .map(({id, reviewClass}) => ({id, reviewClass}))
      .sort((first, second) => first.id.localeCompare(second.id)),
  );
  assert.ok(reviewedRows.every((row) => row.verdict === 'PASS'));
});
