import { Game } from './core/game.js';
import { GameEvents } from './dom/__events__.js';
import './dom/player-labels.js';
import './dom/ttt-grid.js';

/* Set randomized page title */
document.title = Game.title;

/* Outline game flow as events */
document.dispatchEvent(
  new CustomEvent(GameEvents.INIT, { detail: { gridItems: Game.grid.items } })
);
document.dispatchEvent(
  new CustomEvent(GameEvents.START, { detail: { players: Game.players } })
);
document.addEventListener(GameEvents.TURN, ({ detail: { idx, callback } }) => {
  const [y, x] = Game.grid.transformIndexToCoords(idx);
  const moveMark = Game.makeMove(x, y);
  callback(moveMark);

  if (Game.hasEnded) {
    document.dispatchEvent(new Event(GameEvents.END));
  }
});
document.addEventListener(GameEvents.END, () => {
  /* Temporarily showing the game winner */
  console.log(Game.winner);
});
