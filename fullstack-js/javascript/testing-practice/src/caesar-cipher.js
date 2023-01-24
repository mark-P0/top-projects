import { isString, modulo } from './utilities.js';

const letters = 'abcdefghijklmnopqrstuvwxyz';

/** @type {(char: string, shifts: number) => string} */
function shiftCharacter(char, shifts) {
  const lower = char.toLowerCase();

  let idx = letters.indexOf(lower);

  /**
   * `.indexOf()` returns `-1` if character is not found.
   * If so, it would mean that `char` is not a letter, and thus must be returned as is.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
   */
  if (idx === -1) return char;

  idx += shifts; // Shift by specified amount
  idx = modulo(idx, letters.length); // Loop around accordingly

  if (char === lower) return letters[idx];
  return letters[idx].toUpperCase();
}

/** @type {(str: string, shifts: number) => string} */
export function caesarCipher(str, shifts) {
  if (!isString(str)) throw new Error('Given value is not a string!');
  if (!Number.isInteger(shifts))
    throw new Error('Given factor is not a number!');

  return str
    .split('')
    .map((char) => shiftCharacter(char, shifts))
    .join('');
}
