const Utils = {
  getRandomFloat({ from = 0, to = 1 } = {}) {
    const range = to - from;
    return from + Math.random() * range;
  },

  getRandomInt({ from = 0, to = 100 } = {}) {
    return Math.floor(this.getRandomFloat({ from, to }));
  },

  getChoice(arr) {
    const choiceIdx = this.getRandomInt({ to: arr.length });
    return arr[choiceIdx];
  },

  getChoices(arr, n) {
    return Array.from({ length: n }, () => this.getChoice(arr));
  },

  getIntDiv(n, d) {
    return Math.trunc(n / d);
  },

  getDivMod(n, d) {
    return [this.getIntDiv(n, d), n % d];
  },

  transpose(arr) {
    const columnCt = Math.max(...arr.map((row) => row.length));

    const transposed = Array.from({ length: columnCt }, () => []);
    for (const row of arr) {
      for (let idx = 0; idx < columnCt; idx++) {
        transposed[idx].push(row[idx] ?? null);
      }
    }

    return transposed;
  },

  getDiagonals(arr) {
    const size = arr.length;
    if (!arr.every((row) => row.length === size))
      throw 'Given 2-dimensional array is not a square!';

    const diags = {
      forward: {
        items: Array(size),
        idx: 0,
        moveIdx() {
          this.idx++;
        },
      },
      backward: {
        items: Array(size),
        idx: -1,
        moveIdx() {
          this.idx--;
        },
      },
    };

    let rowIdx = 0;
    for (const row of arr) {
      for (const orientation of Object.values(diags)) {
        const { items, idx } = orientation;
        items[rowIdx] = row.at(idx);
        orientation.moveIdx();
      }
      rowIdx++;
    }
    return Object.values(diags).map((orientation) => orientation.items);
  },

  getSameItem(arr) {
    if (arr.every((item) => item === arr[0])) return arr[0];
    return null;
  },

  convertArrayColumnsToObjectRows(columns) {
    /*  Transform object of column arrays to array of object rows, e.g.
     *  {
     *    prop1: [a1, a2, a3],
     *    prop2: [b1, b2, b3],
     *    prop3: [c1, c2, c3],
     *  }
     *  to
     *  [
     *    {prop1: a1, prop2: b1, prop3: c1},
     *    {prop1: a2, prop2: b2, prop3: c2},
     *    {prop1: a3, prop2: b3, prop3: c3},
     *  ]
     */
    const ctMax = Math.max(
      ...Object.values(columns).map((values) => values.length)
    );
    const keys = Object.keys(columns);

    return Array.from({ length: ctMax }, (_, idx) =>
      keys.reduce((acml, key) => {
        acml[key] = columns[key][idx] ?? null;
        return acml;
      }, {})
    );
  },
};

/* Unnecessary if every utility call will be prepended by the object itself */
// for (const method in Utils) Utils[method] = Utils[method].bind(Utils);

export default Utils;
