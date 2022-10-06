import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

const tttCell = (idx, content) => {
  const attrs = { class: 'btn btn-light fs-1 ttt-cell', disabled: true };
  const __element__ = buildElementTree(E('button', attrs, content, null));

  /* Route each cell click as a game turn */
  const turnEvent = new CustomEvent(GameEvents.TURN_TRIGGER, {
    detail: { moveIdx: idx },
  });
  __element__.addEventListener(
    'click',
    () => {
      document.dispatchEvent(turnEvent);
    },
    { once: true }
  );

  const enable = () => {
    __element__.disabled = false;
  };
  const disable = () => {
    __element__.disabled = true;
  };

  return {
    __element__,
    enable,
    disable,

    get mark() {
      return __element__.textContent;
    },
    set mark(moveMark) {
      __element__.textContent = moveMark;
      __element__.disabled = true;
    },
  };
};

const tttGrid = {
  __element__: document.getElementById('ttt-grid'),
  cells: undefined, // Will be an array of `tttCell`

  initialize(items) {
    this.cells = items.map((content, idx) => {
      const cell = tttCell(idx, content);
      this.__element__.append(cell.__element__);
      return cell;
    });
  },

  enable() {
    for (const cell of this.cells) cell.enable();
  },
  disable() {
    for (const cell of this.cells) cell.disable();
  },
};

/* Add grid cell buttons on game initialization */
document.addEventListener(
  GameEvents.INIT,
  ({ detail: { gridItems } }) => {
    tttGrid.initialize(gridItems);
  },
  { once: true }
);

/* Enable grid cell buttons for game loop */
document.addEventListener(
  GameEvents.START,
  () => {
    tttGrid.enable();
  },
  { once: true }
);

/* Consume details of provider event of each turn */
document.addEventListener(
  GameEvents.TURN_PROVIDER,
  ({ detail: { moveIdx, moveMark } }) => {
    tttGrid.cells[moveIdx].mark = moveMark;
  }
);

/* Disable grid cell buttons on game end */
document.addEventListener(
  GameEvents.END,
  () => {
    tttGrid.disable();
  },
  { once: true }
);

export { tttGrid };
