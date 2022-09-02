const GameBoard = {
  /* "standard 8x8 chess board" */
  size: 8,

  print(
    knightLoc,
    moveLocs,
    /* prettier-ignore */
    options = {
      cellWidth:       3,
      emptyCell:       ' ',
      knightCharacter: 'X',
      moveCharacter:   '•',
      horizontalLines: '─',
      verticalLines:   '│',
      jointLines:      '├┼┤┬┴',
      cornerLines:     '┌┐└┘',
    }
  ) {
    /* prettier-ignore */
    if (!(
      Location.isValid(knightLoc)
      && (
        Array.isArray(moveLocs)
        && moveLocs.every(Location.isValid)
      )
    )) return ''

    const {
      cellWidth: width,
      emptyCell: emt,
      moveCharacter: mov,
      knightCharacter: knt,
      horizontalLines: hor,
      verticalLines: ver,
      jointLines: jnt,
      cornerLines: cor,
    } = options;

    /* Initialize square game board; size each cell appropriately */
    let board;
    board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(emt.repeat(width))
    );

    /* Place board marks */
    for (const move of moveLocs) {
      board[move[0]][move[1]] = `${emt}${mov}${emt}`;
    }
    board[knightLoc[0]][knightLoc[1]] = `${emt}${knt}${emt}`;

    /* Reverse board row order, as row 0 is on the bottom */
    board.reverse();

    /* Create horizontal lines according to cell width */
    const horLines = Array(this.size).fill(hor.repeat(width));

    board = board
      /* Space out each board cells */
      .map((row) => ver + row.join(ver) + ver)
      /* Add dividing lines between board rows */
      .join('\n' + jnt[0] + horLines.join(jnt[1]) + jnt[2] + '\n');

    /* Complete board by adding top and bottom lines */
    board = [
      cor[0] + horLines.join(jnt[3]) + cor[1],
      board,
      cor[2] + horLines.join(jnt[4]) + cor[3],
    ].join('\n');

    return board;
  },
};

const Location = {
  /* prettier-ignore */
  moveFactors: [
    [-1,  2], [ 1,  2], // Up
    [-2, -1], [-2,  1], // Left
    [-1, -2], [ 1, -2], // Down
    [ 2, -1], [ 2,  1], // Right
  ],

  getAllMoves(origin) {
    if (!this.isValid(origin)) return [];
    const [x, y] = origin;
    return this.moveFactors
      .map(([rowIdx, colIdx]) => [x + rowIdx, y + colIdx])
      .filter((moveLoc) => this.isValid(moveLoc));
  },

  isValid(loc) {
    /* prettier-ignore */
    if (!(
      /*  To be a valid location on the game board,
       *  `loc` must be a 2-element array [rowIdx, colIdx]
       *  each of which must be a 0-based index of the `GameBoard`'s
       *  rows and columns; that is, their maximums are `GameBoard.size - 1`
       */
      Array.isArray(loc)
      && loc.length === 2
      && loc.every((idx) => (
        Number.isInteger(idx)
        && 0 <= idx
        && idx < GameBoard.size
      ))
    )) return false;

    return true;
  },

  isEqual(loc1, loc2) {
    if (!(this.isValid(loc1) && this.isValid(loc2))) return false;

    return loc1[0] === loc2[0] && loc1[1] === loc2[1];
  },
};

class LocationNode {
  value = null;
  parent = null;
  #children = null;

  constructor(loc, parent = null) {
    if (!Location.isValid(loc)) throw `Invalid location: ${loc}`;
    if (!(parent instanceof LocationNode || parent === null))
      throw `Invalid previous move: ${parent}`;

    this.value = loc;
    this.parent = parent;
  }

  get children() {
    this.#children ??= Location.getAllMoves(this.value).map(
      (move) => new LocationNode(move, this)
    );

    return this.#children;
  }

  get path() {
    /* Recursive approach */
    // return this.#exhaustParents(this).reverse();

    /* Iterative approach */
    return Array.from(this).reverse();
  }

  #exhaustParents(node) {
    const { parent, value } = node;
    if (parent === null) return [value];
    return [value, ...this.#exhaustParents(parent)];
  }

  *[Symbol.iterator]() {
    let current = this;
    while (current !== null) {
      yield current.value;
      current = current.parent;
    }
  }
}

class MoveTree {
  root = null;

  constructor(origin) {
    this.root = new LocationNode(origin);
  }

  *#breadthFirstTraversal() {
    let queue = [this.root];
    let idx = 0;

    while (idx < queue.length) {
      const node = queue[idx];
      yield node;

      for (const move of node.children) {
        /* Skip if already visited */
        const isVisitedAlready = queue.some((node) =>
          Location.isEqual(node.value, move.value)
        );
        if (isVisitedAlready) continue;

        queue.push(move);
      }
      idx++;
    }
  }

  find(loc) {
    if (!Location.isValid(loc)) throw `Invalid location: ${loc}`;

    let result = null;

    /* Use shallow traversal to find shortest path as soon as possible */
    const traversal = this.#breadthFirstTraversal.bind(this);
    for (const locNode of traversal())
      if (Location.isEqual(locNode.value, loc)) {
        result = locNode;
        break;
      }

    return result;
  }
}

function getNumberGrammar(count, word) {
  return `${count} ${count > 1 ? `${word}s` : word}`;
}

/********************************
 ********************************
 ********************************
 ********************************/

function knightMoves(origin, destination, asMessage = false) {
  const tree = new MoveTree(origin);
  const path = tree.find(destination).path;
  if (!asMessage) return path;

  const movesGrammar = getNumberGrammar(path.length - 1, 'move');
  const message = [
    `=> You made it in ${movesGrammar}!  Here's your path:`,
    ...path.map((loc) => ' '.repeat(2) + JSON.stringify(loc)),
  ].join('\n');
  return message;
}

/********************************
 ********************************
 ********************************
 ********************************/

/* cspell:disable */
/* prettier-ignore */
Quokka: {
  console.log( // ==             [[0,0],[1,2]]
    knightMoves([0,0],[1,2], true))
  console.log( // ==       [[0,0],[1,2],[3,3]]
    knightMoves([0,0],[3,3], true))
  console.log( // ==       [[3,3],[1,2],[0,0]]
    knightMoves([3,3],[0,0], true))
  console.log( // == [[3,3],[4,5],[2,4],[4,3]]
    knightMoves([3,3],[4,3], true))
  console.log( // == [[3,3],[4,5],[2,4],[4,3]]
    knightMoves([3,3],[3,3], true))

  console.log(knightMoves([3,3],[4,3], true));

  let [from, to] = [
    // [0,0],[1,2]
    // [0,0],[3,3]
    // [3,3],[0,0]
    [3,3],[4,3]
  ]
  _ = knightMoves(from, to)
  _

  _ = GameBoard.print(from, _)
  _
}
