import utils from './utils.js';

const CHOICES = ['Rock', 'Paper', 'Scissors'];

function getComputerChoice() {
  const { getRandomElement } = utils;
  const computerChoice = getRandomElement(CHOICES);

  return computerChoice;
}

/*  */

const { getRandomInteger, getRandomElement } = utils;

let _ = [
  /*  */
  getRandomInteger({ lower: 0, upper: 100 }),
  getRandomElement(['Rock', 'Paper', 'Scissors']),
  getComputerChoice(),
];
console.log(_);
