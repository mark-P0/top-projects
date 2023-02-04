/**
 * Base error class that automatically
 * assigns error name as class name.
 *
 * https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
 */
export class NamedError extends Error {
  constructor(...args: ConstructorParameters<ErrorConstructor>) {
    super(...args);
    this.name = this.constructor.name;
  }
}

/**
 * Number range generator,
 * from `start` up to **(and including)** `stop`.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions
 */
export function* range(start = 0, stop = Infinity, step = 1) {
  for (let num = start; num <= stop; num += step) yield num;
}

/**
 * Random float between **(and including)** `a` and `b`.
 */
export function randomFloat(a = 0, b = 100) {
  const range = b - a;
  return a + range * Math.random();
}

/**
 * Random integer between **(and including)** `a` and `b`.
 */
export function randomInt(a = 0, b = 100) {
  return Math.round(randomFloat(a, b));
}
