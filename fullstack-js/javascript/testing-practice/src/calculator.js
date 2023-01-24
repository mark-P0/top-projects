import { isNumber } from './utilities.js';

class Calculator {
  /** @type {(a: number, b: number) => number} */
  add(a, b) {
    if (!isNumber(a)) throw new Error(`Given \`${a}\` is not a number!`);
    if (!isNumber(b)) throw new Error(`Given \`${b}\` is not a number!`);
    return a + b;
  }

  /** @type {(a: number, b: number) => number} */
  subtract(a, b) {
    if (!isNumber(a)) throw new Error(`Given \`${a}\` is not a number!`);
    if (!isNumber(b)) throw new Error(`Given \`${b}\` is not a number!`);
    return a - b;
  }

  /** @type {(a: number, b: number) => number} */
  multiply(a, b) {
    if (!isNumber(a)) throw new Error(`Given \`${a}\` is not a number!`);
    if (!isNumber(b)) throw new Error(`Given \`${b}\` is not a number!`);
    return a * b;
  }

  divide(a, b) {}
}

export const calculator = new Calculator();
