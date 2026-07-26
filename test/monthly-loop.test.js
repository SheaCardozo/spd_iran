const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const engine = require('dendrynexus/lib/engine');

function loadGame() {
  const json = fs.readFileSync('out/game.json', 'utf8');

  return new Promise((resolve, reject) => {
    engine.convertJSONToGame(json, (error, game) => {
      if (error) reject(error);
      else resolve(game);
    });
  });
}

test('opening an action and resolving it advances one month', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);

  assert.equal(dendry.state.sceneId, 'root.start_menu');

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'palace_protest');
  assert.equal(dendry.state.qualities.month, 10);
  assert.equal(dendry.state.qualities.year, 1949);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');

  const card = dendry.drawCard('main.party_affairs');
  assert.ok(card.id);

  dendry.playCard(card.id);
  assert.equal(dendry.state.qualities.month_actions, 1);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');
  assert.equal(dendry.state.qualities.time, 2);
  assert.equal(dendry.state.qualities.month, 11);
  assert.equal(dendry.state.qualities.year, 1949);
  assert.equal(dendry.state.qualities.month_actions, 0);
});
