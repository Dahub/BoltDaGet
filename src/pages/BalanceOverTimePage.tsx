import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';
import MonthSelector from '../components/MonthSelector';
import { Account } from '../types/account';
import { formatCurrency, getAccountTypeLabel } from '../utils/formatters';
import { getDaysInMonth } from '../utils/date';
import BankLogo from '../components/BankLogo';

interface BalanceOverTimePageProps {
  accounts: Account[];
}

const BalanceOverTimePage: React.FC<BalanceOverTimePageProps> = ({ accounts }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAccountId, setSelectedAccountId] = useState<string>(accounts[0]?.id || '');

  const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);

  const chartData = useMemo(() => {
    if (!selectedAccount) return [];

    const daysInMonth = getDaysInMonth(selectedDate);
    const data = [];

    // Initialize daily transactions arrays
    const dailyTransactions = Array.from({ length: daysInMonth }, () => []);
    
    // Group transactions by day
    selectedAccount.transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() === selectedDate.getFullYear() &&
        transactionDate.getMonth() === selectedDate.getMonth()
      ) {
        const day = transactionDate.getDate() - 1; // Array is 0-based
        dailyTransactions[day].push(transaction);
      }
    });

    let validatedBalance = selectedAccount.initialBalance;
    let projectedBalance = selectedAccount.initialBalance;

    // Calculate cumulative balances day by day
    for (let day = 0; day < daysInMonth; day++) {
      const dayTransactions = dailyTransactions[day];
      
      dayTransactions.forEach(transaction => {
        const amount = transaction.type === 'CREDIT' ? transaction.amount : -transaction.amount;
        projectedBalance += amount;
        if (transaction.validated) {
          validatedBalance += amount;
        }
      });

      data.push({
        day: day + 1,
        validatedBalance,
        projectedBalance
      });
    }

    return data;
  }, [selectedAccount, selectedDate]);

  const formatXAxis = (day: number) => `${day}`;
  const formatTooltip = (value: number) => formatCurrency(value);

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <LineChartIcon className="w-8 h-8 text-gray-600" />
            <h1 className="text-2xl font-bold text-gray-900">Solde dans le temps</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <MonthSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          
          <div className="relative">
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="block w-72 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            >
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.label} ({getAccountTypeLabel(account.type)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedAccount && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BankLogo bankId={selectedAccount.bankId} size="sm" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {selectedAccount.label}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {getAccountTypeLabel(selectedAccount.type)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Solde validé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Solde prévisionnel</span>
                </div>
              </div>
            </div>

            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day"
                    tickFormatter={formatXAxis}
                    label={{ 
                      value: 'Jour du mois', 
                      position: 'bottom',
                      offset: -10
                    }}
                  />
                  <YAxis
                    tickFormatter={formatTooltip}
                    label={{ 
                      value: 'Solde', 
                      angle: -90, 
                      position: 'insideLeft',
                      offset: 0
                    }}
                  />
                  <Tooltip 
                    formatter={formatTooltip}
                    labelFormatter={(day) => `Jour ${day}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="validatedBalance"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={false}
                    name="Solde validé"
                  />
                  <Line
                    type="monotone"
                    dataKey="projectedBalance"
                    stroke="#ca8a04"
                    strokeWidth={3}
                    dot={false}
                    name="Solde prévisionnel"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BalanceOverTimePage;