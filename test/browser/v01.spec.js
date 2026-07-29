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
  await expect(page.locator('#content')).toContainText('4 February 1949');
  for (let step = 0; step < 4; step += 1) {
    await firstAvailableChoice(page);
    if (step === 0) {
      await expect(page.locator('#content')).toContainText(
        'Your statement condemns the shooting',
      );
    }
    await firstAvailableChoice(page);
  }
  await expect(page.locator('#content')).toContainText('October 1949');
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText(
    'The protesters leave without a final settlement',
  );
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText(
    'Opening briefing',
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
  expect(schema).toBe(1);

  for (const [tab, text] of [
    ['main_tab', 'Constitutional legitimacy'],
    ['coalition_tab', 'Coalition'],
    ['majles_tab', 'Majles and Senate'],
    ['crown_tab', 'Mohammad Reza Shah'],
  ]) {
    await page.locator(`#${tab}`).click();
    await expect(page.locator('#qualities')).toContainText(text);
  }

  await page.locator('#library-link').click();
  await expect(page.locator('#content')).toContainText('Research Library');
  const libraryChoice = page.locator('#content ul.choices a').first();
  await libraryChoice.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#content')).toContainText('Government and Constitution');
  await page.getByRole('link', {name: 'Library'}).click();
  await page.getByRole('link', {name: 'Return', exact: true}).click();
  await expect(page.locator('#content')).toContainText(
    'Opening briefing',
  );

  await expect(page.locator('ul.pinned-cards li')).toHaveCount(6);
  await expect(
    page.locator('ul.pinned-cards .card-caption', {
      hasText: 'Mohammad Mossadegh',
    }).locator('.term-mossadegh'),
  ).toHaveCount(1);
  await expect(
    page.locator('ul.pinned-cards .card-caption').first(),
  ).not.toContainText('<span');
  await page.locator('ul.pinned-cards li', {hasText: 'Mohammad Mossadegh'})
    .locator('a')
    .click();
  await expect(page.locator('#content')).toContainText('Mohammad Mossadegh');
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText(
    'The coalition leaves with a case',
  );
  await firstAvailableChoice(page);
  await expect(page.locator('#content')).toContainText(
    'Opening briefing',
  );

  await page.locator('ul.decks li a').first().click();
  const handCard = page.locator('ul.hand li a').first();
  await expect(handCard).toBeVisible();
  await handCard.click();
  await firstAvailableChoice(page);
  await chooseUntilScene(page, 'main');

  await page.evaluate(() => window.dendryUI.saveSlot(0));
  const saved = await page.evaluate(() => {
    const key = window.dendryUI.save_prefix + '_0';
    return JSON.parse(localStorage[key]);
  });
  expect(saved.qualities.save_schema_version).toBe(1);
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
    expect.stringContaining('predates The Last Majles v0.1'),
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
  ).toBe(1);

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
        let card = dendry.drawCard('main.party_affairs');
        if (!card.id && dendry.state.qualities.front_formed) {
          card = dendry.drawCard('main.public_campaign');
        }
        if (!card.id && dendry.state.qualities.parliamentary_deck_unlocked) {
          card = dendry.drawCard('main.parliamentary_affairs');
        }
        if (!card.id) throw new Error('No normal action available');
        dendry.playCard(card.id);
      }
      const choiceIndex = dendry.choiceCache.findIndex(
        (choice) => choice.canChoose,
      );
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
  expect(result.actions).toBe(18);
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

  await page.getByRole('link', {name: 'Review the Research Library'}).click();
  await expect(page.locator('#content')).toContainText('Research Library');
  await page.getByRole('link', {name: 'Return', exact: true}).click();
  await expect(page.locator('#content')).toContainText(result.ending);
});
