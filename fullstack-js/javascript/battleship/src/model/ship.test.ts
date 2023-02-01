import { describe, test, expect } from '@jest/globals';
import {
  Ship,
  ShipTooSmallError,
  ShipTooLargeError,
  ShipInvalidLengthError,
  ShipHitAfterSinkingError,
} from './ship';
import { range, randomInt } from '../utilities.js';

function createValidShip() {
  const { minLength, maxLength } = Ship;
  const length = randomInt(minLength, maxLength);
  return { ship: new Ship(length), length };
}

describe('Class Signature', () => {
  test('Has expected properties', () => {
    expect(Ship.minLength).toBe(2);
    expect(Ship.maxLength).toBe(5);
  });
});

describe('Instantiation', () => {
  test('Supported ship sizes', () => {
    const { minLength, maxLength } = Ship;
    for (const length of range(minLength, maxLength)) {
      expect(() => new Ship(length)).not.toThrow();
    }
  });
  test('Disallow floating ship sizes', () => {
    expect(() => new Ship(-1.1)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(0.2)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(1.3)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(2.4)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(3.5)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(4.6)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(5.7)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(6.8)).toThrow(ShipInvalidLengthError);
    expect(() => new Ship(100.9)).toThrow(ShipInvalidLengthError);
  });
  test('Disallow too-small ships', () => {
    expect(() => new Ship(1)).toThrow(ShipTooSmallError);
    expect(() => new Ship(0)).toThrow(ShipTooSmallError);
    expect(() => new Ship(-1)).toThrow(ShipTooSmallError);
  });
  test('Disallow too-large ships', () => {
    expect(() => new Ship(6)).toThrow(ShipTooLargeError);
    expect(() => new Ship(100)).toThrow(ShipTooLargeError);
    expect(() => new Ship(65535)).toThrow(ShipTooLargeError);
  });
});

describe('Instance Signature', () => {
  const { ship, length } = createValidShip();

  test('Has expected properties', () => {
    expect(ship.length).toBe(length); // Mirrors given length
    expect(typeof ship.isSunk).toBe('boolean');
  });
  test('Has expected methods', () => {
    expect(typeof ship.hit).toBe('function');
  });
});

describe('Instance Methods', () => {
  describe('`.hit()` ', () => {
    test('Ships can be hit up to their lengths', () => {
      const hitting = () => {
        const { ship } = createValidShip();
        for (let _ = 0; _ < ship.length; _++) {
          ship.hit();
        }
      };
      expect(hitting).not.toThrow();
    });
    test('Ships can NOT be hit BEYOND their lengths', () => {
      const hitting = () => {
        const { ship } = createValidShip();
        for (let _ = 0; _ < ship.length + 1; _++) {
          ship.hit();
        }
      };
      expect(hitting).toThrow(ShipHitAfterSinkingError);
    });
  });

  describe('`.isSunk()` ', () => {
    test('Ships are not sunk BEFORE being fully hit', () => {
      const { ship } = createValidShip();
      for (let _ = 0; _ < ship.length; _++) {
        expect(ship.isSunk).toBe(false);
        ship.hit();
      }
    });
    test('Ships are sunk AFTER being fully hit', () => {
      const { ship } = createValidShip();
      for (let _ = 0; _ < ship.length; _++) {
        ship.hit();
      }
      expect(ship.isSunk).toBe(true);
    });
  });
});
