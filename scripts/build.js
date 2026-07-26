const fs = require('node:fs');
const path = require('node:path');
const {spawnSync} = require('node:child_process');

const projectDirectory = path.resolve(__dirname, '..');
const dendryCli = path.join(
  projectDirectory,
  'node_modules',
  'dendrynexus',
  'lib',
  'cli',
  'main.js',
);

const build = spawnSync(process.execPath, [dendryCli, 'make-html'], {
  cwd: projectDirectory,
  stdio: 'inherit',
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const assetDirectory = path.join(projectDirectory, 'assets');
const outputDirectory = path.join(projectDirectory, 'out', 'html');

if (fs.existsSync(assetDirectory)) {
  fs.cpSync(assetDirectory, outputDirectory, {recursive: true});
  console.log(`Copied assets to ${outputDirectory}`);
}
