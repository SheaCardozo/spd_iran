const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const test = require('node:test');

const sourceId = 'SUP-001';
const expectedHash =
  '9856dd235674899ceb9170cfd98371ac3b194668f3505631c3be4d26427bd860';
const sourceRoot = 'docs/research/sources';
const pdfPath =
  `${sourceRoot}/supplemental/SUP-001-nukii-2012-protest-events-tehran-bazaar.pdf`;

test('research source taxonomy and SUP-001 cross-references are present', () => {
  for (const path of [
    'docs/research/AVAILABLE_SOURCES.md',
    'docs/research/BIBLIOGRAPHY.md',
    'docs/research/events/1949-10-palace-protest.md',
  ]) {
    const contents = fs.readFileSync(path, 'utf8');
    assert.match(contents, new RegExp(sourceId));
  }
});

test('ignored local archive matches its catalog when present', () => {
  if (!fs.existsSync(sourceRoot)) return;

  assert.ok(fs.statSync(`${sourceRoot}/major`).isDirectory());
  assert.ok(fs.statSync(`${sourceRoot}/supplemental`).isDirectory());

  const sidecar = fs.readFileSync(
    `${sourceRoot}/supplemental/SUP-001-nukii-2012-protest-events-tehran-bazaar.md`,
    'utf8',
  );
  assert.match(sidecar, new RegExp(sourceId));

  const source = fs.readFileSync(pdfPath);
  const actualHash = crypto.createHash('sha256').update(source).digest('hex');

  assert.equal(actualHash, expectedHash);
});
