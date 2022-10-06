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

  const show = () => {
    __element__.classList.add('visible');
    __element__.classList.remove('invisible');
  };
  const hide = () => {
    __element__.classList.add('invisible');
    __element__.classList.remove('visible');
  };

  return {
    __element__,
    show,
    hide,

    mark: player.mark,
  };
};

const PlayerLabels = {
  __element__: document.getElementById('player-labels'),
  labels: undefined, // Will be an array of `PlayerLabel`

  initialize(players) {
    /* Create player labels via program */
    this.labels = players.map((player) => {
      const label = PlayerLabel(player);
      this.__element__.append(label.__element__);
      return label;
    });
  },

  findLabelViaMark(mark) {
    return this.labels.find((label) => label.mark === mark);
  },
  show(desiredLabel) {
    /*  Show only the `desiredLabel` out of all the labels
     *  Will hide all if `desiredLabel` is unknown
     */

    this.hideAll();
    this.labels.find((label) => label === desiredLabel)?.show();
  },

  showAll() {
    for (const label of this.labels) label.show();
  },
  hideAll() {
    for (const label of this.labels) label.hide();
  },
};

/* Initialize player labels on game loop */
document.addEventListener(
  GameEvents.START,
  ({ detail: { players, firstPlayer } }) => {
    PlayerLabels.initialize(players);
    PlayerLabels.show(PlayerLabels.findLabelViaMark(firstPlayer.mark));
  },
  { once: true }
);

/* Toggle player labels on every turn */
document.addEventListener(
  GameEvents.TURN_PROVIDER,
  ({ detail: { currentPlayer } }) => {
    PlayerLabels.show(PlayerLabels.findLabelViaMark(currentPlayer.mark));
  }
);

/* Show all player labels on game end */
document.addEventListener(
  GameEvents.END,
  () => {
    PlayerLabels.showAll();
  },
  { once: true }
);

export { PlayerLabels };
