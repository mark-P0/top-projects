import { describe, test, expect } from '@jest/globals';
import {
  Ship,
  ShipTooSmallError,
  ShipTooLargeError,
  InvalidShipLengthError,
} from './ship.js';
import { range, randomInt } from '../utilities.js';

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
    expect(() => new Ship(-1.1)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(0.2)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(1.3)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(2.4)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(3.5)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(4.6)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(5.7)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(6.8)).toThrow(InvalidShipLengthError);
    expect(() => new Ship(100.9)).toThrow(InvalidShipLengthError);
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
  const { minLength, maxLength } = Ship;
  const length = randomInt(minLength, maxLength);
  const ship = new Ship(length);

  test('Has expected properties', () => {
    expect(ship.length).toBe(length); // Mirrors given length
  });
  test('Has expected methods', () => {
    expect(typeof ship.hit).toBe('function');
    expect(typeof ship.isSunk).toBe('function');
  });
});
