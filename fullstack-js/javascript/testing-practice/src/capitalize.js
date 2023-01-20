import { isString } from './utilities.js';

/** @type {(str: string) => string} */
export function capitalize(str) {
  if (!isString(str)) throw new Error('Given value is not a string!');
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}
