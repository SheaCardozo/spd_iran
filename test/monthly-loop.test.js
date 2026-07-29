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

function reachMonthlyHand(dendry, choices = [0, 0, 0, 0]) {
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'prologue_attempt');
  for (const choice of choices) {
    dendry.choose(choice);
    dendry.choose(0);
  }
  assert.equal(dendry.state.sceneId, 'palace_protest');
  dendry.choose(0);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');
}

test('opening an action and resolving it advances one month', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);

  assert.equal(dendry.state.sceneId, 'root.start_menu');

  reachMonthlyHand(dendry);
  assert.equal(dendry.state.qualities.month, 10);
  assert.equal(dendry.state.qualities.year, 1949);

  dendry.playCard('fundraising');
  assert.equal(dendry.state.qualities.month_actions, 1);

  dendry.choose(0);
  assert.match(dendry.state.sceneId, /^[^.]+\.[^.]+$/);
  assert.ok(dendry.game.scenes[dendry.state.sceneId].content);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');
  assert.equal(dendry.state.qualities.time, 1);
  assert.equal(dendry.state.qualities.month, 11);
  assert.equal(dendry.state.qualities.year, 1949);
  assert.equal(dendry.state.qualities.month_actions, 0);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'campaign_spine');
  assert.equal(dendry.state.qualities.hazhir_seen, 1);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'campaign_spine.hazhir_condemn');
  assert.ok(dendry.game.scenes[dendry.state.sceneId].content.length >= 2);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'front_formation');
  assert.equal(dendry.state.qualities.front_formed, 1);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'front_formation.narrow_program');

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');
  assert.equal(
    dendry.state.qualities.front_structure,
    'Narrow constitutional alliance',
  );
});

test('a pinned adviser uses the shared cooldown without advancing time', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);

  reachMonthlyHand(dendry);

  dendry.playCard('mossadegh');
  assert.equal(dendry.state.sceneId, 'mossadegh');
  assert.equal(dendry.state.qualities.month_actions, 0);

  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'mossadegh.constitutional_case');
  assert.ok(dendry.game.scenes[dendry.state.sceneId].content);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');
  assert.equal(dendry.state.qualities.advisor_action_timer, 6);
  assert.equal(dendry.state.qualities.month, 10);
  assert.equal(dendry.state.qualities.time, 0);

  dendry.playCard('coalition_meeting');
  dendry.choose(0);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');
  assert.equal(dendry.state.qualities.advisor_action_timer, 5);
});

test('all prologue paths keep each starting modifier within five points', async () => {
  const game = await loadGame();
  const choiceSets = [3, 3, 3, 3];
  const paths = choiceSets.reduce(
    (existing, count) => existing.flatMap(
      (path) => Array.from({length: count}, (_, choice) => [...path, choice]),
    ),
    [[]],
  );

  for (const choices of paths) {
    const dendry = new engine.DendryEngine(
      new engine.NullUserInterface(),
      game,
    ).beginGame([0]);
    reachMonthlyHand(dendry, choices);
    const q = dendry.state.qualities;
    assert.ok(Math.abs(q.prologue_crown_modifier) <= 5);
    assert.ok(Math.abs(q.prologue_legitimacy_modifier) <= 5);
    assert.ok(Math.abs(q.prologue_organization_modifier) <= 5);
    assert.equal(q.prologue_complete, 1);
  }
  assert.equal(paths.length, 81);
});

test('historical card assets are copied into the web build', async () => {
  const game = await loadGame();

  assert.equal(
    game.scenes.electoral_committee.cardImage,
    'img/majlis_1940s.jpg',
  );
  assert.deepEqual(game.scenes.mossadegh.tags, ['advisor']);
  assert.equal(game.scenes.mossadegh.isPinnedCard, true);
  assert.deepEqual(game.scenes.front_formation.tags, ['event']);
  assert.ok(fs.existsSync('out/html/img/majlis_1940s.jpg'));
  assert.ok(fs.existsSync('out/html/img/shah_1949.jpg'));
  assert.ok(fs.existsSync('out/html/img/makki_abadan_1951.jpg'));
});

test('the historical path reaches Senate approval after exactly eighteen actions', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);

  let safety = 0;
  while (dendry.state.sceneId !== 'campaign_ending' && safety < 300) {
    safety += 1;
    if (dendry.state.sceneId === 'main') {
      let card = dendry.drawCard('main.party_affairs');
      if (!card?.id && dendry.state.qualities.front_formed) {
        card = dendry.drawCard('main.public_campaign');
      }
      if (!card?.id && dendry.state.qualities.parliamentary_deck_unlocked) {
        card = dendry.drawCard('main.parliamentary_affairs');
      }
      assert.ok(card?.id, 'a Party Affairs action remains available');
      dendry.playCard(card.id);
    } else {
      dendry.choose(0);
    }
  }

  assert.ok(safety < 300, 'campaign does not deadlock');
  assert.equal(dendry.state.sceneId, 'campaign_ending');
  assert.equal(dendry.state.qualities.months_advanced, 18);
  assert.equal(dendry.state.qualities.year, 1951);
  assert.equal(dendry.state.qualities.month, 3);
  assert.equal(dendry.state.qualities.nationalization_approved_senate, 1);
  assert.equal(dendry.state.qualities.campaign_complete, 1);
});
