const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.resolve(__dirname, "..");
const queuePath = path.join(root, "docs/research/OCR_QUEUE.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));

test("OCR queue has unique, actionable jobs", () => {
  assert.equal(queue.version, 1);
  assert.ok(queue.defaults.chunkPages > 0);
  assert.ok(queue.defaults.ocrJobs > 0);

  const ids = queue.jobs.map((job) => job.id);
  assert.equal(new Set(ids).size, ids.length, "OCR job IDs must be unique");

  for (const job of queue.jobs) {
    assert.ok(Number.isInteger(job.priority) && job.priority > 0, `${job.id}: priority`);
    assert.ok(
      ["pdf", "spread-pdf", "pdf-directory", "image-directories"].includes(job.kind),
      `${job.id}: supported kind`,
    );
    if (job.kind === "image-directories") {
      assert.ok(Array.isArray(job.inputs) && job.inputs.length > 0, `${job.id}: inputs`);
      for (const input of job.inputs) {
        assert.ok(input.startsWith("docs/research/sources/"), `${job.id}: local source path`);
      }
    } else {
      assert.ok(job.input.startsWith("docs/research/sources/"), `${job.id}: local source path`);
    }
    if (job.includePatterns) {
      assert.ok(job.kind === "pdf-directory", `${job.id}: include patterns require a PDF directory`);
      for (const pattern of job.includePatterns) assert.doesNotThrow(() => new RegExp(pattern));
    }
  }
});

test("OCR implementation preserves the local archive boundary", () => {
  const ignore = fs.readFileSync(path.join(root, ".gitignore"), "utf8");
  assert.match(ignore, /^\/\.tools\/$/m);
  assert.match(ignore, /^\/docs\/research\/sources\/$/m);

  const implementation = fs.readFileSync(path.join(root, "scripts/research-ocr.js"), "utf8");
  assert.doesNotMatch(implementation, /unlinkSync|rmSync|truncateSync/);
  assert.match(implementation, /-ocr\.pdf/);
  assert.match(implementation, /\.processing\.json/);
  assert.match(implementation, /normalizePageBoxes/);
  assert.match(implementation, /--max-chunks/);
  assert.match(implementation, /--max-images/);
  assert.match(implementation, /--max-files/);
  assert.match(implementation, /prepareImage/);
  assert.match(implementation, /function catalog/);
  assert.match(implementation, /function verify/);
  assert.match(implementation, /acceptedStatuses: \[0, 3\]/);

  const transcription = fs.readFileSync(
    path.join(root, "scripts/transcribe-qashqai.py"),
    "utf8",
  );
  assert.match(transcription, /language="fa"/);
  assert.match(transcription, /compute_type="int8"/);
  assert.match(transcription, /TRANSCRIPTION_DERIVATIVES\.json/);
  assert.match(transcription, /--max-new-parts/);
  assert.match(transcription, /discovery transcript; not quotation-ready/);
});

test("OCR derivative catalog includes the final high-value coverage wave", () => {
  const catalog = JSON.parse(
    fs.readFileSync(
      path.join(root, "docs/research/OCR_DERIVATIVES.json"),
      "utf8",
    ),
  );
  assert.equal(catalog.entries.length, 493);
  assert.equal(
    catalog.entries.reduce((pages, entry) => pages + entry.pages, 0),
    10632,
  );
  const completed = new Set(catalog.entries.map((entry) => entry.queueId));
  for (const id of [
    "SUP-080",
    "SUP-008",
    "SUP-009",
    "SUP-051",
    "SUP-052",
    "SUP-053",
    "SUP-076",
    "SUP-077",
  ]) {
    assert.ok(completed.has(id), `${id}: final coverage wave`);
  }
});

test("structured economic observations preserve shape and provenance", () => {
  const tableDirectory = path.join(root, "docs/research/economic_observations");
  const expectations = new Map([
    ["SUP-057-1951-12-iran-monthly.csv", { rows: 7, columns: 26, page: "63" }],
    ["SUP-057-1953-08-iran-annual.csv", { rows: 16, columns: 13, page: "100" }],
    ["SUP-057-1953-08-iran-monthly.csv", { rows: 7, columns: 26, page: "101" }],
    ["SUP-057-1954-12-iran-annual.csv", { rows: 16, columns: 14, page: "108" }],
    ["SUP-057-1954-12-iran-monthly.csv", { rows: 9, columns: 26, page: "109" }],
  ]);

  for (const [filename, expected] of expectations) {
    const lines = fs
      .readFileSync(path.join(tableDirectory, filename), "utf8")
      .trim()
      .split(/\r?\n/);
    const header = lines[0].split(",");
    assert.equal(lines.length - 1, expected.rows, `${filename}: observation rows`);
    assert.equal(header.length, expected.columns, `${filename}: header columns`);

    const sourceIndex = header.indexOf("source_id");
    const pageIndex = header.indexOf("printed_page");
    const verificationIndex = header.indexOf("verification");
    for (const line of lines.slice(1)) {
      const values = line.split(",");
      assert.equal(values.length, header.length, `${filename}: rectangular rows`);
      assert.equal(values[sourceIndex], "SUP-057", `${filename}: source`);
      assert.equal(values[pageIndex], expected.page, `${filename}: page locator`);
      assert.equal(values[verificationIndex], "image-checked", `${filename}: review`);
    }
  }
});

test("Qashqai transcription catalog preserves the discovery-only boundary", () => {
  const catalog = JSON.parse(
    fs.readFileSync(
      path.join(root, "docs/research/TRANSCRIPTION_DERIVATIVES.json"),
      "utf8",
    ),
  );
  assert.equal(catalog.version, 1);
  assert.equal(catalog.entries.length, 1);
  const entry = catalog.entries[0];
  assert.equal(entry.sourceId, "SUP-061");
  assert.equal(entry.tapes, 7);
  assert.ok(entry.durationSeconds > 6 * 60 * 60);
  assert.equal(entry.language, "fa");
  assert.match(entry.modelRevision, /^[0-9a-f]{40}$/);
  assert.match(entry.status, /not quotation-ready/);
  assert.match(entry.evidentiaryStatus, /audio verification required/);
  assert.match(entry.jsonSha256, /^[0-9a-f]{64}$/);
  assert.match(entry.textSha256, /^[0-9a-f]{64}$/);
});
