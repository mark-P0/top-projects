import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

const tttCell = (idx, content) => {
  let isSet = false;

  const attrs = { class: 'btn btn-light fs-1 ttt-cell', disabled: true };
  const __element__ = buildElementTree(E('button', attrs, content, null));

  /* Route each cell click as a game turn */
  __element__.addEventListener(
    'click',
    () => {
      const eventType = GameEvents.TURN_TRIGGER;
      const detail = { moveIdx: idx };
      const turnEvent = new CustomEvent(eventType, { detail });
      document.dispatchEvent(turnEvent);
    },
    { once: true }
  );

  const enable = () => {
    /* Once set, button cannot be enabled again */
    if (isSet) return;

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
      isSet = true;
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
  reset() {
    this.cells = undefined;
    this.__element__.replaceChildren();
  },

  enable() {
    for (const cell of this.cells) cell.enable();
  },
  disable() {
    for (const cell of this.cells) cell.disable();
  },
};

/* Ensure grid is at default (blank) state, as per the base HTML */
document.addEventListener(GameEvents.INIT_TRIGGER, () => {
  tttGrid.reset();
});

/* Enable grid cell buttons for game loop */
document.addEventListener(GameEvents.START, ({ detail: { gridItems } }) => {
  tttGrid.reset();
  tttGrid.initialize(gridItems);
  tttGrid.enable();
});

/* Consume details of provider event of each turn */
document.addEventListener(
  GameEvents.TURN_PROVIDER,
  ({ detail: { moveIdx, moveMark } }) => {
    tttGrid.cells[moveIdx].mark = moveMark;
    tttGrid.enable(); // Ensure grid is enabled (particularly when temporarily disabled for AI turn)
  }
);

/* Prevent user interaction on AI turn */
document.addEventListener(GameEvents.TURN_AI, () => {
  tttGrid.disable();
});

/* Disable grid cell buttons on game end */
document.addEventListener(GameEvents.END, () => {
  tttGrid.disable();
});
