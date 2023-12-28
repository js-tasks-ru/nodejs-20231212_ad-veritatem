/* eslint-disable no-trailing-spaces */
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
    case 'GET':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Nested path is not allowed');
        return;
      }

      const stream = fs.createReadStream(filepath);
      
      stream.pipe(res);
      req.on('abort', () => req.destroy());
      stream.on('error', () => {
        res.statusCode = 404;
        res.end('No such file');
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
