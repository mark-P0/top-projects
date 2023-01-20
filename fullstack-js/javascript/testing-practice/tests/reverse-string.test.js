/**
 * Anagrams
 */

import { describe, test, expect } from '@jest/globals';
import { reverseString } from '../src/reverse-string.js';

describe('Data types', () => {
  test('Accepts strings', () => {
    expect(() => reverseString('string')).not.toThrow();
  });

  test('Does not accept integers', () => {
    expect(() => reverseString(-123)).toThrow();
    expect(() => reverseString(0)).toThrow();
    expect(() => reverseString(123)).toThrow();
  });

  test('Does not accept floats', () => {
    expect(() => reverseString(-123.456)).toThrow();
    expect(() => reverseString(0.0)).toThrow();
    expect(() => reverseString(123.456)).toThrow();
  });

  test('Does not accept booleans', () => {
    expect(() => reverseString(true)).toThrow();
    expect(() => reverseString(false)).toThrow();
  });

  test('Does not accept nullish values', () => {
    expect(() => reverseString(null)).toThrow();
    expect(() => reverseString(undefined)).toThrow();
    expect(() => reverseString()).toThrow(); // Argument defaults to `undefined`
  });

  test('Does not accept arrays', () => {
    expect(() => reverseString([])).toThrow();
    expect(() => reverseString(['', 0, false, null])).toThrow();
  });

  test('Does not accept objects', () => {
    expect(() => reverseString({})).toThrow();
    expect(() => reverseString({ length: 0 })).toThrow();
    expect(() => reverseString({ null: undefined })).toThrow();
  });
});

describe('Operation on strings', () => {
  test('Reverses strings', () => {
    expect(reverseString('string')).toBe('gnirts');
    expect(reverseString('Hello, world!')).toBe('!dlrow ,olleH');
    expect(reverseString('To be or not to be')).toBe('eb ot ton ro eb oT');
  });

  test('Palindromes match', () => {
    expect(reverseString('racecar')).toBe('racecar'); // cspell:disable-line
    expect(reverseString('deified')).toBe('deified');
    expect(reverseString('madam')).toBe('madam');

    /* Palindromes with few characters  */
    expect(reverseString('nun')).toBe('nun');
    expect(reverseString('mom')).toBe('mom');
    expect(reverseString('pop')).toBe('pop');
  });

  test('Palindromes with inconsistent casing and/or special characters do not match', () => {
    expect(reverseString('race car')).toBe('rac ecar'); // cspell:disable-line
    expect(reverseString("Dammit, I'm mad")).toBe("dam m'I ,timmaD"); // cspell:disable-line
  });

  test('Empty strings match', () => {
    expect(reverseString('')).toBe('');
  });
});
