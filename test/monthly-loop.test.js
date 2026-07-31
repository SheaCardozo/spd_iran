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

function reachMonthlyHand(dendry) {
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'main');
}

function firstAvailableChoice(dendry, predicate = () => true) {
  return dendry.choiceCache.findIndex(
    (option) => option.canChoose && predicate(option),
  );
}

function continueThroughRoster(dendry) {
  if (dendry.state.sceneId === 'advisor_roster') {
    const choice = firstAvailableChoice(
      dendry,
      (option) => option.id === (
        dendry.state.qualities.advisor_roster_required
          ? 'advisor_roster.advisor_roster_editor'
          : 'advisor_roster.cancel_advisor_roster'
      ),
    );
    dendry.choose(choice);
    return true;
  }

  if (dendry.state.sceneId === 'advisor_roster.advisor_roster_editor') {
    const add = firstAvailableChoice(
      dendry,
      (option) => option.id.includes('.draft_add_'),
    );
    const confirm = firstAvailableChoice(
      dendry,
      (option) => option.id === 'advisor_roster.confirm_advisor_roster',
    );
    dendry.choose(confirm !== -1 ? confirm : add);
    return true;
  }

  return false;
}

function passageChoice(dendry) {
  const preferredIds = [
    '.oil_coalition',
    '.deputies_oil',
    '.meeting_oil',
    '.resolution_oil',
    '.press_oil',
    '.bazaar_oil',
    '.nationalization_cross_chamber',
  ];
  for (const fragment of preferredIds) {
    const choice = firstAvailableChoice(
      dendry,
      (option) => option.id.includes(fragment),
    );
    if (choice !== -1) return choice;
  }
  return firstAvailableChoice(dendry);
}

function resolveJanuaryAndEmergency(dendry, choices = [0, 0]) {
  reachMonthlyHand(dendry);
  dendry.playCard('opposition_consultation');
  dendry.choose(0);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'attempt_and_emergency');
  assert.equal(dendry.state.qualities.attempt_emergency_seen, 1);
  dendry.choose(choices[0]);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');
  const crackdown = firstAvailableChoice(
    dendry,
    (option) => option.id === 'attempt_and_emergency.emergency_measures',
  );
  assert.notEqual(crackdown, -1);
  dendry.choose(crackdown);
  assert.equal(
    dendry.state.sceneId,
    'attempt_and_emergency.emergency_measures',
  );
  assert.equal(dendry.state.qualities.emergency_crackdown_seen, 1);
  dendry.choose(choices[1]);
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
  assert.equal(dendry.state.qualities.month, 1);
  assert.equal(dendry.state.qualities.year, 1949);

  dendry.playCard('opposition_consultation');
  assert.equal(dendry.state.qualities.month_actions, 1);

  dendry.choose(0);
  assert.match(dendry.state.sceneId, /^[^.]+\.[^.]+$/);
  assert.ok(dendry.game.scenes[dendry.state.sceneId].content);
  dendry.choose(0);
  assert.equal(dendry.state.qualities.time, 1);
  assert.equal(dendry.state.qualities.month, 2);
  assert.equal(dendry.state.qualities.year, 1949);
  assert.equal(dendry.state.qualities.month_actions, 0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');
  assert.equal(dendry.state.qualities.front_formed, 0);
});

test('the Dynamic-mode agenda has four cards and cancellation restores it exactly', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);

  assert.equal(game.scenes.main.maxCards, 4);
  dendry.drawCard('main.party_affairs');
  const card = dendry.drawCard('main.party_affairs');
  const originalHand = dendry.state.currentHands.main.map((held) => held.id);
  const originalLastCard = dendry.state.lastPlayedCard;
  const originalVisits = dendry.state.visits[card.id] || 0;
  dendry.state.qualities.pre_action_hand_ids = [...originalHand];
  dendry.state.qualities.pre_action_last_card_id = '';
  dendry.playCard(card.id);
  const timer = {
    opposition_consultation: 'opposition_consultation_timer',
    political_correspondence: 'political_correspondence_timer',
  }[card.id];
  assert.equal(dendry.state.qualities.month_actions, 1);
  assert.ok(dendry.state.qualities[timer] > 0);

  const cancel = firstAvailableChoice(
    dendry,
    (option) => option.id === 'return_card',
  );
  assert.notEqual(cancel, -1);
  dendry.choose(cancel);

  assert.equal(dendry.state.sceneId, 'main');
  assert.equal(dendry.state.qualities.month_actions, 0);
  assert.equal(dendry.state.qualities[timer], 0);
  assert.deepEqual(
    dendry.state.currentHands.main.map((held) => held.id),
    originalHand,
  );
  assert.equal(dendry.state.visits[card.id] || 0, originalVisits);
  assert.equal(dendry.state.lastPlayedCard, originalLastCard);
  assert.equal(dendry.state.qualities.time, 0);
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
  assert.equal(dendry.state.qualities.month, 1);
  assert.equal(dendry.state.qualities.time, 0);

  dendry.playCard('opposition_consultation');
  dendry.choose(0);
  dendry.choose(0);
  assert.equal(dendry.state.sceneId, 'post_event.events_choice');
  assert.equal(dendry.state.qualities.advisor_action_timer, 5);
});

test('adviser roster work uses an independent cooldown and no monthly action', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);
  const q = dendry.state.qualities;
  q.advisor_fatemi_available = 1;
  q.advisor_makki_available = 1;
  q.advisor_pool_size = 4;
  dendry.goToScene('advisor_roster');
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.advisor_roster_editor',
  ));
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.draft_add_fatemi',
  ));
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.confirm_advisor_roster',
  ));

  assert.equal(q.active_advisors.length, 3);
  assert.equal(q.advisor_fatemi_active, 1);
  assert.equal(q.advisor_roster_timer, 6);
  assert.equal(q.advisor_action_timer, 0);
  assert.equal(q.month_actions, 0);
  assert.equal(q.time, 0);
});

test('eligibility changes require one exact roster reconciliation without consuming an unchanged slate', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);
  const q = dendry.state.qualities;

  q.advisor_fatemi_available = 1;
  q.advisor_makki_available = 1;
  q.advisor_roster_timer = 4;
  dendry.goToScene('post_event');
  assert.equal(dendry.state.sceneId, 'advisor_roster');
  assert.equal(q.advisor_roster_required, 1);
  assert.equal(
    firstAvailableChoice(
      dendry,
      (option) => option.id === 'advisor_roster.cancel_advisor_roster',
    ),
    -1,
    'required reconciliation cannot return to the hand',
  );

  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.advisor_roster_editor',
  ));
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.draft_add_fatemi',
  ));
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.confirm_advisor_roster',
  ));
  assert.equal(q.active_advisors.length, 3);
  assert.equal(q.advisor_roster_timer, 6);
  assert.equal(q.advisor_roster_required, 0);

  q.advisor_kashani_available = 1;
  dendry.goToScene('post_event');
  assert.equal(dendry.state.sceneId, 'advisor_roster');
  assert.equal(q.advisor_roster_required, 1);
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.advisor_roster_editor',
  ));
  dendry.choose(firstAvailableChoice(
    dendry,
    (option) => option.id === 'advisor_roster.confirm_advisor_roster',
  ));
  assert.equal(q.active_advisors.length, 3);
  assert.equal(
    q.advisor_roster_timer,
    6,
    'confirming the unchanged slate does not restart its cooldown',
  );
  assert.equal(q.advisor_roster_required, 0);

  dendry.goToScene('post_event');
  assert.notEqual(dendry.state.sceneId, 'advisor_roster');
  assert.equal(q.advisor_roster_required, 0);
});

test('a month without resources strains press and one active organization without deadlock', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);
  const q = dendry.state.qualities;
  const initialPress = q.press_capacity;
  const initialPartyOrganization = q.iran_party_organization;

  q.resources = 0;
  q.independent_nationalists_active = 0;
  q.month_actions = 1;
  dendry.goToScene('post_event');

  assert.equal(q.resource_strain_months, 1);
  assert.equal(q.press_capacity, initialPress - 1);
  assert.equal(q.iran_party_organization, initialPartyOrganization - 1);
  assert.equal(q.months_advanced, 1);
  assert.ok(
    dendry.choiceCache.some((option) => option.canChoose),
    'operational strain leaves an available continuation',
  );
});

test('derived chamber vote breakdowns exactly partition attending usable members', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);
  const q = dendry.state.qualities;

  for (const place of q.majles_places.slice(0, 6)) {
    place.scenario.usability = 'usable';
    place.scenario.attendance = 'attending';
  }
  for (const place of q.senate_places.slice(0, 5)) {
    place.scenario.usability = 'usable';
    place.scenario.attendance = 'attending';
  }
  dendry.goToScene('post_event');

  assert.equal(
    q.nationalization_majles_support +
      q.nationalization_majles_conditional +
      q.nationalization_majles_opposed,
    q.majles_attending_members,
  );
  assert.equal(
    q.nationalization_senate_support +
      q.nationalization_senate_conditional +
      q.nationalization_senate_opposed,
    q.senate_attending_members,
  );
  assert.equal(
    q.nationalization_majles_support_gap,
    q.nationalization_majles_support -
      q.nationalization_majles_threshold,
  );
  assert.equal(
    q.nationalization_senate_support_gap,
    q.nationalization_senate_support -
      q.nationalization_senate_threshold,
  );

  const majlesBreakdown = [
    q.nationalization_majles_support,
    q.nationalization_majles_conditional,
    q.nationalization_majles_opposed,
  ];
  const majlesPositions = q.majles_places.map(
    (place) => place.scenario.oil_position,
  );
  q.nationalization_majles_vote_resolved = 1;
  q.oil_coalition_support = 100;
  q.parliamentary_procedure_legitimacy = 100;
  q.public_mandate = 100;
  dendry.goToScene('post_event');
  assert.deepEqual(
    [
      q.nationalization_majles_support,
      q.nationalization_majles_conditional,
      q.nationalization_majles_opposed,
    ],
    majlesBreakdown,
    'a resolved Majles vote is not rewritten by the Senate strategy',
  );
  assert.deepEqual(
    q.majles_places.map((place) => place.scenario.oil_position),
    majlesPositions,
  );
});

test('all opening emergency paths follow the January action and reach the February hand', async () => {
  const game = await loadGame();
  const choiceSets = [3, 3];
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
    resolveJanuaryAndEmergency(dendry, choices);
    const q = dendry.state.qualities;
    assert.equal(q.year, 1949);
    assert.equal(q.month, 2);
    assert.equal(q.months_advanced, 1);
    assert.equal(q.attempt_emergency_seen, 1);
    assert.equal(q.emergency_crackdown_seen, 1);
    assert.equal(q.front_formed, 0);
  }
  assert.equal(paths.length, 9);
});

test('the May, July, and October anchors resolve inside the monthly loop', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);

  const seen = {};
  let safety = 0;
  while (!seen.front_formation && safety < 160) {
    safety += 1;
    const scene = dendry.state.sceneId;
    if (
      scene === 'attempt_and_emergency.constituent_assembly' ||
      scene === 'attempt_and_emergency.senate_election_preparations' ||
      scene === 'palace_protest' ||
      scene === 'front_formation'
    ) {
      seen[scene] = [
        dendry.state.qualities.year,
        dendry.state.qualities.month,
      ];
      if (scene === 'front_formation') break;
    }

    if (scene === 'main') {
      let card = dendry.drawCard('main.party_affairs');
      if (!card?.id && dendry.state.qualities.parliamentary_deck_unlocked) {
        card = dendry.drawCard('main.parliamentary_affairs');
      }
      assert.ok(card?.id, 'an early normal action remains available');
      dendry.playCard(card.id);
    } else if (continueThroughRoster(dendry)) {
      continue;
    } else {
      const choice = firstAvailableChoice(dendry);
      assert.notEqual(choice, -1, `${scene} has an available continuation`);
      dendry.choose(choice);
    }
  }

  assert.ok(safety < 160, 'Front formation does not deadlock');
  assert.deepEqual(
    seen['attempt_and_emergency.constituent_assembly'],
    [1949, 5],
  );
  assert.deepEqual(
    seen['attempt_and_emergency.senate_election_preparations'],
    [1949, 7],
  );
  assert.deepEqual(seen.palace_protest, [1949, 10]);
  assert.deepEqual(seen.front_formation, [1949, 11]);
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

test('the historical path reaches Senate approval after exactly twenty-seven actions', async () => {
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
      let card;
      if (dendry.state.qualities.parliamentary_deck_unlocked) {
        card = dendry.drawCard('main.parliamentary_affairs');
      }
      if (!card?.id && dendry.state.qualities.front_formed) {
        card = dendry.drawCard('main.public_campaign');
      }
      if (!card?.id) card = dendry.drawCard('main.party_affairs');
      assert.ok(card?.id, 'a Party Affairs action remains available');
      dendry.playCard(card.id);
    } else if (continueThroughRoster(dendry)) {
      continue;
    } else {
      dendry.choose(passageChoice(dendry));
    }
  }

  assert.ok(safety < 300, 'campaign does not deadlock');
  assert.equal(dendry.state.sceneId, 'campaign_ending');
  assert.equal(dendry.state.qualities.months_advanced, 27);
  assert.equal(dendry.state.qualities.year, 1951);
  assert.equal(dendry.state.qualities.month, 3);
  assert.equal(dendry.state.qualities.nationalization_approved_senate, 1);
  assert.equal(dendry.state.qualities.campaign_complete, 1);
  assert.equal(
    dendry.state.qualities.majles_phase,
    'Nationalization approved by both chambers',
  );
});

test('Majles and Senate rejection terminate without advancing beyond March', async () => {
  const game = await loadGame();

  const majlesDefeat = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(majlesDefeat);
  majlesDefeat.state.qualities.months_advanced = 26;
  majlesDefeat.state.qualities.nationalization_majles_support = 3;
  majlesDefeat.state.qualities.nationalization_majles_threshold = 4;
  majlesDefeat.goToScene('campaign_spine.majles_vote_resolution');
  assert.equal(
    majlesDefeat.state.sceneId,
    'campaign_spine.majles_nationalization_defeat',
  );
  assert.equal(majlesDefeat.state.qualities.terminal_reason, 'Majles rejection');
  assert.equal(majlesDefeat.state.qualities.campaign_complete, 1);
  assert.equal(majlesDefeat.state.qualities.campaign_action_target, 26);
  assert.equal(
    majlesDefeat.state.qualities.majles_phase,
    'Nationalization rejected in the Majles',
  );

  const senateDefeat = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(senateDefeat);
  const senateQ = senateDefeat.state.qualities;
  senateQ.nationalization_approved_majles = 1;
  senateQ.nationalization_senate_support = 20;
  senateQ.nationalization_senate_threshold = 31;
  senateQ.year = 1951;
  senateQ.month = 3;
  senateDefeat.goToScene('campaign_spine.senate_vote_resolution');
  assert.equal(
    senateDefeat.state.sceneId,
    'campaign_spine.senate_nationalization_defeat',
  );
  assert.equal(senateQ.terminal_reason, 'Senate rejection');
  assert.equal(senateQ.campaign_complete, 1);
  assert.equal(senateQ.month, 3);
  assert.equal(senateQ.majles_phase, 'Nationalization blocked in the Senate');
});

test('a resource-poor campaign always retains an available route to an ending', async () => {
  const game = await loadGame();
  const dendry = new engine.DendryEngine(
    new engine.NullUserInterface(),
    game,
  ).beginGame([0]);
  reachMonthlyHand(dendry);
  let safety = 0;
  while (dendry.state.sceneId !== 'campaign_ending' && safety < 400) {
    safety += 1;
    if (dendry.state.sceneId === 'main') {
      dendry.state.qualities.resources = 0;
      let card = dendry.drawCard('main.party_affairs');
      if (!card?.id && dendry.state.qualities.parliamentary_deck_unlocked) {
        card = dendry.drawCard('main.parliamentary_affairs');
      }
      if (!card?.id && dendry.state.qualities.front_formed) {
        card = dendry.drawCard('main.public_campaign');
      }
      assert.ok(card?.id, 'a free normal action remains available');
      dendry.playCard(card.id);
    } else if (continueThroughRoster(dendry)) {
      continue;
    } else {
      const choice = firstAvailableChoice(dendry);
      assert.notEqual(
        choice,
        -1,
        `${dendry.state.sceneId} has a free continuation`,
      );
      dendry.choose(choice);
    }
  }
  assert.ok(safety < 400, 'resource poverty cannot deadlock the campaign');
  assert.equal(dendry.state.sceneId, 'campaign_ending');
  assert.equal(dendry.state.qualities.campaign_complete, 1);
});
