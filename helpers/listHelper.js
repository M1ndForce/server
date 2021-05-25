module.exports = (arr) => {
  return arr.sort((a, b) => (b.count > a.count ? 1 : -1));
};
