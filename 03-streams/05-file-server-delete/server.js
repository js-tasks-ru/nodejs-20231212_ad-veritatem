const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('node:fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Nested path is not allowed.');
        return;
      }

      try {
        if (!fs.existsSync(filepath)) {
          res.statusCode = 404;
          res.end('File does not exist');
          return;
        } else {
          fs.unlink(filepath, () => {});
          res.statusCode = 200;
          res.end('File deleted');
          return;
        }
      } catch (error) {
        res.statusCode = 500;
        res.end('Internal server error.');
      }

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
