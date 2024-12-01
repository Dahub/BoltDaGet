export type TransactionType = 'CREDIT' | 'DEBIT';
export type TransactionCategory = 'TRANSPORT' | 'RENT' | 'SALARY' | 'FOOD';

export interface Transaction {
  id: string;
  date: string;
  label: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  validated: boolean;
}

export const getCategoryLabel = (category: TransactionCategory): string => {
  const labels: Record<TransactionCategory, string> = {
    TRANSPORT: 'Transport',
    RENT: 'Loyer',
    SALARY: 'Salaire',
    FOOD: 'Alimentation'
  };
  return labels[category];
};