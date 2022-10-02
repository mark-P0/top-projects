import { getChoices, getDivMod, transpose } from '../utils.js';
import { PlayerFactory } from './player.js';

const Marks = {
  X: '❌',
  O: '⭕',
  _: '', // Unmarked cell
};

const Grid = (() => {
  const size = 3;
  let grid = Array.from({ length: size }, () => Array(size).fill(Marks._));

  const markCell = (coords, mark) => {
    const [x, y] = coords;
    grid[y][x] = mark;
  };

  return {
    size,
    get rows() {
      return grid;
    },
    get columns() {
      return transpose(grid);
    },

    markCell,
  };
})();

const Game = (() => {
  /* Holder for private variables; really unnecessary, but arguably makes code more clean */
  const __ = {};
  const title = getChoices(Object.values(Marks).slice(0, -1), 3).join('');

  /* Player-related code */
  const players = Object.values(Marks)
    .slice(0, -1)
    .map((mark) => PlayerFactory.create(null, mark));
  __.currentPlayerIdx = 0;
  const makeMove = (x, y) => {
    const { mark } = players[__.currentPlayerIdx];
    Grid.markCell([x, y], mark);

    __.currentPlayerIdx = (__.currentPlayerIdx + 1) % players.length;

    return mark;
  };
  const transformIndexToCoords = (idx) => {
    return getDivMod(idx, Grid.size);
  };

  return {
    marks: Marks,
    get grid() {
      return Grid.rows;
    },
    title,

    players,
    get currentPlayer() {
      return players[__.currentPlayerIdx];
    },
    makeMove,
    transformIndexToCoords,
  };
})();

export { Game };
