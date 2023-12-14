function sum(a, b) {
  if ([a, b].some((val) => typeof val !== 'number')) {
    throw new TypeError;
  }

  return a + b;
}

module.exports = sum;
