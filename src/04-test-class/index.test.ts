import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.withdraw(1001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(1000);
    const bankAccountToTransfer = getBankAccount(0);

    expect(() => bankAccount.transfer(1001, bankAccountToTransfer)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.transfer(1000, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.deposit(100)).not.toThrowError();

    expect(bankAccount.getBalance()).toBe(1100);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.withdraw(100)).not.toThrowError();

    expect(bankAccount.getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1000);
    const bankAccountToTransfer = getBankAccount(0);

    expect(() =>
      bankAccount.transfer(100, bankAccountToTransfer),
    ).not.toThrowError();

    expect(bankAccount.getBalance()).toBe(900);

    expect(bankAccountToTransfer.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(1000);
    await expect(bankAccount.fetchBalance()).resolves.not.toBeNaN();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(1000);

    bankAccount.fetchBalance = jest.fn().mockResolvedValue(555);

    await expect(bankAccount.fetchBalance()).resolves.toBe(555);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(555);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(1000);

    bankAccount.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
