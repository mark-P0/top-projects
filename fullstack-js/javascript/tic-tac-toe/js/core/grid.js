import Utils from '../utils.js';
import Marks from './marks.js';

const Grid = (size) => {
  const items = Array(size ** 2).fill(Marks._);

  const markCell = (idx, mark) => {
    items[idx] = mark;
  };

  return {
    size,

    items,
    get rows() {
      return items.reduce(
        (acml, cell, idx) => {
          const [y, x] = Utils.getDivMod(idx, size);
          acml[y][x] = cell;
          return acml;
        },
        Array.from({ length: size }, () => Array(size))
      );
    },
    get columns() {
      return items.reduce(
        (acml, cell, idx) => {
          const [y, x] = Utils.getDivMod(idx, size);
          acml[x][y] = cell;
          return acml;
        },
        Array.from({ length: size }, () => Array(size))
      );
    },
    get diagonals() {
      const diags = Array.from({ length: 2 }, () => Array(size));
      const [sizeUp, sizeDn] = [size + 1, size - 1];

      for (let idx = 0; idx < size; idx++) {
        diags[0][idx] = items[sizeUp * idx];
        diags[1][idx] = items[sizeDn * idx + sizeDn];
      }

      return diags;
    },
    get axes() {
      return [this.rows, this.columns, this.diagonals];
    },

    get hasBlankCells() {
      return items.some((cell) => cell === Marks._);
    },
    get blankCellIdcs() {
      return items.reduce((acml, cell, idx) => {
        if (cell === Marks._) acml.push(idx);
        return acml;
      }, []);
    },

    markCell,
  };
};

export default Grid;
