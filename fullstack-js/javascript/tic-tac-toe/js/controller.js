import Utils from './utils.js';
import * as PlayerProperties from './core/player.js';
import Game, * as GameProperties from './core/game.js';
import { GameEvents, PlayerEvents } from './dom/__events__.js';
import './dom/popup.js';
import './dom/player-labels.js';
import './dom/ttt-grid.js';

let game = undefined;

/* Set randomized page title */
document.title = GameProperties.Title;

/* Outline game flow as events */
document.dispatchEvent(
  new CustomEvent(GameEvents.INIT_TRIGGER, {
    detail: {
      gameModes: GameProperties.Modes,
      playerMarks: GameProperties.PlayableMarks,
      aiDifficulties: GameProperties.AIDifficulties,
    },
  })
);
document.addEventListener(
  GameEvents.INIT_PROVIDER,
  ({ detail: { gameMode, playerData, aiDifficulty } }) => {
    game = Game(gameMode, playerData, aiDifficulty);

    const detail = {
      gridItems: game.grid.items,
      players: game.players,
      firstPlayer: game.currentPlayer,
    };
    const providerEvent = new CustomEvent(GameEvents.START, { detail });
    document.dispatchEvent(providerEvent);
  },
  { once: true }
);
document.addEventListener(
  PlayerEvents.NAME_CHANGE,
  ({ detail: { newName, playerMark } }) => {
    const player = game.players.find(({ mark }) => mark === playerMark);
    player.name = newName;
  }
);
document.addEventListener(
  GameEvents.TURN_TRIGGER,
  ({ detail: { moveIdx = null } = {} }) => {
    const { grid, currentPlayer, nextPlayer } = game;
    const move = currentPlayer.makeMove({
      grid,
      idx: moveIdx,
    });
    moveIdx = move.idx;

    const detail = {
      moveIdx,
      moveMark: currentPlayer.mark,
      labelMarkToShow: nextPlayer.mark,
    };
    const providerEvent = new CustomEvent(GameEvents.TURN_PROVIDER, { detail });
    document.dispatchEvent(providerEvent);

    if (game.hasEnded) {
      const { winner } = game;
      const detail = { winner };
      const event = new CustomEvent(GameEvents.END, { detail });
      document.dispatchEvent(event);
      return;
    }

    /* Trigger AI move automatically after human player move */
    if (nextPlayer.type === PlayerProperties.Types.AI) {
      document.dispatchEvent(new Event(GameEvents.TURN_AI));

      /* Trigger after random time:  500ms - 1000ms (1 sec.) */
      const time = Utils.getRandomInt({ from: 5, to: 10 }) * 100;
      setTimeout(() => {
        document.dispatchEvent(new Event(GameEvents.TURN_TRIGGER));
      }, time);
    }
  }
);
