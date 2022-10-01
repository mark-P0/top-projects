import { E, buildElementTree } from './__dom__.js';
import { tttGrid } from './ttt-grid.js';

/* Uses an object created by the `PlayerFactory` */
const PlayerLabel = (player) => {
  const genericName = {
    regular: `Player ${player.num}`,
    kebab: `player-${player.num}`,
    mark: `player-${player.num}-mark`,
  };

  const attrs = {
    div: { class: 'input-group' },
    span: { class: 'input-group-text', id: genericName.mark },
    input: {
      type: 'text',
      class: 'form-control',
      placeholder: genericName.regular,
      'aria-label': genericName.regular,
      'aria-describedby': genericName.mark,
      value: player.name ?? '',
    },
  };

  const element = buildElementTree(
    E('div', attrs.div, null, [
      E('span', attrs.span, player.mark, null),
      E('input', attrs.input, null, null),
    ])
  );

  /* Store reference to JS object on element itself */
  element.JS_OBJECT = player;

  return element;
};

const PlayerLabels = {
  __element__: document.getElementById('player-labels'),
  visibleIdx: 0,

  initialize(players) {
    /* Create player labels via program */
    for (const player of players) {
      this.__element__.append(PlayerLabel(player));
    }

    /* Set label visibility */
    this.toggleVisibility();
  },

  toggleVisibility() {
    const { __element__, visibleIdx } = this;
    const { children } = __element__;
    this.visibleIdx = (visibleIdx + 1) % children.length;

    for (const label of children) {
      label.classList.add('invisible');
      label.classList.remove('visible');
    }
    children[visibleIdx].classList.add('visible');
    children[visibleIdx].classList.remove('invisible');
  },
};

export { PlayerLabels };
