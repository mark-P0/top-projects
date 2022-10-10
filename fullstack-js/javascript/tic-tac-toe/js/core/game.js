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

  get playable() {
    const { X, O } = this;
    return [X, O];
  },
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
  const MAX_PLAYER_CT = Marks.playable.length;
  const Mode = { PVP: 'game-mode-pvp', PVC: 'game-mode-pvc' };
  const AIDifficulty = {
    EASY: 'ai-difficulty-easy',
    DIFFICULT: 'ai-difficulty-difficult',
    IMPOSSIBLE: 'ai-difficulty-impossible',
  };

  /* Holder for private variables; really unnecessary, but arguably makes code more clean */
  const __ = {};
  const title = getChoices(Marks.playable, 3).join('');

  /* Player-related code */
  let players = undefined;
  __.currentPlayerIdx = 0;
  const makeMove = (x, y) => {
    const { mark } = players[__.currentPlayerIdx];
    Grid.markCell([x, y], mark);

    __.currentPlayerIdx = (__.currentPlayerIdx + 1) % players.length;

    return mark;
  };
  const init = (playerData) => {
    players = playerData.map(({ name, mark }) =>
      PlayerFactory.create(name, mark)
    );
  };

  return {
    MAX_PLAYER_CT,
    Mode,
    AIDifficulty,

    marks: Marks.playable,
    grid: Grid,
    title,

    get players() {
      return players;
    },
    get currentPlayer() {
      return players[__.currentPlayerIdx];
    },
    makeMove,
    init,

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
