import { describe, test, expect } from '@jest/globals';
import {
  GameBoard,
  digits,
  letters,
  orientations,
  Point,
  allPoints,
  ShipOutOfBoundsError,
  ShipOverlapsAnotherError,
} from './game-board';
import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from './ship';
import { randomChoice } from '../utilities';

function newShips() {
  return [
    new Carrier(),
    new Battleship(),
    new Destroyer(),
    new Submarine(),
    new PatrolBoat(),
  ];
}

function* naiveSafePoints(): Generator<Point> {
  const largestShipSize = newShips().reduce((largestShip, ship) =>
    ship.length > largestShip.length ? ship : largestShip
  ).length;

  for (const letter of letters.slice(0, largestShipSize + 1)) {
    for (const digit of digits.slice(0, largestShipSize + 1)) {
      yield [letter, digit];
    }
  }
}
const allSafePoints = [...naiveSafePoints()];

describe('Instantiation', () => {
  test('Creating a game board', () => {
    expect(() => new GameBoard()).not.toThrow();
  });
  test('Expected properties', () => {
    const board = new GameBoard();
    expect(board.size).not.toBe(undefined);
    expect(board.availablePoints).not.toBe(undefined);
  });
  test('Expected methods', () => {
    const board = new GameBoard();
    expect(typeof board.placeShip).toBe('function');
    expect(typeof board.receiveAttack).toBe('function');
  });
});

describe('Instance Properties', () => {
  /**
   * The grids are typically square – usually 10×10
   *
   * ― https://en.wikipedia.org/wiki/Battleship_(game)#Description
   */
  const expectedSize = 10;

  describe('`.size`', () => {
    test('Game boards are sized 10x10', () => {
      expect(new GameBoard().size).toBe(expectedSize);
    });
  });
  describe('`.availablePoints`', () => {
    test('All board points are available initially', () => {
      const { availablePoints } = new GameBoard();
      expect(availablePoints.length).toBe(expectedSize ** 2);
    });
  });
});

describe('Instance Methods', () => {
  describe('`.placeShip()`', () => {
    /**
     * Some ships cannot be placed on some points at some orientations
     */
    test('On all points', () => {
      const fn = () => {
        for (const ship of newShips()) {
          for (const origin of allPoints) {
            for (const orientation of orientations) {
              const board = new GameBoard();
              board.placeShip(ship, origin, orientation);
              // console.log(board.state());
            }
          }
        }
      };
      expect(fn).toThrow(ShipOutOfBoundsError);
    });
    /**
     * Wide-net approach for ensuring largest ship can be placed at any orientation
     */
    test('On safe points (naive)', () => {
      const fn = () => {
        for (const ship of newShips()) {
          for (const origin of naiveSafePoints()) {
            for (const orientation of orientations) {
              const board = new GameBoard();
              board.placeShip(ship, origin, orientation);
              // console.log(board.state());
            }
          }
        }
      };
      expect(fn).not.toThrow();
    });
    test('On the same point', () => {
      const board = new GameBoard();
      const ship = randomChoice(newShips());
      const origin = randomChoice(allSafePoints);
      const orientation = randomChoice(orientations);

      const placing = () => {
        board.placeShip(ship, origin, orientation);
      };
      expect(placing).not.toThrow();
      expect(placing).toThrow(ShipOverlapsAnotherError);
    });
    test('Overlaps from the side', () => {
      let fn: () => void;

      fn = () => {
        const board = new GameBoard();
        board.placeShip(randomChoice(newShips()), ['A', 0], 'horizontal');
        board.placeShip(randomChoice(newShips()), ['B', 0], 'horizontal');
      };
      expect(fn).toThrow(ShipOverlapsAnotherError);

      fn = () => {
        const board = new GameBoard();
        board.placeShip(randomChoice(newShips()), ['A', 0], 'vertical');
        board.placeShip(randomChoice(newShips()), ['A', 1], 'vertical');
      };
      expect(fn).toThrow(ShipOverlapsAnotherError);
    });
  });

  describe('`.receiveAttack()`', () => {
    test('Attack all points', () => {
      const board = new GameBoard();

      const fn = () => {
        for (const point of allPoints) {
          board.receiveAttack(point);
        }
      };
      expect(fn).not.toThrow();
      expect(board.availablePoints.length === 0).toBe(true);
    });
  });
});
