const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('node:fs');
const LimitSizeStream = require('./LimitSizeStream'); 

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
      const limit = 1024 * 1024;

      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end('Nested path is not allowed.');
        return;
      }

      if (fs.existsSync(filepath)) {
        res.statusCode = 409;
        res.end('File already exist.');
        return;
      }

      const writeFileStream = fs.createWriteStream(filepath, {flags: 'w'});
      const limitCheckStream = new LimitSizeStream({limit});

      req.pipe(limitCheckStream).pipe(writeFileStream);

      limitCheckStream.on('error', () => {
        res.statusCode = 413;
        res.end('File size limit exceeded');
        writeFileStream.destroy();
        fs.unlink(filepath, () => {});
      });

      writeFileStream.on('error', () => {
        res.statusCode = 500;
        fs.unlink(filepath, () => {});
        res.end('Internal server error.');
      });

      req.on('aborted', () => {
        writeFileStream.destroy();
        fs.unlink(filepath, () => {});
      });

      writeFileStream.on('finish', () => {
        res.statusCode = 201;
        res.end('Finished');
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
