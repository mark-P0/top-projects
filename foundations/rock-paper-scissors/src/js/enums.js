const Choices = {
  ROCK: '✊🏼',
  PAPER: '🖐🏼',
  SCISSORS: '✌🏼',
};

const Participant = {
  PLAYER: 'Player',
  COMPUTER: 'Computer',
  NONE: '',
};

const RoundMessage = {
  WIN: (winningChoice, losingChoice) =>
    `Round Win! ${winningChoice} beats ${losingChoice}`,
  LOSE: (winningChoice, losingChoice) =>
    `Round Lose! ${winningChoice} beats ${losingChoice}`,
  TIE: (commonChoice) => `Round Tie! You both played ${commonChoice}`,
};

const FinalMessage = {
  WIN: '🎉 The game is yours! Congratulations!',
  LOSE: '💩 The game is lost! Better luck next time!',
  TIE: '🤝🏼 You tied the game!',
  PROMPT: 'Try Again',
};

const Selectors = {
  TABLE_BODY: '#result table tbody',
  ROUND_MESSAGE: '#result #message',
  FINAL_MESSAGE: '#final',
  PROMPT: '#prompt',
  BUTTON: '.selection',
};

export default { Choices, Participant, RoundMessage, FinalMessage, Selectors };
