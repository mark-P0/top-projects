function getRandomFloat({
  lower = 0,
  upper = 10,
  isUpperInclusive = false,
} = {}) {
  /*  Get a random "decimal" from `lower` up to `upper`
   *  Normally `upper`-exclusive, but can be changed with `isUpperInclusive` flag
   *
   *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   */

  const range = upper - lower;
  if (isUpperInclusive) range++;

  const result = Math.random() * range + lower;

  return result;
}

function getRandomInteger({
  lower = 0,
  upper = 10,
  isUpperInclusive = false,
} = {}) {
  /*  Get a random integer from `lower` up to `upper`
   *  Essentially the same as `getRandomFloat()`, but removes the "decimal" parts
   *
   *  `Math.floor()` or `Math.trunc()`?
   */

  const resultFloat = getRandomFloat({ lower, upper, isUpperInclusive });
  const result = Math.floor(resultFloat);

  return result;
}

function getRandomElement(array) {
  /*  Get a random member of `array`
   *
   *  Raise error when `array` is empty?
   */

  const elementIdx = getRandomInteger({ lower: 0, upper: array.length });
  const element = array[elementIdx];

  return element;
}

function removeAllChildren(parent) {
  /*  Removes all child nodes of the `parent` element
   *
   *  Several solutions here:
   *  https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
   */

  /*  Removes all children and replaces them with given argument array of elements
      Empty argument means children will be replaced by nothing
      Only removal step is performed, effectively clearing all children
   */
  parent.replaceChildren();
}

function* zip(...iterables) {
  /* TODO: Check if all are iterables */
  // ...

  /* Get minimum length of iterables */
  const iterablesLengths = iterables.map(({ length }) => length);
  const length = Math.min(...iterablesLengths);

  /* Get common-index values of iterables */
  for (let idx = 0; idx < length; idx++) {
    yield iterables.map((iterable) => iterable[idx]);
  }
}

export default { getRandomInteger, removeAllChildren };
