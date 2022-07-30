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
    `You Win! ${winningChoice} beats ${losingChoice}`,
  LOSE: (winningChoice, losingChoice) =>
    `You Lose! ${winningChoice} beats ${losingChoice}`,
  TIE: (commonChoice) => `It's a tie! You both played ${commonChoice}`,
};

const FinalMessage = {
  WIN: '🎉 You won the game! Congratulations!',
  LOSE: '💩 You lost! Better luck next time!',
  TIE: '🤝🏼 You tied with the computer!',
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
