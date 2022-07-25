import utils from './utils.js';

const { getRandomInteger, getRandomElement } = utils;

/*  */

let _ = [
  /*  */
  getRandomInteger({ lower: 0, upper: 100 }),
  getRandomElement(['Rock', 'Paper', 'Scissors']),
];
console.log(_);
