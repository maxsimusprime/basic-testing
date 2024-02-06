import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Add })).toBe(10);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Multiply })).toBe(25);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Divide })).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Exponentiate })).toBe(
      3125,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 5, b: 5, action: 'InvalidAction' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: 'InvalidArg',
        b: null,
        action: Action.Multiply,
      }),
    ).toBeNull();
  });
});
