import { Game } from './core/game.js';
import { PlayerLabels } from './dom/player-labels.js';
import { tttGrid } from './dom/ttt-grid.js';

/* Initialize player labels */
PlayerLabels.initialize(Game.players);

/* Enable TTT grid */
for (const tttCell of tttGrid.__element__.children) {
  tttCell.disabled = false;
}

/* Start game loop by listening to grid cell clicks */
tttGrid.__element__.addEventListener('click', (event) => {
  /* Assure `target` is a grid cell */
  const { target } = event;
  if (!target.classList.contains('ttt-cell')) return;

  /* Set grid cell value */
  const targetIdx = Array.from(tttGrid.__element__.children).indexOf(target);
  const [targetY, targetX] = Game.transformIndexToCoords(targetIdx);
  const currentPlayerMark = Game.makeMove(targetX, targetY);
  target.textContent = currentPlayerMark;

  /* Indicate turn finish by making next player's label visible */
  PlayerLabels.toggleVisibility();
});
