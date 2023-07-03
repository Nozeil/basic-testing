// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 3, action: 'Invalid action', expected: null },
  { a: '2', b: '3', action: Action.Exponentiate, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
