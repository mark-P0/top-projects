/**
 * https://stackoverflow.com/a/9436948/
 * @type {(str: string) => boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

/** @type {(num: number) => boolean} */
export function isNumber(num) {
  return Number.isFinite(num);
}

/**
 * `%` operation in JS is "remainder", and does not work for negative numbers.
 * For that, it must be "modulo", and this is MDN's endorsed implementation.
 * @type {(n: number, d: number) => number}
 */
export function modulo(n, d) {
  return ((n % d) + d) % d;
}
