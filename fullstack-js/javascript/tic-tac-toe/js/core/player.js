let ctCreatedPlayers = 0; // Track number of players created

const Player = (name, mark) => {
  ctCreatedPlayers++;

  return { name, mark, num: ctCreatedPlayers };
};

export default Player;
