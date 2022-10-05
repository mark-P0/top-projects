import { E, buildElementTree } from './__dom__.js';

const tttCell = (content) => {
  return buildElementTree(
    E('button', { class: 'btn btn-light fs-1', disabled: true }, content, null)
  );
};

const tttGrid = {
  __element__: document.getElementById('ttt-grid'),

  initialize(items) {
    for (const content of items) {
      this.__element__.append(tttCell(content));
    }
  },
};

export { tttGrid };
