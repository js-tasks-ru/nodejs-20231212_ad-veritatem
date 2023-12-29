const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.encoding = options.encoding;
    this._byteCapacity = 0;
  }

  _transform(chunk, encoding, callback) {
    this._byteCapacity += chunk.byteLength;

    if (this._byteCapacity > this.limit) {
      console.log('inside');
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
