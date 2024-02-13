import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyOnSetTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(jest.fn(), 1000);

    expect(spyOnSetTimeout).toHaveBeenCalledTimes(1);
    expect(spyOnSetTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);

    spyOnSetTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spyOnSetInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(jest.fn(), 1000);

    expect(spyOnSetInterval).toHaveBeenCalledTimes(1);
    expect(spyOnSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

    spyOnSetInterval.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs', () => jest.createMockFromModule<typeof import('fs')>('fs'));
  jest.mock('fs/promises', () =>
    jest.createMockFromModule<typeof import('fs/promises')>('fs/promises'),
  );
  jest.mock('path', () =>
    jest.createMockFromModule<typeof import('path')>('path'),
  );

  test('should call join with pathToFile', async () => {
    const spyOnJoin = jest.spyOn(path, 'join');

    readFileAsynchronously('path');

    expect(spyOnJoin).toHaveBeenCalledWith(expect.any(String), 'path');
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn(() => false);

    const fileContent = await readFileAsynchronously('pathToFile');

    expect(fileContent).toBeNull();
  });

  test('should return file content if file exists', async () => {
    path.join = jest.fn(() => 'pathToFile');
    fs.existsSync = jest.fn(() => true);

    const buffer = Buffer.from('content', 'utf-8');

    fsPromises.readFile = jest.fn().mockResolvedValue(buffer);

    const content = await readFileAsynchronously('pathToFIle');

    expect(content).toBe('content');
  });
});
