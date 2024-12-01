import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ChevronDown, LineChart, CreditCard, Building2, BarChart4, PieChart, Calendar } from 'lucide-react';
import { Account, AccountType } from '../types/account';
import { getAccountTypeLabel } from '../utils/formatters';
import { useTheme, themes } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  accounts: Account[];
}

const Navbar: React.FC<NavbarProps> = ({ accounts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [isAccountsDropdownOpen, setIsAccountsDropdownOpen] = React.useState(false);
  const [isStatsDropdownOpen, setIsStatsDropdownOpen] = React.useState(false);

  const currentTheme = themes[theme];
  const checkingAccounts = accounts.filter(acc => acc.type === 'CHECKING');
  const otherAccounts = accounts.filter(acc => acc.type !== 'CHECKING');

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case 'CHECKING':
        return <CreditCard className="w-4 h-4" />;
      case 'PEA':
      case 'PER':
        return <BarChart4 className="w-4 h-4" />;
      case 'LIVRET_A':
      case 'LDDS':
      case 'PEL':
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <nav className={`${currentTheme.surface} border-b ${currentTheme.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className={`inline-flex items-center px-3 text-sm ${
                location.pathname === '/'
                  ? currentTheme.text
                  : `${currentTheme.textMuted} ${currentTheme.primaryHover}`
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Accueil
            </button>

            <div className="relative">
              <button
                onClick={() => {
                  setIsAccountsDropdownOpen(!isAccountsDropdownOpen);
                  setIsStatsDropdownOpen(false);
                }}
                className={`inline-flex items-center px-3 text-sm ${
                  location.pathname.startsWith('/account/')
                    ? currentTheme.text
                    : `${currentTheme.textMuted} ${currentTheme.primaryHover}`
                }`}
              >
                Choix du compte
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isAccountsDropdownOpen && (
                <div 
                  className={`absolute left-0 mt-2 w-72 ${currentTheme.surface} rounded-md shadow-lg ${currentTheme.border} border z-50`}
                  onMouseLeave={() => setIsAccountsDropdownOpen(false)}
                >
                  {checkingAccounts.length > 0 && (
                    <>
                      <div className={`px-4 py-2 text-xs font-semibold ${currentTheme.textMuted} ${currentTheme.secondary} rounded-t-md`}>
                        Comptes courants
                      </div>
                      {checkingAccounts.map(account => (
                        <button
                          key={account.id}
                          onClick={() => {
                            navigate(`/account/${account.id}`);
                            setIsAccountsDropdownOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-sm text-left ${currentTheme.text} hover:${currentTheme.secondary}`}
                        >
                          <div className="flex items-center space-x-2">
                            {getAccountIcon(account.type)}
                            <span>{account.label}</span>
                          </div>
                        </button>
                      ))}
                    </>
                  )}

                  {otherAccounts.length > 0 && (
                    <>
                      <div className={`px-4 py-2 text-xs font-semibold ${currentTheme.textMuted} ${currentTheme.secondary} border-t`}>
                        Autres comptes
                      </div>
                      {otherAccounts.map(account => (
                        <button
                          key={account.id}
                          onClick={() => {
                            navigate(`/account/${account.id}`);
                            setIsAccountsDropdownOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-sm text-left ${currentTheme.text} hover:${currentTheme.secondary}`}
                        >
                          <div className="flex items-center space-x-2">
                            {getAccountIcon(account.type)}
                            <div>
                              <span>{account.label}</span>
                              <span className={`ml-2 text-xs ${currentTheme.textMuted}`}>
                                ({getAccountTypeLabel(account.type)})
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsStatsDropdownOpen(!isStatsDropdownOpen);
                  setIsAccountsDropdownOpen(false);
                }}
                className={`inline-flex items-center px-3 text-sm ${
                  location.pathname.startsWith('/statistics')
                    ? currentTheme.text
                    : `${currentTheme.textMuted} ${currentTheme.primaryHover}`
                }`}
              >
                <LineChart className="w-5 h-5 mr-2" />
                Statistiques
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {isStatsDropdownOpen && (
                <div 
                  className={`absolute left-0 mt-2 w-48 ${currentTheme.surface} rounded-md shadow-lg ${currentTheme.border} border z-50`}
                  onMouseLeave={() => setIsStatsDropdownOpen(false)}
                >
                  <button
                    onClick={() => {
                      navigate('/statistics/balance-over-time');
                      setIsStatsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-sm text-left ${currentTheme.text} hover:${currentTheme.secondary}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Solde dans le temps</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/statistics/transaction-distribution');
                      setIsStatsDropdownOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-sm text-left ${currentTheme.text} hover:${currentTheme.secondary}`}
                  >
                    <div className="flex items-center space-x-2">
                      <PieChart className="w-4 h-4" />
                      <span>Répartition des opérations</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;