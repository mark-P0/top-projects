import { isString } from './utilities.js';

/** @type {(str: string) => string} */
export function reverseString(str) {
  if (!isString(str)) throw new Error('Given value is not a string!');
  return str.split('').reverse().join('');
}
