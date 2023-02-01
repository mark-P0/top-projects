export class InvalidShipLengthError extends Error {
  name = 'InvalidShipLengthError';
}
export class ShipTooSmallError extends Error {
  name = 'ShipTooSmallError';
}
export class ShipTooLargeError extends Error {
  name = 'ShipTooLargeError';
}

export class Ship {
  static minLength = 2;
  static maxLength = 5;

  length: number;
  #hitCt: number;

  /**
   * Ship sizes range from 2 to 5
   * (https://en.wikipedia.org/wiki/Battleship_(game))
   */
  constructor(length: number) {
    const { minLength, maxLength } = Ship;
    if (!Number.isInteger(length))
      throw new InvalidShipLengthError(
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

  hit() {
    /*  */
  }

  isSunk() {
    /*  */
  }
}
