import { getDivMod } from '../utils.js';
import { PlayerFactory } from './player.js';

const Game = (() => {
  /* Holder for private variables; really unnecessary, but arguably makes code more clean */
  const __ = {};

  const marks = {
    X: '❌',
    O: '⭕',
    _: '', // Unmarked cell
  };
  __.gridSize = 3;
  const grid = Array.from({ length: __.gridSize }, () =>
    Array(__.gridSize).fill(marks._)
  );

  /* Player-related code */
  const players = Object.values(marks)
    .slice(0, -1)
    .map((mark) => PlayerFactory.create(null, mark));
  __.currentPlayerIdx = 0;
  const makeMove = (x, y) => {
    const { mark } = players[__.currentPlayerIdx];
    grid[y][x] = mark;

    __.currentPlayerIdx = (__.currentPlayerIdx + 1) % players.length;

    return mark;
  };
  const transformIndexToCoords = (idx) => {
    return getDivMod(idx, __.gridSize);
  };

  return {
    marks,
    grid,

    players,
    get currentPlayer() {
      return players[__.currentPlayerIdx];
    },
    makeMove,
    transformIndexToCoords,
  };
})();

export { Game };
