import { getChoices, getSameItem } from '../utils.js';
import Marks from './marks.js';
import Grid from './grid.js';
import Player from './player.js';

const Title = getChoices(Marks.playable, 3).join('');
const Mode = {
  PVP: 'game-mode-pvp',
  PVC: 'game-mode-pvc',
};
const PlayableMarks = Marks.playable;
const AIDifficulty = {
  EASY: 'ai-difficulty-easy',
  DIFFICULT: 'ai-difficulty-difficult',
  IMPOSSIBLE: 'ai-difficulty-impossible',
};

const Game = (playerData) => {
  const grid = Grid(3);

  const players = playerData.map(({ name, mark }) => Player(name, mark));
  let idxCurrentPlayer = 0;
  const makeMove = (idx) => {
    const { mark } = players[idxCurrentPlayer];
    grid.markCell(idx, mark);

    idxCurrentPlayer = (idxCurrentPlayer + 1) % players.length;

    return mark;
  };

  let winningMark = undefined;

  return {
    grid,

    get players() {
      return players;
    },
    get currentPlayer() {
      return players[idxCurrentPlayer];
    },
    makeMove,

    get hasEnded() {
      /* Game will end if someone already won, or if the grid has already been filled up */
      return this.hasWinner || !grid.hasBlankCells;
    },
    get hasWinner() {
      /* Check all axes if any of them are already filled with the same item */
      for (const axis of grid.axes) {
        for (const items of axis) {
          const mark = getSameItem(items);
          if (!mark || mark === Marks._) continue;

          winningMark = mark;
          return true;
        }
      }

      return false;
    },
    get winner() {
      if (!winningMark) return null;
      return players.find((player) => player.mark === winningMark);
    },
  };
};

export default Game;
export { Title, Mode, PlayableMarks, AIDifficulty };
