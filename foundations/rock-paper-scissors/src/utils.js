const utils = {
  getRandomInteger: function ({
    lower = 0,
    upper = 10,
    isUpperInclusive = false,
  } = {}) {
    const range = upper - lower;
    if (isUpperInclusive) range++;

    const result = Math.floor(Math.random() * range + lower);

    return result;
  },

  getRandomElement: function (array) {
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
