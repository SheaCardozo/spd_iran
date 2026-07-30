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

function contentLength(scene) {
  if (Array.isArray(scene?.content)) return scene.content.length;
  if (Array.isArray(scene?.content?.content)) return scene.content.content.length;
  return scene?.content ? 1 : 0;
}

function withoutSemanticMarkup(source) {
  return source
    .replace(/\{!<span\b[^>]*>!\}/g, '')
    .replace(/\{!<\/span>!\}/g, '')
    .replace(/<span\b[^>]*>/g, '')
    .replace(/<\/span>/g, '');
}

function chooseById(dendry, id) {
  const choices = dendry._compileChoices(
    dendry.game.scenes[dendry.state.sceneId],
  );
  const index = choices.findIndex((choice) => choice.id === id);
  assert.notEqual(index, -1, `${id} is visible in ${dendry.state.sceneId}`);
  assert.equal(choices[index].canChoose, true, `${id} is available`);
  dendry.choose(index);
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

test('v0.2 initializes the opposition viewpoint without public seed fields', async () => {
  const q = await initialState();
  assert.equal(q.save_schema_version, 4);
  assert.equal(q.scenario_id, 'historical');
  assert.equal(q.player_organization, 'Opposition');
  assert.equal(q.year, 1949);
  assert.equal(q.month, 1);
  assert.equal(q.attempt_emergency_seen, 0);
  for (const field of [
    'run_seed',
    'rng_state',
    'deck_rng_state',
    'last_minor_variation',
    'report_reliability',
    'constituency_pressure',
  ]) {
    assert.equal(field in q, false, `${field} is absent`);
  }
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

test('all sixteen phase-gated action cards and six pinned advisers compile', async () => {
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
  assert.equal(actionCards.length, 16);
  assert.equal(advisers.length, 6);
  for (const card of actionCards) {
    assert.ok(
      card.options.length >= 2 && card.options.length <= 3,
      `${card.id} has two or three choices`,
    );
    assert.ok(
      contentLength(card) >= 3,
      `${card.id} explains the operational problem`,
    );
    for (const option of card.options) {
      const target = game.scenes[option.id.replace(/^@/, '')];
      assert.ok(target?.title?.trim(), `${target?.id} states an action`);
      assert.ok(target?.subtitle?.trim(), `${target?.id} previews a tradeoff`);
      assert.ok(
        contentLength(target) >= 2,
        `${target?.id} narrates the result`,
      );
      assert.ok(target?.options?.length >= 1, `${target?.id} waits for acknowledgement`);
      assert.equal(target?.goTo, undefined, `${target?.id} does not skip result prose`);
    }
  }
  const actionChoiceCounts = new Set(
    actionCards
      .map((card) => card.options.length),
  );
  assert.deepEqual(
    [...actionChoiceCounts].sort(),
    [2, 3],
    'recurring actions include genuine binary and three-way decisions',
  );

  for (const adviser of advisers) {
    assert.ok(
      contentLength(adviser) >= 2,
      `${adviser.id} explains the figure and consultation boundary`,
    );
    const consultations = adviser.options
      .map((option) => game.scenes[option.id.replace(/^@/, '')])
      .filter((target) => target?.onArrival);
    assert.ok(
      consultations.length >= 2 && consultations.length <= 3,
      `${adviser.id} exposes two or three substantive consultations`,
    );
    for (const consultation of consultations) {
      assert.ok(consultation.title?.trim(), `${consultation.id} states an action`);
      assert.ok(consultation.subtitle?.trim(), `${consultation.id} previews a tradeoff`);
      assert.ok(
        contentLength(consultation) >= 2,
        `${consultation.id} narrates the consultation result`,
      );
      assert.ok(
        consultation.options?.length >= 1,
        `${consultation.id} waits for acknowledgement`,
      );
      assert.equal(
        consultation.goTo,
        undefined,
        `${consultation.id} does not skip result prose`,
      );
    }
  }
});

test('deck gates and historically available pinned advisers follow the shared hand model', async () => {
  const dendry = await initializedEngine();
  const q = dendry.state.qualities;
  assert.equal(dendry.state.sceneId, 'main');
  assert.equal(
    dendry.game.scenes.emergency_legal_work.viewIf(dendry.state, q),
    false,
    'January does not deal legal work for an emergency that has not occurred',
  );
  assert.equal(
    dendry.game.scenes.election_preparations.viewIf(dendry.state, q),
    false,
    'January does not deal election preparation before its historical phase',
  );
  let visible = dendry._compileChoices(dendry.game.scenes.main).map(
    (choice) => choice.id,
  );
  assert.ok(!visible.includes('main.public_campaign'));
  assert.ok(!visible.includes('main.parliamentary_affairs'));
  assert.ok(visible.includes('mossadegh'));
  assert.ok(visible.includes('saleh'));
  assert.ok(!visible.includes('fatemi'));
  assert.ok(!visible.includes('makki'));
  assert.ok(!visible.includes('kashani'));
  assert.ok(!visible.includes('maleki'));

  assert.equal(q.advisor_saleh_available, 1);
  assert.equal(q.advisor_mossadegh_available, 1);
  assert.equal(q.advisor_fatemi_available, 0);
  assert.equal(q.advisor_makki_available, 0);
  assert.equal(q.advisor_kashani_available, 0);
  assert.equal(q.advisor_maleki_available, 0);

  q.front_formed = 1;
  q.parliamentary_deck_unlocked = 1;
  q.advisor_fatemi_available = 1;
  q.advisor_makki_available = 1;
  q.advisor_kashani_available = 1;
  visible = dendry._compileChoices(dendry.game.scenes.main).map(
    (choice) => choice.id,
  );
  assert.ok(visible.includes('main.public_campaign'));
  assert.ok(visible.includes('main.parliamentary_affairs'));

  const advisers = Object.values(dendry.game.scenes).filter(
    (scene) => scene.isPinnedCard && scene.tags?.includes('advisor'),
  );
  assert.equal(advisers.length, 6);
  assert.ok(advisers.every((adviser) => typeof adviser.viewIf === 'function'));
  assert.equal(dendry.game.scenes.leadership_roster, undefined);
  for (const field of [
    'active_advisors',
    'advisor_roster_timer',
    'advisor_mossadegh_active',
    'advisor_fatemi_active',
    'advisor_saleh_active',
    'advisor_maleki_active',
    'advisor_makki_active',
    'advisor_kashani_active',
  ]) {
    assert.equal(field in q, false, `${field} is absent`);
  }
});

test('advisers enter the hand at the documented coalition milestones', async () => {
  const dendry = await initializedEngine();
  const q = dendry.state.qualities;

  assert.equal(q.advisor_mossadegh_available, 1);
  assert.equal(q.advisor_saleh_available, 1);
  assert.equal(q.advisor_fatemi_available, 0);
  assert.equal(q.advisor_makki_available, 0);
  assert.equal(q.advisor_kashani_available, 0);
  assert.equal(q.advisor_maleki_available, 0);

  dendry.goToScene('palace_protest');
  assert.equal(q.advisor_fatemi_available, 1);
  assert.equal(q.advisor_makki_available, 1);
  assert.equal(q.advisor_kashani_available, 0);

  dendry.goToScene('front_formation');
  assert.equal(q.player_organization, 'National Front');
  assert.equal(q.advisor_kashani_available, 1);
  assert.equal(q.advisor_maleki_available, 0);
});

test('qualitative support changes only scenario returns at historically vacant places', async () => {
  const dendry = await initializedEngine();
  const q = dendry.state.qualities;
  q.election_campaign_capacity = 55;
  dendry.goToScene('campaign_spine.chambers_open');

  const vacantIndexes = [0, 87, 107, 126, 128];
  for (const index of vacantIndexes.slice(0, 3)) {
    const place = q.majles_places[index];
    assert.equal(place.historical.return, null);
    assert.equal(place.scenario.current_return, 'returned');
    assert.match(place.scenario.scenario_return_label, /counterfactual/);
    assert.equal(place.scenario.credential, 'pending');
    assert.equal(place.scenario.usability, 'unavailable');
    assert.equal(place.scenario.support, 'national_front');
  }
  for (const index of vacantIndexes.slice(3)) {
    assert.equal(q.majles_places[index].scenario.current_return, 'pending');
  }
  const oilSupportBeforeCredentials = q.oil_coalition_support;
  dendry.goToScene('campaign_spine.credential_campaign');
  assert.equal(q.oil_coalition_support, oilSupportBeforeCredentials + 6);
});

test('menu, briefing, Library, status, and ending meet the scene-wide standard', async () => {
  const game = await loadGame();
  const explanatoryScenes = [
    'root.start_menu',
    'root.about',
    'main',
    'status',
    'status.coalition',
    'status.support',
    'status.majles',
    'status.crown',
    'research_library',
    'research_library.government',
    'research_library.timeline',
    'research_library.coalition_people',
    'research_library.chambers',
    'research_library.oil',
    'research_library.events',
    'research_library.uncertainty',
    'research_library.bibliography',
  ];
  for (const id of explanatoryScenes) {
    const scene = game.scenes[id];
    assert.ok(scene, `${id} exists`);
    const minimum = id === 'research_library' ? 1 : 2;
    assert.ok(
      contentLength(scene) >= minimum,
      `${id} explains its purpose or data`,
    );
  }

  const librarySource = fs.readFileSync(
    'source/scenes/research_library.scene.dry',
    'utf8',
  );
  const libraryPlainText = withoutSemanticMarkup(librarySource);
  assert.doesNotMatch(librarySource, /Seeded variation/);
  assert.match(librarySource, /25 November 1950/);
  assert.match(librarySource, /11 January 1951/);
  assert.match(librarySource, /Gass–Golshayan supplemental agreement/);
  assert.match(librarySource, /Nationalization principle, 20 March 1951/);
  assert.match(librarySource, /Minimum acceptable terms/);
  assert.match(librarySource, /@backSpecialScene: Return/);
  assert.doesNotMatch(librarySource, /component prefixes/);
  assert.match(librarySource, /prime\s+minister/i);
  assert.doesNotMatch(librarySource, /\b(?:MAJ|SUP)-S?\d+\b/);
  assert.match(librarySource, /sessions 2, 25, and 30/);
  for (const person of [
    'Mohammad Mossadegh',
    'Hossein Fatemi',
    'Allahyar Saleh',
    'Khalil Maleki',
    'Hossein Makki',
    'Ayatollah Abol-Qasem Kashani',
  ]) {
    assert.match(
      librarySource,
      new RegExp(person.replaceAll(' ', '\\s+')),
    );
  }
  for (const eventLabel of [
    'attempt on the Shah',
    'constituent assembly',
    'palace protest',
    'Tehran rerun',
    'Special Oil Commission',
    'Razmara',
    'oil nationalization',
  ]) {
    assert.match(libraryPlainText, new RegExp(eventLabel, 'i'));
  }

  const statusSource = fs.readFileSync('source/scenes/status.scene.dry', 'utf8');
  const statusPlainText = withoutSemanticMarkup(statusSource);
  for (const field of [
    'Organizational reach',
    'Press capacity',
    'iran_party_strength',
    'iran_party_dissent',
    'iran_party_organization',
    'toilers_relation',
    'independent_nationalists_relation',
    'religious_network_relation',
    'support_professional',
    'support_bazaar',
    'support_workers',
    'support_provincial',
    'Usable Front representation',
    'Oil-coalition support',
    'Parliamentary-procedure legitimacy',
  ]) {
    assert.match(statusPlainText, new RegExp(field));
  }

  const timeline = fs.readFileSync('out/html/timeline.html', 'utf8');
  assert.match(timeline, /id="source-sup-059"/);

  const mainSource = fs.readFileSync('source/scenes/main.scene.dry', 'utf8');
  for (const month of [
    'month = 10',
    'month = 11',
    'month = 12',
    'month = 1',
  ]) {
    assert.match(mainSource, new RegExp(month));
  }

  assert.equal(game.scenes.leadership_roster, undefined);

  const ending = game.scenes.campaign_ending;
  assert.ok(contentLength(ending) >= 12);
  const endingText = fs.readFileSync(
    'source/scenes/campaign_ending.scene.dry',
    'utf8',
  );
  for (const name of [
    'A Constitutional Coalition',
    'A Parliamentary Vanguard',
    'A Movement of the Streets',
    'A Fragile Nationalization',
  ]) {
    assert.match(endingText, new RegExp(name));
  }
  for (const decision of [
    'front_structure',
    'election_strategy',
    'credentials_strategy',
    'oil_terms_position',
    'razmara_response',
  ]) {
    assert.match(endingText, new RegExp(decision));
  }

  const dendry = await initializedEngine();
  dendry.goToScene('campaign_ending');
  dendry.goToScene('research_library');
  chooseById(dendry, 'backSpecialScene');
  assert.equal(dendry.state.sceneId, 'campaign_ending');
});

test('the fixed spine has seventeen one-time tagged events', async () => {
  const game = await loadGame();
  const events = Object.values(game.scenes).filter(
    (scene) => scene.tags?.includes('event'),
  );
  assert.equal(events.length, 17);
  for (const event of events) {
    assert.equal(event.maxVisits, 1, `${event.id} is one-time`);
    assert.ok(Number.isFinite(event.priority), `${event.id} has priority`);
  }
  assert.ok(game.scenes.palace_protest);
  assert.deepEqual(game.scenes.palace_protest.tags, ['event']);
  assert.deepEqual(game.scenes.attempt_and_emergency.tags, ['event']);
  assert.equal(game.scenes.attempt_and_emergency.priority, 30);
});

test('major events follow the setup, choice, and visible consequence standard', async () => {
  const game = await loadGame();
  const setupIds = [
    'attempt_and_emergency',
    'attempt_and_emergency.emergency_measures',
    'attempt_and_emergency.constituent_assembly',
    'attempt_and_emergency.senate_election_preparations',
    'palace_protest',
    ...Object.values(game.scenes)
      .filter((scene) => scene.tags?.includes('event'))
      .map((scene) => scene.id),
  ];
  const choiceCounts = new Set();

  for (const id of setupIds) {
    const scene = game.scenes[id];
    assert.ok(scene.subtitle?.trim(), `${id} has an orienting subtitle`);
    assert.ok(scene.content?.length >= 3, `${id} has a developed setup`);
    assert.ok(scene.options?.length >= 1, `${id} has at least one continuation`);
    choiceCounts.add(scene.options.length);

    for (const option of scene.options) {
      const target = game.scenes[option.id.replace(/^@/, '')];
      assert.ok(target, `${id} option ${option.id} resolves to a scene`);
      assert.ok(target.title?.trim(), `${target.id} states a concrete action`);
      assert.ok(target.subtitle?.trim(), `${target.id} previews its direction`);
    }
  }

  assert.ok(choiceCounts.has(1), 'fixed result scenes may have one continuation');
  assert.ok(choiceCounts.has(3), 'multi-strategy events are represented');

  const eventBranchPrefixes = [
    'attempt_and_emergency.',
    'palace_protest.',
    'front_formation.',
    'campaign_spine.',
  ];
  const consequenceScenes = Object.values(game.scenes).filter(
    (scene) => eventBranchPrefixes.some((prefix) => scene.id.startsWith(prefix)) &&
      scene.onArrival &&
      !scene.tags?.includes('event'),
  );
  for (const scene of consequenceScenes) {
    const contentLength = Array.isArray(scene.content)
      ? scene.content.length
      : (scene.content ? 1 : 0);
    assert.ok(contentLength >= 1, `${scene.id} narrates its consequence`);
    assert.ok(scene.options?.length >= 1, `${scene.id} waits for acknowledgement`);
    assert.equal(scene.goTo, undefined, `${scene.id} does not skip its result prose`);
  }

  const palaceResult = game.scenes['palace_protest.begin_organizing'];
  assert.ok(palaceResult.content.length >= 2);
  assert.ok(palaceResult.options.length >= 1);
});

test('new campaigns use unique Dendry RNG streams for deck draws', async () => {
  const browser = fs.readFileSync('web/game.js', 'utf8');
  assert.doesNotMatch(browser, /deck_rng_state/);
  assert.doesNotMatch(browser, /dendryEngine\.random\.uint32\s*=/);

  const game = await loadGame();
  const first = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame();
  const second = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame();
  assert.notDeepEqual(first.random.getState(), second.random.getState());
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
    'systems/recurring-actions.md',
    'systems/support-and-chamber-display.md',
    'systems/information-and-ending-surfaces.md',
  ];
  for (const record of records) {
    const content = fs.readFileSync(`docs/research/${record}`, 'utf8');
    assert.match(content, /Source|Sources/);
    assert.match(content, /MAJ-|SUP-/);
  }
});

test('historical scenes keep citations in comments and expose no intelligence stat', () => {
  const historicalSceneFiles = [
    'source/scenes/events/1949/attempt_and_emergency.scene.dry',
    'source/scenes/events/1949/palace_protest.scene.dry',
    'source/scenes/events/1949/front_formation.scene.dry',
    'source/scenes/events/campaign_spine.scene.dry',
    'source/scenes/main.scene.dry',
  ];
  for (const file of historicalSceneFiles) {
    const source = fs.readFileSync(file, 'utf8');
    assert.match(source, /^# Sources?\b/m, `${file} has adjacent source comments`);
    const visibleLines = source
      .split('\n')
      .filter((line) => !line.trimStart().startsWith('#'))
      .join('\n');
    assert.doesNotMatch(visibleLines, /\bResearch:/);
    assert.doesNotMatch(visibleLines, /\b(?:MAJ|SUP)-S?\d+\b/);
  }

  const sceneSource = fs
    .readdirSync('source/scenes', {recursive: true, withFileTypes: true})
    .filter((entry) => entry.isFile() && entry.name.endsWith('.scene.dry'))
    .map((entry) => fs.readFileSync(`${entry.parentPath}/${entry.name}`, 'utf8'))
    .join('\n');
  assert.doesNotMatch(sceneSource, /political_intelligence/);
  assert.doesNotMatch(sceneSource, /Political intelligence/i);
});
