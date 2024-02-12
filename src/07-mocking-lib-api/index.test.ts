import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue('responseData');

    const spyOnAxiosCreate = jest.spyOn(axios, 'create');

    jest.advanceTimersByTime(5000);

    await throttledGetDataFromApi('/relativePAth');

    expect(spyOnAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue('responseData');

    const spyOnAxiosGet = jest.spyOn(axios, 'get');

    jest.advanceTimersByTime(5000);

    await throttledGetDataFromApi('/relativePAth');

    expect(spyOnAxiosGet).toHaveBeenCalledWith('/relativePAth');
  });

  test('should return response data', async () => {
    axios.create = jest.fn(() => axios);
    axios.get = jest
      .fn()
      .mockResolvedValue({ status: 200, data: 'responseData' });

    jest.advanceTimersByTime(5000);

    const response = await throttledGetDataFromApi('relativePAth');

    expect(response).toBe('responseData');
  });
});
