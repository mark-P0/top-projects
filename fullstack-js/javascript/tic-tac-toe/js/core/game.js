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

function extractGameData(game) {
  let gameMode = Modes.PVP;
  let aiDifficulty = undefined;

  const playerData = game.players.map((player) => {
    const { mark, name, aiLevel } = player;

    if (aiDifficulty === undefined && aiLevel !== null) {
      gameMode = Modes.PVC;
      aiDifficulty = aiLevel;
    }

    return { mark, name };
  });

  return { gameMode, playerData, aiDifficulty };
}

function generateGameClone(game) {
  /*  Manual cloning of the given `game` state.
   *  Straightforward cloning may not work (e.g. `Object.assign()`, `JSON.stringify()`),
   *  as `game` and the internal `grid` are complex objects (non-serializable).
   *
   *  https://stackoverflow.com/questions/34480936/how-to-clone-a-javascript-object-including-getters-and-setters
   *  https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
   */

  /* Get raw game data */
  const { gameMode, playerData, aiDifficulty } = extractGameData(game);

  /* Create clone */
  const clone = Game(gameMode, playerData, aiDifficulty);

  /* Mirror grid from source to clone */
  game.grid.items.forEach((cellMark, idx) => {
    clone.grid.markCell(idx, cellMark);
  });

  return clone;
}

const Game = (gameMode, playerData, aiDifficulty) => {
  if (!Object.values(Modes).includes(gameMode)) {
    throw new TypeError(`Given game mode \`${gameMode}\` invalid.`);
  }

  let idxCurrentPlayer = 0;
  let winningProperties = undefined;

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

    /* Derive AI name */
    if (gameMode === Modes.PVC && idx === 1) {
      name = 'Computer';
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

          winningProperties = {
            grid: grid.items,
            axis,
            items,
            mark,
            player: players.find((player) => player.mark === mark),
          };
          return true;
        }
      }

      return false;
    },
    get winner() {
      if (!winningProperties) return null;
      return winningProperties.player;
    },

    get clone() {
      /* Will always produce fresh objects on each access */
      return generateGameClone(this);
    },
  };
};

export default Game;
export { Title, Modes, PlayableMarks, AIDifficulties, generateGameClone };
