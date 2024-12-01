import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { Account, calculateTotalBalance, calculateProjectedBalance } from '../types/account';
import { Transaction } from '../types/transaction';
import TransactionsList from '../components/TransactionsList';
import TransactionForm from '../components/TransactionForm';
import MonthSelector from '../components/MonthSelector';
import { formatCurrency } from '../utils/formatters';
import { isSameMonth } from '../utils/date';

interface TransactionsPageProps {
  accounts: Account[];
  onUpdateAccounts: (accounts: Account[]) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ accounts, onUpdateAccounts }) => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>();
  const [showUnvalidatedOnly, setShowUnvalidatedOnly] = useState(false);

  const account = accounts.find(acc => acc.id === accountId);
  
  if (!account) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Compte non trouvé</p>
      </div>
    );
  }

  const filteredTransactions = account.transactions
    .filter(transaction => isSameMonth(new Date(transaction.date), selectedDate))
    .filter(transaction => !showUnvalidatedOnly || !transaction.validated);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: crypto.randomUUID()
    };

    const updatedAccounts = accounts.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          transactions: [newTransaction, ...acc.transactions]
        };
      }
      return acc;
    });

    onUpdateAccounts(updatedAccounts);
    setIsFormOpen(false);
  };

  const handleEditTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;

    const updatedAccounts = accounts.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          transactions: acc.transactions.map(transaction =>
            transaction.id === editingTransaction.id
              ? { ...transactionData, id: transaction.id }
              : transaction
          )
        };
      }
      return acc;
    });

    onUpdateAccounts(updatedAccounts);
    setEditingTransaction(undefined);
    setIsFormOpen(false);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          transactions: acc.transactions.filter(transaction => transaction.id !== transactionId)
        };
      }
      return acc;
    });
    onUpdateAccounts(updatedAccounts);
  };

  const handleToggleValidation = (transactionId: string) => {
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === accountId) {
        return {
          ...acc,
          transactions: acc.transactions.map(transaction =>
            transaction.id === transactionId
              ? { ...transaction, validated: !transaction.validated }
              : transaction
          )
        };
      }
      return acc;
    });
    onUpdateAccounts(updatedAccounts);
  };

  const totalBalance = calculateTotalBalance(account);
  const projectedBalance = calculateProjectedBalance(account);

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{account.label}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {formatCurrency(totalBalance)}
                  </p>
                  {totalBalance !== projectedBalance && (
                    <p className="text-sm text-gray-500">
                      Prévisionnel: {formatCurrency(projectedBalance)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingTransaction(undefined);
                setIsFormOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
              <span>Nouvelle Opération</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFormOpen ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingTransaction ? 'Modifier l\'opération' : 'Nouvelle opération'}
            </h2>
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTransaction(undefined);
              }}
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between mb-6">
          <MonthSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showUnvalidatedOnly}
                onChange={(e) => setShowUnvalidatedOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                N'afficher que les opérations non validées
              </span>
            </label>
          </div>
        </div>

        <TransactionsList
          transactions={filteredTransactions}
          onToggleValidation={handleToggleValidation}
          onDelete={handleDeleteTransaction}
          onEdit={(transaction) => {
            setEditingTransaction(transaction);
            setIsFormOpen(true);
          }}
        />
      </main>
    </div>
  );
};

export default TransactionsPage;