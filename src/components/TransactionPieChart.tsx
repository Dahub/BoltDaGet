import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction, TransactionCategory, getCategoryLabel, TransactionType } from '../types/transaction';
import { formatCurrency } from '../utils/formatters';
import { useTheme, themes } from '../contexts/ThemeContext';

interface TransactionPieChartProps {
  transactions: Transaction[];
  startDate: Date;
  endDate: Date;
  type: TransactionType;
}

interface ChartData {
  name: string;
  value: number;
  category: TransactionCategory;
}

// Palette pour les dépenses (tons chauds)
const DEBIT_COLORS = [
  '#f97316', // Orange vif
  '#e11d48', // Rose rubis
  '#7c2d12', // Brun profond
  '#b45309'  // Orange brûlé
];

// Palette pour les revenus (tons froids)
const CREDIT_COLORS = [
  '#0ea5e9', // Bleu ciel
  '#0d9488', // Turquoise
  '#1d4ed8', // Bleu royal
  '#0369a1'  // Bleu océan
];

const TransactionPieChart: React.FC<TransactionPieChartProps> = ({
  transactions,
  startDate,
  endDate,
  type
}) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const colors = type === 'DEBIT' ? DEBIT_COLORS : CREDIT_COLORS;

  const filteredTransactions = transactions.filter(transaction => {
    const date = new Date(transaction.date);
    return (
      date >= startDate &&
      date <= endDate &&
      transaction.type === type
    );
  });

  const data: ChartData[] = Object.values(
    filteredTransactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = {
          name: getCategoryLabel(category),
          value: 0,
          category
        };
      }
      acc[category].value += transaction.amount;
      return acc;
    }, {} as Record<TransactionCategory, ChartData>)
  ).sort((a, b) => b.value - a.value);

  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`${currentTheme.surface} p-3 rounded-lg shadow-lg border ${currentTheme.border}`}>
          <p className={`font-medium ${currentTheme.text}`}>{data.name}</p>
          <p className={`${currentTheme.textMuted}`}>
            {formatCurrency(data.value)}
          </p>
          <p className={`text-sm ${currentTheme.textMuted}`}>
            {((data.value / totalAmount) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RechartsChart>
      </ResponsiveContainer>
      {data.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className={`text-sm ${currentTheme.textMuted}`}>
            Aucune opération sur la période
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionPieChart;