import { describe, test, expect } from '@jest/globals';
import { caesarCipher } from '../src/caesar-cipher.js';

describe('Data types', () => {
  describe('1st parameter can only accept strings', () => {
    test('Accepts strings', () => {
      expect(() => caesarCipher('string', 1)).not.toThrow();
    });

    test('Does not accept integers', () => {
      expect(() => caesarCipher(-123, 1)).toThrow();
      expect(() => caesarCipher(0, 1)).toThrow();
      expect(() => caesarCipher(123, 1)).toThrow();
    });

    test('Does not accept floats', () => {
      expect(() => caesarCipher(-123.456, 1)).toThrow();
      expect(() => caesarCipher(0.123, 1)).toThrow();
      expect(() => caesarCipher(123.456, 1)).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => caesarCipher(true, 1)).toThrow();
      expect(() => caesarCipher(false, 1)).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => caesarCipher(null, 1)).toThrow();
      expect(() => caesarCipher(undefined, 1)).toThrow();
      expect(() => caesarCipher()).toThrow(); // Argument defaults to `undefined`
    });

    test('Does not accept arrays', () => {
      expect(() => caesarCipher([], 1)).toThrow();
      expect(() => caesarCipher(['', 0, false, null], 1)).toThrow();
    });

    test('Does not accept objects', () => {
      expect(() => caesarCipher({}, 1)).toThrow();
      expect(() => caesarCipher({ length: 0 }, 1)).toThrow();
      expect(() => caesarCipher({ null: undefined }, 1)).toThrow();
    });
  });

  describe('2nd parameter can only accept integers', () => {
    test('Accepts integers', () => {
      expect(() => caesarCipher('', -123)).not.toThrow();
      expect(() => caesarCipher('', 0)).not.toThrow();
      expect(() => caesarCipher('', 123)).not.toThrow();
    });
    test('Does not accept floats', () => {
      expect(() => caesarCipher('', -123.456)).toThrow();
      expect(() => caesarCipher('', 0.456)).toThrow();
      expect(() => caesarCipher('', 123.456)).toThrow();
    });

    test('Does not accept strings', () => {
      expect(() => caesarCipher('', 'string')).toThrow();
    });

    test('Does not accept booleans', () => {
      expect(() => caesarCipher('', true)).toThrow();
      expect(() => caesarCipher('', false)).toThrow();
    });

    test('Does not accept nullish values', () => {
      expect(() => caesarCipher('', null)).toThrow();
      expect(() => caesarCipher('', undefined)).toThrow();
      expect(() => caesarCipher('')).toThrow(); // Argument defaults to `undefined`
    });

    test('Does not accept arrays', () => {
      expect(() => caesarCipher('', [])).toThrow();
      expect(() => caesarCipher('', ['', 0, false, null])).toThrow();
    });

    test('Does not accept objects', () => {
      expect(() => caesarCipher('', {})).toThrow();
      expect(() => caesarCipher('', { length: 0 })).toThrow();
      expect(() => caesarCipher('', { null: undefined })).toThrow();
    });
  });
});

describe('Implementation', () => {
  test('"No shifts" return string as is', () => {
    expect(caesarCipher('abcdefgh', 0)).toBe('abcdefgh');
  });

  test('Shifts strings forward', () => {
    expect(caesarCipher('abcdefgh', 1)).toBe('bcdefghi');
    expect(caesarCipher('abcdefgh', 8)).toBe('ijklmnop');
    expect(caesarCipher('abcdefgh', 16)).toBe('qrstuvwx');
  });

  test('Shifts strings backward', () => {
    expect(caesarCipher('stuvwxyz', -1)).toBe('rstuvwxy');
    expect(caesarCipher('stuvwxyz', -8)).toBe('klmnopqr');
    expect(caesarCipher('stuvwxyz', -16)).toBe('cdefghij');
  });

  test('Shifts wrap around', () => {
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    expect(caesarCipher(letters, 1)).toBe('bcdefghijklmnopqrstuvwxyza');
    expect(caesarCipher(letters, 16)).toBe('qrstuvwxyzabcdefghijklmnop');
    expect(caesarCipher(letters, 256)).toBe('wxyzabcdefghijklmnopqrstuv');
    expect(caesarCipher(letters, -1)).toBe('zabcdefghijklmnopqrstuvwxy');
    expect(caesarCipher(letters, -16)).toBe('klmnopqrstuvwxyzabcdefghij');
    expect(caesarCipher(letters, -256)).toBe('efghijklmnopqrstuvwxyzabcd');
  });

  test('Non-alphabet characters are retained', () => {
    expect(caesarCipher('~!@#$%^&*()_+', 1)).toBe('~!@#$%^&*()_+');
    expect(caesarCipher('~!@#$%^&*()_+', 16)).toBe('~!@#$%^&*()_+');
    expect(caesarCipher('~!@#$%^&*()_+', 256)).toBe('~!@#$%^&*()_+');
  });

  test('Character cases are maintained', () => {
    expect(caesarCipher('Hello, world!', 1)).toBe('Ifmmp, xpsme!');
    expect(caesarCipher('To be or not to be ― that is the question:', 16)).toBe(
      'Je ru eh dej je ru ― jxqj yi jxu gkuijyed:'
    );
    expect(
      caesarCipher('The Quick Brown Fox Jumps Over The Lazy Dog', 256)
    ).toBe('Pda Mqeyg Xnksj Bkt Fqilo Kran Pda Hwvu Zkc');
  });
});
