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

const Selectors = {
  tableBody: '#result table tbody',
  tableRow: {
    header: '#row-header',
    [Participant.COMPUTER]: '#row-computer',
    [Participant.PLAYER]: '#row-player',
  },
  tableScoreCell: '.score',
  finalMessage: '#final',
  prompt: '#prompt',
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

function decideGameWinner() {
  const computerScore = Game.scores[Participant.COMPUTER];
  const playerScore = Game.scores[Participant.PLAYER];

  if (computerScore > playerScore) Game.winner = Participant.COMPUTER;
  else if (computerScore < playerScore) Game.winner = Participant.PLAYER;
  else Game.winner = Participant.NONE;
}

function finalizeGame(alertMsgRetry = 'Would you like to try again?') {
  /* Disable buttons */
  for (const button of selectionButtons) button.disabled = true;

  /* Add a final message */
  const finalMsg =
    Game.winner === Participant.PLAYER
      ? '🎉 You won the game! Congratulations!'
      : Game.winner === Participant.COMPUTER
      ? '💩 You lost! Better luck next time!'
      : '🤝🏼 You tied with the computer!';

  const finalMsgPara = document.querySelector(Selectors.finalMessage);
  finalMsgPara.textContent = finalMsg;

  /* Remove prompt text */
  const prompt = document.querySelector(Selectors.prompt);
  for (const child of prompt.children) prompt.removeChild(child);

  /* Add refresh link to prompt location */
  const promptRefresh = document.createElement('a');
  promptRefresh.textContent = 'Try again';
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

    console.log(scores);
  } else {
    Game.roundCurrent += 1;
  }
}

function updateUIMessage(roundMessage) {
  const messageElement = document.querySelector('#result #message');
  messageElement.textContent = roundMessage;
}

function updateUITable(playerChoice, computerChoice) {
  /*  i.e. add new column
   */

  const headerRowSel = Selectors.tableRow.header;
  const headerRow = document.querySelector(headerRowSel);
  const newHeaderRound = document.createElement('th');
  newHeaderRound.textContent = `Round ${Game.roundCurrent}`;
  headerRow.appendChild(newHeaderRound);

  const computerRowSel = Selectors.tableRow[Participant.COMPUTER];
  const computerRow = document.querySelector(computerRowSel);
  const computerChoiceCell = document.createElement('td');
  computerChoiceCell.textContent = computerChoice;
  computerRow.appendChild(computerChoiceCell);

  const playerRowSel = Selectors.tableRow[Participant.PLAYER];
  const playerRow = document.querySelector(playerRowSel);
  const playerChoiceCell = document.createElement('td');
  playerChoiceCell.textContent = playerChoice;
  playerRow.appendChild(playerChoiceCell);
}

function updateUIScore() {
  const { PLAYER, COMPUTER } = Participant;

  for (const participant of [PLAYER, COMPUTER]) {
    const rowSel = Selectors.tableRow[participant];
    const scoreSel = Selectors.tableScoreCell;

    const scoreCellElement = document.querySelector(`${rowSel} ${scoreSel}`);
    const scoreValue = Game.scores[participant];

    scoreCellElement.textContent = scoreValue;
  }
}

/*  */

const selectionListener = (event) => {
  const { target } = event;
  const { textContent: playerChoice } = target;

  const roundResult = playRound(playerChoice);
  const { _, computerChoice, winner, message } = roundResult;

  updateUITable(playerChoice, computerChoice);
  updateGameObject(winner);
  updateUIScore();
  updateUIMessage(message);
};

const selectionButtons = document.querySelectorAll('.selection');
for (const button of selectionButtons)
  button.addEventListener('click', selectionListener);
