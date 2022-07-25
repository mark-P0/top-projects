import utils from './utils.js';

const CHOICES = ['Rock', 'Paper', 'Scissors'];

const PARTICIPANT = {
  Player: 'Player',
  Computer: 'Computer',
  NONE: undefined,
};

function getComputerChoice() {
  const { getRandomElement } = utils;
  const computerChoice = getRandomElement(CHOICES);

  return computerChoice;
}

function getPlayerChoice() {
  const result = getComputerChoice();
  console.warn('Player choice still randomized!');

  return result;
}

function playRound(playerSelection, computerSelection) {
  const playerSelIdx = CHOICES.indexOf(playerSelection);
  const computerSelIdx = CHOICES.indexOf(computerSelection);

  /*  The game choices' relationships are such that,
      given `choice` as `CHOICES[idx]`,
      `choice` is beaten by `CHOICES[(idx + 1) % CHOICES.length]`
      i.e. the choice "next" to them

      `playerSelIdxNext` will be used to compare to `computerSelIdx`
   */
  const playerSelIdxNext = (playerSelIdx + 1) % CHOICES.length;

  /* prettier-ignore */
  const result =
    playerSelIdx === computerSelIdx
      ? [`It's a tie! You both played ${playerSelection}`, PARTICIPANT.NONE]
      : playerSelIdxNext === computerSelIdx
      ? [`You Lose! ${computerSelection} beats ${playerSelection}`, PARTICIPANT.Computer]
      : [`You Win! ${playerSelection} beats ${computerSelection}`, PARTICIPANT.Player]

  return result;
}

function game(rounds = 5) {
  const scores = {
    [PARTICIPANT.Player]: 0,
    [PARTICIPANT.Computer]: 0,
  };

  console.log(`Rock-Paper-Scissors! A game of ${rounds} will be played.`);
  console.log('');

  const roundCts = Array.from({ length: rounds }, (_, idx) => idx + 1);
  for (const roundCt of roundCts) {
    console.log(`Round ${roundCt}:`);

    console.log('Getting player input...');
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();

    console.log(
      [
        `Your play:       ${playerChoice}`,
        `Computer's play: ${computerChoice}`,
      ].join('\n')
    );

    const [resultMsg, roundWinner] = playRound(playerChoice, computerChoice);

    console.log(resultMsg);
    console.log('');

    if (roundWinner === PARTICIPANT.NONE) continue;
    scores[roundWinner] += 1;
  }

  const {
    [PARTICIPANT.Player]: playerScore,
    [PARTICIPANT.Computer]: computerScore,
  } = scores;

  const finalMsg =
    playerScore === computerScore
      ? 'The game is a tie!'
      : playerScore < computerScore
      ? ['The computer won the game!', 'You lost!'].join('\n')
      : 'You won the game! Congratulations!!!';

  console.log(finalMsg);
  console.log(scores);
}

game();
