let ctCreatedPlayers = 0; // Track number of players created

const Player = (name, mark) => {
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
