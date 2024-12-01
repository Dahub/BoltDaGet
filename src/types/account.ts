export type AccountType = 'LIVRET_A' | 'LDDS' | 'PEL' | 'CHECKING' | 'PEA' | 'PER';

export interface Account {
  id: string;
  label: string;
  type: AccountType;
  initialBalance: number;
  transactions: Transaction[];
  bankId?: string;
}

import { Transaction } from './transaction';

export const calculateTotalBalance = (account: Account): number => {
  const transactionsBalance = account.transactions
    .filter(t => t.validated)
    .reduce((sum, t) => {
      const amount = t.type === 'CREDIT' ? t.amount : -t.amount;
      return sum + amount;
    }, 0);
  
  return account.initialBalance + transactionsBalance;
};

export const calculateProjectedBalance = (account: Account): number => {
  const transactionsBalance = account.transactions
    .reduce((sum, t) => {
      const amount = t.type === 'CREDIT' ? t.amount : -t.amount;
      return sum + amount;
    }, 0);
  
  return account.initialBalance + transactionsBalance;
};