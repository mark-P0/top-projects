import { PlayerFactory } from './core/player-factory.js';
import { PlayerLabels } from './dom/player-labels.js';
import { tttGrid } from './dom/ttt-grid.js';

/* Create players */
const players = [
  PlayerFactory.create(null, '❌'),
  PlayerFactory.create(null, '⭕'),
];

/* Initialize player labels */
PlayerLabels.initialize(players);
