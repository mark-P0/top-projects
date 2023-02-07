import { randomChoice, removeArrayItem } from '../utilities';
import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from './ship';
import {
  GameBoard,
  Point,
  allPoints,
  orientations,
  ShipOverlapsAnotherError,
  ShipOutOfBoundsError,
} from './game-board';

export class Player {
  readonly #ownBoard: GameBoard;
  readonly #enemyBoard: GameBoard;
  readonly ships = [
    new Carrier(),
    new Battleship(),
    new Destroyer(),
    new Submarine(),
    new PatrolBoat(),
  ];

  /**
   * TODO: Allow players to place ships at will...
   */
  constructor(ownBoard: GameBoard, enemyBoard: GameBoard, isComputer = false) {
    this.#ownBoard = ownBoard;
    this.#enemyBoard = enemyBoard;

    if (isComputer) {
      this.#placeShipsRandomly();
    } else {
      throw new Error('This is not yet implemented!');
    }
  }

  #placeShipsRandomly() {
    let possiblePts = [...allPoints];
    let idx = 0;

    while (idx < this.ships.length) {
      const ship = this.ships[idx];
      const origin = randomChoice(possiblePts);
      const orientation = randomChoice(orientations);

      possiblePts = removeArrayItem(possiblePts, origin);

      try {
        this.#ownBoard.placeShip(ship, origin, orientation);
      } catch (error) {
        if (error instanceof ShipOverlapsAnotherError) continue;
        if (error instanceof ShipOutOfBoundsError) continue;
        throw error;
      }

      idx++;
    }
  }

  /**
   * Each player has two (2) board views: their own, and their opponent's.
   * However, their view of their opponent's board is limited to the locations
   * they have attacked, and whether those were hits or not.
   */
  showBoard(of: 'self' | 'opponent'): string {
    if (of === 'opponent') {
      return this.#enemyBoard.state({ withShips: false });
    }
    return this.#ownBoard.state({ withShips: true });
  }

  /**
   * Attack enemy at board point `pt`.
   * Do not specify this argument to perform an automatic random attack.
   */
  performAttack(pt?: Point) {
    pt ??= randomChoice(this.#enemyBoard.availablePoints);
    this.#enemyBoard.receiveAttack(pt);
  }

  get hasLost() {
    return this.ships.every((ship) => ship.isSunk);
  }
}
