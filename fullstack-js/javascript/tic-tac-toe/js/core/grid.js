import { getDivMod, transpose, getDiagonals } from '../utils.js';
import Marks from './marks.js';

const GRID_SIZE = 3;
const items = Array.from({ length: GRID_SIZE }, () =>
  Array(GRID_SIZE).fill(Marks._)
);

const markCell = (coords, mark) => {
  const [x, y] = coords;
  items[y][x] = mark;
};

const transformIndexToCoords = (idx) => {
  return getDivMod(idx, GRID_SIZE);
};

const Grid = {
  size: GRID_SIZE,

  get rows() {
    return items;
  },
  get columns() {
    return transpose(items);
  },
  get diagonals() {
    return getDiagonals(items);
  },
  get axes() {
    return [this.rows, this.columns, this.diagonals];
  },
  get items() {
    return items.flat();
  },

  get hasBlankCells() {
    return items.flat().some((cell) => cell === Marks._);
  },

  markCell,
  transformIndexToCoords,
};

export default Grid;
