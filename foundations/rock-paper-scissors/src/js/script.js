import enums from './enums.js';
import utils from './utils.js';

const { Choices, Participant } = enums;

function getComputerChoice() {
  const { getRandomElement } = utils;
  const computerChoiceKey = getRandomElement(Object.keys(Choices));
  const computerChoice = Choices[computerChoiceKey];

  return computerChoice;
}
console.log(getComputerChoice());

function playRound(playerSelection, computerSelection) {
  const playerSelIdx = Choices.indexOf(playerSelection);
  const computerSelIdx = Choices.indexOf(computerSelection);

  /*  The game choices' relationships are such that,
      given `choice` as `Choices[idx]`,
      `choice` is beaten by `Choices[(idx + 1) % Choices.length]`
      i.e. the choice "next" to them

      `playerSelIdxNext` will be used to compare to `computerSelIdx`
   */
  const playerSelIdxNext = (playerSelIdx + 1) % Choices.length;

  /* prettier-ignore */
  const result =
    playerSelIdx === computerSelIdx
      ? [`It's a tie! You both played ${playerSelection}`, Participant.NONE]
      : playerSelIdxNext === computerSelIdx
      ? [`You Lose! ${computerSelection} beats ${playerSelection}`, Participant.COMPUTER]
      : [`You Win! ${playerSelection} beats ${computerSelection}`, Participant.PLAYER]

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
