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
  const gameCss = fs.readFileSync('out/html/game.css', 'utf8');
  const compiledGame = JSON.parse(fs.readFileSync('out/game.json', 'utf8'));
  const openingText = compiledGame.scenes.palace_protest.content[1].content;
  const hasOpeningTerm = (className, label) =>
    openingText.some(
      (item, index) =>
        item?.type === 'magic' &&
        item.content === `<span class="term ${className}">` &&
        openingText[index + 1] === label &&
        openingText[index + 2]?.content === '</span>',
    );
  assert.match(index, /id="stats-link"[^>]*>Status</);
  assert.match(index, /id="primer-link"[^>]*href="timeline\.html"/);
  assert.match(index, /id="main_tab"/);
  assert.match(index, /id="coalition_tab"/);
  assert.match(index, /id="relations_tab"/);
  assert.match(index, />\s*Event images:/);
  assert.match(gameCss, /--term-nationalist:\s*#2f766a/i);
  assert.match(gameCss, /--term-parliament:\s*#a87925/i);
  assert.match(gameCss, /--term-social-democratic:\s*#c00000/i);
  assert.match(
    gameCss,
    /\.term-mossadegh\s*\{[\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-parliament\)/,
  );
  assert.match(
    gameCss,
    /\.gray-mode \.term\s*\{[\s\S]*?background-image:\s*none !important;[\s\S]*?-webkit-text-fill-color:\s*currentColor !important;/,
  );
  assert.ok(hasOpeningTerm('term-mossadegh', 'Mossadegh'));
  assert.ok(hasOpeningTerm('term-parliament', 'Majles'));
  assert.ok(hasOpeningTerm('term-national-front', 'National Front'));

  const timeline = fs.readFileSync('out/html/timeline.html', 'utf8');
  const timelineCss = fs.readFileSync('out/html/timeline.css', 'utf8');
  assert.match(timeline, /id="the-story-in-brief"/);
  assert.match(timeline, /id="8-the-coup-15-19-august-1953"/);
  assert.match(timeline, /Painter and Brew/);
  assert.match(
    timeline,
    /Mohammad <span class="term term-mossadegh">Mossadegh<\/span>/,
  );
  assert.match(timeline, /class="term term-national-front">National Front/);
  assert.match(timeline, /class="term term-national-front">Iran Party/);
  assert.match(timeline, /class="term term-nationalist-left">Fatemi/);
  assert.match(
    timeline,
    /class="term term-nationalist-social-democratic">Maleki/,
  );
  assert.match(
    timeline,
    /class="term term-nationalist-social-democratic">Third Force/,
  );
  assert.match(
    timeline,
    /class="term term-nationalist-social-democratic">Toilers&#39; Party/,
  );
  assert.match(timeline, /class="term term-baghai">Baghai/);
  assert.match(timeline, /class="term term-makki">Makki/);
  assert.match(timeline, /class="term term-left">Tudeh/);
  assert.match(
    timeline,
    /Mohammad Reza <span class="term term-royalist">Shah<\/span>/,
  );
  assert.match(timeline, /class="term term-royalist">Zahedi/);
  assert.match(timeline, /class="term term-royalist">Nassiri/);
  assert.match(timeline, /class="term term-independent">Qavam/);
  assert.match(timeline, /class="term term-independent">Razmara/);
  assert.doesNotMatch(timeline, /class="term [^"]*">Afshartus/);
  assert.doesNotMatch(timeline, /<span class="term [^"]*">Iran<\/span> Party/);
  assert.doesNotMatch(timeline, /term-establishment/);
  assert.match(timeline, /class="term term-country country-us">United States/);
  assert.match(timeline, /class="term term-aioc">AIOC/);
  assert.match(timeline, /class="term term-tpajax">TPAJAX/);
  assert.match(timeline, /class="term term-religious">Kashani/);
  assert.match(
    timeline,
    /Ayatollah Abol-Qasem <span class="term term-religious">Kashani<\/span>/,
  );
  assert.match(
    timeline,
    /Karim <span class="term term-constitutionalist">Sanjabi<\/span>/,
  );
  assert.match(
    timeline,
    /Ahmad <span class="term term-constitutionalist">Zirakzadeh<\/span>/,
  );
  assert.match(
    timeline,
    /Ali <span class="term term-constitutionalist">Shayegan<\/span>/,
  );
  assert.match(
    timeline,
    /Mahmud <span class="term term-constitutionalist">Nariman<\/span>/,
  );
  assert.match(
    timeline,
    /Allahyar <span class="term term-constitutionalist">Saleh<\/span>/,
  );
  assert.match(timeline, /class="term term-islamist">Fada&#39;iyan-e Islam/);
  assert.match(timeline, /class="term term-islamist">Tahmasabi/);
  assert.match(timeline, /class="term term-islamist">Khomeini/);
  assert.match(
    timeline,
    /Royal <span class="term term-country country-netherlands">Dutch<\/span> Shell/,
  );
  assert.doesNotMatch(timeline, /class="term term-shell"/);
  assert.match(timelineCss, /--term-aioc:\s*#7a3c00/i);
  assert.match(timelineCss, /--term-independent:\s*#808080/i);
  assert.match(timelineCss, /--term-religious:\s*#4f8448/i);
  assert.match(timelineCss, /--term-islamist:\s*#24502f/i);
  assert.match(
    timelineCss,
    /\.term-constitutionalist\s*\{\s*color:\s*var\(--term-parliament\)/,
  );
  assert.match(
    timelineCss,
    /\.term-mossadegh\s*\{[\s\S]*?linear-gradient\([\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-parliament\)[\s\S]*?\}/,
  );
  assert.match(
    timelineCss,
    /\.term-nationalist-left\s*\{[\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-left\)[\s\S]*?\}/,
  );
  assert.match(timelineCss, /--term-left:\s*#700000/i);
  assert.match(timelineCss, /--term-social-democratic:\s*#c00000/i);
  assert.match(
    timelineCss,
    /\.term-nationalist-social-democratic\s*\{[\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-social-democratic\)[\s\S]*?\}/,
  );
  assert.match(
    timelineCss,
    /\.term-baghai\s*\{[\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-royalist\)[\s\S]*?\}/,
  );
  const baghaiRule = timelineCss.match(/\.term-baghai\s*\{[\s\S]*?\}/)?.[0];
  assert.ok(baghaiRule);
  assert.doesNotMatch(baghaiRule, /var\(--term-left\)/);
  assert.match(
    timelineCss,
    /\.term-makki\s*\{[\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-religious\)[\s\S]*?\}/,
  );
  assert.match(
    timelineCss,
    /\.citation\s*\{[\s\S]*?color:\s*inherit;[\s\S]*?\}/,
  );
  assert.match(
    timelineCss,
    /#source-spine-and-locator-map a,[\s\S]*?color:\s*inherit;/,
  );
  assert.doesNotMatch(timeline, /color-key|Colored term key|color-note/);
  assert.doesNotMatch(timeline, /class="term [^"]*">Kermit Roosevelt/);
  assert.doesNotMatch(timeline, /class="term [^"]*">(?:CIA|MI6)</);
  for (const citation of timeline.matchAll(
    /<a [^>]*class="citation"[^>]*>([\s\S]*?)<\/a>/g,
  )) {
    assert.doesNotMatch(citation[1], /class="term /);
  }
  assert.doesNotMatch(timeline, /\b(?:MAJ-S|SUP-)\d+/);
  assert.doesNotMatch(timeline, /TIMELINE_(?:NAV|CONTENT)/);
  assert.ok(fs.existsSync('out/html/timeline.css'));
  assert.ok(fs.existsSync('out/html/timeline.js'));
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
