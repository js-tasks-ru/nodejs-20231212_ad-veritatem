const stream = require('stream');
const os = require('os');
const { log } = require('console');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._remainder = '';
  }

  _transform(chunk, encoding, callback) {
    const lines = (this._remainder + chunk.toString()).split(os.EOL);
    this._remainder = lines.pop();

    for (const line of lines) {
      this.push(line);
    }

    callback();
  }

  _flush(callback) {
    if (this._remainder) {
      this.push(this._remainder);
    }

    callback();
  }
}

module.exports = LineSplitStream;
