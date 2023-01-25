import { isNumber } from './utilities.js';

/** @type {(numbers: number[]) => {average: number, min: number, max: number, length: number}} */
export function analyzeArray(numbers) {
  if (!Array.isArray(numbers))
    throw new Error(`Given value \`${numbers}\` is not an array!`);
  if (numbers.length === 0) throw new Error('Given array must not be empty!');

  let sum = 0;
  let min = numbers[0];
  let max = numbers[0];
  const { length } = numbers;

  for (const num of numbers) {
    if (!isNumber(num)) throw new Error(`Element \`${num}\` is not a number!`);

    sum += num;
    if (min > num) min = num;
    if (max < num) max = num;
  }

  return {
    average: sum / length,
    min,
    max,
    length,
  };
}
