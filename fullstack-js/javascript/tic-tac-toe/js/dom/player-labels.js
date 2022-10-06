import { E, buildElementTree } from './__dom__.js';
import { GameEvents } from './__events__.js';

/* Uses an object created by the `PlayerFactory` */
const PlayerLabel = (player) => {
  const __element__ = (() => {
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

    return element;
  })();

  return {
    __element__,
  };
};

const PlayerLabels = {
  __element__: document.getElementById('player-labels'),
  visibleIdx: 0,

  initialize(players) {
    /* Create player labels via program */
    for (const player of players) {
      this.__element__.append(PlayerLabel(player).__element__);
    }

    /* Set label visibility */
    this.toggleVisibility();
  },

  toggleVisibility() {
    const { __element__, visibleIdx } = this;
    const { children } = __element__;
    this.visibleIdx = (visibleIdx + 1) % children.length;

    this.hideAll();
    children[visibleIdx].classList.add('visible');
    children[visibleIdx].classList.remove('invisible');
  },

  showAll() {
    for (const label of this.__element__.children) {
      label.classList.remove('invisible');
      label.classList.add('visible');
    }
  },

  hideAll() {
    for (const label of this.__element__.children) {
      label.classList.add('invisible');
      label.classList.remove('visible');
    }
  },
};

/* Initialize player labels on game loop */
document.addEventListener(
  GameEvents.START,
  ({ detail: { players } }) => {
    PlayerLabels.initialize(players);
  },
  { once: true }
);

/* Toggle player labels on every turn */
document.addEventListener(GameEvents.TURN_PROVIDER, () => {
  PlayerLabels.toggleVisibility();
});

/* Show all player labels on game end */
document.addEventListener(
  GameEvents.END,
  () => {
    PlayerLabels.showAll();
  },
  { once: true }
);

export { PlayerLabels };
