import utils from './utils.js';

const CHOICES = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
  const { getRandomElement } = utils;
  const computerChoice = getRandomElement(CHOICES);

  return computerChoice;
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

  const result =
    playerSelIdx === computerSelIdx
      ? `It's a tie! You both played ${playerSelection}`
      : playerSelIdxNext === computerSelIdx
      ? `You Lose! ${computerSelection} beats ${playerSelection}`
      : `You Win! ${playerSelection} beats ${computerSelection}`;

  return result;
}

/*  */

for (const playerChoice of CHOICES) {
  for (const computerChoice of CHOICES) {
    console.log([
      playerChoice,
      computerChoice,
      playRound(playerChoice, computerChoice),
    ]);
  }
}
