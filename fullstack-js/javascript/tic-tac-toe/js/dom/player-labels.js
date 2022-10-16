import { E, buildElementTree } from './__dom__.js';
import { GameEvents, PlayerEvents } from './__events__.js';

/* Uses an object created by the `PlayerFactory` */
const PlayerLabel = (player) => {
  let input = undefined;

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

    /* Modify input label for AI player */
    if (player.aiLevel !== null) {
      attrs.input.placeholder = player.name;
      attrs.input.value = '';
      attrs.input.disabled = true;
    }

    input = buildElementTree(E('input', attrs.input, null, null));
    input.addEventListener('change', () => {
      const detail = { newName: input.value, playerMark: player.mark };
      const event = new CustomEvent(PlayerEvents.NAME_CHANGE, { detail });
      document.dispatchEvent(event);
    });

    const element = buildElementTree(
      E('div', attrs.div, null, [
        E('span', attrs.span, player.mark, null),
        E(input, null, null, null),
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

  const highlightAsWinner = () => {
    input.value ||= input.placeholder;
    input.classList.toggle('text-bg-success');
  };

  return {
    __element__,
    show,
    hide,

    mark: player.mark,

    input,
    disable() {
      this.input.disabled = true;
    },
    highlightAsWinner,
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

  disable() {
    for (const label of this.labels) label.disable();
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
  ({ detail: { labelMarkToShow } }) => {
    PlayerLabels.show(PlayerLabels.findLabelViaMark(labelMarkToShow));
  }
);

/* Show all player labels on game end */
document.addEventListener(
  GameEvents.END,
  ({ detail: { winner } }) => {
    PlayerLabels.disable();
    PlayerLabels.showAll();

    if (winner) {
      PlayerLabels.findLabelViaMark(winner.mark).highlightAsWinner();
    }
  },
  { once: true }
);
