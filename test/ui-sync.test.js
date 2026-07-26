const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

test('build applies the tracked Dynamic SPD-style browser overlay', () => {
  for (const filename of ['game.css', 'game.js', 'index.html']) {
    assert.equal(
      fs.readFileSync(`out/html/${filename}`, 'utf8'),
      fs.readFileSync(`web/${filename}`, 'utf8'),
    );
  }

  const index = fs.readFileSync('out/html/index.html', 'utf8');
  assert.match(index, /id="stats-link"[^>]*>Status</);
  assert.match(index, /id="main_tab"/);
  assert.match(index, /id="coalition_tab"/);
  assert.match(index, /id="relations_tab"/);
  assert.match(index, />\s*Event images:/);
});

test('status sidebar scenes and qdisplay compile with stable IDs', () => {
  const game = JSON.parse(fs.readFileSync('out/game.json', 'utf8'));

  assert.equal(game.scenes.status.isSpecial, true);
  assert.ok(game.scenes['status.coalition']);
  assert.ok(game.scenes['status.relations']);
  assert.ok(game.qdisplays.month);
  assert.ok(
    fs.existsSync('source/scenes/events/1949/palace_protest.scene.dry'),
  );
  assert.equal(fs.existsSync('source/scenes/palace_protest.scene.dry'), false);
});
