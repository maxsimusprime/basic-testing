import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyOnConsole = jest.spyOn(global.console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(spyOnConsole).not.toHaveBeenCalled();

    spyOnConsole.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spyOnConsole = jest.spyOn(global.console, 'log');

    unmockedFunction();

    expect(spyOnConsole).toHaveBeenCalled();

    spyOnConsole.mockRestore();
  });
});
