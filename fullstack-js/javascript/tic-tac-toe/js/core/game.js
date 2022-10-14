import Utils from '../utils.js';
import Marks from './marks.js';
import Grid from './grid.js';
import Player, * as PlayerProperties from './player.js';

const Title = Utils.getChoices(Marks.playable, 3).join('');
const Modes = {
  PVP: 'game-mode-pvp',
  PVC: 'game-mode-pvc',
};
const PlayableMarks = Marks.playable;
const { AIDifficulties } = PlayerProperties;

const Game = (gameMode, playerData, aiDifficulty) => {
  if (!Object.values(Modes).includes(gameMode)) {
    throw new TypeError(`Given game mode \`${gameMode}\` invalid.`);
  }

  let idxCurrentPlayer = 0;
  let winningMark = undefined;

  const grid = Grid(3);

  const players = playerData.map(({ mark, name }, idx) => {
    /* Derive player type */
    let type = PlayerProperties.Types.HUMAN;
    if (gameMode === Modes.PVC && idx === 1) type = PlayerProperties.Types.AI;

    /* Derive AI level */
    let aiLevel = null;
    if (gameMode === Modes.PVC && idx === 1) aiLevel = aiDifficulty;

    /* Derive AI mark */
    if (gameMode === Modes.PVC && idx === 1) {
      /* Find the first playable mark that is not the human player's */
      mark = Marks.playable.find((mark) => mark !== playerData[0].mark);
    }

    return Player(mark, name, type, aiLevel);
  });

  return {
    mode: gameMode,
    grid,

    players,
    get currentPlayer() {
      return players[idxCurrentPlayer];
    },
    get nextPlayer() {
      idxCurrentPlayer = (idxCurrentPlayer + 1) % players.length;
      return this.currentPlayer;
    },

    get hasEnded() {
      /* Game will end if someone already won, or if the grid has already been filled up */
      return this.hasWinner || !grid.hasBlankCells;
    },
    get hasWinner() {
      /* Check all axes if any of them are already filled with the same item */
      for (const axis of grid.axes) {
        for (const items of axis) {
          const mark = Utils.getSameItem(items);
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
export { Title, Modes, PlayableMarks, AIDifficulties };
