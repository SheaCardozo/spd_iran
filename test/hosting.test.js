const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectDirectory = path.resolve(__dirname, '..');

test('Sites artifact contains the game, primer, and Worker entrypoint', () => {
  const expectedFiles = [
    '.open-next/assets/index.html',
    '.open-next/assets/game.js',
    '.open-next/assets/timeline.html',
    '.open-next/worker.js',
    '.openai/hosting.json',
  ];

  for (const relativePath of expectedFiles) {
    assert.ok(
      fs.existsSync(path.join(projectDirectory, relativePath)),
      `missing ${relativePath}`,
    );
  }

  const hostingConfig = JSON.parse(
    fs.readFileSync(
      path.join(projectDirectory, '.openai', 'hosting.json'),
      'utf8',
    ),
  );
  assert.match(hostingConfig.project_id, /^appgprj_/);

  const worker = fs.readFileSync(
    path.join(projectDirectory, '.open-next', 'worker.js'),
    'utf8',
  );
  assert.match(worker, /env\.ASSETS\.fetch/);
  assert.match(worker, /\/index\.html/);
});
