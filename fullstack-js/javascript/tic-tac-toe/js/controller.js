import Game, * as GameProperties from './core/game.js';
import { GameEvents } from './dom/__events__.js';
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
      gameMode: GameProperties.Mode,
      playerMarks: GameProperties.PlayableMarks,
      aiDifficulty: GameProperties.AIDifficulty,
    },
  })
);
document.addEventListener(
  GameEvents.INIT_PROVIDER,
  ({ detail: { playerData } }) => {
    game = Game(playerData);

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
  GameEvents.TURN_TRIGGER,
  ({ detail: { moveIdx } }) => {
    game.currentPlayer.makeMove(game.grid, moveIdx);

    const detail = {
      moveIdx,
      moveMark: game.currentPlayer.mark,
      labelMarkToShow: game.nextPlayer.mark,
    };
    const providerEvent = new CustomEvent(GameEvents.TURN_PROVIDER, { detail });
    document.dispatchEvent(providerEvent);

    if (game.hasEnded) {
      document.dispatchEvent(new Event(GameEvents.END));
    }
  }
);
document.addEventListener(GameEvents.END, () => {
  /* Temporarily showing the game winner */
  console.log(game.winner);
});
