import { describe, test, expect } from '@jest/globals';
import { analyzeArray } from '../src/analyze-array.js';
import { isNumber } from '../src/utilities.js';

describe('Data types', () => {
  describe('Data type of argument', () => {
    test('Accepts arrays', () => {
      expect(() => analyzeArray([0, 1, 2])).not.toThrow();
    });

    test('Does not accept strings', () => {
      expect(() => analyzeArray('string')).toThrow();
    });

    test('Does not accept integers', () => {
      expect(() => analyzeArray(-123)).toThrow();
      expect(() => analyzeArray(0)).toThrow();
      expect(() => analyzeArray(123)).toThrow();
    });

    test('Does not accept floats', () => {
      expect(() => analyzeArray(-123.456)).toThrow();
      expect(() => analyzeArray(0.1)).toThrow();
      expect(() => analyzeArray(123.456)).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => analyzeArray(true)).toThrow();
      expect(() => analyzeArray(false)).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => analyzeArray(null)).toThrow();
      expect(() => analyzeArray(undefined)).toThrow();
      expect(() => analyzeArray()).toThrow(); // Argument defaults to `undefined`
    });

    test('Does not accept objects', () => {
      expect(() => analyzeArray({})).toThrow();
      expect(() => analyzeArray({ length: 0 })).toThrow();
      expect(() => analyzeArray({ null: undefined })).toThrow();
    });
  });

  describe("Data type of argument's elements", () => {
    test('Accepts integers', () => {
      expect(() => analyzeArray([-123])).not.toThrow();
      expect(() => analyzeArray([0])).not.toThrow();
      expect(() => analyzeArray([123])).not.toThrow();
    });

    test('Accepts floats', () => {
      expect(() => analyzeArray([-123.456])).not.toThrow();
      expect(() => analyzeArray([0.1])).not.toThrow();
      expect(() => analyzeArray([123.456])).not.toThrow();
    });

    test('Does not accept strings', () => {
      expect(() => analyzeArray(['string'])).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => analyzeArray([true])).toThrow();
      expect(() => analyzeArray([false])).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => analyzeArray([null])).toThrow();
      expect(() => analyzeArray([undefined])).toThrow();
    });

    test('Does not accept arrays', () => {
      expect(() => analyzeArray([[]])).toThrow();
    });

    test('Does not accept objects', () => {
      expect(() => analyzeArray([{}])).toThrow();
      expect(() => analyzeArray([{ length: 0 }])).toThrow();
      expect(() => analyzeArray([{ null: undefined }])).toThrow();
    });
  });

  describe('Shape of returned object', () => {
    test('Object [only] has expected keys', () => {
      const keys = ['average', 'min', 'max', 'length'];
      expect(Object.keys(analyzeArray([0, 1, 2]))).toStrictEqual(keys);
      expect(Object.keys(analyzeArray([0.1, 1.2, 2.3]))).toStrictEqual(keys);
    });

    test('Key `average` is a number', () => {
      expect(isNumber(analyzeArray([0, 1, 2]).average)).toBe(true);
      expect(isNumber(analyzeArray([0.1, 1.2, 2.3]).average)).toBe(true);
    });

    test('Key `min` is a number', () => {
      expect(isNumber(analyzeArray([0, 1, 2]).min)).toBe(true);
      expect(isNumber(analyzeArray([0.1, 1.2, 2.3]).min)).toBe(true);
    });

    test('Key `max` is a number', () => {
      expect(isNumber(analyzeArray([0, 1, 2]).max)).toBe(true);
      expect(isNumber(analyzeArray([0.1, 1.2, 2.3]).max)).toBe(true);
    });

    test('Key `length` is a number', () => {
      expect(isNumber(analyzeArray([0, 1, 2]).length)).toBe(true);
      expect(isNumber(analyzeArray([0.1, 1.2, 2.3]).length)).toBe(true);
    });
  });
});

describe('Special cases', () => {
  test('Empty arrays throw an error', () => {
    expect(() => analyzeArray([])).toThrow();
  });
});

describe('Operation on arrays', () => {
  test('Operates on arrays of numbers', () => {
    const { average, min, max, length } = analyzeArray([0, 1, 2]);
    expect(average).toBe(1);
    expect(min).toBe(0);
    expect(max).toBe(2);
    expect(length).toBe(3);
  });
  test('Operates on arrays of floats', () => {
    const { average, min, max, length } = analyzeArray([0.1, 1.2, 2.3]);
    expect(average).toBeCloseTo(1.2);
    expect(min).toBeCloseTo(0.1);
    expect(max).toBeCloseTo(2.3);
    expect(length).toBeCloseTo(3);
  });
});
