function getIntDiv(n, d) {
  return Math.trunc(n / d);
}

function getDivMod(n, d) {
  return [getIntDiv(n, d), n % d];
}

export { getDivMod };
