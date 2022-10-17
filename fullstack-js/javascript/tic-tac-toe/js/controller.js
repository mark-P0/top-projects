import Utils from './utils.js';
import * as PlayerProperties from './core/player.js';
import Game, * as GameProperties from './core/game.js';
import { GameEvents, PlayerEvents } from './dom/__events__.js';
import './dom/control.js';
import './dom/popup.js';
import './dom/player-labels.js';
import './dom/ttt-grid.js';
import './dom/main.js';

let game; // Define game state reference at module-scope
function performInitialSteps() {
  /* Reset game state object */
  game = undefined;
  PlayerProperties.PlayerCounter.reset();

  /* Set randomized page title */
  document.title = GameProperties.RandomizedTitle();

  /* Dispatch initialization events to concerned elements */
  const eventType = GameEvents.INIT_TRIGGER;
  const detail = {
    gameModes: GameProperties.Modes,
    playerMarks: GameProperties.PlayableMarks,
    aiDifficulties: GameProperties.AIDifficulties,
  };
  document.dispatchEvent(new CustomEvent(eventType, { detail }));
}

/* Outline game flow as events */
performInitialSteps();
document.addEventListener(
  GameEvents.INIT_PROVIDER,
  ({ detail: { gameMode, playerData, aiDifficulty } = {} }) => {
    game ??= Game(gameMode, playerData, aiDifficulty);

    const detail = {
      gridItems: game.grid.items,
      players: game.players,
      firstPlayer: game.currentPlayer,
    };
    const providerEvent = new CustomEvent(GameEvents.START, { detail });
    document.dispatchEvent(providerEvent);
  }
);
document.addEventListener(GameEvents.CONTROL_RESET, () => {
  performInitialSteps();
});
document.addEventListener(GameEvents.CONTROL_RESTART, () => {
  game.restart();
  document.dispatchEvent(new Event(GameEvents.INIT_PROVIDER));
});
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
    const move = game.currentPlayer.makeMove({
      game,
      idx: moveIdx,
    });
    moveIdx = move.idx;

    const { currentPlayer, nextPlayer } = game;
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
