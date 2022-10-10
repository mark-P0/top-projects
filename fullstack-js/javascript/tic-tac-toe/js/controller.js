import { Game } from './core/game.js';
import { GameEvents } from './dom/__events__.js';
import './dom/popup.js';
import './dom/player-labels.js';
import './dom/ttt-grid.js';

/* Set randomized page title */
document.title = Game.title;

/* Outline game flow as events */
document.dispatchEvent(
  new CustomEvent(GameEvents.INIT_TRIGGER, {
    detail: {
      gridItems: Game.grid.items,
      gameMode: Game.Mode,
      playerMarks: Game.marks,
      playerCtMax: Game.MAX_PLAYER_CT,
      aiDifficulty: Game.AIDifficulty,
    },
  })
);
document.addEventListener(
  GameEvents.INIT_PROVIDER,
  ({ detail: { playerData } }) => {
    Game.init(playerData);
    document.dispatchEvent(
      new CustomEvent(GameEvents.START, {
        detail: { players: Game.players, firstPlayer: Game.currentPlayer },
      })
    );
  },
  { once: true }
);
document.addEventListener(
  GameEvents.TURN_TRIGGER,
  ({ detail: { moveIdx } }) => {
    const [y, x] = Game.grid.transformIndexToCoords(moveIdx);
    const moveMark = Game.makeMove(x, y);

    const providerEvent = new CustomEvent(GameEvents.TURN_PROVIDER, {
      detail: { moveIdx, moveMark, currentPlayer: Game.currentPlayer },
    });
    document.dispatchEvent(providerEvent);

    if (Game.hasEnded) {
      document.dispatchEvent(new Event(GameEvents.END));
    }
  }
);
document.addEventListener(GameEvents.END, () => {
  /* Temporarily showing the game winner */
  console.log(Game.winner);
});
