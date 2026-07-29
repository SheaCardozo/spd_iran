const fs = require('node:fs');
const path = require('node:path');

const projectDirectory = path.resolve(__dirname, '..');
const gameDirectory = path.join(projectDirectory, 'out', 'html');
const hostingDirectory = path.join(projectDirectory, '.open-next');
const assetDirectory = path.join(hostingDirectory, 'assets');
const hostingConfigPath = path.join(
  projectDirectory,
  '.openai',
  'hosting.json',
);

if (!fs.existsSync(path.join(gameDirectory, 'index.html'))) {
  throw new Error('Run npm run build before creating the hosting artifact.');
}

if (!fs.existsSync(hostingConfigPath)) {
  throw new Error('.openai/hosting.json is required for a Sites build.');
}

const hostingConfig = JSON.parse(fs.readFileSync(hostingConfigPath, 'utf8'));
if (
  typeof hostingConfig.project_id !== 'string' ||
  hostingConfig.project_id.length === 0
) {
  throw new Error('.openai/hosting.json must contain a Sites project_id.');
}

fs.rmSync(hostingDirectory, {force: true, recursive: true});
fs.mkdirSync(assetDirectory, {recursive: true});
fs.cpSync(gameDirectory, assetDirectory, {recursive: true});

const worker = `function assetRequest(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    const response = await env.ASSETS.fetch(assetRequest(request, pathname));

    if (response.status !== 404 || pathname.includes('.')) {
      return response;
    }

    return env.ASSETS.fetch(assetRequest(request, '/index.html'));
  },
};
`;

fs.writeFileSync(path.join(hostingDirectory, 'worker.js'), worker);
console.log(`Created Sites artifact in ${hostingDirectory}`);
