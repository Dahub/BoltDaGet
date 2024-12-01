import { AccountType } from '../types/account';

export const getBalanceColorClass = (type: AccountType, balance: number): string => {
  if (type === 'CHECKING') {
    if (balance > 0) {
      return 'bg-emerald-50 border-emerald-200'; // Subtle green background for positive balance
    } else if (balance < 0) {
      return 'bg-rose-50 border-rose-200'; // Subtle red background for negative balance
    }
    return 'bg-gray-50 border-gray-200'; // Neutral for zero balance
  }
  return 'bg-gray-25 border-gray-100'; // Very light gray for other account types
};