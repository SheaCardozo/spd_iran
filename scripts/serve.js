const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const host = process.env.GAME_HOST || '127.0.0.1';
const port = Number(process.env.GAME_PORT || 8080);
const buildDirectory = path.resolve(__dirname, '..', 'out', 'html');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
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

const server = http.createServer((request, response) => {
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

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentType,
    });
    response.end(contents);
  });
});

server.listen(port, host, () => {
  console.log(`The Last Majles is running at http://${host}:${port}`);
  console.log('Press Ctrl+C to stop.');
});
