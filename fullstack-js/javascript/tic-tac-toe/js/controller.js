import { PlayerFactory } from './core/player.js';
import { PlayerLabels } from './dom/player-labels.js';
import { tttGrid } from './dom/ttt-grid.js';

/* Create players */
const players = [
  PlayerFactory.create(null, '❌'),
  PlayerFactory.create(null, '⭕'),
];

/* Initialize player labels */
PlayerLabels.initialize(players);

/* Enable TTT grid */
for (const tttCell of tttGrid.__element__.children) {
  tttCell.disabled = false;
}
