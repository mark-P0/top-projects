import { describe, test, expect } from '@jest/globals';
import { calculator } from '../src/calculator.js';

describe('Existence of properties/methods', () => {
  test('Has arithmetic methods', () => {
    expect(typeof calculator.add).toBe('function');
    expect(typeof calculator.subtract).toBe('function');
    expect(typeof calculator.multiply).toBe('function');
    expect(typeof calculator.divide).toBe('function');
  });
});
