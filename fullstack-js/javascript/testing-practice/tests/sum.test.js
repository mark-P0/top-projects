import { sum } from '../src/sum.js';

test('Adds integers, e.g. 1 and 2 as 3', () => {
  expect(sum(1, 2)).toBe(3);
});
