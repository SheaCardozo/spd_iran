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

async function initialState() {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  dendry.choose(0);
  return dendry.state.qualities;
}

async function initializedEngine() {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  dendry.choose(0);
  return dendry;
}

test('v0.1 initializes versioned deterministic campaign state', async () => {
  const q = await initialState();
  assert.equal(q.save_schema_version, 1);
  assert.equal(q.scenario_id, 'historical');
  assert.ok(Number.isInteger(q.run_seed));
  assert.ok(q.run_seed >= 0 && q.run_seed <= 0xffffffff);
  assert.equal(q.rng_state, q.run_seed === 0 ? 1831565813 : q.run_seed);
  assert.equal(q.deck_rng_state, 19491014);
});

test('all authorized chamber places have unique evidence/scenario records', async () => {
  const q = await initialState();
  assert.equal(q.majles_places.length, 136);
  assert.equal(q.senate_places.length, 60);
  assert.equal(new Set(q.majles_places.map((place) => place.id)).size, 136);
  assert.equal(new Set(q.senate_places.map((place) => place.id)).size, 60);
  assert.equal(
    q.majles_places.filter((place) => place.historical.constituency).length,
    136,
  );
  assert.equal(
    q.majles_places.filter((place) => place.historical.return).length,
    131,
  );
  assert.equal(
    q.senate_places.filter((place) => place.historical.constituency).length,
    60,
  );
  assert.equal(
    q.senate_places.filter((place) => place.historical.return).length,
    60,
  );
  assert.equal(
    q.senate_places.filter((place) => place.historical.route === 'appointed').length,
    30,
  );
  assert.equal(
    q.senate_places.filter((place) => place.historical.route === 'elected').length,
    30,
  );

  for (const place of [...q.majles_places, ...q.senate_places]) {
    assert.ok(place.historical && place.scenario);
    assert.notEqual(place.historical, place.scenario);
    assert.ok(['elected', 'appointed'].includes(place.historical.route));
    assert.ok(place.historical.locators.route);
    assert.ok(['pending', 'returned'].includes(place.scenario.current_return));
    assert.ok(['pending', 'approved', 'rejected'].includes(place.scenario.credential));
    assert.ok(['unavailable', 'usable'].includes(place.scenario.usability));
    for (const [field, value] of Object.entries(place.historical)) {
      if (field !== 'locators' && value !== null) {
        assert.ok(
          place.historical.locators[field],
          `${place.id} ${field} has a source locator`,
        );
      }
    }
  }
});

test('oil proposals use structured terms and preserve unknowns as null', async () => {
  const q = await initialState();
  const requiredTerms = [
    'ownership_recognition',
    'operational_control',
    'marketing',
    'compensation_scope',
    'interim_finance',
    'personnel_authority',
    'duration_review',
  ];
  for (const proposal of Object.values(q.oil_proposals)) {
    for (const term of requiredTerms) {
      assert.ok(Object.hasOwn(proposal, term));
    }
    assert.equal(typeof proposal.uncertainty_note, 'string');
  }
  assert.equal(q.oil_proposals.gass_golshayan.compensation_scope, null);
  assert.notEqual(q.player_oil_minimums, q.oil_proposals.gass_golshayan);
  assert.equal(q.oil_compromise, undefined);
  assert.equal(q.nationalization_scalar, undefined);
});

test('all twelve action cards and six pinned advisers compile', async () => {
  const game = await loadGame();
  const actionCards = Object.values(game.scenes).filter(
    (scene) => scene.isCard &&
      scene.tags?.some((tag) =>
        ['party_affairs', 'public_campaign', 'parliamentary_affairs'].includes(tag)
      ),
  );
  const advisers = Object.values(game.scenes).filter(
    (scene) => scene.isPinnedCard && scene.tags?.includes('advisor'),
  );
  assert.equal(actionCards.length, 12);
  assert.equal(advisers.length, 6);
  for (const card of actionCards) {
    assert.ok(
      card.options.length >= 2 && card.options.length <= 3,
      `${card.id} has two or three choices`,
    );
  }
});

test('deck gates and leadership replacement follow the shared hand model', async () => {
  const dendry = await initializedEngine();
  const q = dendry.state.qualities;
  for (let step = 0; step < 4; step += 1) dendry.choose(0);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');
  let visible = dendry._compileChoices(dendry.game.scenes.main).map(
    (choice) => choice.id,
  );
  assert.ok(!visible.includes('main.public_campaign'));
  assert.ok(!visible.includes('main.parliamentary_affairs'));

  q.front_formed = 1;
  q.parliamentary_deck_unlocked = 1;
  visible = dendry._compileChoices(dendry.game.scenes.main).map(
    (choice) => choice.id,
  );
  assert.ok(visible.includes('main.public_campaign'));
  assert.ok(visible.includes('main.parliamentary_affairs'));

  dendry.goToScene('leadership_roster');
  assert.equal(q.month_actions, 1);
  dendry.choose(1);
  assert.deepEqual(q.active_advisors, ['mossadegh', 'maleki', 'kashani']);
  assert.equal(q.advisor_mossadegh_active, 1);
  assert.equal(q.advisor_maleki_active, 1);
  assert.equal(q.advisor_kashani_active, 1);
  assert.equal(q.advisor_fatemi_active, 0);
  assert.equal(q.advisor_roster_timer, 5);
});

test('the fixed spine has thirteen one-time tagged events plus the palace opening', async () => {
  const game = await loadGame();
  const events = Object.values(game.scenes).filter(
    (scene) => scene.tags?.includes('event'),
  );
  assert.equal(events.length, 13);
  for (const event of events) {
    assert.equal(event.maxVisits, 1, `${event.id} is one-time`);
    assert.ok(Number.isFinite(event.priority), `${event.id} has priority`);
  }
  assert.ok(game.scenes.palace_protest);
});

test('seeded minor variation is reproducible and changes only whitelisted fields', async () => {
  const first = await initializedEngine();
  const second = await initializedEngine();
  const beforeFirst = structuredClone(first.state.qualities);
  const beforeSecond = structuredClone(second.state.qualities);
  for (const dendry of [first, second]) {
    dendry.state.qualities.run_seed = 123456789;
    dendry.state.qualities.rng_state = 123456789;
    dendry.state.qualities.month_actions = 1;
    dendry.goToScene('post_event');
  }
  assert.equal(
    first.state.qualities.last_minor_variation,
    second.state.qualities.last_minor_variation,
  );
  assert.equal(first.state.qualities.rng_state, second.state.qualities.rng_state);
  assert.ok(first.state.qualities.report_reliability >= 48);
  assert.ok(first.state.qualities.report_reliability <= 52);
  assert.ok(first.state.qualities.constituency_pressure >= 48);
  assert.ok(first.state.qualities.constituency_pressure <= 52);
  const allowed = new Set([
    'run_seed',
    'rng_state',
    'last_minor_variation',
    'report_reliability',
    'constituency_pressure',
    'time',
    'months_advanced',
    'month_actions',
    'month',
    'coalition_cohesion',
    'ending_coalition',
    'ending_legitimacy',
    'ending_parliament',
    'ending_public',
    'ending_name',
    'ending_scores',
    'decision_flags',
    'event_flags',
    'has_event',
  ]);
  for (const key of Object.keys(beforeFirst)) {
    if (!allowed.has(key)) {
      assert.deepEqual(
        first.state.qualities[key],
        beforeFirst[key],
        `${key} is not seed-variable`,
      );
      assert.deepEqual(
        second.state.qualities[key],
        beforeSecond[key],
        `${key} is not seed-variable`,
      );
    }
  }
});

test('ending formulas and precedence produce all four named evaluations', async () => {
  async function evaluate({
    faction = 20,
    legitimacy = 20,
    parliament = 20,
    publicOrganization = 20,
  }) {
    const dendry = await initializedEngine();
    const q = dendry.state.qualities;
    for (const prefix of [
      'iran_party',
      'toilers',
      'independent_nationalists',
      'religious_network',
    ]) {
      q[`${prefix}_strength`] = faction;
      q[`${prefix}_relation`] = faction;
      q[`${prefix}_dissent`] = 100 - faction;
      q[`${prefix}_organization`] = faction;
    }
    q.constitutional_legitimacy = legitimacy;
    q.oil_coalition_support = parliament;
    q.parliamentary_procedure_legitimacy = parliament;
    q.public_mandate = publicOrganization;
    q.organizational_reach = publicOrganization;
    q.press_capacity = publicOrganization;
    for (let index = 0; index < 8; index += 1) {
      q.majles_places[index].scenario.support = 'national_front';
      q.majles_places[index].scenario.usability =
        parliament >= 70 ? 'usable' : 'unavailable';
    }
    q.campaign_complete = 1;
    dendry.goToScene('post_event');
    return q.ending_name;
  }

  assert.equal(
    await evaluate({faction: 90, legitimacy: 90, parliament: 90, publicOrganization: 60}),
    'A Constitutional Coalition',
  );
  assert.equal(
    await evaluate({faction: 20, legitimacy: 50, parliament: 90, publicOrganization: 20}),
    'A Parliamentary Vanguard',
  );
  assert.equal(
    await evaluate({faction: 50, legitimacy: 50, parliament: 40, publicOrganization: 90}),
    'A Movement of the Streets',
  );
  assert.equal(
    await evaluate({faction: 40, legitimacy: 40, parliament: 40, publicOrganization: 40}),
    'A Fragile Nationalization',
  );
});

test('Crown reducer bounds all four dimensions without inferring conduct', async () => {
  const dendry = await initializedEngine();
  const q = dendry.state.qualities;
  q.shah_relation = -10;
  q.shah_resistance = 110;
  q.shah_court_capacity = -20;
  q.shah_electoral_influence = 120;
  dendry.goToScene('post_event');
  assert.equal(q.shah_relation, 0);
  assert.equal(q.shah_resistance, 100);
  assert.equal(q.shah_court_capacity, 0);
  assert.equal(q.shah_electoral_influence, 100);
});

test('every major anchor and adviser has an adjacent research record', () => {
  const records = [
    'events/1949-02-attempt-and-emergency.md',
    'events/1949-constituent-assembly-and-senate.md',
    'events/1949-10-palace-protest.md',
    'events/1949-11-hazhir-assassination.md',
    'events/1949-11-front-structure.md',
    'events/1950-tehran-rerun.md',
    'events/1950-chambers-open.md',
    'events/1950-credential-campaign.md',
    'events/1950-oil-committee.md',
    'events/1950-supplemental-agreement.md',
    'events/1951-razmara-confrontation.md',
    'events/1951-03-razmara-assassination.md',
    'events/1951-03-nationalization.md',
    'people/mohammad-mossadegh.md',
    'people/hossein-fatemi.md',
    'people/allahyar-saleh.md',
    'people/khalil-maleki.md',
    'people/hossein-makki.md',
    'people/abol-qasem-kashani.md',
  ];
  for (const record of records) {
    const content = fs.readFileSync(`docs/research/${record}`, 'utf8');
    assert.match(content, /Source|Sources/);
    assert.match(content, /MAJ-|SUP-/);
  }
});
