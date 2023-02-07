import { NamedError } from '../utilities';

export class ShipHitAfterSinkingError extends NamedError {}

export type ShipLength = 5 | 4 | 3 | 2;
export type ShipCode = 'C' | 'B' | 'D' | 'S' | 'P';

export abstract class Ship {
  readonly length: ShipLength;
  readonly code: ShipCode;
  #hitCt = 0;

  /**
   * - Each player places five (5) ships on their board
   * (https://slate.com/culture/2012/05/how-to-win-at-battleship.html)
   * - Ship definitions are sourced from: https://en.wikipedia.org/wiki/Battleship_(game)#Description
   * - There are also five (5) definitions, so it may be assumed that:
   *    - Each player gets each of the five (5) ships
   *    - Each player must place all of the ship types on their boards
   * - Ship codes are each ship type's first character
   */
  constructor(length: ShipLength, code: ShipCode) {
    this.length = length;
    this.code = code;
  }

  /**
   * Increases the number of _hits_ in a ship.
   */
  hit() {
    if (this.isSunk) {
      throw new ShipHitAfterSinkingError('Ship has already been destroyed!');
    }

    this.#hitCt++;
  }

  /**
   * Calculates whether ships have been sunk
   * based on their lengths and number of _hits_.
   */
  get isSunk() {
    return this.#hitCt === this.length;
  }
}

export class Carrier extends Ship {
  constructor() {
    super(5, 'C');
  }
}

export class Battleship extends Ship {
  constructor() {
    super(4, 'B');
  }
}

export class Destroyer extends Ship {
  constructor() {
    super(3, 'D');
  }
}

export class Submarine extends Ship {
  constructor() {
    super(3, 'S');
  }
}

export class PatrolBoat extends Ship {
  constructor() {
    super(2, 'P');
  }
}
