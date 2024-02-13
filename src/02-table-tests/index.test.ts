import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },

  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 3, b: 7, action: Action.Multiply, expected: 21 },

  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },

  { a: 1, b: 2, action: 'InvalidAction', expected: null },
  { a: 2, b: 4, action: null, expected: null },
  { a: 4, b: 3, action: undefined, expected: null },

  { a: 1, b: null, action: Action.Multiply, expected: null },
  { a: undefined, b: 3, action: Action.Divide, expected: null },
  { a: '3', b: 3, action: Action.Add, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test('should return expected values', () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
