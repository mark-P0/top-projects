import { describe, test, expect } from '@jest/globals';
import {
  Ship,
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat,
  ShipHitAfterSinkingError,
} from './ship';

describe('Instantiation', () => {
  test('Creating each ship type', () => {
    expect(() => new Carrier()).not.toThrow();
    expect(() => new Battleship()).not.toThrow();
    expect(() => new Destroyer()).not.toThrow();
    expect(() => new Submarine()).not.toThrow();
    expect(() => new PatrolBoat()).not.toThrow();
  });
  test('Derived from common class', () => {
    expect(new Carrier() instanceof Ship).toBe(true);
    expect(new Battleship() instanceof Ship).toBe(true);
    expect(new Destroyer() instanceof Ship).toBe(true);
    expect(new Submarine() instanceof Ship).toBe(true);
    expect(new PatrolBoat() instanceof Ship).toBe(true);
  });
});

describe('Instance Signature', () => {
  test('Expected properties', () => {
    const properties = ['length', 'isSunk', 'code'];
    for (const property of properties) {
      expect(new Carrier()[property]).not.toBe(undefined);
      expect(new Battleship()[property]).not.toBe(undefined);
      expect(new Destroyer()[property]).not.toBe(undefined);
      expect(new Submarine()[property]).not.toBe(undefined);
      expect(new PatrolBoat()[property]).not.toBe(undefined);
    }
  });
  test('Expected methods', () => {
    const methods = ['hit'];
    for (const method of methods) {
      expect(typeof new Carrier()[method]).toBe('function');
      expect(typeof new Battleship()[method]).toBe('function');
      expect(typeof new Destroyer()[method]).toBe('function');
      expect(typeof new Submarine()[method]).toBe('function');
      expect(typeof new PatrolBoat()[method]).toBe('function');
    }
  });
});

describe('Instance Properties', () => {
  describe('`.length`', () => {
    /**
     * The Hasbro version of _Battleship_ uses the following details
     * - https://en.wikipedia.org/wiki/Battleship_(game)#Description
     *
     * |   # | Name        | Size |
     * | --: | :---------- | :--: |
     * |   1 | Carrier     |  5   |
     * |   2 | Battleship  |  4   |
     * |   3 | Destroyer   |  3   |
     * |   4 | Submarine   |  3   |
     * |   5 | Patrol Boat |  2   |
     */
    test('Lengths conform to followed spec', () => {
      expect(new Carrier().length).toBe(5);
      expect(new Battleship().length).toBe(4);
      expect(new Destroyer().length).toBe(3);
      expect(new Submarine().length).toBe(3);
      expect(new PatrolBoat().length).toBe(2);
    });
  });
  describe('`.code`', () => {
    /**
     * Hasbro version of ships were used to have a convenient unique code
     */
    test("Coded using their type's first letter", () => {
      expect(new Carrier().code).toBe('C');
      expect(new Battleship().code).toBe('B');
      expect(new Destroyer().code).toBe('D');
      expect(new Submarine().code).toBe('S');
      expect(new PatrolBoat().code).toBe('P');
    });
  });
  describe('`.isSunk`', () => {
    test('Are not sunk BEFORE being fully hit', () => {
      const ships = [
        new Carrier(),
        new Battleship(),
        new Destroyer(),
        new Submarine(),
        new PatrolBoat(),
      ];
      for (const ship of ships) {
        for (let _ = 0; _ < ship.length; _++) {
          expect(ship.isSunk).toBe(false);
          ship.hit();
        }
      }
    });
    test('Are sunk AFTER being fully hit', () => {
      const ships = [
        new Carrier(),
        new Battleship(),
        new Destroyer(),
        new Submarine(),
        new PatrolBoat(),
      ];
      for (const ship of ships) {
        for (let _ = 0; _ < ship.length; _++) {
          ship.hit();
        }
        expect(ship.isSunk).toBe(true);
      }
    });
  });
});

describe('Instance Methods', () => {
  describe('`.hit()` ', () => {
    test("Can be hit up to ship's length", () => {
      const hitting = () => {
        const ships = [
          new Carrier(),
          new Battleship(),
          new Destroyer(),
          new Submarine(),
          new PatrolBoat(),
        ];
        for (const ship of ships) {
          for (let _ = 0; _ < ship.length; _++) {
            ship.hit();
          }
        }
      };
      expect(hitting).not.toThrow();
    });
    test("Can NOT be hit BEYOND ship's length", () => {
      const hitting = () => {
        const ships = [
          new Carrier(),
          new Battleship(),
          new Destroyer(),
          new Submarine(),
          new PatrolBoat(),
        ];
        for (const ship of ships) {
          for (let _ = 0; _ < ship.length + 1; _++) {
            ship.hit();
          }
        }
      };
      expect(hitting).toThrow(ShipHitAfterSinkingError);
    });
  });
});
