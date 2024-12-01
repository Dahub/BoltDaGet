import React, { useState } from 'react';
import { PieChart } from 'lucide-react';
import { Account } from '../types/account';
import DateRangeSelector from '../components/DateRangeSelector';
import TransactionPieChart from '../components/TransactionPieChart';
import { useTheme, themes } from '../contexts/ThemeContext';
import { getAccountTypeLabel } from '../utils/formatters';
import BankLogo from '../components/BankLogo';

interface TransactionDistributionPageProps {
  accounts: Account[];
}

const TransactionDistributionPage: React.FC<TransactionDistributionPageProps> = ({ accounts }) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [selectedAccountId, setSelectedAccountId] = useState<string>('all');

  // Get transactions based on selected account
  const getFilteredTransactions = () => {
    if (selectedAccountId === 'all') {
      return accounts.flatMap(account => account.transactions);
    }
    const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);
    return selectedAccount ? selectedAccount.transactions : [];
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div>
      <header className={`${currentTheme.surface} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <PieChart className={`w-8 h-8 ${currentTheme.textMuted}`} />
            <h1 className={`text-2xl font-bold ${currentTheme.text}`}>
              Répartition des opérations
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="w-full sm:w-72">
              <label htmlFor="account-select" className={`block text-sm font-medium ${currentTheme.textMuted} mb-1`}>
                Compte
              </label>
              <select
                id="account-select"
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
                <option value="all">Tous les comptes</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.label} ({getAccountTypeLabel(account.type)})
                  </option>
                ))}
              </select>
            </div>

            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>

          {selectedAccountId !== 'all' && (
            <div className={`${currentTheme.surface} rounded-lg shadow-sm p-4`}>
              <div className="flex items-center space-x-3">
                {accounts.find(acc => acc.id === selectedAccountId)?.bankId && (
                  <BankLogo 
                    bankId={accounts.find(acc => acc.id === selectedAccountId)?.bankId} 
                    size="sm" 
                  />
                )}
                <div>
                  <h2 className={`font-medium ${currentTheme.text}`}>
                    {accounts.find(acc => acc.id === selectedAccountId)?.label}
                  </h2>
                  <p className={`text-sm ${currentTheme.textMuted}`}>
                    {getAccountTypeLabel(accounts.find(acc => acc.id === selectedAccountId)?.type || 'CHECKING')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`${currentTheme.surface} rounded-lg shadow-md p-6`}>
              <h2 className={`text-xl font-semibold ${currentTheme.text} mb-6`}>
                Répartition des dépenses
              </h2>
              <div className="relative">
                <TransactionPieChart
                  transactions={filteredTransactions}
                  startDate={startDate}
                  endDate={endDate}
                  type="DEBIT"
                />
              </div>
            </div>

            <div className={`${currentTheme.surface} rounded-lg shadow-md p-6`}>
              <h2 className={`text-xl font-semibold ${currentTheme.text} mb-6`}>
                Répartition des revenus
              </h2>
              <div className="relative">
                <TransactionPieChart
                  transactions={filteredTransactions}
                  startDate={startDate}
                  endDate={endDate}
                  type="CREDIT"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionDistributionPage;