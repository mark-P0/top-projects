const utils = {
  getRandomInteger: function ({
    lower = 0,
    upper = 10,
    isUpperInclusive = false,
  } = {}) {
    /*  Get a random integer from `lower` up to `upper`
     *  Normally `upper`-exclusive, but can be changed with `isUpperInclusive` flag
     *
     *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
     */

    const range = upper - lower;
    if (isUpperInclusive) range++;

    const result = Math.floor(Math.random() * range + lower);

    return result;
  },

  getRandomElement: function (array) {
    /*  Get a random member of `array`
     *
     *  Raise error when `array` is empty?
     */

    const elementIdx = this.getRandomInteger({ lower: 0, upper: array.length });
    const element = array[elementIdx];

    return element;
  },
};

/*  Bind function `this` references to the same object.
    Hackish. Alternatives?
 */
for (const method in utils) utils[method] = utils[method].bind(utils);

export default utils;
