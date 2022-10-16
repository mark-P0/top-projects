import Utils from '../utils.js';
import { minimax } from './minimax.js';

const Types = {
  HUMAN: 'player-type-human',
  AI: 'player-type-ai',
};
const AIDifficulties = {
  EASY: 'ai-difficulty-easy',
  DIFFICULT: 'ai-difficulty-difficult',
  IMPOSSIBLE: 'ai-difficulty-impossible',
};

/*  Derive `makeMove()` method of `Player` objects' based on their type.
 *  The `this` in the following methods should be
 *  bound to the `Player` objects that retrieves them.
 */
const makeMoveMapping = {
  [Types.HUMAN]: function ({ game, idx }) {
    const { mark } = this;
    game.grid.markCell(idx, mark);
    return { idx, mark };
  },
  [Types.AI]: function ({ game }) {
    const { mark, aiLevel } = this;
    const idx = makeMoveMappingAIIdx[aiLevel]({ game, playerObject: this });
    game.grid.markCell(idx, mark);
    return { idx, mark };
  },
};
/* Derive a `grid` index to be used on AI `Player` moves. */
const makeMoveMappingAIIdx = {
  [AIDifficulties.EASY]: function ({ game }) {
    /* Simply randomly choose from the indices of the grid's blank cells */
    return Utils.getChoice(game.grid.blankCellIdcs);
  },
  [AIDifficulties.DIFFICULT]: function ({ game, playerObject }) {
    /* AI will fail to make the ideal move 20% of the time */
    const { EASY, IMPOSSIBLE } = AIDifficulties;
    const type = Utils.getRandomInt({ to: 10 }) < 8 ? IMPOSSIBLE : EASY;
    return this[type]({ game, playerObject });
  },
  [AIDifficulties.IMPOSSIBLE]: function ({ game, playerObject }) {
    /* Use the minimax algorithm to make the ideal move every time */
    return minimax(game, playerObject);
  },
};

let ctCreatedPlayers = 0; // Track number of players created
const Player = (mark, name, type, aiLevel) => {
  if (!Object.values(Types).includes(type)) {
    throw new TypeError(`Given player type \`${type}\` invalid.`);
  }
  if (type === Types.AI && !Object.values(AIDifficulties).includes(aiLevel)) {
    throw new TypeError(`Given AI difficulty \`${aiLevel}\` invalid.`);
  }

  ctCreatedPlayers++;

  return {
    num: ctCreatedPlayers,
    mark,
    name,
    type,
    aiLevel,
    get makeMove() {
      return makeMoveMapping[type].bind(this);
    },
  };
};

export default Player;
export { Types, AIDifficulties };
