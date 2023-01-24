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

describe('Behavior of `subtract` operation', () => {
  test('Subtracts 2 numbers', () => {
    expect(calculator.subtract(-1, -2)).toBe(1);
    expect(calculator.subtract(0, 0)).toBe(0);
    expect(calculator.subtract(1, 2)).toBe(-1);
    expect(calculator.subtract(1, -2)).toBe(3);
    expect(calculator.subtract(-1, 2)).toBe(-3);
    expect(calculator.subtract(-1.1, -2.2)).toBeCloseTo(1.1);
    expect(calculator.subtract(0.3, 0.4)).toBeCloseTo(-0.1);
    expect(calculator.subtract(1.5, 2.6)).toBeCloseTo(-1.1);
  });

  describe('Only accepts numbers', () => {
    test('Accepts integers', () => {
      expect(() => calculator.subtract(-123, -123)).not.toThrow();
      expect(() => calculator.subtract(0, 0)).not.toThrow();
      expect(() => calculator.subtract(123, 123)).not.toThrow();
      expect(() => calculator.subtract(123, -123)).not.toThrow();
      expect(() => calculator.subtract(-123, 123)).not.toThrow();
    });

    test('Accepts floats', () => {
      expect(() => calculator.subtract(-123.456, -123.456)).not.toThrow();
      expect(() => calculator.subtract(0.0, 0.0)).not.toThrow();
      expect(() => calculator.subtract(123.456, 123.456)).not.toThrow();
      expect(() => calculator.subtract(-123.456, 123.456)).not.toThrow();
      expect(() => calculator.subtract(123.456, -123.456)).not.toThrow();
    });

    test('Does not accept strings', () => {
      expect(() => calculator.subtract('string', 'another string')).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => calculator.subtract(true, false)).toThrow();
      expect(() => calculator.subtract(false, true)).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => calculator.subtract(null, undefined)).toThrow();
      expect(() => calculator.subtract(undefined, null)).toThrow();
      expect(() => calculator.subtract()).toThrow(); // Arguments defaults to `undefined`
    });

    test('Does not accept arrays', () => {
      expect(() => calculator.subtract([], [])).toThrow();
      expect(() => calculator.subtract(['', 0], [false, null])).toThrow();
    });

    test('Does not accept objects', () => {
      expect(() => calculator.subtract({})).toThrow();
      expect(() =>
        calculator.subtract({ length: 0 }, { null: undefined })
      ).toThrow();
    });
  });

  test('Must provide 2 numbers', () => {
    expect(() => calculator.subtract(-1)).toThrow();
    expect(() => calculator.subtract(0)).toThrow();
    expect(() => calculator.subtract(1)).toThrow();
    expect(() => calculator.subtract(-1.1)).toThrow();
    expect(() => calculator.subtract(0.2)).toThrow();
    expect(() => calculator.subtract(1.3)).toThrow();
  });

  test('Only considers 2 numbers', () => {
    expect(calculator.subtract(-1, -2, -3)).toBe(1);
    expect(calculator.subtract(0, 0, 0)).toBe(0);
    expect(calculator.subtract(1, 2, 3)).toBe(-1);
    expect(calculator.subtract(1, -2, 3)).toBe(3);
    expect(calculator.subtract(-1, 2, -3)).toBe(-3);
    expect(calculator.subtract(-1.1, -2.2, -3.3)).toBeCloseTo(1.1);
    expect(calculator.subtract(0.1, 0.2, 0.3)).toBeCloseTo(-0.1);
    expect(calculator.subtract(1.1, 2.2, 3.3)).toBeCloseTo(-1.1);
    expect(calculator.subtract(1.1, -2.2, 3.3)).toBeCloseTo(3.3);
    expect(calculator.subtract(-1.1, 2.2, -3.3)).toBeCloseTo(-3.3);
  });
});

describe('Behavior of `multiply` operation', () => {
  test('Multiplies 2 numbers', () => {
    expect(calculator.multiply(-1, -2)).toBe(2);
    expect(calculator.multiply(0, 0)).toBe(0);
    expect(calculator.multiply(1, 2)).toBe(2);
    expect(calculator.multiply(1, -2)).toBe(-2);
    expect(calculator.multiply(-1, 2)).toBe(-2);
    expect(calculator.multiply(-1.1, -2.2)).toBeCloseTo(2.42);
    expect(calculator.multiply(0.3, 0.4)).toBeCloseTo(0.12);
    expect(calculator.multiply(1.5, 2.6)).toBeCloseTo(3.9);
  });

  describe('Only accepts numbers', () => {
    test('Accepts integers', () => {
      expect(() => calculator.multiply(-123, -123)).not.toThrow();
      expect(() => calculator.multiply(0, 0)).not.toThrow();
      expect(() => calculator.multiply(123, 123)).not.toThrow();
      expect(() => calculator.multiply(123, -123)).not.toThrow();
      expect(() => calculator.multiply(-123, 123)).not.toThrow();
    });

    test('Accepts floats', () => {
      expect(() => calculator.multiply(-123.456, -123.456)).not.toThrow();
      expect(() => calculator.multiply(0.0, 0.0)).not.toThrow();
      expect(() => calculator.multiply(123.456, 123.456)).not.toThrow();
      expect(() => calculator.multiply(-123.456, 123.456)).not.toThrow();
      expect(() => calculator.multiply(123.456, -123.456)).not.toThrow();
    });

    test('Does not accept strings', () => {
      expect(() => calculator.multiply('string', 'another string')).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => calculator.multiply(true, false)).toThrow();
      expect(() => calculator.multiply(false, true)).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => calculator.multiply(null, undefined)).toThrow();
      expect(() => calculator.multiply(undefined, null)).toThrow();
      expect(() => calculator.multiply()).toThrow(); // Arguments defaults to `undefined`
    });

    test('Does not accept arrays', () => {
      expect(() => calculator.multiply([], [])).toThrow();
      expect(() => calculator.multiply(['', 0], [false, null])).toThrow();
    });

    test('Does not accept objects', () => {
      expect(() => calculator.multiply({})).toThrow();
      expect(() =>
        calculator.multiply({ length: 0 }, { null: undefined })
      ).toThrow();
    });
  });

  test('Must provide 2 numbers', () => {
    expect(() => calculator.multiply(-1)).toThrow();
    expect(() => calculator.multiply(0)).toThrow();
    expect(() => calculator.multiply(1)).toThrow();
    expect(() => calculator.multiply(-1.1)).toThrow();
    expect(() => calculator.multiply(0.2)).toThrow();
    expect(() => calculator.multiply(1.3)).toThrow();
  });

  test('Only considers 2 numbers', () => {
    expect(calculator.multiply(-1, -2, -3)).toBe(2);
    expect(calculator.multiply(0, 0, 0)).toBe(0);
    expect(calculator.multiply(1, 2, 3)).toBe(2);
    expect(calculator.multiply(1, -2, 3)).toBe(-2);
    expect(calculator.multiply(-1, 2, -3)).toBe(-2);
    expect(calculator.multiply(-1.1, -2.2, -3.3)).toBeCloseTo(2.42);
    expect(calculator.multiply(0.1, 0.2, 0.3)).toBeCloseTo(0.02);
    expect(calculator.multiply(1.1, 2.2, 3.3)).toBeCloseTo(2.42);
    expect(calculator.multiply(1.1, -2.2, 3.3)).toBeCloseTo(-2.42);
    expect(calculator.multiply(-1.1, 2.2, -3.3)).toBeCloseTo(-2.42);
  });
});
