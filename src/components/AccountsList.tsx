import React from 'react';
import { Account } from '../types/account';
import AccountsColumn from './AccountsColumn';
import { useTheme, themes } from '../contexts/ThemeContext';
import { calculateTotalBalance } from '../types/account';
import { formatCurrency } from '../utils/formatters';

interface AccountsListProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts, onEdit, onDelete }) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const checkingAccounts = accounts.filter(account => account.type === 'CHECKING');
  const savingsAccounts = accounts.filter(account => account.type !== 'CHECKING');

  const totalBalance = accounts.reduce((sum, account) => 
    sum + calculateTotalBalance(account), 0
  );

  return (
    <div className="space-y-6">
      <div className={`${currentTheme.surface} rounded-lg shadow-md p-6 mb-6`}>
        <h2 className={`text-xl font-semibold ${currentTheme.text} mb-4`}>Récapitulatif</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={currentTheme.textMuted}>Comptes courants</span>
            <span className={`text-lg font-medium ${currentTheme.text}`}>
              {formatCurrency(checkingAccounts.reduce((sum, account) => 
                sum + calculateTotalBalance(account), 0
              ))}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={currentTheme.textMuted}>Comptes d'épargne</span>
            <span className={`text-lg font-medium ${currentTheme.text}`}>
              {formatCurrency(savingsAccounts.reduce((sum, account) => 
                sum + calculateTotalBalance(account), 0
              ))}
            </span>
          </div>
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <span className={`font-medium ${currentTheme.text}`}>Total</span>
              <span className={`text-2xl font-bold ${currentTheme.text}`}>
                {formatCurrency(totalBalance)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountsColumn
          title="Comptes courants"
          accounts={checkingAccounts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <AccountsColumn
          title="Comptes d'épargne"
          accounts={savingsAccounts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default AccountsList;