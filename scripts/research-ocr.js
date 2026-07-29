#!/usr/bin/env node

const {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} = require("node:fs");
const { basename, dirname, extname, join, relative, resolve } = require("node:path");
const { spawn, spawnSync } = require("node:child_process");
const { createHash } = require("node:crypto");

const root = resolve(__dirname, "..");
const manifestPath = join(root, "docs/research/OCR_QUEUE.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const localRoot = join(root, ".tools/ocr/root");
const venv = join(root, ".tools/ocr/venv");
const toolEnv = {
  ...process.env,
  PATH: [
    join(venv, "bin"),
    join(localRoot, "usr/bin"),
    process.env.PATH || "/usr/bin:/bin",
  ].join(":"),
  LD_LIBRARY_PATH: [
    join(localRoot, "usr/lib/x86_64-linux-gnu"),
    join(localRoot, "lib/x86_64-linux-gnu"),
    process.env.LD_LIBRARY_PATH || "",
  ].filter(Boolean).join(":"),
  TESSDATA_PREFIX: join(localRoot, "usr/share/tesseract-ocr/5/tessdata"),
  OMP_THREAD_LIMIT: "1",
};

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    env: toolEnv,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });
  const acceptedStatuses = options.acceptedStatuses || [0];
  if (!acceptedStatuses.includes(result.status)) {
    const detail = options.capture ? `\n${result.stderr || result.stdout || ""}` : "";
    throw new Error(`${command} exited ${result.status}${detail}`);
  }
  return options.capture ? `${result.stdout || ""}${result.stderr || ""}`.trim() : "";
}

function absolute(path) {
  return resolve(root, path);
}

function outputFor(input, suffix = "-ocr.pdf") {
  return input.slice(0, -extname(input).length) + suffix;
}

function workFor(input) {
  return join(dirname(input), ".ocr-work", basename(input, extname(input)));
}

function hasCompletedChunk(input) {
  const chunks = join(workFor(input), "chunks");
  return existsSync(chunks) &&
    readdirSync(chunks).some((name) => name.endsWith("-ocr.pdf"));
}

function pageCount(input) {
  return Number(run("qpdf", ["--show-npages", input], {
    capture: true,
    acceptedStatuses: [0, 3],
  }).split("\n")[0]);
}

function checksum(path) {
  const hash = createHash("sha256");
  hash.update(readFileSync(path));
  return hash.digest("hex");
}

function writeProcessingMetadata(job, carrier, input, output, sidecar, explicitInput = null) {
  writeFileSync(`${output}.processing.json`, `${JSON.stringify({
    sourceId: job.sourceId || job.id,
    original: explicitInput ? relative(root, carrier) : job.input,
    processingInput: relative(root, input),
    output: relative(root, output),
    pages: pageCount(input),
    languages: job.languages || manifest.defaults.languages,
    mode: job.mode,
    ocrEngine: run("tesseract", ["--version"], { capture: true }).split("\n")[0],
    ocrmyPdf: run(join(venv, "bin/ocrmypdf"), ["--version"], { capture: true }),
    sha256: checksum(output),
    textSha256: checksum(sidecar),
    completedAt: new Date().toISOString(),
  }, null, 2)}\n`);
}

function listPdfFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory() && entry.name !== ".ocr-work") return listPdfFiles(path);
      if (
        entry.isFile() &&
        extname(entry.name).toLowerCase() === ".pdf" &&
        !entry.name.endsWith("-ocr.pdf") &&
        !entry.name.endsWith("-split.pdf")
      ) return [path];
      return [];
    })
    .sort();
}

function listJobPdfFiles(job) {
  const files = listPdfFiles(absolute(job.input));
  if (!job.includePatterns?.length) return files;
  const patterns = job.includePatterns.map((pattern) => new RegExp(pattern));
  return files.filter((file) => patterns.some((pattern) => pattern.test(basename(file))));
}

function ocrArguments(job, input, output, sidecar) {
  const languages = job.languages || manifest.defaults.languages;
  const args = [
    "--language", languages,
    "--jobs", String(job.ocrJobs || manifest.defaults.ocrJobs),
    "--output-type", "pdf",
    "--optimize", "0",
    "--tagged-pdf-mode", "ignore",
    "--sidecar", sidecar,
    "--tesseract-timeout", "300",
  ];
  if (job.mode === "force") args.push("--force-ocr");
  if (job.mode === "redo") args.push("--redo-ocr");
  if (job.mode === "skip") args.push("--skip-text");
  if (job.pdfRenderer) args.push("--pdf-renderer", job.pdfRenderer);
  if (job.tesseractDownsampleAbove) {
    args.push(
      "--tesseract-downsample-large-images",
      "--tesseract-downsample-above",
      String(job.tesseractDownsampleAbove),
    );
  }
  args.push(input, output);
  return args;
}

function ensureSpread(job) {
  const input = absolute(job.input);
  const split = outputFor(input, "-split.pdf");
  if (!existsSync(split)) {
    console.log(`[${job.id}] splitting spreads ${job.spreadOrder || "right-left"}`);
    run(join(venv, "bin/python"), [
      join(root, "scripts/split-pdf-spreads.py"),
      input,
      split,
      "--order",
      job.spreadOrder || "right-left",
    ]);
  }
  return split;
}

function resolvePdfInput(job) {
  return job.kind === "spread-pdf" ? ensureSpread(job) : absolute(job.input);
}

function ensureNormalizedPageBoxes(job, input) {
  if (!job.normalizePageBoxes) return input;
  const normalized = outputFor(input, "-normalized.pdf");
  if (!existsSync(normalized)) {
    console.log(`[${job.id}] normalizing invalid optional page boxes`);
    run(join(venv, "bin/python"), [
      join(root, "scripts/normalize-pdf-boxes.py"),
      input,
      normalized,
    ]);
  }
  return normalized;
}

function processPdf(job, explicitInput = null) {
  const carrier = explicitInput || resolvePdfInput(job);
  const input = ensureNormalizedPageBoxes(job, carrier);
  const output = outputFor(carrier);
  const sidecar = outputFor(carrier, "-ocr.txt");
  if (existsSync(output) && existsSync(sidecar)) {
    console.log(`[${job.id}] complete: ${relative(root, output)}`);
    return;
  }

  const pages = pageCount(input);
  const chunkPages = job.chunkPages || manifest.defaults.chunkPages;
  const work = workFor(carrier);
  const chunks = join(work, "chunks");
  mkdirSync(chunks, { recursive: true });
  const completedPdfs = [];
  const completedText = [];
  let processedChunks = 0;

  for (let start = 1, part = 1; start <= pages; start += chunkPages, part += 1) {
    const end = Math.min(start + chunkPages - 1, pages);
    const label = String(part).padStart(4, "0");
    const chunkInput = join(chunks, `${label}-${start}-${end}.pdf`);
    const chunkOutput = join(chunks, `${label}-${start}-${end}-ocr.pdf`);
    const chunkText = join(chunks, `${label}-${start}-${end}-ocr.txt`);
    completedPdfs.push(chunkOutput);
    completedText.push(chunkText);

    if (existsSync(chunkOutput) && existsSync(chunkText)) {
      console.log(`[${job.id}] resume: pages ${start}-${end}`);
      continue;
    }
    if (job.maxChunks && processedChunks >= job.maxChunks) break;
    if (!existsSync(chunkInput)) {
      run("qpdf", [input, "--pages", ".", `${start}-${end}`, "--", chunkInput], {
        acceptedStatuses: [0, 3],
      });
    }
    console.log(`[${job.id}] OCR pages ${start}-${end} of ${pages}`);
    run(join(venv, "bin/ocrmypdf"), ocrArguments(job, chunkInput, chunkOutput, chunkText));
    processedChunks += 1;
  }

  if (!completedPdfs.every((path) => existsSync(path))) {
    console.log(`[${job.id}] checkpointed ${processedChunks} new chunk(s); source remains partial`);
    return;
  }

  console.log(`[${job.id}] merging ${completedPdfs.length} chunks`);
  run("qpdf", ["--empty", "--pages", ...completedPdfs, "--", output]);
  writeFileSync(
    sidecar,
    completedText.map((path, index) =>
      `\n\n===== OCR CHUNK ${index + 1} =====\n\n${readFileSync(path, "utf8")}`
    ).join(""),
  );
  writeProcessingMetadata(job, carrier, input, output, sidecar, explicitInput);
}

async function pool(items, concurrency, worker) {
  let next = 0;
  async function take() {
    while (next < items.length) {
      const index = next++;
      await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, take));
}

function spawnCommand(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd: root, env: toolEnv, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited ${code}`));
    });
  });
}

async function processImageDirectories(job) {
  let remainingBudget = job.maxImages || Number.POSITIVE_INFINITY;
  for (const rawDirectory of job.inputs) {
    const directory = absolute(rawDirectory);
    const parent = dirname(directory);
    const outputDirectory = join(parent, "ocr");
    const preparedDirectory = join(parent, ".ocr-work", "prepared");
    mkdirSync(outputDirectory, { recursive: true });
    const images = readdirSync(directory)
      .filter((name) => [".jpg", ".jpeg", ".png", ".tif", ".tiff"].includes(extname(name).toLowerCase()))
      .sort();
    const pending = images.filter((name) => {
      const outputBase = join(outputDirectory, basename(name, extname(name)));
      return !existsSync(`${outputBase}.txt`);
    });
    const batch = pending.slice(0, remainingBudget);
    console.log(
      `[${job.id}] ${basename(parent)}: ${images.length - pending.length}/${images.length} complete; ` +
      `${batch.length} selected`,
    );
    if (job.prepareImage) {
      for (const name of batch) {
        const source = join(directory, name);
        const prepared = join(preparedDirectory, `${basename(name, extname(name))}.jpg`);
        if (!existsSync(prepared)) {
          run(join(venv, "bin/python"), [
            join(root, "scripts/prepare-ocr-image.py"),
            source,
            prepared,
            "--max-height",
            String(job.prepareImage.maxHeight || 2600),
          ]);
        }
      }
    }
    await pool(batch, 6, async (name) => {
      const source = join(directory, name);
      const outputBase = join(outputDirectory, basename(name, extname(name)));
      let ocrInput = source;
      if (job.prepareImage) {
        ocrInput = join(preparedDirectory, `${basename(name, extname(name))}.jpg`);
      }
      await spawnCommand("tesseract", [
        ocrInput,
        outputBase,
        "-l",
        job.languages || "eng",
        "--psm",
        String(job.pageSegmentationMode || 6),
        "txt",
      ]);
    });
    remainingBudget -= batch.length;
    if (batch.length < pending.length) {
      console.log(`[${job.id}] checkpointed ${batch.length} new image page(s); collection remains partial`);
      return;
    }
    const combined = join(parent, `${basename(parent)}-ocr.txt`);
    writeFileSync(
      combined,
      images.map((name) => {
        const text = join(outputDirectory, `${basename(name, extname(name))}.txt`);
        return `\n\n===== ${name} =====\n\n${readFileSync(text, "utf8")}`;
      }).join(""),
    );
    writeFileSync(`${combined}.processing.json`, `${JSON.stringify({
      sourceId: job.sourceId || job.id,
      originalDirectory: relative(root, directory),
      processing: job.prepareImage || null,
      output: relative(root, combined),
      pages: images.length,
      languages: job.languages || "eng",
      ocrEngine: run("tesseract", ["--version"], { capture: true }).split("\n")[0],
      pageSegmentationMode: job.pageSegmentationMode || 6,
      sha256: checksum(combined),
      completedAt: new Date().toISOString(),
    }, null, 2)}\n`);
    if (remainingBudget === 0) return;
  }
}

function selectedJobs(args) {
  const idArg = args.find((arg) => arg.startsWith("--id="));
  const priorityArg = args.find((arg) => arg.startsWith("--priority="));
  const ids = idArg ? new Set(idArg.slice(5).split(",")) : null;
  const priority = priorityArg ? Number(priorityArg.slice(11)) : null;
  return manifest.jobs.filter((job) =>
    (!ids || ids.has(job.id) || ids.has(job.sourceId)) &&
    (priority === null || job.priority === priority)
  );
}

function doctor() {
  const checks = [
    ["tesseract", ["--version"]],
    ["qpdf", ["--version"]],
    ["gs", ["--version"]],
    [join(venv, "bin/ocrmypdf"), ["--version"]],
  ];
  for (const [command, args] of checks) {
    try {
      console.log(`${basename(command)}: ${run(command, args, { capture: true }).split("\n")[0]}`);
    } catch (error) {
      fail(`${basename(command)}: unavailable (${error.message})`);
    }
  }
  console.log(run("tesseract", ["--list-langs"], { capture: true }));
}

function status() {
  for (const job of manifest.jobs) {
    if (job.kind === "image-directories") {
      const counts = job.inputs.map((path) => {
        const dir = absolute(path);
        const total = existsSync(dir) ? readdirSync(dir).filter((name) => /\.(jpe?g|png|tiff?)$/i.test(name)).length : 0;
        const doneDir = join(dirname(dir), "ocr");
        const done = existsSync(doneDir) ? readdirSync(doneDir).filter((name) => name.endsWith(".txt")).length : 0;
        return `${done}/${total}`;
      });
      console.log(`${job.id.padEnd(20)} P${job.priority} images ${counts.join(", ")}`);
      continue;
    }
    if (job.kind === "pdf-directory") {
      const dir = absolute(job.input);
      const allFiles = existsSync(dir) ? listPdfFiles(dir) : [];
      const files = existsSync(dir) ? listJobPdfFiles(job) : [];
      const done = files.filter((file) => existsSync(outputFor(file)) && existsSync(outputFor(file, "-ocr.txt"))).length;
      const scope = files.length === allFiles.length ? "" : ` (${allFiles.length} total)`;
      console.log(`${job.id.padEnd(20)} P${job.priority} PDFs   ${done}/${files.length}${scope}`);
      continue;
    }
    const input = absolute(job.input);
    const prepared = job.kind === "spread-pdf" ? outputFor(input, "-split.pdf") : input;
    const state = existsSync(outputFor(prepared)) && existsSync(outputFor(prepared, "-ocr.txt"))
      ? "complete"
      : hasCompletedChunk(prepared)
        ? "partial"
        : existsSync(input) ? "queued" : "missing";
    console.log(`${job.id.padEnd(20)} P${job.priority} ${job.kind.padEnd(10)} ${state}`);
  }
}

function completedMetadata(job) {
  const metadataPaths = [];
  if (job.kind === "image-directories") {
    for (const rawDirectory of job.inputs) {
      const directory = absolute(rawDirectory);
      const parent = dirname(directory);
      const combined = join(parent, `${basename(parent)}-ocr.txt`);
      const metadata = `${combined}.processing.json`;
      if (existsSync(combined) && existsSync(metadata)) metadataPaths.push(metadata);
    }
    return metadataPaths;
  }
  if (job.kind === "pdf-directory") {
    for (const input of listJobPdfFiles(job)) {
      const output = outputFor(input);
      const sidecar = outputFor(input, "-ocr.txt");
      const metadata = `${output}.processing.json`;
      if (existsSync(output) && existsSync(sidecar) && existsSync(metadata)) {
        metadataPaths.push(metadata);
      }
    }
    return metadataPaths;
  }
  const input = absolute(job.input);
  const carrier = job.kind === "spread-pdf" ? outputFor(input, "-split.pdf") : input;
  const output = outputFor(carrier);
  const sidecar = outputFor(carrier, "-ocr.txt");
  const metadata = `${output}.processing.json`;
  if (existsSync(output) && existsSync(sidecar) && existsSync(metadata)) {
    metadataPaths.push(metadata);
  }
  return metadataPaths;
}

function catalog(jobs) {
  const entries = jobs.flatMap((job) =>
    completedMetadata(job).map((metadataPath) => ({
      queueId: job.id,
      metadata: relative(root, metadataPath),
      ...JSON.parse(readFileSync(metadataPath, "utf8")),
    }))
  ).sort((left, right) =>
    `${left.queueId}\0${left.output}`.localeCompare(`${right.queueId}\0${right.output}`)
  );
  const output = join(root, "docs/research/OCR_DERIVATIVES.json");
  writeFileSync(output, `${JSON.stringify({
    version: 1,
    generatedAt: new Date().toISOString(),
    entries,
  }, null, 2)}\n`);
  console.log(`Recorded ${entries.length} completed derivative(s) in ${relative(root, output)}`);
}

function verify(jobs) {
  let verified = 0;
  for (const job of jobs) {
    for (const metadataPath of completedMetadata(job)) {
      const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
      const output = absolute(metadata.output);
      if (job.kind === "image-directories") {
        if (checksum(output) !== metadata.sha256) {
          throw new Error(`${job.id}: text checksum mismatch for ${metadata.output}`);
        }
      } else {
        const sidecar = output.slice(0, -extname(output).length) + ".txt";
        run("qpdf", ["--check", output], { capture: true });
        if (pageCount(output) !== metadata.pages) {
          throw new Error(`${job.id}: page-count mismatch for ${metadata.output}`);
        }
        if (checksum(output) !== metadata.sha256) {
          throw new Error(`${job.id}: PDF checksum mismatch for ${metadata.output}`);
        }
        if (checksum(sidecar) !== metadata.textSha256) {
          throw new Error(`${job.id}: text checksum mismatch for ${relative(root, sidecar)}`);
        }
      }
      verified += 1;
    }
  }
  console.log(`Verified ${verified} completed derivative(s)`);
}

function benchmark(job) {
  if (!["pdf", "spread-pdf"].includes(job.kind) || !job.benchmarkPages) return;
  const carrier = resolvePdfInput(job);
  const input = ensureNormalizedPageBoxes(job, carrier);
  const work = join(workFor(carrier), "benchmark");
  mkdirSync(work, { recursive: true });
  const subset = join(work, `${job.benchmarkPages}.pdf`);
  const output = join(work, `${job.benchmarkPages}-${job.mode}-ocr.pdf`);
  const sidecar = join(work, `${job.benchmarkPages}-${job.mode}-ocr.txt`);
  if (!existsSync(subset)) {
    run("qpdf", [input, "--pages", ".", job.benchmarkPages, "--", subset], {
      acceptedStatuses: [0, 3],
    });
  }
  const started = Date.now();
  run(join(venv, "bin/ocrmypdf"), ocrArguments(job, subset, output, sidecar));
  const seconds = (Date.now() - started) / 1000;
  const [start, end] = job.benchmarkPages.split("-").map(Number);
  const pages = end - start + 1;
  const result = {
    id: job.id,
    pages,
    seconds,
    pagesPerMinute: Number(((pages / seconds) * 60).toFixed(2)),
    completedAt: new Date().toISOString(),
  };
  writeFileSync(join(work, "benchmark.json"), `${JSON.stringify(result, null, 2)}\n`);
  console.log(`${job.id}: ${pages} pages in ${seconds.toFixed(1)}s (${result.pagesPerMinute} pages/min)`);
}

async function main() {
  const [command = "status", ...args] = process.argv.slice(2);
  if (command === "doctor") return doctor();
  if (command === "status" || command === "list") return status();
  if (command === "worker") {
    const idArg = args.find((arg) => arg.startsWith("--id="));
    const inputArg = args.find((arg) => arg.startsWith("--input="));
    const maxChunksArg = args.find((arg) => arg.startsWith("--max-chunks="));
    const job = manifest.jobs.find((candidate) => candidate.id === idArg?.slice(5));
    if (!job || !inputArg) throw new Error("Worker requires a valid --id and --input.");
    if (maxChunksArg) job.maxChunks = Number(maxChunksArg.slice(13));
    return processPdf(job, inputArg.slice(8));
  }
  const jobs = selectedJobs(args);
  const maxChunksArg = args.find((arg) => arg.startsWith("--max-chunks="));
  const maxChunks = maxChunksArg ? Number(maxChunksArg.slice(13)) : null;
  const maxFilesArg = args.find((arg) => arg.startsWith("--max-files="));
  const maxFiles = maxFilesArg ? Number(maxFilesArg.slice(12)) : null;
  const maxImagesArg = args.find((arg) => arg.startsWith("--max-images="));
  const maxImages = maxImagesArg ? Number(maxImagesArg.slice(13)) : null;
  if (maxChunks !== null) {
    if (!Number.isInteger(maxChunks) || maxChunks < 1) {
      throw new Error("--max-chunks must be a positive integer.");
    }
    jobs.forEach((job) => {
      job.maxChunks = maxChunks;
    });
  }
  for (const [name, value] of [["--max-files", maxFiles], ["--max-images", maxImages]]) {
    if (value !== null && (!Number.isInteger(value) || value < 1)) {
      throw new Error(`${name} must be a positive integer.`);
    }
  }
  if (maxImages !== null) jobs.forEach((job) => { job.maxImages = maxImages; });
  if (!jobs.length) throw new Error("No queue jobs match the selection.");
  if (command === "catalog") return catalog(jobs);
  if (command === "verify") return verify(jobs);
  if (command === "metadata") {
    for (const job of jobs) {
      if (!["pdf", "spread-pdf"].includes(job.kind)) continue;
      const carrier = resolvePdfInput(job);
      const input = ensureNormalizedPageBoxes(job, carrier);
      const output = outputFor(carrier);
      const sidecar = outputFor(carrier, "-ocr.txt");
      if (existsSync(output) && existsSync(sidecar)) {
        writeProcessingMetadata(job, carrier, input, output, sidecar);
        console.log(`[${job.id}] refreshed processing metadata`);
      }
    }
    return;
  }
  if (command === "benchmark") {
    jobs.forEach(benchmark);
    return;
  }
  if (command !== "run") throw new Error(`Unknown command: ${command}`);

  for (const job of jobs) {
    if (job.kind === "image-directories") {
      await processImageDirectories(job);
    } else if (job.kind === "pdf-directory") {
      const files = listJobPdfFiles(job);
      const pending = files.filter((file) =>
        !(existsSync(outputFor(file)) && existsSync(outputFor(file, "-ocr.txt")))
      );
      const batch = maxFiles === null ? pending : pending.slice(0, maxFiles);
      console.log(`[${job.id}] ${files.length - pending.length}/${files.length} PDFs complete; ${batch.length} selected`);
      await pool(batch, job.fileConcurrency || manifest.defaults.fileConcurrency, async (file) =>
        spawnCommand(process.execPath, [
          __filename,
          "worker",
          `--id=${job.id}`,
          `--input=${file}`,
          ...(maxChunks === null ? [] : [`--max-chunks=${maxChunks}`]),
        ])
      );
    } else {
      processPdf(job);
    }
  }
}

main().catch((error) => fail(error.stack || error.message));
