const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const test = require('node:test');

const sourceRoot = 'docs/research/sources';
const katouzianOcr = {
  path:
    `${sourceRoot}/major/` +
    'MAJ-S6-katouzian-1999-musaddiq-struggle-power-ocr.pdf',
  hash: '5ae1b3e45f03113bfa89a03e49a43d5bdd2c2d4064ab05651ce9284de32ebcb5',
};
const electronicSources = [
  {
    id: 'MAJ-S2 EPUB',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S2-abrahamian-1982-iran-between-two-revolutions.epub',
    hash: '236dc3987a77eda82d175aecb36430105665638a617aa3b23cf0fc510dc2c15e',
  },
  {
    id: 'MAJ-S3 EPUB',
    path:
      `${sourceRoot}/major/` +
      'MAJ-S3-abrahamian-2021-oil-crisis-in-iran.epub',
    hash: '921fff22e385cbff033eddc4779504289f317bd5fcc2fff843de44b11d801c57',
  },
];
const sources = [
  {
    id: 'MAJ-S1',
    relativePath: 'major/MAJ-S1-azimi-1989-crisis-of-democracy.pdf',
    hash: '997e891eb44601419d07f6ed4ff4fc4fc5be922b328088a41465801b146e1df6',
  },
  {
    id: 'MAJ-S2',
    relativePath: 'major/MAJ-S2-abrahamian-1982-iran-between-two-revolutions.pdf',
    hash: '0c640c960a90102d0f79296888dc0e2a657eb8adbcdfc9d1bcd350104700bcd6',
  },
  {
    id: 'MAJ-S3',
    relativePath: 'major/MAJ-S3-abrahamian-2021-oil-crisis-in-iran.pdf',
    hash: '3ed248c0fbfb277416d0a29c4e431b669bfd6a6571167a331efb013301c4aa88',
  },
  {
    id: 'MAJ-S4',
    relativePath: 'major/MAJ-S4-gasiorowski-byrne-2004-mosaddeq-coup.pdf',
    hash: '587674e69691c0492604f13af9a2da6d176166348863423c9bf5fe611c72e1ba',
  },
  {
    id: 'MAJ-S5',
    relativePath: 'major/MAJ-S5-rahnema-2015-behind-1953-coup.pdf',
    hash: '1f728dd622fdbafcedc761e5a5e46f24d5f4638fef811d9c53475b9e1dced649',
  },
  {
    id: 'MAJ-S6',
    relativePath: 'major/MAJ-S6-katouzian-1999-musaddiq-struggle-power.pdf',
    hash: 'e3fc4f9a205298b7587dd6f12ee7abf770dbb32b8575d68826a655490d67dd33',
  },
  {
    id: 'MAJ-S7',
    relativePath: 'major/MAJ-S7-bayandor-2010-iran-cia.pdf',
    hash: '446e3060036ed7fe947a8fdc467532e6e1ad8cfbb75bf3485cfcd00265ee8cef',
  },
  {
    id: 'SUP-001',
    relativePath:
      'supplemental/SUP-001-nukii-2012-protest-events-tehran-bazaar.pdf',
    hash: '9856dd235674899ceb9170cfd98371ac3b194668f3505631c3be4d26427bd860',
  },
];

test('research source taxonomy and catalog cross-references are present', () => {
  for (const path of [
    'docs/research/AVAILABLE_SOURCES.md',
    'docs/research/BIBLIOGRAPHY.md',
    'docs/research/events/1949-10-palace-protest.md',
  ]) {
    const contents = fs.readFileSync(path, 'utf8');
    for (const source of sources) {
      if (path.includes('palace-protest') &&
          !['MAJ-S1', 'SUP-001'].includes(source.id)) continue;
      assert.match(contents, new RegExp(source.id));
    }
  }
});

test('ignored local archive matches its catalog when present', () => {
  if (!fs.existsSync(sourceRoot)) return;

  assert.ok(fs.statSync(`${sourceRoot}/major`).isDirectory());
  assert.ok(fs.statSync(`${sourceRoot}/supplemental`).isDirectory());

  for (const sourceRecord of sources) {
    const pdfPath = `${sourceRoot}/${sourceRecord.relativePath}`;
    const sidecarPath = pdfPath.replace(/\.pdf$/, '.md');
    const sidecar = fs.readFileSync(sidecarPath, 'utf8');
    assert.match(sidecar, new RegExp(sourceRecord.id));

    const source = fs.readFileSync(pdfPath);
    const actualHash =
      crypto.createHash('sha256').update(source).digest('hex');

    assert.equal(actualHash, sourceRecord.hash, sourceRecord.id);
  }

  const ocrDerivative = fs.readFileSync(katouzianOcr.path);
  const ocrHash =
    crypto.createHash('sha256').update(ocrDerivative).digest('hex');
  assert.equal(ocrHash, katouzianOcr.hash, 'MAJ-S6 OCR derivative');

  for (const electronicSource of electronicSources) {
    const bytes = fs.readFileSync(electronicSource.path);
    const actualHash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert.equal(actualHash, electronicSource.hash, electronicSource.id);
  }
});
