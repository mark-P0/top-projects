const Types = {
  HUMAN: 'player-type-human',
  AI: 'player-type-ai',
};
const AIDifficulties = {
  EASY: 'ai-difficulty-easy',
  DIFFICULT: 'ai-difficulty-difficult',
  IMPOSSIBLE: 'ai-difficulty-impossible',
};

let ctCreatedPlayers = 0; // Track number of players created
const Player = (name, mark, type, aiLevel = null) => {
  if (!Object.values(Types).includes(type)) {
    throw new TypeError(`Given player type \`${type}\` invalid.`);
  }
  if (type === Types.AI && !Object.values(AIDifficulties).includes(aiLevel)) {
    throw new TypeError(`Given AI difficulty \`${aiLevel}\` invalid.`);
  }

  ctCreatedPlayers++;

  const makeMove = (grid, idx) => {
    grid.markCell(idx, mark);
  };

  return {
    num: ctCreatedPlayers,
    name,
    mark,
    makeMove,
  };
};

export default Player;
export { Types, AIDifficulties };
