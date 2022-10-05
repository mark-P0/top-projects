import {
  getChoices,
  getDivMod,
  transpose,
  getDiagonals,
  getSameItem,
} from '../utils.js';
import { PlayerFactory } from './player.js';

const Marks = {
  X: '❌',
  O: '⭕',
  _: '🔲', // Unmarked cell
};

const Grid = (() => {
  const size = 3;
  let grid = Array.from({ length: size }, () => Array(size).fill(Marks._));

  const markCell = (coords, mark) => {
    const [x, y] = coords;
    grid[y][x] = mark;
  };

  const transformIndexToCoords = (idx) => {
    return getDivMod(idx, size);
  };

  return {
    size,
    get rows() {
      return grid;
    },
    get columns() {
      return transpose(grid);
    },
    get diagonals() {
      return getDiagonals(grid);
    },
    get axes() {
      return [this.rows, this.columns, this.diagonals];
    },
    get items() {
      return grid.flat();
    },

    markCell,
    get hasBlankCells() {
      return grid.flat().some((cell) => cell === Marks._);
    },

    transformIndexToCoords,
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

  return {
    marks: Marks,
    grid: Grid,
    title,

    players,
    get currentPlayer() {
      return players[__.currentPlayerIdx];
    },
    makeMove,

    get hasEnded() {
      /* Game will end if someone already won, or if the grid has already been filled up */
      return this.hasWinner || !Grid.hasBlankCells;
    },
    get hasWinner() {
      /* Check all axes if any of them are already filled with the same item */
      for (const axis of Grid.axes) {
        for (const items of axis) {
          const winningMark = getSameItem(items);
          if (!winningMark || winningMark === Marks._) continue;

          __.winningMark = winningMark;
          return true;
        }
      }

      return false;
    },
    get winner() {
      if (!__.winningMark) return null;
      return players.find((player) => player.mark === __.winningMark);
    },
  };
})();

export { Game };
