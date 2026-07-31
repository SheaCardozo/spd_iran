const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const {buildTimeline} = require('./build-timeline');

const projectDirectory = path.resolve(__dirname, '..');
const dendryCli = path.join(
  projectDirectory,
  'node_modules',
  'dendrynexus',
  'lib',
  'cli',
  'main.js',
);
const compiledGame = path.join(projectDirectory, 'out', 'game.json');
const sourceManifest = path.join(
  projectDirectory,
  'out',
  '.dendry-source-files.json',
);

function dendrySourceFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return dendrySourceFiles(entryPath);
    if (!entry.isFile() || !entry.name.endsWith('.dry')) return [];
    return [path.relative(projectDirectory, entryPath)];
  });
}

const currentSourceFiles = dendrySourceFiles(
  path.join(projectDirectory, 'source'),
).sort();
let previousSourceFiles = null;
try {
  previousSourceFiles = JSON.parse(fs.readFileSync(sourceManifest, 'utf8'));
} catch (_error) {
  // A missing or invalid generated manifest requires one clean compilation.
}
const sourceWasDeleted =
  !Array.isArray(previousSourceFiles) ||
  previousSourceFiles.some((sourceFile) => !currentSourceFiles.includes(sourceFile));

// Dendry's incremental compiler notices changed and added sources but can
// retain a scene after its source file is deleted. Clean only in that case:
// unconditional clean compilation changes Dendry's generated function-string
// quoting and would make otherwise identical browser builds non-reproducible.
if (sourceWasDeleted && fs.existsSync(compiledGame)) fs.unlinkSync(compiledGame);

const build = spawnSync(process.execPath, [dendryCli, 'make-html'], {
  cwd: projectDirectory,
  stdio: 'inherit',
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
fs.mkdirSync(path.dirname(sourceManifest), {recursive: true});
fs.writeFileSync(
  sourceManifest,
  `${JSON.stringify(currentSourceFiles, null, 2)}\n`,
);

const assetDirectory = path.join(projectDirectory, 'assets');
const webDirectory = path.join(projectDirectory, 'web');
const outputDirectory = path.join(projectDirectory, 'out', 'html');

if (fs.existsSync(webDirectory)) {
  fs.cpSync(webDirectory, outputDirectory, {recursive: true});
  console.log(`Applied browser overlay to ${outputDirectory}`);
}

if (fs.existsSync(assetDirectory)) {
  fs.cpSync(assetDirectory, outputDirectory, {recursive: true});
  console.log(`Copied assets to ${outputDirectory}`);
}

buildTimeline();
