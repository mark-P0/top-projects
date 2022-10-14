import { getChoices, getSameItem } from '../utils.js';
import Marks from './marks.js';
import Grid from './grid.js';
import Player from './player.js';

const Game = (() => {
  const MAX_PLAYER_CT = Marks.playable.length;
  const Mode = { PVP: 'game-mode-pvp', PVC: 'game-mode-pvc' };
  const AIDifficulty = {
    EASY: 'ai-difficulty-easy',
    DIFFICULT: 'ai-difficulty-difficult',
    IMPOSSIBLE: 'ai-difficulty-impossible',
  };

  /* Holder for private variables; really unnecessary, but arguably makes code more clean */
  const __ = {};
  const title = getChoices(Marks.playable, 3).join('');

  /* Player-related code */
  let players = undefined;
  __.currentPlayerIdx = 0;
  const makeMove = (x, y) => {
    const { mark } = players[__.currentPlayerIdx];
    Grid.markCell([x, y], mark);

    __.currentPlayerIdx = (__.currentPlayerIdx + 1) % players.length;

    return mark;
  };
  const init = (playerData) => {
    players = playerData.map(({ name, mark }) => Player(name, mark));
  };

  return {
    MAX_PLAYER_CT,
    Mode,
    AIDifficulty,

    marks: Marks.playable,
    grid: Grid,
    title,

    get players() {
      return players;
    },
    get currentPlayer() {
      return players[__.currentPlayerIdx];
    },
    makeMove,
    init,

    get hasEnded() {
      /* Game will end if someone already won, or if the grid has already been filled up */
      return this.hasWinner || !Grid.hasBlankCells;
    },
    get hasWinner() {
      /* Check all axes if any of them are already filled with the same item */
      for (const axis of Grid.axes) {
        for (const items of axis) {
          const winningMark = getSameItem(items);
          if (!winningMark || winningMark === Marks._) continue;

          __.winningMark = winningMark;
          return true;
        }
      }

      return false;
    },
    get winner() {
      if (!__.winningMark) return null;
      return players.find((player) => player.mark === __.winningMark);
    },
  };
})();

export { Game };
