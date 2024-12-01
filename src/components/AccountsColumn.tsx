import React from 'react';
import { Account } from '../types/account';
import AccountCard from './AccountCard';
import { useTheme, themes } from '../contexts/ThemeContext';
import { calculateTotalBalance } from '../types/account';
import { formatCurrency } from '../utils/formatters';

interface AccountsColumnProps {
  title: string;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

const AccountsColumn: React.FC<AccountsColumnProps> = ({
  title,
  accounts,
  onEdit,
  onDelete
}) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const totalBalance = accounts.reduce((sum, account) => 
    sum + calculateTotalBalance(account), 0
  );

  return (
    <div className="space-y-6">
      <div className={`${currentTheme.surface} rounded-lg shadow-md p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${currentTheme.text}`}>{title}</h2>
          <span className={`text-lg font-medium ${currentTheme.text}`}>
            {formatCurrency(totalBalance)}
          </span>
        </div>
        <div className="space-y-4">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {accounts.length === 0 && (
            <p className={`text-center py-4 ${currentTheme.textMuted}`}>
              Aucun compte
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsColumn;