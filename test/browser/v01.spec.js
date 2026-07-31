const {test, expect} = require('@playwright/test');

async function firstAvailableChoice(page) {
  const choices = page.locator('#content ul.choices li:not(.unavailable)');
  await expect(choices.first()).toBeVisible();
  await choices.first().click();
}

async function reachMonthlyHand(page) {
  await page.goto('/');
  await expect(page.locator('#content')).toContainText('The Last Majles');
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText(
    'Opposition briefing',
  );
}

async function chooseUntilScene(page, sceneId) {
  for (let step = 0; step < 30; step += 1) {
    const current = await page.evaluate(
      () => window.dendryUI.dendryEngine.state.sceneId,
    );
    if (current === sceneId) return;
    await firstAvailableChoice(page);
  }
  throw new Error(`Did not reach ${sceneId}`);
}

test.beforeEach(async ({page}) => {
  page.dialogMessages = [];
  page.on('dialog', (dialog) => {
    page.dialogMessages.push(dialog.message());
    dialog.accept();
  });
});

test('pregame sidebar is inert and the agenda explains empty states', async ({
  page,
}) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto('/');

  await expect(page.locator('#tools_wrapper')).toBeHidden();
  await expect(
    page.locator('#stats_sidebar .tab_button').first(),
  ).toBeDisabled();
  await page.evaluate(() => window.changeTab('status.majles', 'majles_tab'));
  expect(pageErrors).toEqual([]);

  await firstAvailableChoice(page);
  await expect(page.locator('#tools_wrapper')).toBeVisible();
  await expect(
    page.locator('#stats_sidebar .tab_button').first(),
  ).toBeEnabled();
  await expect(page.locator('.hand-state')).toHaveText(
    'Hand empty — choose a deck.',
  );
  await expect(page.locator('.blank-card').first()).toHaveText('Open slot');

  await page.locator('ul.decks li a').first().click();
  await page.locator('ul.decks li a').first().click();
  await expect(page.locator('ul.hand li a')).toHaveCount(2);
  await expect(page.locator('.hand-state')).toHaveText(
    '2 cards in hand — every other eligible card is already held or cooling down.',
  );
  await expect(page.locator('.deck-state')).toHaveText(
    'No cards are ready in the available decks.',
  );
  await expect(page.locator('ul.decks a.card')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await page.locator('ul.hand li a').first().click();
  await page.getByRole('link', {name: 'Return card to hand'}).click();
  await expect(page.locator('.hand-state')).toHaveText(
    '2 cards in hand — every other eligible card is already held or cooling down.',
  );
  expect(pageErrors).toEqual([]);
});

test('debug mode reveals exact choice effects only on hover or focus', async ({
  page,
}) => {
  await page.goto('/?debug=1');
  await firstAvailableChoice(page);
  await page.locator('#majles_tab').click();
  if (page.viewportSize().width <= 600) {
    await page.locator('#majles-place-picker').selectOption('0');
  } else {
    await page.locator(
      '.majles-chart .chamber-seat[data-place-number="1"]',
    ).focus();
  }
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'campaign influence:',
  );
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'administrative pressure:',
  );
  await page.evaluate(() => {
    const dendry = window.dendryUI.dendryEngine;
    dendry.state.qualities.month = 2;
    dendry.goToScene('post_event');
  });
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText('4 February 1949');

  const choice = page.locator('#content ul.choices li').first();
  const tooltip = choice.locator('.debug-effect-tooltip');
  await expect(tooltip).toHaveCount(1);
  await expect(tooltip).toBeHidden();
  await choice.locator('a').focus();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toContainText(
    'constitutional legitimacy +2',
  );

  await page.evaluate(() => window.dendryUI.quickSave());
  await page.goto('/');
  await page.evaluate(() => window.dendryUI.quickLoad());
  await expect.poll(
    () => page.evaluate(
      () => window.dendryUI.dendryEngine.state.qualities.debug_mode,
    ),
  ).toBe(0);
  await expect(
    page.locator('#content .debug-effect-tooltip'),
  ).toHaveCount(0);
});

test('onboarding, sidebar, Library, cards, advisers, saves, modes, and layout', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  await page.getByRole('link', {name: 'Historical Primer'}).click();
  await expect(page).toHaveURL(/\/timeline\.html$/);
  await expect(page.locator('#page-title')).toContainText('The Last');
  await expect(page.getByRole('link', {name: 'Play the campaign'})).toHaveAttribute(
    'href',
    './',
  );

  await reachMonthlyHand(page);

  const schema = await page.evaluate(
    () => window.dendryUI.dendryEngine.state.qualities.save_schema_version,
  );
  expect(schema).toBe(5);

  for (const [tab, text] of [
    ['main_tab', 'Constitutional legitimacy'],
    ['coalition_tab', 'Opposition'],
    ['support_tab', 'Professional and constitutional circles'],
    ['majles_tab', 'Majles'],
    ['crown_tab', 'Mohammad Reza Shah'],
  ]) {
    await page.locator(`#${tab}`).click();
    await expect(page.locator('#qualities')).toContainText(text);
  }
  await page.locator('#majles_tab').click();
  await expect(page.locator('#qualities .majles-chart .chamber-seat')).toHaveCount(136);
  await expect(page.locator('#qualities .senate-chart')).toHaveCount(0);
  await expect(page.locator('#qualities')).toContainText(
    'authorized place → returned candidate → approved credential',
  );
  const firstMajlesPlace = page.locator(
    '.majles-chart .chamber-seat[data-place-number="1"]',
  );
  const secondMajlesPlace = page.locator(
    '.majles-chart .chamber-seat[data-place-number="2"]',
  );
  const compactLayout = page.viewportSize().width <= 600;
  if (compactLayout) {
    await expect(firstMajlesPlace).toHaveAttribute('aria-hidden', 'true');
    await expect(firstMajlesPlace).not.toHaveAttribute('role', 'button');
  } else {
    await expect(firstMajlesPlace).toHaveAttribute('role', 'button');
    await expect(firstMajlesPlace).toHaveAttribute(
      'aria-label',
      /^Majles place 1,/,
    );
    await expect(firstMajlesPlace).not.toHaveAttribute(
      'aria-label',
      /campaign influence|administrative pressure/,
    );
  }
  const majlesPicker = page.locator('#majles-place-picker');
  await expect(majlesPicker).toBeVisible();
  await majlesPicker.selectOption('1');
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'Majles — place 2 —',
  );
  expect((await majlesPicker.boundingBox()).height).toBeGreaterThanOrEqual(44);
  if (compactLayout) {
    await majlesPicker.selectOption('0');
  } else {
    await firstMajlesPlace.focus();
  }
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'Majles — place 1 —',
  );
  await expect(page.locator('.chamber-place-detail')).not.toContainText(
    'campaign influence:',
  );
  if (compactLayout) {
    await majlesPicker.selectOption('1');
  } else {
    await secondMajlesPlace.focus();
    await page.keyboard.press('Enter');
  }
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'Majles — place 2 —',
  );
  await page.evaluate(() => {
    window.dendryUI.dendryEngine.state.qualities.senate_convened = 1;
    window.dendryUI.dendryEngine.state.qualities.gass_golshayan_rejected_majles = 1;
    window.updateSidebar();
  });
  await expect(page.locator('#qualities .senate-chart .chamber-seat')).toHaveCount(60);
  const firstSenatePlace = page.locator(
    '.senate-chart .chamber-seat[data-place-number="1"]',
  );
  if (compactLayout) {
    await page.locator('#senate-place-picker').selectOption('0');
  } else {
    await firstSenatePlace.focus();
  }
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'Senate — place 1 —',
  );
  await page.getByRole('button', {name: 'Oil position', exact: true}).click();
  await expect(
    page.getByRole('button', {name: 'Oil position', exact: true}),
  ).toHaveAttribute('aria-pressed', 'true');
  if (compactLayout) {
    await page.locator('#majles-place-picker').selectOption('0');
  } else {
    await page.locator('#qualities .majles-chart .chamber-seat').first().focus();
  }
  await expect(page.locator('.chamber-place-detail')).toContainText(
    'oil position',
  );

  await page.evaluate(() => {
    const q = window.dendryUI.dendryEngine.state.qualities;
    q.support_history = [
      {professional: 40, bazaar: 30, workers: 20, provincial: 25},
      {professional: 45, bazaar: 34, workers: 23, provincial: 29},
    ];
  });
  await page.locator('#support_tab').click();
  await expect(page.locator('.support-trend-chart')).toBeVisible();

  await page.locator('#library-link').click();
  await expect(page.locator('#content')).toContainText('Research Library');
  const libraryChoice = page.locator('#content ul.choices a').first();
  await libraryChoice.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#content')).toContainText('Current Situation');
  await page.getByRole('link', {name: 'Library', exact: true}).click();
  await page.getByRole('link', {name: 'Return', exact: true}).click();
  await expect(page.locator('#content')).toContainText(
    'Opposition briefing',
  );

  await expect(page.locator('ul.pinned-cards li')).toHaveCount(2);
  await expect(
    page.locator('ul.pinned-cards .card-caption', {
      hasText: 'Mohammad Mossadegh',
    }),
  ).toHaveCount(1);
  await expect(
    page.locator('.pinned-text-description'),
  ).toContainText('Adviser consultation: available.');
  await expect(
    page.locator('ul.pinned-cards .card-caption').first(),
  ).not.toContainText('<span');
  await page.locator('ul.pinned-cards li', {hasText: 'Mohammad Mossadegh'})
    .locator('a')
    .click();
  await expect(page.locator('#content')).toContainText('Mohammad Mossadegh');
  await page.getByRole('link', {name: 'State the constitutional case'})
    .click();
  await expect(page.locator('#content')).toContainText(
    'leave with a common case',
  );
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText(
    'Opposition briefing',
  );

  await page.evaluate(() => {
    const dendry = window.dendryUI.dendryEngine;
    const q = dendry.state.qualities;
    q.advisor_fatemi_available = 1;
    q.advisor_makki_available = 1;
    q.advisor_pool_size = 4;
    dendry.goToScene('advisor_roster');
  });
  await page.getByRole('link', {name: 'Review the active slate'}).click();
  await page.getByRole('link', {name: 'Add Hossein Fatemi'}).click();
  await page.getByRole('link', {name: 'Confirm the active slate'}).click();
  await expect(page.locator('ul.pinned-cards li')).toHaveCount(4);
  await expect(page.locator('.pinned-text-description')).toContainText(
    'Adviser slate review: available in 6 months.',
  );

  await page.locator('ul.decks li a').first().click();
  await expect(page.locator('.hand-state')).toContainText('open slots');
  const originalAgenda = await page.locator(
    'ul.hand .card-caption',
  ).allTextContents();
  const handCard = page.locator('ul.hand li a').first();
  await expect(handCard).toBeVisible();
  await handCard.click();
  await page.getByRole('link', {name: 'Return card to hand'}).click();
  await expect(page.locator('ul.hand li a').first()).toBeVisible();
  expect(
    await page.locator('ul.hand .card-caption').allTextContents(),
  ).toEqual(originalAgenda);
  expect(
    await page.evaluate(
      () => window.dendryUI.dendryEngine.state.qualities.month_actions,
    ),
  ).toBe(0);
  await page.locator('ul.hand li a').first().click();
  await firstAvailableChoice(page);
  await chooseUntilScene(page, 'main');

  await page.evaluate(() => window.dendryUI.saveSlot(0));
  const saved = await page.evaluate(() => {
    const key = window.dendryUI.save_prefix + '_0';
    return JSON.parse(localStorage[key]);
  });
  expect(saved.qualities.save_schema_version).toBe(5);
  expect(saved.qualities).not.toHaveProperty('run_seed');

  await page.evaluate(() => {
    window.dendryUI.dendryEngine.state.qualities.public_mandate = 1;
    window.dendryUI.loadSlot(0);
  });
  expect(
    await page.evaluate(
      () => window.dendryUI.dendryEngine.state.qualities.public_mandate,
    ),
  ).toBe(saved.qualities.public_mandate);

  await page.evaluate(() => {
    localStorage[window.dendryUI.save_prefix + '_1'] =
      JSON.stringify({qualities: {}});
    window.dendryUI.loadSlot(1);
  });
  await expect.poll(() => page.dialogMessages).toContainEqual(
    expect.stringContaining('predates the v0.3'),
  );

  await page.evaluate(() => window.dendryUI.showSaveSlots());
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#export_button_0').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('save.txt');
  await page.locator('#import_save').setInputFiles({
    name: 'save.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from(JSON.stringify(saved)),
  });
  await expect.poll(
    () => page.evaluate(
      () => window.dendryUI.dendryEngine.state.qualities.save_schema_version,
    ),
  ).toBe(5);

  await page.evaluate(() => {
    window.enableDarkMode();
    window.enableGrayMode();
  });
  await expect(page.locator('body')).toHaveClass(/dark-mode/);
  await expect(page.locator('body')).toHaveClass(/gray-mode/);

  const layout = await page.evaluate(() => ({
    body: document.body.scrollWidth,
    viewport: document.documentElement.clientWidth,
    sidebarVisible: getComputedStyle(
      document.getElementById('stats_sidebar'),
    ).display !== 'none',
  }));
  expect(layout.body).toBeLessThanOrEqual(layout.viewport + 1);
  expect(layout.sidebarVisible).toBe(true);
  expect([1440, 768, 390]).toContain(testInfo.project.use.viewport.width);
});

test('complete browser playthrough reaches the ending', async ({page}) => {
  await reachMonthlyHand(page);

  const result = await page.evaluate(() => {
    const dendry = window.dendryUI.dendryEngine;
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
        if (!card?.id) {
          card = dendry.drawCard('main.party_affairs');
        }
        if (!card?.id) throw new Error('No normal action available');
        dendry.playCard(card.id);
      }
      let choiceIndex;
      if (dendry.state.sceneId === 'advisor_roster') {
        choiceIndex = dendry.choiceCache.findIndex(
          (choice) => choice.canChoose && choice.id === (
            dendry.state.qualities.advisor_roster_required
              ? 'advisor_roster.advisor_roster_editor'
              : 'advisor_roster.cancel_advisor_roster'
          ),
        );
      } else if (
        dendry.state.sceneId === 'advisor_roster.advisor_roster_editor'
      ) {
        choiceIndex = dendry.choiceCache.findIndex(
          (choice) => choice.canChoose &&
            choice.id === 'advisor_roster.confirm_advisor_roster',
        );
        if (choiceIndex < 0) {
          choiceIndex = dendry.choiceCache.findIndex(
            (choice) => choice.canChoose &&
              choice.id.includes('.draft_add_'),
          );
        }
      } else {
        const preferred = [
          '.oil_coalition',
          '.deputies_oil',
          '.meeting_oil',
          '.resolution_oil',
          '.press_oil',
          '.bazaar_oil',
          '.nationalization_cross_chamber',
        ];
        choiceIndex = -1;
        for (const fragment of preferred) {
          choiceIndex = dendry.choiceCache.findIndex(
            (choice) => choice.canChoose && choice.id.includes(fragment),
          );
          if (choiceIndex >= 0) break;
        }
        if (choiceIndex < 0) {
          choiceIndex = dendry.choiceCache.findIndex(
            (choice) => choice.canChoose,
          );
        }
      }
      if (choiceIndex < 0) throw new Error('No available choice');
      dendry.choose(choiceIndex);
    }
    return {
      scene: dendry.state.sceneId,
      actions: dendry.state.qualities.months_advanced,
      year: dendry.state.qualities.year,
      month: dendry.state.qualities.month,
      senate: dendry.state.qualities.nationalization_approved_senate,
      ending: dendry.state.qualities.ending_name,
    };
  });

  expect(result.scene).toBe('campaign_ending');
  expect(result.actions).toBe(27);
  expect(result.year).toBe(1951);
  expect(result.month).toBe(3);
  expect(result.senate).toBe(1);
  expect([
    'A Constitutional Coalition',
    'A Parliamentary Vanguard',
    'A Movement of the Streets',
    'A Fragile Nationalization',
  ]).toContain(result.ending);

  await expect(page.locator('#content')).toContainText(result.ending);
  await expect(page.locator('#content')).toContainText('Causal recap');
  await page.locator('#main_tab').click();
  await expect(page.locator('#qualities')).not.toContainText(
    'Adviser action: available',
  );
  await expect(page.locator('#qualities')).not.toContainText(
    'Adviser roster: may be changed',
  );

  await page.getByRole('link', {name: 'Review the Research Library'}).click();
  await expect(page.locator('#content')).toContainText('Research Library');
  await page.getByRole('link', {name: 'Return', exact: true}).click();
  await expect(page.locator('#content')).toContainText(result.ending);
});
