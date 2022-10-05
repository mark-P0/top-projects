import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

const tttCell = (idx, content) => {
  const attrs = { class: 'btn btn-light fs-1 ttt-cell', disabled: true };
  const __element__ = buildElementTree(E('button', attrs, content, null));

  /* Route each cell click as a game turn */
  const turnEvent = new CustomEvent(GameEvents.TURN, {
    detail: {
      idx,
      callback(content) {
        __element__.textContent = content;
        __element__.disabled = true;
      },
    },
  });
  __element__.addEventListener(
    'click',
    () => {
      document.dispatchEvent(turnEvent);
    },
    { once: true }
  );

  return {
    __element__,
  };
};

const tttGrid = {
  __element__: document.getElementById('ttt-grid'),
  get cells() {
    return this.__element__.children;
  },

  initialize(items) {
    for (const [idx, content] of items.entries()) {
      this.__element__.append(tttCell(idx, content).__element__);
    }
  },

  enable() {
    for (const cell of this.cells) cell.disabled = false;
  },
  disable() {
    for (const cell of this.cells) cell.disabled = true;
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

/* Disable grid cell buttons on game end */
document.addEventListener(
  GameEvents.END,
  () => {
    tttGrid.disable();
  },
  { once: true }
);

export { tttGrid };
