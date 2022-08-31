const Utilities = {
  getRandomInt({ lower = 0, upper = 10 } = {}) {
    return this.getRandomFloat({ lower, upper, places: 0 });
  },

  getRandomFloat({ lower = 0, upper = 10, places = 2 } = {}) {
    const range = upper - lower;
    const initialResult = Math.random() * range + lower;
    return this.roundOff({ number: initialResult, places });
  },

  roundOff({ number, places = 2 } = {}) {
    const pvHelper = 10 ** places;
    return Math.round(number * pvHelper) / pvHelper;
  },
};
for (const _ in Utilities) Utilities[_] = Utilities[_].bind(Utilities);

export default Utilities;
