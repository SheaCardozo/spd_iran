const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

function contrastRatio(first, second) {
  const luminances = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => b - a,
  );
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

function cssVariable(block, name) {
  return block.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];
}

test('all semantic text colors and gradient stripes meet WCAG AA contrast', () => {
  const css = fs.readFileSync('web/timeline.css', 'utf8');
  const light = css.match(/^:root\s*\{[\s\S]*?^\}/m)?.[0];
  const dark = css.match(/^body\.dark\s*\{[\s\S]*?^\}/m)?.[0];
  assert.ok(light);
  assert.ok(dark);

  const variables = [
    'muted',
    'term-nationalist',
    'term-royalist',
    'term-left',
    'term-social-democratic',
    'term-religious',
    'term-islamist',
    'term-parliament',
    'term-independent',
    'term-world-bank',
    'term-aioc',
    'flag-white',
    'country-iran-green',
    'country-iran-red',
    'country-uk-blue',
    'country-uk-red',
    'country-us-red',
    'country-us-blue',
    'country-france-blue',
    'country-france-red',
    'country-netherlands-red',
    'country-netherlands-blue',
    'country-saudi-green',
    'country-ussr-red',
    'country-israel-blue',
  ];

  for (const [mode, block, backgrounds] of [
    ['light', light, ['#f8f5ed', '#eee9dc']],
    ['dark', dark, ['#242622']],
  ]) {
    for (const name of variables) {
      const color = cssVariable(block, name);
      assert.ok(color, `${mode} mode defines --${name}`);
      for (const background of backgrounds) {
        assert.ok(
          contrastRatio(color, background) >= 4.5,
          `${mode} --${name} (${color}) meets 4.5:1 against ${background}`,
        );
      }
    }
  }
});

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
  assert.match(gameCss, /--term-nationalist:\s*#2c6f64/i);
  assert.match(gameCss, /--term-parliament:\s*#7a5718/i);
  assert.match(gameCss, /--term-social-democratic:\s*#c00000/i);
  assert.match(
    gameCss,
    /\.term-mossadegh\s*\{[\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-parliament\)/,
  );
  assert.match(
    gameCss,
    /\.gray-mode \.term\s*\{[\s\S]*?background-image:\s*none !important;[\s\S]*?-webkit-text-fill-color:\s*currentColor !important;/,
  );
  assert.ok(hasOpeningTerm('term-mossadegh', 'Mohammad Mossadegh'));
  assert.ok(hasOpeningTerm('term-parliament', 'Majles'));
  assert.ok(hasOpeningTerm('term-national-front', 'National Front'));

  const timeline = fs.readFileSync('out/html/timeline.html', 'utf8');
  const timelineCss = fs.readFileSync('out/html/timeline.css', 'utf8');
  const timelineJs = fs.readFileSync('out/html/timeline.js', 'utf8');
  const timelineMarkdown = fs.readFileSync(
    'docs/research/TIMELINE_PRIMER.md',
    'utf8',
  );
  const timelineBuilder = fs.readFileSync('scripts/build-timeline.js', 'utf8');
  const localServer = fs.readFileSync('scripts/serve.js', 'utf8');
  assert.match(localServer, /'\.jpg':\s*'image\/jpeg'/);
  assert.match(localServer, /'\.jpeg':\s*'image\/jpeg'/);
  assert.match(timeline, /id="the-story-in-brief"/);
  assert.match(timeline, /id="iran-around-1950"/);
  assert.match(
    timeline,
    /<figure class="orientation-map orientation-map-abadan">[\s\S]*?<img src="img\/iran_abadan_map_1950\.jpg"[^>]*loading="lazy">[\s\S]*?<span class="map-locator" aria-hidden="true"><span>Abadan<\/span><\/span>/,
  );
  assert.match(timeline, /British War Office map, third edition, 1950/);
  assert.match(timeline, /British sheet uses <q>Persia<\/q> for Iran/);
  assert.match(
    timelineCss,
    /\.map-locator\s*\{[\s\S]*?top:\s*61\.1%;[\s\S]*?left:\s*19%;/,
  );
  assert.match(timeline, /id="8-the-coup-15-19-august-1953"/);
  assert.match(timeline, /Painter and Brew/);
  assert.match(
    timeline,
    /<span class="term term-mossadegh">Mohammad Mossadegh<\/span>/,
  );
  assert.match(timeline, /class="term term-national-front">National Front/);
  assert.match(timeline, /class="term term-constitutionalist">Iran Party/);
  assert.match(
    timeline,
    /class="term term-nationalist-social-democratic">Hossein Fatemi/,
  );
  assert.match(
    timeline,
    /class="term term-nationalist-social-democratic">Khalil Maleki/,
  );
  assert.match(
    timeline,
    /class="term term-social-democratic">Third Force/,
  );
  assert.match(
    timeline,
    /class="term term-social-democratic">Toilers&#39; Party/,
  );
  assert.match(timeline, /class="term term-senate">the Senate/);
  assert.match(
    timelineCss,
    /\.term-senate\s*\{[\s\S]*?linear-gradient\([\s\S]*?var\(--term-royalist\)[\s\S]*?var\(--term-parliament\)[\s\S]*?\}/,
  );
  assert.match(timeline, /class="term term-baghai">Mozaffar Baghai/);
  assert.match(timeline, /class="term term-makki">Hossein Makki/);
  assert.match(timeline, /class="term term-left">Tudeh/);
  assert.match(
    timeline,
    /<span class="term term-royalist">Mohammad Reza Shah<\/span>/,
  );
  assert.match(
    timeline,
    /class="term term-royalist">General Fazlollah Zahedi/,
  );
  assert.match(
    timeline,
    /class="term term-royalist">Colonel Nematollah Nassiri/,
  );
  assert.match(timeline, /class="term term-independent">Qavam/);
  assert.match(
    timeline,
    /class="term term-independent">Prime Minister Haj Ali Razmara/,
  );
  assert.match(
    timeline,
    /class="term term-government-loyalist">General Mahmoud Afshartus/,
  );
  assert.doesNotMatch(timeline, /<span class="term [^"]*">Iran<\/span> Party/);
  assert.doesNotMatch(timeline, /term-establishment/);
  assert.match(timeline, /class="term term-country country-us">United States/);
  assert.match(timeline, /class="term term-aioc">AIOC/);
  assert.match(timeline, /class="term term-tpajax">TPAJAX/);
  assert.match(timeline, /class="term term-religious">Kashani/);
  assert.match(
    timeline,
    /<span class="term term-religious">Ayatollah Abol-Qasem Kashani<\/span>/,
  );
  assert.match(timelineBuilder, /'Ayatollah Kashani'/);
  assert.match(timeline, /class="term term-islamist">Fada&#39;iyan-e Islam/);
  assert.match(timeline, /class="term term-islamist">Khalil Tahmasabi/);
  assert.match(timeline, /class="term term-islamist">Ruhollah Khomeini/);
  assert.match(
    timeline,
    /Royal <span class="term term-country country-netherlands">Dutch<\/span> Shell/,
  );
  assert.doesNotMatch(timeline, /class="term term-shell"/);
  assert.match(timelineCss, /--term-aioc:\s*#7a3c00/i);
  assert.match(timelineCss, /--term-independent:\s*#626262/i);
  assert.match(timelineCss, /--term-religious:\s*#3f713a/i);
  assert.match(timelineCss, /--term-islamist:\s*#24502f/i);
  assert.match(
    timelineCss,
    /\.chapter p\s*\{[\s\S]*?text-wrap:\s*pretty;/,
  );
  assert.match(
    timelineCss,
    /\.chapter h2\s*\{[\s\S]*?text-wrap:\s*balance;/,
  );
  assert.match(
    timelineCss,
    /\.term-constitutionalist\s*\{\s*color:\s*var\(--term-parliament\)/,
  );
  assert.match(
    timelineCss,
    /\.term-government-loyalist\s*\{\s*color:\s*var\(--term-parliament\)/,
  );
  assert.match(
    timelineCss,
    /\.term-mossadegh\s*\{[\s\S]*?linear-gradient\([\s\S]*?var\(--term-nationalist\)[\s\S]*?var\(--term-parliament\)[\s\S]*?\}/,
  );
  assert.doesNotMatch(timeline, /term-nationalist-left/);
  assert.doesNotMatch(timelineCss, /\.term-nationalist-left/);
  assert.match(timelineCss, /--term-left:\s*#700000/i);
  assert.match(timelineCss, /--term-social-democratic:\s*#c00000/i);
  assert.match(
    timelineCss,
    /\.term-social-democratic\s*\{\s*color:\s*var\(--term-social-democratic\)/,
  );
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
    /#bibliography-and-source-guide a,[\s\S]*?color:\s*inherit;/,
  );
  assert.doesNotMatch(timeline, /color-key|Colored term key|color-note/);
  assert.doesNotMatch(timeline, /class="term [^"]*">Kermit Roosevelt/);
  assert.doesNotMatch(timeline, /class="term [^"]*">(?:CIA|MI6)</);
  for (const citation of timeline.matchAll(
    /<a [^>]*class="citation"[^>]*>([\s\S]*?)<\/a>/g,
  )) {
    assert.doesNotMatch(citation[1], /class="term /);
  }
  const bibliography = timeline.match(
    /<section[^>]*id="bibliography-and-source-guide"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(bibliography);
  assert.doesNotMatch(bibliography, /class="term /);
  assert.doesNotMatch(timeline, /href="https?:\/\//);
  assert.doesNotMatch(timelineMarkdown, /\]\(https?:\/\//);
  assert.match(
    timeline,
    /href="#source-maj-s2" class="citation" title="See this entry in the bibliography"/,
  );
  assert.doesNotMatch(timeline, /href="#source-spine-and-locator-map"/);
  assert.match(timeline, /id="source-maj-s1"/);
  assert.match(timeline, /id="source-p1"/);
  assert.match(timeline, /id="source-p14"/);
  for (const citation of timeline.matchAll(
    /<a href="#(source-[^"]+)" class="citation"/g,
  )) {
    assert.match(timeline, new RegExp(`id="${citation[1]}"`));
  }
  assert.doesNotMatch(timeline, /\b(?:MAJ-S|SUP-)\d+/);
  assert.doesNotMatch(timeline, /\[sources?:/i);
  assert.doesNotMatch(timeline, /TIMELINE_(?:NAV|CONTENT)/);
  assert.doesNotMatch(
    timeline,
    /Enter the game|href="index\.html"|repository|archive ID/i,
  );
  assert.match(timeline, /<title>The Last Majles<\/title>/);
  assert.match(timeline, /<strong>The Last Majles<\/strong>/);
  assert.match(timeline, /id="page-title">The Last<br><em>Majles<\/em>/);
  assert.match(
    timeline,
    /does not mean that the Seventeenth <span class="term term-parliament">Majles<\/span> was <span class="term term-country country-iran">Iran<\/span>&#39;s final parliament/,
  );
  assert.match(timeline, /last parliament of the comparatively open constitutional struggle/);
  assert.match(timeline, /Decades of opposition to autocratic government and foreign concessions/);
  assert.doesNotMatch(timelineMarkdown, /\bfarman\b/i);
  assert.match(timelineMarkdown, /\bfirman\b/i);
  assert.match(timeline, /id="political-map-how-power-worked"/);
  const politicalMap = timeline.match(
    /<section[^>]*id="political-map-how-power-worked"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(politicalMap);
  assert.doesNotMatch(politicalMap, /<table|Westminster|British comparison/);
  assert.ok(politicalMap.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length < 1500);
  assert.match(timeline, /id="how-majles-elections-worked"/);
  assert.match(timeline, /id="how-a-government-was-formed"/);
  assert.doesNotMatch(
    timeline,
    /id="the-westminster-shorthand-and-where-it-fails"/,
  );
  assert.doesNotMatch(
    timeline,
    /Westminster|House of Lords|British comparison|Minority government offers/,
  );
  assert.doesNotMatch(timeline, /Parliamentary control at a glance/);
  assert.match(timeline, />Bibliography and source guide<\/h2>/);
  assert.match(
    timeline,
    /<section class="chapter reference-chapter" id="interpretive-spine">\s*<p class="chapter-kicker">Interpretation<\/p>/,
  );
  assert.match(
    timeline,
    /<section class="chapter reference-chapter" id="bibliography-and-source-guide">\s*<p class="chapter-kicker">Sources<\/p>/,
  );
  assert.match(
    timeline,
    /Fakhreddin Azimi, <em>Iran: The Crisis of Democracy, 1941–1953<\/em>/,
  );
  assert.doesNotMatch(timeline, /The Cabinet Manual/);
  assert.doesNotMatch(
    timeline,
    /id="why-the-incomplete-seventeenth-majles-could-function"/,
  );
  assert.doesNotMatch(
    timeline,
    /id="what-the-election-results-actually-tell-us"/,
  );
  assert.match(timeline, /id="parliamentary-balance"/);
  const electionExplanation = politicalMap.match(
    /<h3 id="how-majles-elections-worked"[\s\S]*?<h3 id="parliamentary-balance"/,
  )?.[0];
  assert.ok(electionExplanation);
  assert.equal(electionExplanation.match(/<p>/g)?.length, 2);
  assert.equal(politicalMap.match(/<li>/g)?.length, 5);
  assert.doesNotMatch(timeline, /id="can-the-senate-be-divided-into-factions"/);
  assert.doesNotMatch(timeline, /Shah-appointed senators/);
  assert.match(timeline, /only eight firm <span class="term term-national-front">National Front<\/span> deputies/);
  assert.match(timeline, /The War Ministry controlled commands/);
  assert.match(timeline, /the Interior Ministry controlled governors/);
  assert.match(timeline, /without establishing an agreed second veto/);
  assert.match(
    timeline,
    /causing the First <span class="term term-senate">Senate<\/span> to expire/,
  );
  assert.match(
    timeline,
    /term-country country-us">US<\/span> Ambassador Loy Henderson/,
  );
  assert.match(timeline, /formally announced the dissolution/);
  assert.match(timeline, /16 August/);
  assert.match(timeline, /id="economic-map-why-oil-dominated-the-crisis"/);
  const economicMap = timeline.match(
    /<section[^>]*id="economic-map-why-oil-dominated-the-crisis"[\s\S]*?<\/section>/,
  )?.[0];
  assert.ok(economicMap);
  assert.ok(economicMap.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length < 550);
  assert.match(timeline, /id="oil-less-economics-was-a-program"/);
  assert.doesNotMatch(timeline, /5,298 of 31,875 wage earners/);
  assert.match(timeline, /made imports dearer/);
  assert.match(timeline, /Brew, <i>Petroleum and Progress in Iran<\/i>/);
  assert.match(timeline, /President Truman sent Averell Harriman to reopen talks/);
  assert.match(timeline, /Assistant Secretary of State George McGhee tried a new division/);
  assert.match(
    timeline,
    /<span class="term term-world-bank">World Bank<\/span>&#39;s January–March 1952 intervention/,
  );
  assert.ok(
    timeline.indexOf('President Truman sent Averell Harriman') <
      timeline.indexOf('Assistant Secretary of State George McGhee'),
  );
  assert.ok(
    timeline.indexOf('Assistant Secretary of State George McGhee') <
      timeline.indexOf('January–March 1952 intervention'),
  );
  assert.match(timeline, /30 Tir restored <span class="term term-mossadegh">Mossadegh<\/span> at the head of a coalition/);
  assert.doesNotMatch(timeline, /Thirty Tir/);
  assert.match(timeline, /30 Tir uprising of 21 July 1952/);
  assert.match(timeline, /1946 Iranian Azerbaijan crisis/);
  assert.doesNotMatch(timeline, /1946 Azerbaijan crisis/);
  assert.match(timeline, /chapter 6, <q>Approaching the Shah<\/q>/);
  assert.match(timeline, /The immediate dispute concerned the boundary between crown and government/);
  assert.match(timeline, /id="january-1953-emergency-powers-and-open-rupture"/);
  assert.match(timeline, /their dissent had not yet become a parliamentary majority/);
  assert.match(timeline, /before the summer quorum crisis/);
  assert.match(timeline, /The embargo narrowed the room in which these disputes could be compromised/);
  assert.match(
    timeline,
    /International Labour Office, <i>Labour Conditions in the Oil Industry in Iran<\/i>/,
  );
  assert.match(timeline, /Shortly before 5 p\.m\./);
  assert.match(
    timeline,
    /Randjbar-Daemi, “Radio Tehran and the 19 August 1953 Coup”/,
  );
  assert.match(
    timeline,
    /<span class="term term-royalist">Prime Minister Zahedi<\/span>/,
  );
  assert.match(timeline, /class="contents-toggle"/);
  assert.match(timeline, /aria-controls="primer-contents"/);
  assert.match(
    timelineCss,
    /\.contents\.is-collapsible\.is-open nav\s*\{[\s\S]*?display:\s*grid;/,
  );
  assert.match(timelineJs, /setContentsOpen/);
  assert.match(timelineJs, /classList\.add\('is-collapsible'\)/);
  assert.match(timelineJs, /max-width: 600px/);
  assert.doesNotMatch(timeline, /a second attempt takes shape/);
  assert.match(timeline, /the failed plan gives way to improvisation/);
  const julyUprising = timeline.indexOf('16–21 July 1952');
  const icjRuling = timeline.indexOf('22 July 1952: the ICJ ruling');
  const coalitionFracture = timeline.indexOf(
    '<section class="chapter timeline-chapter" id="5-the-coalition-fractures-1952-1953">',
  );
  assert.ok(julyUprising > -1 && icjRuling > julyUprising);
  assert.ok(coalitionFracture > icjRuling);
  const referendumChapter = timeline.indexOf(
    'The referendum and the collapse of parliament',
  );
  assert.doesNotMatch(timeline, /The concurrent women&#39;s-rights struggle/);
  assert.ok(
    timeline.indexOf('Women also attempted to participate') >
      referendumChapter,
  );
  assert.match(timeline, /Point Four rural/);
  assert.match(timeline, /Parliament temporarily delegated defined lawmaking fields/);
  assert.match(timeline, /eighteen-member oil committee/);
  assert.match(timeline, /vote of inclination in late April/);
  assert.match(timeline, /pro-government deputies/);
  assert.match(timeline, /Compagnie française des pétroles/);
  assert.match(timeline, /intelligence and internal-security service/);
  assert.doesNotMatch(timeline, /lower- house/);
  assert.doesNotMatch(timeline, /The restored <span/);
  assert.doesNotMatch(timelineMarkdown, /-\r?\n/);
  assert.doesNotMatch(timelineMarkdown, /—\r?\n/);
  assert.doesNotMatch(timelineBuilder, /purposeSection\.lines\s*=/);
  assert.doesNotMatch(timelineBuilder, /sourceSection\.lines\.splice/);
  assert.match(
    timelineCss,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior:\s*auto;/,
  );
  assert.match(
    timelineCss,
    /@media \(forced-colors: active\)[\s\S]*?-webkit-text-fill-color:\s*currentColor;/,
  );
  assert.match(
    timelineCss,
    /@media print[\s\S]*?\.chapter\s*\{[\s\S]*?break-inside:\s*auto;/,
  );
  assert.doesNotMatch(timeline, /id="what-remains-uncertain"/);
  assert.doesNotMatch(timeline, />What remains uncertain</);
  assert.equal(
    timeline.match(/After the Allied invasion ended/g)?.length,
    1,
  );
  assert.ok(fs.existsSync('out/html/timeline.css'));
  assert.ok(fs.existsSync('out/html/timeline.js'));

  const standaloneTimeline = fs.readFileSync(
    'out/timeline/index.html',
    'utf8',
  );
  assert.equal(standaloneTimeline, timeline);
  for (const filename of [
    'timeline.css',
    'timeline.js',
    'img/majlis_1940s.jpg',
    'img/shah_1949.jpg',
    'img/makki_abadan_1951.jpg',
    'img/iran_abadan_map_1950.jpg',
  ]) {
    assert.ok(fs.existsSync(`out/timeline/${filename}`));
  }
});

test('status sidebar scenes and qdisplay compile with stable IDs', () => {
  const game = JSON.parse(fs.readFileSync('out/game.json', 'utf8'));
  const relationsText = JSON.stringify(game.scenes['status.relations']);

  assert.equal(game.scenes.status.isSpecial, true);
  assert.ok(game.scenes['status.coalition']);
  assert.ok(game.scenes['status.relations']);
  assert.match(
    relationsText,
    /term term-constitutionalist\\?">.*Iran Party/,
  );
  assert.match(
    relationsText,
    /term term-social-democratic\\?">.*Toilers' Party/,
  );
  assert.ok(game.qdisplays.month);
  assert.ok(
    fs.existsSync('source/scenes/events/1949/palace_protest.scene.dry'),
  );
  assert.equal(fs.existsSync('source/scenes/palace_protest.scene.dry'), false);
});
