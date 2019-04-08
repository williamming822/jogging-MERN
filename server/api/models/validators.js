function isPositive(input) {
  if (Number(input) > 0) {
    return true;
  }
  return false;
}

module.exports = {
  isPositive,
};
