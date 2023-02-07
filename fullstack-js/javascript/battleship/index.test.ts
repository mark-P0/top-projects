import { describe, test, expect } from '@jest/globals';
import { GameBoard } from './src/model/game-board';
import { Player } from './src/model/player';

/**
 * - Game is played between two (2) players
 * - Game essentially has two (2) boards
 * - Each player is assigned their own board
 * - Each player also essentially has a limited view of their enemy's board
 * - Players must place their ships on their boards
 *    - Nothing left behind?
 */
function setup() {
  const boards = [new GameBoard(), new GameBoard()];
  const players = [
    new Player(boards[0], boards[1], true),
    new Player(boards[1], boards[0], true),
  ];

  return players;
}

/**
 * - Alternate between players
 * - Players place their attacks on a limited view of their enemy's board
 * - The first player whose ships all sink loses
 */
function loop() {
  const [player1, player2] = setup();

  let turnNo = 1;
  while (!(player1.hasLost || player2.hasLost)) {
    const player = turnNo % 2 === 1 ? player1 : player2;
    player.performAttack();
    turnNo++;
  }

  console.log(turnNo);
  console.log(player1.showBoard('self'));
  console.log(player2.showBoard('self'));
}

describe('Game flow', () => {
  test('Setup', () => {
    expect(setup).not.toThrow();
  });
  test('Loop', () => {
    expect(loop).not.toThrow();
  });
});
