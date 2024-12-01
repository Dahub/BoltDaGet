import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountsPage from './pages/AccountsPage';
import TransactionsPage from './pages/TransactionsPage';
import BalanceOverTimePage from './pages/BalanceOverTimePage';
import TransactionDistributionPage from './pages/TransactionDistributionPage';
import Navbar from './components/Navbar';
import { mockAccounts } from './data/mockAccounts';
import { Account } from './types/account';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme, themes } from './contexts/ThemeContext';

const AppContent = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const handleUpdateAccounts = (updatedAccounts: Account[]) => {
    setAccounts(updatedAccounts);
  };

  return (
    <Router>
      <div className={`min-h-screen ${currentTheme.secondary}`}>
        <Navbar accounts={accounts} />
        <Routes>
          <Route 
            path="/" 
            element={
              <AccountsPage 
                accounts={accounts} 
                onUpdateAccounts={handleUpdateAccounts} 
              />
            } 
          />
          <Route 
            path="/account/:accountId" 
            element={
              <TransactionsPage 
                accounts={accounts} 
                onUpdateAccounts={handleUpdateAccounts}
              />
            } 
          />
          <Route 
            path="/statistics/balance-over-time" 
            element={<BalanceOverTimePage accounts={accounts} />} 
          />
          <Route 
            path="/statistics/transaction-distribution" 
            element={<TransactionDistributionPage accounts={accounts} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;