function getRandomFloat({ from = 0, to = 1 } = {}) {
  const range = to - from;
  return from + Math.random() * range;
}

function getRandomInt({ from = 0, to = 100 } = {}) {
  return Math.floor(getRandomFloat({ from, to }));
}

function getChoice(arr) {
  const choiceIdx = getRandomInt({ to: arr.length });
  return arr[choiceIdx];
}

function getChoices(arr, n) {
  return Array.from({ length: n }, () => getChoice(arr));
}

function getIntDiv(n, d) {
  return Math.trunc(n / d);
}

function getDivMod(n, d) {
  return [getIntDiv(n, d), n % d];
}

export { getChoices, getDivMod };
