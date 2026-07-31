const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const CONTENT_TYPES = {
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

function resolveRequest(buildDirectory, requestUrl) {
  let rawPath;
  try {
    rawPath = decodeURIComponent(String(requestUrl).split(/[?#]/, 1)[0]);
  } catch (_error) {
    return null;
  }
  if (rawPath.split('/').includes('..')) return null;
  const pathname = new URL(requestUrl, 'http://127.0.0.1').pathname;
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

async function startStaticGameServer(options = {}) {
  const host = '127.0.0.1';
  const port = Number(options.port || 0);
  const buildDirectory = path.resolve(
    options.buildDirectory || path.join(__dirname, '..', '..', 'out', 'html'),
  );

  if (!fs.existsSync(path.join(buildDirectory, 'index.html'))) {
    throw new Error(
      `No browser build exists at ${buildDirectory}; run npm run build first.`,
    );
  }

  const server = http.createServer((request, response) => {
    const filePath = resolveRequest(buildDirectory, request.url);
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

      response.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Security-Policy': [
          "default-src 'self'",
          "img-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          // DendryNexus compiles scene expressions in the browser.
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "connect-src 'self'",
          "media-src 'self'",
        ].join('; '),
        'Content-Type':
          CONTENT_TYPES[path.extname(filePath).toLowerCase()] ||
          'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(contents);
    });
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, resolve);
  });

  const address = server.address();
  return {
    buildDirectory,
    origin: `http://${host}:${address.port}`,
    close: () => new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    }),
  };
}

module.exports = {
  resolveRequest,
  startStaticGameServer,
};
