const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const ignoredSourceRoot = path.resolve('docs/research/sources');

function markdownFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (path.resolve(fullPath) === ignoredSourceRoot) continue;
    if (entry.isDirectory()) files.push(...markdownFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

const documentationFiles = [
  'README.md',
  'THIRD_PARTY_NOTICES.md',
  'AGENTS.md',
  'web/README.md',
  ...markdownFiles('docs'),
];

function headingSlug(text) {
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function anchorsFor(filePath) {
  const contents = fs.readFileSync(filePath, 'utf8');
  const anchors = new Set();
  const slugCounts = new Map();

  for (const match of contents.matchAll(
    /<a\s+(?:name|id)=["']([^"']+)["']/gi,
  )) {
    anchors.add(match[1]);
  }

  for (const match of contents.matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const base = headingSlug(match[1]);
    const count = slugCounts.get(base) || 0;
    anchors.add(count === 0 ? base : `${base}-${count}`);
    slugCounts.set(base, count + 1);
  }

  return anchors;
}

test('tracked documentation has valid local links and fragments', () => {
  const anchorCache = new Map();

  for (const filePath of documentationFiles) {
    const contents = fs.readFileSync(filePath, 'utf8');
    for (const match of contents.matchAll(/\[[^\]]*]\(([^)]+)\)/g)) {
      let target = match[1].trim();
      const titleIndex = target.search(/\s+["']/);
      if (titleIndex !== -1) target = target.slice(0, titleIndex);
      if (target.startsWith('<') && target.endsWith('>')) {
        target = target.slice(1, -1);
      }
      if (/^(?:https?:|mailto:)/.test(target)) continue;

      const hashIndex = target.indexOf('#');
      const targetPath = hashIndex === -1 ? target : target.slice(0, hashIndex);
      const fragment = hashIndex === -1 ? '' : target.slice(hashIndex + 1);
      const decodedPath = decodeURIComponent(targetPath);
      const resolved = path.resolve(
        path.dirname(filePath),
        decodedPath || path.basename(filePath),
      );

      if (
        resolved === ignoredSourceRoot ||
        resolved.startsWith(`${ignoredSourceRoot}${path.sep}`)
      ) {
        continue;
      }

      assert.ok(
        fs.existsSync(resolved),
        `${filePath} links to missing local target ${target}`,
      );

      if (fragment && resolved.endsWith('.md')) {
        if (!anchorCache.has(resolved)) {
          anchorCache.set(resolved, anchorsFor(resolved));
        }
        assert.ok(
          anchorCache.get(resolved).has(decodeURIComponent(fragment)),
          `${filePath} links to missing fragment ${target}`,
        );
      }
    }
  }
});

test('changelog index and required sections are synchronized', () => {
  const changelogDirectory = 'docs/changelog';
  const entries = fs
    .readdirSync(changelogDirectory)
    .filter((name) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(name))
    .sort();
  const index = fs.readFileSync(`${changelogDirectory}/README.md`, 'utf8');
  const indexed = [...index.matchAll(/\((\d{4}-\d{2}-\d{2}-[^)]+\.md)\)/g)]
    .map((match) => match[1])
    .sort();

  assert.deepEqual(indexed, entries, 'every dated change must appear once');

  for (const entry of entries) {
    const contents = fs.readFileSync(`${changelogDirectory}/${entry}`, 'utf8');
    assert.match(contents, /^# .+/m, `${entry} title`);
    assert.match(contents, /^-\s+\*\*Date:\*\*\s+\d{4}-\d{2}-\d{2}$/m);
    assert.match(contents, /^-\s+\*\*Status:\*\*\s+.+$/m);
    for (const heading of [
      'Summary',
      'Reason',
      'Dynamic SPD comparison',
      'System fit',
      'Research and assets',
      'Validation',
    ]) {
      assert.match(contents, new RegExp(`^## ${heading}$`, 'm'), entry);
    }
  }
});

test('current source registries preserve their responsibility boundaries', () => {
  const available = fs.readFileSync(
    'docs/research/AVAILABLE_SOURCES.md',
    'utf8',
  );
  const unavailable = fs.readFileSync(
    'docs/research/UNAVAILABLE_SOURCES.md',
    'utf8',
  );
  const researchMap = fs.readFileSync('docs/research/README.md', 'utf8');

  for (const anchor of ['sup-042', 'sup-043', 'sup-044', 'sup-045']) {
    assert.match(available, new RegExp(`<a id="${anchor}"></a>`));
  }
  assert.doesNotMatch(unavailable, /## Resolved acquisitions/);
  assert.doesNotMatch(unavailable, /Required direct challenge/i);
  assert.doesNotMatch(unavailable, /must be acquired because/i);

  for (const registry of [
    'BIBLIOGRAPHY.md',
    'AVAILABLE_SOURCES.md',
    'UNAVAILABLE_SOURCES.md',
    'ASSETS.md',
  ]) {
    assert.match(researchMap, new RegExp(registry.replace('.', '\\.')));
  }
});
