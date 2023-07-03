// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import { random } from 'lodash';

jest.mock('lodash');

const mockedRandom = jest.mocked(random);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 0;
    const acc = getBankAccount(initialBalance);

    expect(acc.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10;
    const acc = getBankAccount(initialBalance);

    expect(() => acc.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 10;
    const fromAcc = getBankAccount(initialBalance);
    const toAcc = getBankAccount(initialBalance);

    expect(() => fromAcc.transfer(100, toAcc)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 10;
    const acc = getBankAccount(initialBalance);

    expect(() => acc.transfer(5, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 10;
    const acc = getBankAccount(initialBalance);
    acc.deposit(5);

    expect(acc.getBalance()).toBe(15);
  });

  test('should withdraw money', () => {
    const initialBalance = 10;
    const acc = getBankAccount(initialBalance);
    acc.withdraw(5);
    expect(acc.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const initialBalance = 10;
    const fromAcc = getBankAccount(initialBalance);
    const toAcc = getBankAccount(initialBalance);

    fromAcc.transfer(5, toAcc);

    expect(fromAcc.getBalance()).toBe(5);
    expect(toAcc.getBalance()).toBe(15);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 10;
    mockedRandom.mockReturnValueOnce(initialBalance).mockReturnValueOnce(1);

    const acc = getBankAccount(initialBalance);

    const result = await acc.fetchBalance();

    expect(result).toBe(initialBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 10;
    const balance = 100;

    mockedRandom.mockReturnValueOnce(balance).mockReturnValueOnce(1);

    const acc = getBankAccount(initialBalance);
    await acc.synchronizeBalance();

    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 10;

    mockedRandom.mockReturnValueOnce(initialBalance).mockReturnValueOnce(0);

    const acc = getBankAccount(initialBalance);

    await expect(() => acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
