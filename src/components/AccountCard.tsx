import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Account, calculateTotalBalance } from '../types/account';
import { CreditCard, Building2, BarChart4, Pencil, Trash2 } from 'lucide-react';
import { formatCurrency, getAccountTypeLabel } from '../utils/formatters';
import { useTheme, themes } from '../contexts/ThemeContext';
import BankLogo from './BankLogo';

interface AccountCardProps {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentTheme = themes[theme];
  const totalBalance = calculateTotalBalance(account);

  const getAccountIcon = () => {
    switch (account.type) {
      case 'CHECKING':
        return <CreditCard className={`w-6 h-6 ${currentTheme.textMuted}`} />;
      case 'PEA':
      case 'PER':
        return <BarChart4 className={`w-6 h-6 ${currentTheme.textMuted}`} />;
      case 'LIVRET_A':
      case 'LDDS':
      case 'PEL':
        return <Building2 className={`w-6 h-6 ${currentTheme.textMuted}`} />;
      default:
        return <Building2 className={`w-6 h-6 ${currentTheme.textMuted}`} />;
    }
  };

  const getCardStyle = () => {
    if (account.type === 'CHECKING') {
      if (totalBalance > 0) {
        return currentTheme.card.checking.positive;
      } else if (totalBalance < 0) {
        return currentTheme.card.checking.negative;
      }
      return currentTheme.card.checking.neutral;
    }
    return currentTheme.card.savings;
  };

  return (
    <div 
      className={`rounded-lg border shadow-sm ${currentTheme.card.hover} transition-all cursor-pointer ${getCardStyle()}`}
      onClick={() => navigate(`/account/${account.id}`)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {account.bankId ? (
              <BankLogo bankId={account.bankId} size="sm" />
            ) : (
              getAccountIcon()
            )}
            <h3 className={`text-lg font-semibold ${currentTheme.text}`}>{account.label}</h3>
          </div>
          <span className={`px-3 py-1.5 text-sm font-medium ${currentTheme.accent} text-white rounded-full text-center min-w-[100px]`}>
            {getAccountTypeLabel(account.type)}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className={`text-2xl font-bold ${currentTheme.text}`}>
              {formatCurrency(totalBalance)}
            </p>
            <p className={`text-sm ${currentTheme.textMuted}`}>
              Solde initial: {formatCurrency(account.initialBalance)}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(account);
              }}
              className={`p-2 ${currentTheme.textMuted} hover:${currentTheme.text} rounded-full hover:${currentTheme.secondary}`}
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(account.id);
              }}
              className={`p-2 ${currentTheme.textMuted} hover:${currentTheme.error} rounded-full hover:${currentTheme.secondary}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;