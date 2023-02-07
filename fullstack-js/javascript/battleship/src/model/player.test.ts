import { describe, test, expect } from '@jest/globals';
import { GameBoard } from './game-board';
import { Player } from './player';
import { Carrier, Battleship, Destroyer, Submarine, PatrolBoat } from './ship';

function createPlayer() {
  const boards = [new GameBoard(), new GameBoard()];
  return new Player(boards[0], boards[1], true);
}

describe('Instantiation', () => {
  test('Creating new player representations', () => {
    const boards = [new GameBoard(), new GameBoard()];

    /**
     * To be implemented...
     */
    const humanInstantiation = () => {
      new Player(boards[0], boards[1]);
    };
    expect(humanInstantiation).toThrow();

    const computerInstantiation = () => {
      new Player(boards[1], boards[0], true);
    };
    expect(computerInstantiation).not.toThrow();
  });
  test('Expected properties', () => {
    const player = createPlayer();

    expect(player.ships).not.toBe(undefined);
    expect(player.hasLost).not.toBe(undefined);
  });
  test('Expected methods', () => {
    const player = createPlayer();

    expect(typeof player.performAttack).toBe('function');
  });
});

describe('Instance Properties', () => {
  describe('`.ships`', () => {
    test('Every player has all ship types', () => {
      const player = createPlayer();
      expect(player.ships.length).toBe(5);

      const ctors = [Carrier, Battleship, Destroyer, Submarine, PatrolBoat];
      const ctorNames = ctors.map((cls) => cls.name);
      const shipCtors = player.ships.map((ship) => ship.constructor.name);
      expect(shipCtors).toStrictEqual(ctorNames);
    });
    test('Players have their own ships', () => {
      const players = [createPlayer(), createPlayer()];
      for (let idx = 0; idx < 5; idx++) {
        expect(players[0].ships[idx]).not.toBe(players[1].ships[idx]);
      }
    });
  });
  describe('`.hasLost`', () => {
    const player = createPlayer();

    test('Player does not lose after some attacks', () => {
      for (const ship of player.ships) {
        for (let _ = 0; _ < ship.length; _++) {
          expect(player.hasLost).toBe(false);
          ship.hit();
        }
      }
    });
    test('Player loses after all ships have been attacked', () => {
      expect(player.hasLost).toBe(true);
    });
  });
});

describe('Instance Methods', () => {
  describe('`.performAttack()`', () => {
    const boards = [new GameBoard(), new GameBoard()];
    const player = new Player(boards[0], boards[1], true);
    player.performAttack();
    expect(boards[1].availablePoints.length).toBe(10 ** 2 - 1);
  });
});
