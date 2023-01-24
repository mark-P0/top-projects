import { describe, test, expect } from '@jest/globals';
import { capitalize } from '../src/capitalize.js';

describe('Data types', () => {
  test('Accepts strings', () => {
    expect(() => capitalize('string')).not.toThrow();
  });

  test('Does not accept integers', () => {
    expect(() => capitalize(-123)).toThrow();
    expect(() => capitalize(0)).toThrow();
    expect(() => capitalize(123)).toThrow();
  });

  test('Does not accept floats', () => {
    expect(() => capitalize(-123.456)).toThrow();
    expect(() => capitalize(0.1)).toThrow();
    expect(() => capitalize(123.456)).toThrow();
  });

  test('Does not accept booleans', () => {
    expect(() => capitalize(true)).toThrow();
    expect(() => capitalize(false)).toThrow();
  });

  test('Does not accept nullish values', () => {
    expect(() => capitalize(null)).toThrow();
    expect(() => capitalize(undefined)).toThrow();
    expect(() => capitalize()).toThrow(); // Argument defaults to `undefined`
  });

  test('Does not accept arrays', () => {
    expect(() => capitalize([])).toThrow();
    expect(() => capitalize(['', 0, false, null])).toThrow();
  });

  test('Does not accept objects', () => {
    expect(() => capitalize({})).toThrow();
    expect(() => capitalize({ length: 0 })).toThrow();
    expect(() => capitalize({ null: undefined })).toThrow();
  });
});

describe('Operation on strings', () => {
  test('Capitalizes uncapitalized strings', () => {
    expect(capitalize('hello, world!')).toBe('Hello, world!');
    expect(capitalize('lorem ipsum')).toBe('Lorem ipsum');
    expect(capitalize('the quick brown fox jumps over the lazy dog')).toBe(
      'The quick brown fox jumps over the lazy dog'
    );
  });

  test('Already-capitalized strings are unchanged', () => {
    expect(capitalize('Hello, world!')).toBe('Hello, world!');
    expect(capitalize('Lorem ipsum')).toBe('Lorem ipsum');
    expect(capitalize('The quick brown fox jumps over the lazy dog')).toBe(
      'The quick brown fox jumps over the lazy dog'
    );
  });

  test('Numeric strings are unchanged', () => {
    expect(capitalize('123')).toBe('123');
    expect(capitalize('0')).toBe('0');
  });

  test('Strings led with symbols are unchanged', () => {
    expect(capitalize('~!@#$%^&*()_+')).toBe('~!@#$%^&*()_+');
    expect(capitalize('-123.456')).toBe('-123.456');
    expect(capitalize('~hello')).toBe('~hello');
  });

  test('Empty strings are unchanged', () => {
    expect(capitalize('')).toBe('');
  });

  test('Capitalizes single-character strings', () => {
    expect(capitalize('h')).toBe('H');
    expect(capitalize('X')).toBe('X');
  });

  test('Capitalizes 2-character strings', () => {
    expect(capitalize('hi')).toBe('Hi');
    expect(capitalize('Yo')).toBe('Yo');
  });
});
