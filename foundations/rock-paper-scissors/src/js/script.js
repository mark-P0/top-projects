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

/*  */

const selectionListener = (event) => {
  const { target } = event;
  const { textContent } = target;

  console.log(textContent);
};

const selectionButtons = document.querySelectorAll('.selection');
console.log(selectionButtons);
for (const button of selectionButtons)
  button.addEventListener('click', selectionListener);
