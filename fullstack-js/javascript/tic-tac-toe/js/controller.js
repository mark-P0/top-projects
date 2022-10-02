import { Game } from './core/game.js';
import { PlayerLabels } from './dom/player-labels.js';
import { tttGrid } from './dom/ttt-grid.js';

/* Set randomized page title */
document.title = Game.title;

/* Initialize player labels */
PlayerLabels.initialize(Game.players);

/* Enable TTT grid */
for (const tttCell of tttGrid.__element__.children) {
  tttCell.disabled = false;
}

/* "Custom" game events */
const GameEvents = {
  end: new Event('game-end'),
};

/* Start game loop by listening to grid cell clicks */
const GameLoopListener = (event) => {
  /* Assure `target` is a grid cell */
  const { target } = event;
  if (!target.classList.contains('ttt-cell')) return;

  /* Set grid cell value */
  const targetIdx = Array.from(tttGrid.__element__.children).indexOf(target);
  const [targetY, targetX] = Game.transformIndexToCoords(targetIdx);
  const currentPlayerMark = Game.makeMove(targetX, targetY);
  target.textContent = currentPlayerMark;

  if (Game.hasEnded) tttGrid.__element__.dispatchEvent(GameEvents.end);

  /* Indicate turn finish by making next player's label visible */
  PlayerLabels.toggleVisibility();
};
tttGrid.__element__.addEventListener('click', GameLoopListener);

/* Listen for end-game state */
const GameEndListener = (event) => {
  /* Remove the game loop hook */
  tttGrid.__element__.removeEventListener('click', GameLoopListener);

  /* Show all player labels */
  PlayerLabels.showAll();

  /* Get the game winner */
  console.log(Game.winner);

  /* Disable buttons */
  for (const tttCell of tttGrid.__element__.children) {
    tttCell.disabled = true;
  }
};
tttGrid.__element__.addEventListener('game-end', GameEndListener, {
  once: true,
});
