import enums from './enums.js';
import utils from './utils.js';

const { Choices, Participant } = enums;

/*  */

function getComputerChoice() {
  const { getRandomElement } = utils;
  const computerChoiceKey = getRandomElement(Object.keys(Choices));
  const computerChoice = Choices[computerChoiceKey];

  return computerChoice;
}

function getChoiceWinner(playerSelection, computerSelection) {
  const choiceValues = Object.values(Choices);
  const playerSelIdx = choiceValues.indexOf(playerSelection);
  const computerSelIdx = choiceValues.indexOf(computerSelection);

  /*  The game choices' relationships are such that,
      given `choice` as `choiceValues[idx]`,
      `choice` is beaten by `choiceValues[(idx + 1) % choiceValues.length]`
      i.e. the choice "next" to them

      `playerSelIdxNext` will be used to compare to `computerSelIdx`
   */
  const playerSelIdxNext = (playerSelIdx + 1) % choiceValues.length;

  /* prettier-ignore */
  const result =
    playerSelIdx === computerSelIdx ? Participant.NONE
    : playerSelIdxNext === computerSelIdx ? Participant.COMPUTER
    : Participant.PLAYER

  return result;
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = getChoiceWinner(playerChoice, computerChoice);

  /* prettier-ignore */
  const message =
    winner === Participant.PLAYER ? `You Win! ${playerChoice} beats ${computerChoice}`
    : winner === Participant.COMPUTER ? `You Lose! ${computerChoice} beats ${playerChoice}`
    : `It's a tie! You both played ${playerChoice}`

  return { playerChoice, computerChoice, winner, message };
}

/*  */

const selectionListener = (event) => {
  const { target } = event;
  const { textContent: playerChoice } = target;

  const roundResult = playRound(playerChoice);
  console.log(roundResult);
};

const selectionButtons = document.querySelectorAll('.selection');
console.log(selectionButtons);
for (const button of selectionButtons)
  button.addEventListener('click', selectionListener);
