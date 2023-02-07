import { NamedError } from '../utilities';
import { Ship } from './ship';

export class ShipOutOfBoundsError extends NamedError {}
export class ShipOverlapsAnotherError extends NamedError {}
export class BoardPointAlreadyHitError extends NamedError {}
export class BoardPointOutOfBoundsError extends NamedError {}

/* prettier-ignore */
export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;
export const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const size: typeof letters.length = digits.length; // Roundabout assertion of lengths...

type Letter = (typeof letters)[number];
type Digit = (typeof digits)[number];

export const orientations = ['horizontal', 'vertical'] as const;
type Orientation = (typeof orientations)[number];

/**
 * Represents an `(x,y)` ordered pair coordinate
 */
export type Point = [Letter, Digit];
type PointDigits = [Digit, Digit];

function* points(): Generator<Point> {
  for (const letter of letters) {
    for (const digit of digits) {
      yield [letter, digit];
    }
  }
}
export const allPoints = [...points()];

function pointToDigits([x, y]: Point): PointDigits {
  const xDigit = letters.findIndex((letter) => letter === x) as Digit;
  return [xDigit, y];
}

export class GameBoard {
  /**
   * The grids are typically square – usually 10×10 ...
   *
   * ― https://en.wikipedia.org/wiki/Battleship_(game)#Description
   */
  readonly size = size;

  /**
   * Internal board representation as a 2-dimensional array
   *
   * - `boolean` cells are hits
   *    - `true` means that a ship was hit
   *    - `false` means that the hit was a miss
   * - `Ship` cells are occupied by ships
   * - `null` cells are blanks
   */
  readonly #cells: (boolean | Ship | null)[][] = Array.from(
    Array(this.size),
    () => Array(this.size).fill(null)
  );
  readonly #ships: Ship[] = [];

  #expandShipOrigin(
    ship: Ship,
    origin: Point,
    orientation: Orientation
  ): PointDigits[] {
    const { length } = ship;
    const [x, y] = pointToDigits(origin);
    const axis = orientation === 'horizontal' ? 0 : 1;

    const expansion = Array.from({ length }, (_, offset) => {
      const pt: PointDigits = [x, y];
      pt[axis] += offset;

      /**
       * Check if ship is within the board, i.e.
       * 0 <= (x | y) < size
       */
      if (pt[axis] >= size) {
        throw new ShipOutOfBoundsError(
          `Ship ${ship} located at impossible location ${pt}.`
        );
      }

      /**
       * Check if ship does not overlap with another ship
       */
      const [newX, newY] = pt;
      const cell = this.#cells[newY][newX];
      const hasShipAlreadyInPlace = cell instanceof Ship;
      if (hasShipAlreadyInPlace) {
        throw new ShipOverlapsAnotherError(
          `Ship ${ship} will be placed at ${pt} where ${cell} already exists.`
        );
      }

      return pt;
    });

    return expansion;
  }

  placeShip(ship: Ship, origin: Point, orientation: Orientation) {
    const shipPts = this.#expandShipOrigin(ship, origin, orientation);

    /**
     * Actually _placing_ the ship.
     *
     * Separate loop seems to be safer than performing this in the expansion loop,
     * as in case of errors the _placing_ will be incomplete, and the cleanup will be messy.
     */
    for (const [x, y] of shipPts) {
      this.#cells[y][x] = ship;
    }

    this.#ships.push(ship);
  }

  receiveAttack(pt: Point) {
    const [x, y] = pointToDigits(pt);
    const cell = this.#cells[y][x];

    if (typeof cell === 'boolean') {
      throw new BoardPointAlreadyHitError(
        `Board at point ${[x, y]} is already hit!`
      );
    } else if (cell instanceof Ship) {
      cell.hit();
      this.#cells[y][x] = true;
      return;
    } else {
      this.#cells[y][x] = false;
    }
  }

  get availablePoints() {
    const points = allPoints.filter((pt) => {
      const [x, y] = pointToDigits(pt);
      const cell = this.#cells[y][x];
      return !(typeof cell === 'boolean');
    });
    return points;
  }

  state({
    withShips,
    showMisses = false,
  }: {
    withShips: boolean;
    showMisses?: boolean;
  }) {
    const hit = 'x';
    const miss = 'o';
    const free = '_';
    const spacer = ' ';

    let string = '';

    for (const row of this.#cells) {
      for (const cell of row) {
        if (typeof cell === 'boolean') {
          string += cell ? hit : showMisses ? miss : spacer;
        } else if (cell instanceof Ship) {
          string += withShips ? cell.code : free;
        } else {
          string += free;
        }

        string += spacer;
      }

      string += '\n';
    }

    return string;
  }
}
