import { Account } from '../types/account';
import { Transaction, TransactionCategory } from '../types/transaction';

const generateTransactions = (startDate: Date, monthsBack: number, frequency: 'high' | 'low'): Transaction[] => {
  const transactions: Transaction[] = [];
  const categories: TransactionCategory[] = ['TRANSPORT', 'RENT', 'SALARY', 'FOOD'];
  
  // Calculate the start date (X months ago)
  const endDate = new Date(startDate);
  const startDateRange = new Date(startDate);
  startDateRange.setMonth(startDateRange.getMonth() - monthsBack);
  
  // Generate recurring transactions
  for (let date = new Date(startDateRange); date <= endDate; date.setDate(date.getDate() + 1)) {
    const dayOfMonth = date.getDate();
    const shouldAddTransaction = frequency === 'high' 
      ? Math.random() > 0.85  // More transactions for checking accounts
      : Math.random() > 0.97; // Fewer transactions for savings accounts

    if (shouldAddTransaction || dayOfMonth === 1 || dayOfMonth === 15) { // Guaranteed transactions on 1st and 15th
      let category: TransactionCategory = categories[Math.floor(Math.random() * categories.length)];
      let amount: number;
      let type: 'CREDIT' | 'DEBIT';
      let label: string;

      // Salary on the 1st of each month
      if (dayOfMonth === 1) {
        amount = 2800 + Math.floor(Math.random() * 200);
        type = 'CREDIT';
        label = 'Salaire';
        category = 'SALARY';
      }
      // Rent on the 5th
      else if (dayOfMonth === 5) {
        amount = 800 + Math.floor(Math.random() * 50);
        type = 'DEBIT';
        label = 'Loyer';
        category = 'RENT';
      }
      // Regular transactions
      else {
        switch (category) {
          case 'FOOD':
            amount = 15 + Math.floor(Math.random() * 85);
            type = 'DEBIT';
            label = ['Supermarché', 'Restaurant', 'Courses'][Math.floor(Math.random() * 3)];
            break;
          case 'TRANSPORT':
            amount = 10 + Math.floor(Math.random() * 40);
            type = 'DEBIT';
            label = ['Essence', 'Transport en commun', 'Taxi'][Math.floor(Math.random() * 3)];
            break;
          case 'RENT':
            amount = 500 + Math.floor(Math.random() * 300);
            type = 'DEBIT';
            label = ['Loyer', 'Charges', 'Assurance habitation'][Math.floor(Math.random() * 3)];
            break;
          default:
            amount = 50 + Math.floor(Math.random() * 150);
            type = Math.random() > 0.8 ? 'CREDIT' : 'DEBIT';
            label = type === 'CREDIT' ? 'Virement reçu' : 'Paiement divers';
        }
      }

      // Add some cents to make it more realistic
      amount = Math.round((amount + Math.random()) * 100) / 100;

      transactions.push({
        id: crypto.randomUUID(),
        date: date.toISOString().split('T')[0],
        label,
        category,
        type,
        amount,
        validated: date < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Transactions older than a week are validated
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const today = new Date();

export const mockAccounts: Account[] = [
  {
    id: '1',
    label: 'Compte Courant',
    type: 'CHECKING',
    initialBalance: 1500,
    bankId: 'lbp',
    transactions: generateTransactions(today, 36, 'high')
  },
  {
    id: '2',
    label: 'Livret A',
    type: 'LIVRET_A',
    initialBalance: 14350.00,
    bankId: 'lbp',
    transactions: generateTransactions(today, 36, 'low')
  },
  {
    id: '3',
    label: 'Compte Courant Fortuneo',
    type: 'CHECKING',
    initialBalance: 2500,
    bankId: 'fortuneo',
    transactions: generateTransactions(today, 36, 'high')
  },
  {
    id: '4',
    label: 'PEA Fortuneo',
    type: 'PEA',
    initialBalance: 5000.00,
    bankId: 'fortuneo',
    transactions: generateTransactions(today, 36, 'low')
  },
  {
    id: '5',
    label: 'Assurance Vie Linxea Avenir',
    type: 'PER',
    initialBalance: 10000.00,
    bankId: 'linxea',
    transactions: generateTransactions(today, 36, 'low')
  }
];