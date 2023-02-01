export class ShipInvalidLengthError extends Error {
  name = 'ShipInvalidLengthError';
}
export class ShipTooSmallError extends Error {
  name = 'ShipTooSmallError';
}
export class ShipTooLargeError extends Error {
  name = 'ShipTooLargeError';
}
export class ShipHitBeyondLengthError extends Error {
  name = 'ShipHitBeyondLengthError';
}

export class Ship {
  static minLength = 2;
  static maxLength = 5;

  length: number;
  #hitCt = 0;

  /**
   * Ship sizes range from 2 to 5
   * (https://en.wikipedia.org/wiki/Battleship_(game))
   */
  constructor(length: number) {
    const { minLength, maxLength } = Ship;
    if (!Number.isInteger(length))
      throw new ShipInvalidLengthError(
        `Ship lengths must be integers; received ${length}`
      );
    if (length < minLength)
      throw new ShipTooSmallError(
        `Minimum ship size is ${minLength}; received ${length}`
      );
    if (length > maxLength)
      throw new ShipTooLargeError(
        `Maximum ship size is ${maxLength}; received ${length}`
      );

    this.length = length;
  }

  /**
   * Increases the number of _hits_ in a ship
   */
  hit() {
    if (this.#hitCt === this.length)
      throw new ShipHitBeyondLengthError('Ship has already been destroyed!');

    this.#hitCt++;
  }

  /**
   * Calculates whether ships have been sunk
   * based on their lengths and number of _hits_
   */
  isSunk() {
    return this.#hitCt === this.length;
  }
}
