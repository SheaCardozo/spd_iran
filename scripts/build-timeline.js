const fs = require('node:fs');
const path = require('node:path');

const projectDirectory = path.resolve(__dirname, '..');
const sourcePath = path.join(
  projectDirectory,
  'docs',
  'research',
  'TIMELINE_PRIMER.md',
);
const templatePath = path.join(projectDirectory, 'web', 'timeline.html');
const outputPath = path.join(projectDirectory, 'out', 'html', 'timeline.html');
const standaloneDirectory = path.join(projectDirectory, 'out', 'timeline');
const standaloneImageDirectory = path.join(standaloneDirectory, 'img');
const standaloneAssets = [
  ['web/timeline.css', 'timeline.css'],
  ['web/timeline.js', 'timeline.js'],
  ['assets/img/majlis_1940s.jpg', 'img/majlis_1940s.jpg'],
  ['assets/img/shah_1949.jpg', 'img/shah_1949.jpg'],
  ['assets/img/makki_abadan_1951.jpg', 'img/makki_abadan_1951.jpg'],
  ['assets/img/iran_abadan_map_1950.jpg', 'img/iran_abadan_map_1950.jpg'],
  ['assets/img/abadan_workers_1952.jpg', 'img/abadan_workers_1952.jpg'],
  ['assets/img/mossadegh_truman_1951.jpg', 'img/mossadegh_truman_1951.jpg'],
  ['assets/img/tehran_rally_1953-08-16.jpg', 'img/tehran_rally_1953-08-16.jpg'],
  ['assets/img/ferdowsi_tanks_1953-08-19.png', 'img/ferdowsi_tanks_1953-08-19.png'],
];

const sources = {
  'maj-s1': 'Azimi, <i>Iran: The Crisis of Democracy</i>',
  'maj-s2': 'Abrahamian, <i>Iran Between Two Revolutions</i>',
  'maj-s3': 'Abrahamian, <i>Oil Crisis in Iran</i>',
  'maj-s4':
    'Gasiorowski and Byrne, eds., <i>Mohammad Mosaddeq and the 1953 Coup</i>',
  'maj-s5': 'Rahnema, <i>Behind the 1953 Coup in Iran</i>',
  'maj-s6': 'Katouzian, <i>Musaddiq and the Struggle for Power</i>',
  'maj-s7': 'Bayandor, <i>Iran and the CIA</i>',
  'maj-s9': 'Ladjevardi, <i>Labor Unions and Autocracy in Iran</i>',
  'maj-s12': 'Elm, <i>Oil, Power, and Principle</i>',
  'maj-s14': 'Painter and Brew, <i>The Struggle for Iran</i>',
  'maj-s15': 'Zabih, <i>The Communist Movement in Iran</i>',
  'maj-s18': 'Brew, <i>Petroleum and Progress in Iran</i>',
  'sup-006': 'Official Sixteenth Majles laws and decisions',
  'sup-007': 'Official Sixteenth and Seventeenth Majles proceedings',
  'sup-012': 'Azizi, “Communism, Cold War, and the 1953 Coup”',
  'sup-014': 'Nukii, “The Bazaaris’ Political Role”',
  'sup-015': 'Kashani-Sabet, “The Other Fight”',
  'sup-017': 'International Court of Justice, 1952 oil judgment',
  'sup-023':
    'Clawson and Sassanpour, “Adjustment to a Foreign Exchange Shock”',
  'sup-026':
    'International Bank for Reconstruction and Development, 1952 negotiation review',
  'sup-049': 'British memorandum, “Political Review of the Recent Crisis”',
  'sup-051': 'Iranian Parliament, official Sixteenth Majles roster',
  'sup-052': 'Iranian Parliament, official Seventeenth Majles roster',
  'sup-053': 'Iranian Parliament, official First Senate roster',
  'sup-055':
    'International Labour Office, <i>Labour Conditions in the Oil Industry in Iran</i>',
  'sup-057':
    'International Monetary Fund, <i>International Financial Statistics</i>',
  'sup-060': 'Randjbar-Daemi, “Radio Tehran and the 19 August 1953 Coup”',
  p1: '<i>Foreign Relations of the United States, 1952–1954, Iran, 1951–1954</i>',
  p14: 'Iranian Parliament, official retrospective chamber rosters',
};

const highlightedTerms = {
  'term-mossadegh': ['Mohammad Mossadegh', 'Mossadegh'],
  'term-national-front': ['National Front', 'Front'],
  'term-constitutionalist': [
    'Iran Party',
    'Karim Sanjabi',
    'Ahmad Zirakzadeh',
    'Ali Shayegan',
    'Mahmud Nariman',
    'Allahyar Saleh',
    'Sanjabi',
    'Zirakzadeh',
    'Shayegan',
    'Nariman',
    'Saleh',
  ],
  'term-government-loyalist': [
    'General Mahmoud Afshartus',
    'Mahmoud Afshartus',
    'Afshartus',
  ],
  'term-social-democratic': [
    'Toilers&#39; Party',
    'Third Force',
  ],
  'term-nationalist-social-democratic': [
    'Hossein Fatemi',
    'Khalil Maleki',
    'Fatemi',
    'Maleki',
  ],
  'term-baghai': ['Mozaffar Baghai', 'Baghai'],
  'term-makki': ['Hossein Makki', 'Makki'],
  'term-royalist': [
    'Mohammad Reza Shah',
    'Reza Shah',
    'Prime Minister Zahedi',
    'General Fazlollah Zahedi',
    'Colonel Nematollah Nassiri',
    'Fazlollah Zahedi',
    'Nematollah Nassiri',
    'Zahedi',
    'Nassiri',
    'SAVAK',
    'Shah',
  ],
  'term-left': ['Tudeh Party', 'Tudeh'],
  'term-religious': [
    'Ayatollah Abol-Qasem Kashani',
    'Ayatollah Kashani',
    'Abol-Qasem Kashani',
    'Ayatollah Mohammad Behbehani',
    'Mohammad Behbehani',
    'Behbehani',
    'Kashani',
    'Society of Muslim Warriors',
  ],
  'term-islamist': [
    'Fada&#39;iyan-e Islam',
    'Khalil Tahmasabi',
    'Ruhollah Khomeini',
    'Tahmasabi',
    'Khomeini',
  ],
  'term-parliament': [
    'the Majles',
    'Majles',
  ],
  'term-senate': [
    'the Senate',
    'Senate',
  ],
  'term-independent': [
    'Prime Minister Haj Ali Razmara',
    'Haj Ali Razmara',
    'Ahmad Qavam',
    'Ali Razmara',
    'Qavam',
    'Razmara',
  ],
  'term-world-bank': ['World Bank'],
  'term-aioc': ['AIOC'],
  'term-tpajax': ['TPAJAX'],
  'term-country country-iran': ['Iran'],
  'term-country country-uk': ['Britain', 'British'],
  'term-country country-us': [
    'United States',
    'American',
    'US',
  ],
  'term-country country-france': ['France', 'French'],
  'term-country country-netherlands': ['Netherlands', 'Dutch'],
  'term-country country-saudi': ['Saudi Arabia'],
  'term-country country-ussr': ['Soviet Union', 'Soviet'],
  'term-country country-israel': ['Israel', 'Israeli'],
};

const termLookup = new Map();
for (const [className, terms] of Object.entries(highlightedTerms)) {
  for (const term of terms) termLookup.set(term.toLowerCase(), className);
}
const termPattern = new RegExp(
  `\\b(${[...termLookup.keys()]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\b`,
  'gi',
);
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function highlightImportantTerms(value) {
  return value.replace(termPattern, (term) => {
    if (term.toLowerCase() === 'us' && term !== 'US') return term;
    const className = termLookup.get(term.toLowerCase());
    return `<span class="term ${className}">${term}</span>`;
  });
}

function sourceIdForHref(href) {
  const anchor = href.match(
    /(?:AVAILABLE_SOURCES|BIBLIOGRAPHY)\.md#(maj-s\d+|sup-\d+|p\d+)/i,
  );
  return anchor ? anchor[1].toLowerCase() : null;
}

function sourceForHref(href) {
  const anchor = href.match(/AVAILABLE_SOURCES\.md#(maj-s\d+|sup-\d+)/i);
  const id = anchor?.[1].toLowerCase();
  return id ? sources[id] : null;
}

function renderInline(value, options = {}) {
  const replacements = [];
  const hold = (html) => {
    const token = `\u0000${replacements.length}\u0000`;
    replacements.push(html);
    return token;
  };

  let prepared = value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      if (href.startsWith('events/') || href.startsWith('ECONOMIC_HISTORY.md')) {
        return hold('<!-- OMIT_INTERNAL_REFERENCE -->');
      }
      const source = sourceForHref(href);
      const locator = label
        .replace(/^`?(?:MAJ-S\d+|SUP-\d+)`?/i, '')
        .replace(/^\s*,?\s*/, '');
      let safeLabel;

      if (source) {
        const suffix = locator
          ? `, ${renderInline(locator, {highlight: false})}`
          : '';
        safeLabel = `<cite class="source-name">${source}</cite>${suffix}`;
      } else if (
        href === 'BIBLIOGRAPHY.md' ||
        href === 'AVAILABLE_SOURCES.md'
      ) {
        safeLabel = 'the bibliography below';
      } else {
        const sourceReference =
          /^https?:\/\//.test(href) ||
          href.startsWith('BIBLIOGRAPHY.md') ||
          href.startsWith('AVAILABLE_SOURCES.md');
        safeLabel = renderInline(label, {
          highlight: options.highlight !== false && !sourceReference,
        });
      }
      const fragment = href.startsWith('#');
      const sourceId = sourceIdForHref(href);
      if (options.bibliography && !fragment && !sourceId) {
        return hold(safeLabel);
      }
      if (fragment) {
        return hold(
          `<a href="${escapeHtml(href)}" class="jump-link">${safeLabel}</a>`,
        );
      }
      const target = fragment
        ? href
        : sourceId && sources[sourceId]
          ? `#source-${sourceId}`
          : '#bibliography-and-source-guide';
      const title = ' title="See this entry in the bibliography"';
      const attributes = ' class="citation"';
      return hold(
        `<a href="${escapeHtml(target)}"${attributes}${title}>${safeLabel}</a>`,
      );
    })
    .replace(/`([^`]+)`/g, (_, code) =>
      hold(`<code>${escapeHtml(code)}</code>`),
    );

  prepared = escapeHtml(prepared)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/“([^”]+)”/g, '<q>$1</q>');
  if (options.highlight !== false) {
    prepared = highlightImportantTerms(prepared);
  }

  return prepared.replace(/\u0000(\d+)\u0000/g, (_, index) => {
    return replacements[Number(index)];
  });
}

function isTableDivider(line) {
  return /^\s*\|?[\s:|-]+\|[\s:|-]+/.test(line);
}

function tableCells(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function startsBlock(line, nextLine = '') {
  return (
    !line.trim() ||
    /^###\s+/.test(line) ||
    (line.includes('|') && isTableDivider(nextLine))
  );
}

function renderBlocks(lines, options = {}) {
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const nextLine = lines[index + 1] || '';

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^###\s+(.+)$/);
    if (heading) {
      const label = heading[1];
      html.push(
        `<h3 id="${slugify(label)}">${renderInline(label, options)}</h3>`,
      );
      index += 1;
      continue;
    }

    if (line.includes('|') && isTableDivider(nextLine)) {
      const header = tableCells(line);
      const rows = [];
      index += 2;
      while (index < lines.length && lines[index].includes('|')) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      html.push(
        '<div class="table-scroll"><table><thead><tr>' +
          header
            .map((cell) => `<th>${renderInline(cell, options)}</th>`)
            .join('') +
          '</tr></thead><tbody>' +
          rows
            .map(
              (row) =>
                '<tr>' +
                row
                  .map((cell) => `<td>${renderInline(cell, options)}</td>`)
                  .join('') +
                '</tr>',
            )
            .join('') +
          '</tbody></table></div>',
      );
      continue;
    }

    const image = line.match(
      /^!\[([^\]]+)\]\(\.\.\/\.\.\/assets\/(img\/[a-z0-9_.-]+\.(?:jpe?g|png|webp))\s+"([^"]+)"\)$/i,
    );
    if (image) {
      const [, alt, source, caption] = image;
      const abadanLocator = source === 'img/iran_abadan_map_1950.jpg';
      html.push(
        `<figure class="historical-figure${abadanLocator ? ' orientation-map orientation-map-abadan' : ' historical-photo'}">
<div class="historical-figure-frame${abadanLocator ? ' orientation-map-frame' : ''}">
<img src="${escapeHtml(source)}" alt="${escapeHtml(alt)}" loading="lazy">
${abadanLocator ? '<span class="map-locator" aria-hidden="true"><span>Abadan</span></span>' : ''}
</div>
<figcaption>${renderInline(caption, {highlight: false})}</figcaption>
</figure>`,
      );
      index += 1;
      continue;
    }

    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[2]);
      const tag = ordered ? 'ol' : 'ul';
      const items = [];

      while (index < lines.length) {
        const item = lines[index].match(/^(\s*)([-*]|\d+\.)\s+(.+)$/);
        if (!item || /\d+\./.test(item[2]) !== ordered) break;

        let content = item[3];
        index += 1;
        while (
          index < lines.length &&
          lines[index].trim() &&
          !/^(\s*)([-*]|\d+\.)\s+/.test(lines[index]) &&
          !/^###\s+/.test(lines[index])
        ) {
          content += ` ${lines[index].trim()}`;
          index += 1;
        }
        const bibliographyMarker =
          options.bibliography &&
          content.match(/^\[sources?:([^\]]+)\]\s*/i);
        const bibliographyIds = bibliographyMarker
          ? bibliographyMarker[1]
              .split(',')
              .map((id) => id.trim().toLowerCase())
              .filter(Boolean)
          : [];
        if (bibliographyMarker) {
          content = content.slice(bibliographyMarker[0].length);
        }
        const idAttribute = bibliographyIds.length
          ? ` id="source-${bibliographyIds[0]}"`
          : '';
        const aliasAnchors = bibliographyIds
          .slice(1)
          .map((id) => `<span id="source-${escapeHtml(id)}"></span>`)
          .join('');
        items.push(
          `<li${idAttribute}>${aliasAnchors}${renderInline(content, options)}</li>`,
        );
        while (index < lines.length && !lines[index].trim()) index += 1;
      }

      html.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^>\s?/, ''));
        index += 1;
      }
      html.push(
        `<blockquote>${renderInline(quote.join(' '), options)}</blockquote>`,
      );
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      !startsBlock(lines[index], lines[index + 1] || '')
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${renderInline(paragraph.join(' '), options)}</p>`);
  }

  return html.join('\n');
}

function parseSections(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const sections = [];
  let current = null;

  for (const line of lines) {
    if (/^#\s+/.test(line)) continue;

    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      if (current) sections.push(current);
      current = {title: heading[1], lines: []};
      continue;
    }

    if (current) current.lines.push(line);
  }

  if (current) sections.push(current);
  return sections;
}

function renderSection(section) {
  const numbered = section.title.match(/^(\d+)\.\s+(.+)$/);
  const id = slugify(section.title);
  const defaultTitle = numbered ? numbered[2] : section.title;
  const title = defaultTitle;
  const bibliography = section.title === 'Bibliography and source guide';
  const chapterClass = numbered
    ? 'chapter timeline-chapter'
    : 'chapter reference-chapter';
  const referenceKickers = {
    'Why the crisis ended in a coup': 'Conclusion',
    'Bibliography and source guide': 'Sources',
  };
  const kickerLabel = numbered
    ? `Chapter ${numbered[1].padStart(2, '0')}`
    : referenceKickers[section.title] ?? 'Orientation';
  const kicker = `<p class="chapter-kicker">${kickerLabel}</p>`;

  return `<section class="${chapterClass}" id="${id}">
${kicker}
<h2>${renderInline(title)}</h2>
${renderBlocks(section.lines, {
  highlight: !bibliography,
  bibliography,
})}
</section>`;
}

function buildTimeline() {
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const template = fs.readFileSync(templatePath, 'utf8');
  const sections = parseSections(markdown);
  const content = sections.map(renderSection).join('\n');
  const nav = sections
    .filter((section) => section.title !== 'How to read this primer')
    .map((section) => {
      const defaultLabel = section.title.replace(/^\d+\.\s+/, '');
      const label = defaultLabel;
      return `<a href="#${slugify(section.title)}">${renderInline(label)}</a>`;
    })
    .join('\n');

  const output = template
    .replace('<!-- TIMELINE_NAV -->', nav)
    .replace('<!-- TIMELINE_CONTENT -->', content)
    .replace(
      /<code>(MAJ-S\d+|SUP-\d+|P\d+)<\/code>/g,
      (_, id) =>
        `<a href="#source-${id.toLowerCase()}" class="citation" title="See this entry in the bibliography"><cite class="source-name">${sources[id.toLowerCase()] || id}</cite></a>`,
    )
    .replace(
      /;\s*<code>ECONOMIC_HISTORY\.md<\/code>\s+evidence audit/g,
      '',
    )
    .replace(/\s*;?\s*<!-- OMIT_INTERNAL_REFERENCE -->\s*;?\s*/g, '');

  fs.writeFileSync(outputPath, output);

  fs.mkdirSync(standaloneImageDirectory, {recursive: true});
  fs.writeFileSync(path.join(standaloneDirectory, 'index.html'), output);
  for (const [source, destination] of standaloneAssets) {
    fs.copyFileSync(
      path.join(projectDirectory, source),
      path.join(standaloneDirectory, destination),
    );
  }

  console.log(`Built historical primer at ${outputPath}`);
  console.log(`Built standalone primer at ${standaloneDirectory}`);
}

if (require.main === module) buildTimeline();

module.exports = {buildTimeline};
