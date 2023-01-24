import { describe, test, expect } from '@jest/globals';
import { calculator } from '../src/calculator.js';

describe('Existence of properties/methods', () => {
  test('Has arithmetic methods', () => {
    expect(typeof calculator.add).toBe('function');
    expect(typeof calculator.subtract).toBe('function');
    expect(typeof calculator.multiply).toBe('function');
    expect(typeof calculator.divide).toBe('function');
  });
});

describe('Behavior of `add` operation', () => {
  test('Adds 2 numbers', () => {
    expect(calculator.add(-1, -2)).toBe(-3);
    expect(calculator.add(0, 0)).toBe(0);
    expect(calculator.add(1, 2)).toBe(3);
    expect(calculator.add(1, -2)).toBe(-1);
    expect(calculator.add(-1, 2)).toBe(1);
    expect(calculator.add(-1.1, -2.2)).toBeCloseTo(-3.3);
    expect(calculator.add(0.3, 0.4)).toBeCloseTo(0.7);
    expect(calculator.add(1.5, 2.6)).toBeCloseTo(4.1);
  });

  describe('Only accepts numbers', () => {
    test('Accepts integers', () => {
      expect(() => calculator.add(-123, -123)).not.toThrow();
      expect(() => calculator.add(0, 0)).not.toThrow();
      expect(() => calculator.add(123, 123)).not.toThrow();
      expect(() => calculator.add(123, -123)).not.toThrow();
      expect(() => calculator.add(-123, 123)).not.toThrow();
    });

    test('Accepts floats', () => {
      expect(() => calculator.add(-123.456, -123.456)).not.toThrow();
      expect(() => calculator.add(0.0, 0.0)).not.toThrow();
      expect(() => calculator.add(123.456, 123.456)).not.toThrow();
      expect(() => calculator.add(-123.456, 123.456)).not.toThrow();
      expect(() => calculator.add(123.456, -123.456)).not.toThrow();
    });

    test('Does not accept strings', () => {
      expect(() => calculator.add('string', 'another string')).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => calculator.add(true, false)).toThrow();
      expect(() => calculator.add(false, true)).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => calculator.add(null, undefined)).toThrow();
      expect(() => calculator.add(undefined, null)).toThrow();
      expect(() => calculator.add()).toThrow(); // Arguments defaults to `undefined`
    });

    test('Does not accept arrays', () => {
      expect(() => calculator.add([], [])).toThrow();
      expect(() => calculator.add(['', 0], [false, null])).toThrow();
    });

    test('Does not accept objects', () => {
      expect(() => calculator.add({})).toThrow();
      expect(() =>
        calculator.add({ length: 0 }, { null: undefined })
      ).toThrow();
    });
  });

  test('Must provide 2 numbers', () => {
    expect(() => calculator.add(-1)).toThrow();
    expect(() => calculator.add(0)).toThrow();
    expect(() => calculator.add(1)).toThrow();
    expect(() => calculator.add(-1.1)).toThrow();
    expect(() => calculator.add(0.2)).toThrow();
    expect(() => calculator.add(1.3)).toThrow();
  });

  test('Only considers 2 numbers', () => {
    expect(calculator.add(-1, -2, -3)).toBe(-3);
    expect(calculator.add(0, 0, 0)).toBe(0);
    expect(calculator.add(1, 2, 3)).toBe(3);
    expect(calculator.add(1, -2, 3)).toBe(-1);
    expect(calculator.add(-1, 2, -3)).toBe(1);
    expect(calculator.add(-1.1, -2.2, -3.3)).toBeCloseTo(-3.3);
    expect(calculator.add(0.1, 0.2, 0.3)).toBeCloseTo(0.3);
    expect(calculator.add(1.1, 2.2, 3.3)).toBeCloseTo(3.3);
    expect(calculator.add(1.1, -2.2, 3.3)).toBeCloseTo(-1.1);
    expect(calculator.add(-1.1, 2.2, -3.3)).toBeCloseTo(1.1);
  });
});
