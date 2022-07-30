import enums from './enums.js';
import utils from './utils.js';

const { Choices, Participant, RoundMessage, FinalMessage, Selectors } = enums;

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

function getRoundWinner(playerSelection, computerSelection) {
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
  const winner = getRoundWinner(playerChoice, computerChoice);

  /* prettier-ignore */
  const message =
    winner === Participant.PLAYER ? RoundMessage.WIN(playerChoice, computerChoice)
    : winner === Participant.COMPUTER ? RoundMessage.LOSE(computerChoice, playerChoice)
    : RoundMessage.TIE(playerChoice)

  return { playerChoice, computerChoice, winner, message };
}

/*  */

function decideGameWinner() {
  const { PLAYER, COMPUTER, NONE } = Participant;
  const { scores } = Game;

  const computerScore = scores[COMPUTER];
  const playerScore = scores[PLAYER];

  /* prettier-ignore */
  Game.winner =
    (computerScore > playerScore) ? COMPUTER
    : (computerScore < playerScore) ? PLAYER
    : NONE
}

function finalizeGame() {
  /* Disable buttons */
  for (const button of selectionButtons) button.disabled = true;

  /* Add a final message */
  const finalMsg =
    Game.winner === Participant.PLAYER
      ? FinalMessage.WIN
      : Game.winner === Participant.COMPUTER
      ? FinalMessage.LOSE
      : FinalMessage.TIE;

  const finalMsgPara = document.querySelector(Selectors.FINAL_MESSAGE);
  finalMsgPara.textContent = finalMsg;

  /* Remove prompt text */
  const prompt = document.querySelector(Selectors.PROMPT);
  for (const child of prompt.children) prompt.removeChild(child);

  /* Add refresh link to prompt location */
  const promptRefresh = document.createElement('a');
  promptRefresh.textContent = FinalMessage.PROMPT;
  promptRefresh.href = '.'; // Go to current page; effectively refresh
  promptRefresh.style.fontWeight = 'bold';
  prompt.appendChild(promptRefresh);
}

/*  */

function updateGameObject(roundWinner) {
  const { roundCurrent, roundMax, scores } = Game;

  if (scores.hasOwnProperty(roundWinner)) scores[roundWinner] += 1;

  if (roundCurrent === roundMax) {
    decideGameWinner();
    finalizeGame();
  } else {
    Game.roundCurrent += 1; // Prefix needed to mutate object itself
  }
}

function updateUIMessage(roundMessage) {
  const messageElement = document.querySelector(Selectors.ROUND_MESSAGE);
  messageElement.textContent = roundMessage;
}

function updateUITable(playerChoice, computerChoice, roundWinner) {
  /*  i.e. add new row
   */

  const table = document.querySelector(Selectors.TABLE_BODY);
  const row = document.createElement('tr');
  const rowCells = Array.from({ length: 2 }).map(() =>
    document.createElement('td')
  );
  const [playerCol, computerCol] = rowCells;

  playerCol.textContent = playerChoice;
  computerCol.textContent = computerChoice;

  if (roundWinner === Participant.PLAYER)
    playerCol.style.backgroundColor = 'green';
  else if (roundWinner === Participant.COMPUTER)
    computerCol.style.backgroundColor = 'green';
  else {
    playerCol.style.backgroundColor = 'gray';
    computerCol.style.backgroundColor = 'gray';
  }

  table.hidden = false; // Only actually needs one call
  for (const cell of rowCells) row.appendChild(cell);
  table.appendChild(row);
}

/*  */

const selectionListener = (event) => {
  const { target } = event;
  const { textContent: playerChoice } = target;

  const roundResult = playRound(playerChoice);
  const { _, computerChoice, winner, message } = roundResult;

  updateUITable(playerChoice, computerChoice, winner);
  updateUIMessage(message);
  updateGameObject(winner);
};

const selectionButtons = document.querySelectorAll(Selectors.BUTTON);
for (const button of selectionButtons)
  button.addEventListener('click', selectionListener);
