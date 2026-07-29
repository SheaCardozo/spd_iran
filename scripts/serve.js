const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const {spawn} = require('node:child_process');

const host = process.env.GAME_HOST || '127.0.0.1';
const port = Number(process.env.GAME_PORT || 8080);
const projectDirectory = path.resolve(__dirname, '..');
const buildDirectory = path.join(projectDirectory, 'out', 'html');
const buildScript = path.join(projectDirectory, 'scripts', 'build.js');
const liveReloadClients = new Set();
const watchers = [];
const watchTargets = [
  path.join(projectDirectory, 'source'),
  path.join(projectDirectory, 'web'),
  path.join(projectDirectory, 'assets'),
  path.join(projectDirectory, 'docs', 'research', 'TIMELINE_PRIMER.md'),
  path.join(projectDirectory, 'scripts', 'build.js'),
  path.join(projectDirectory, 'scripts', 'build-timeline.js'),
];

const liveReloadScript = `<script>
(() => {
  if (!window.EventSource) return;
  const updates = new EventSource('/__live_reload');
  updates.addEventListener('reload', () => window.location.reload());
})();
</script>`;

let rebuildTimer;
let buildInProgress = false;
let rebuildQueued = false;
let changedPath = '';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function resolveRequest(requestUrl) {
  const pathname = new URL(requestUrl, `http://${host}:${port}`).pathname;
  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.resolve(buildDirectory, `.${requestedPath}`);

  if (
    filePath !== buildDirectory &&
    !filePath.startsWith(`${buildDirectory}${path.sep}`)
  ) {
    return null;
  }

  return filePath;
}

function reloadBrowsers() {
  for (const response of liveReloadClients) {
    response.write('event: reload\ndata: ready\n\n');
  }
}

function runBuild() {
  if (buildInProgress) {
    rebuildQueued = true;
    return;
  }

  buildInProgress = true;
  console.log(`Rebuilding after ${changedPath || 'a source change'}...`);
  const build = spawn(process.execPath, [buildScript], {
    cwd: projectDirectory,
    stdio: 'inherit',
  });

  build.on('error', (error) => {
    buildInProgress = false;
    console.error(`Rebuild failed to start: ${error.message}`);
  });

  build.on('close', (code) => {
    buildInProgress = false;
    if (code === 0) {
      console.log('Build complete; reloading connected browsers.');
      reloadBrowsers();
    } else {
      console.error(`Build failed with exit code ${code}; browser not reloaded.`);
    }

    if (rebuildQueued) {
      rebuildQueued = false;
      scheduleBuild('changes received during the previous build');
    }
  });
}

function scheduleBuild(filename) {
  changedPath = filename || 'a source change';
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(runBuild, 150);
}

function watchBuildInputs() {
  for (const target of watchTargets) {
    if (!fs.existsSync(target)) continue;
    const recursive = fs.statSync(target).isDirectory();
    const watcher = fs.watch(target, {recursive}, (_event, filename) => {
      const displayName = filename
        ? path.relative(projectDirectory, path.join(target, filename.toString()))
        : path.relative(projectDirectory, target);
      scheduleBuild(displayName);
    });
    watcher.on('error', (error) => {
      console.error(`Watcher failed for ${target}: ${error.message}`);
    });
    watchers.push(watcher);
  }
}

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${host}:${port}`).pathname;
  if (pathname === '/__live_reload') {
    response.writeHead(200, {
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Content-Type': 'text/event-stream',
    });
    response.write('retry: 1000\n\n');
    liveReloadClients.add(response);
    request.on('close', () => liveReloadClients.delete(response));
    return;
  }

  const filePath = resolveRequest(request.url);

  if (!filePath) {
    response.writeHead(403, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end('Forbidden\n');
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      const status = error.code === 'ENOENT' ? 404 : 500;
      response.writeHead(status, {'Content-Type': 'text/plain; charset=utf-8'});
      response.end(status === 404 ? 'Not found\n' : 'Server error\n');
      return;
    }

    const contentType =
      contentTypes[path.extname(filePath).toLowerCase()] ||
      'application/octet-stream';
    const body = path.extname(filePath).toLowerCase() === '.html'
      ? Buffer.from(
        contents.toString('utf8').replace('</body>', `${liveReloadScript}</body>`),
      )
      : contents;

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentType,
    });
    response.end(body);
  });
});

server.listen(port, host, () => {
  console.log(`The Last Majles is running at http://${host}:${port}`);
  console.log('Watching game source, browser files, assets, and primer.');
  console.log('Press Ctrl+C to stop.');
  watchBuildInputs();
});

function closeServer() {
  clearTimeout(rebuildTimer);
  for (const watcher of watchers) watcher.close();
  for (const response of liveReloadClients) response.end();
  server.close(() => process.exit(0));
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
