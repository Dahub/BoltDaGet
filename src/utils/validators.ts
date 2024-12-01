import { AccountType } from '../types/account';

export const validateBalance = (type: AccountType, balance: number): boolean => {
  // Only checking accounts can have negative balances
  if (type !== 'CHECKING' && balance < 0) {
    return false;
  }
  return true;
};

export const getBalanceErrorMessage = (type: AccountType): string => {
  if (type === 'CHECKING') {
    return '';
  }
  return 'Ce type de compte ne peut pas avoir un solde négatif';
};