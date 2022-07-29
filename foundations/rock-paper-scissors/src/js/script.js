import enums from './enums.js';
import utils from './utils.js';

const { Choices, Participant } = enums;

const Game = {
  roundMax: 5,
  roundCurrent: 1,
  winner: undefined,
  scores: {
    [Participant.COMPUTER]: 0,
    [Participant.PLAYER]: 0,
  },
};

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

function updateGameObject(roundWinner) {
  const { roundCurrent, roundMax, scores } = Game;

  if (roundCurrent === roundMax) {
    /* TODO: Turn into an event listener? */

    return;
  }

  Game.roundCurrent += 1; // Prefix needed to mutate object itself

  if (!scores.hasOwnProperty(roundWinner)) return;
  scores[roundWinner] += 1;
}

function updateUIMessage(roundMessage) {
  const messageElement = document.querySelector('#result #message');
  messageElement.textContent = roundMessage;
}

/*  */

const selectionListener = (event) => {
  const { target } = event;
  const { textContent: playerChoice } = target;

  const roundResult = playRound(playerChoice);
  const { _, computerChoice, winner, message } = roundResult;

  updateGameObject(winner);
  updateUIMessage(message);

  console.log(roundResult);
  console.log(Game);
};

const selectionButtons = document.querySelectorAll('.selection');
for (const button of selectionButtons)
  button.addEventListener('click', selectionListener);
console.log(Game);
