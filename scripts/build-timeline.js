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
  'sup-006': 'Official Sixteenth Majles laws and decisions',
  'sup-012': 'Azizi, “Communism, Cold War, and the 1953 Coup”',
  'sup-014': 'Nukii, “The Bazaaris’ Political Role”',
  'sup-015': 'Kashani-Sabet, “The Other Fight”',
  'sup-017': 'International Court of Justice, 1952 oil judgment',
  'sup-023':
    'Clawson and Sassanpour, “Adjustment to a Foreign Exchange Shock”',
};

const highlightedTerms = {
  'term-mossadegh': ['Mossadegh'],
  'term-national-front': ['National Front', 'Iran Party'],
  'term-constitutionalist': [
    'Sanjabi',
    'Zirakzadeh',
    'Shayegan',
    'Nariman',
    'Saleh',
  ],
  'term-nationalist-left': ['Fatemi'],
  'term-nationalist-social-democratic': [
    'Toilers&#39; Party',
    'Third Force',
    'Maleki',
  ],
  'term-baghai': ['Baghai'],
  'term-makki': ['Makki'],
  'term-royalist': [
    'Zahedi',
    'Nassiri',
    'SAVAK',
    'Shah',
  ],
  'term-left': ['Tudeh Party', 'Tudeh'],
  'term-religious': [
    'Kashani',
    'Society of Muslim Warriors',
  ],
  'term-islamist': [
    'Fada&#39;iyan-e Islam',
    'Tahmasabi',
    'Khomeini',
  ],
  'term-parliament': [
    'the Majles',
    'Majles',
    'the Senate',
    'Senate',
  ],
  'term-independent': ['Qavam', 'Razmara'],
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
    const className = termLookup.get(term.toLowerCase());
    return `<span class="term ${className}">${term}</span>`;
  });
}

function sourceForHref(href) {
  const anchor = href.match(/AVAILABLE_SOURCES\.md#(maj-s\d+|sup-\d+)/i);
  return anchor ? sources[anchor[1].toLowerCase()] : null;
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
      } else if (href === 'BIBLIOGRAPHY.md' || href === 'AVAILABLE_SOURCES.md') {
        safeLabel = 'the source guide below';
      } else {
        safeLabel = renderInline(label);
      }
      const external = /^https?:\/\//.test(href);
      const fragment = href.startsWith('#');
      const target = external || fragment ? href : '#source-spine-and-locator-map';
      const title = external ? '' : ' title="See the source guide below"';
      const attributes = external
        ? ' target="_blank" rel="noreferrer"'
        : ' class="citation"';
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

function renderBlocks(lines) {
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
      html.push(`<h3 id="${slugify(label)}">${renderInline(label)}</h3>`);
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
          header.map((cell) => `<th>${renderInline(cell)}</th>`).join('') +
          '</tr></thead><tbody>' +
          rows
            .map(
              (row) =>
                '<tr>' +
                row.map((cell) => `<td>${renderInline(cell)}</td>`).join('') +
                '</tr>',
            )
            .join('') +
          '</tbody></table></div>',
      );
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
        items.push(`<li>${renderInline(content)}</li>`);
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
      html.push(`<blockquote>${renderInline(quote.join(' '))}</blockquote>`);
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
    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
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
  const title =
    section.title === 'Source spine and locator map'
      ? 'Sources and further reading'
      : defaultTitle;
  const chapterClass = numbered
    ? 'chapter timeline-chapter'
    : 'chapter reference-chapter';
  const kicker = numbered
    ? `<p class="chapter-kicker">Chapter ${numbered[1].padStart(2, '0')}</p>`
    : '<p class="chapter-kicker">Orientation</p>';

  return `<section class="${chapterClass}" id="${id}">
${kicker}
<h2>${renderInline(title)}</h2>
${renderBlocks(section.lines)}
</section>`;
}

function buildTimeline() {
  const markdown = fs.readFileSync(sourcePath, 'utf8');
  const template = fs.readFileSync(templatePath, 'utf8');
  const sections = parseSections(markdown);
  const purposeSection = sections.find(
    (section) => section.title === 'Purpose and limits',
  );
  if (purposeSection) {
    purposeSection.title = 'How to read this primer';
    purposeSection.lines = [
      'This is a narrative orientation to Iran’s oil nationalization movement,',
      'Mohammad Mossadegh’s governments, and the coup of August 1953. It begins',
      'with the political opening of 1941, follows the immediate post-coup',
      'settlement, and then carries the consequences forward to 1979.',
      '',
      'Where dates, casualty figures, covert responsibility, or interpretation',
      'remain disputed, the text says so instead of presenting false precision.',
      'The citations name the relevant historian or primary record directly;',
      'the final source guide gives the useful chapter or page range.',
      '',
      'Names appear in several transliterations across the literature. This page',
      'uses **Mossadegh**, **Majles**, **Tudeh**, and **National Front** except',
      'when reproducing a published title.',
    ];
  }
  const sourceSection = sections.find(
    (section) => section.title === 'Source spine and locator map',
  );
  if (sourceSection) {
    const firstBreak = sourceSection.lines.findIndex(
      (line, index) => index > 0 && !line.trim(),
    );
    sourceSection.lines.splice(
      0,
      firstBreak < 0 ? 0 : firstBreak + 1,
      'The following guide names the principal works used in this primer and',
      'the chapters or pages most relevant to each topic.',
      '',
    );
  }
  const content = sections.map(renderSection).join('\n');
  const nav = sections
    .filter((section) => !section.title.startsWith('Purpose and limits'))
    .map((section) => {
      const defaultLabel = section.title.replace(/^\d+\.\s+/, '');
      const label =
        section.title === 'Source spine and locator map'
          ? 'Sources and further reading'
          : defaultLabel;
      return `<a href="#${slugify(section.title)}">${renderInline(label)}</a>`;
    })
    .join('\n');

  const output = template
    .replace('<!-- TIMELINE_NAV -->', nav)
    .replace('<!-- TIMELINE_CONTENT -->', content)
    .replace(
      /<code>(MAJ-S\d+|SUP-\d+)<\/code>/g,
      (_, id) =>
        `<cite class="source-name">${sources[id.toLowerCase()] || id}</cite>`,
    )
    .replace(
      /;\s*<code>ECONOMIC_HISTORY\.md<\/code>\s+evidence audit/g,
      '',
    )
    .replace(/\s*;?\s*<!-- OMIT_INTERNAL_REFERENCE -->\s*;?\s*/g, '');

  fs.writeFileSync(outputPath, output);
  console.log(`Built historical primer at ${outputPath}`);
}

if (require.main === module) buildTimeline();

module.exports = {buildTimeline};
