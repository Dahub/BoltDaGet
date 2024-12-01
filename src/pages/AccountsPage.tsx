import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AccountsList from '../components/AccountsList';
import AccountForm from '../components/AccountForm';
import { Account } from '../types/account';

interface AccountsPageProps {
  accounts: Account[];
  onUpdateAccounts: (accounts: Account[]) => void;
}

const AccountsPage: React.FC<AccountsPageProps> = ({ accounts, onUpdateAccounts }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | undefined>();

  const handleAddAccount = (accountData: Omit<Account, 'id' | 'transactions'>) => {
    const newAccount: Account = {
      ...accountData,
      id: crypto.randomUUID(),
      transactions: []
    };
    onUpdateAccounts([...accounts, newAccount]);
    setIsFormOpen(false);
  };

  const handleEditAccount = (accountData: Omit<Account, 'id' | 'transactions'>) => {
    if (!editingAccount) return;
    
    const updatedAccounts = accounts.map(account =>
      account.id === editingAccount.id
        ? { ...account, ...accountData }
        : account
    );
    onUpdateAccounts(updatedAccounts);
    setEditingAccount(undefined);
    setIsFormOpen(false);
  };

  const handleDeleteAccount = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
      onUpdateAccounts(accounts.filter(account => account.id !== id));
    }
  };

  const openEditForm = (account: Account) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAccount(undefined);
  };

  return (
    <div>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/main_logo.jpg" 
                alt="Budget Logo" 
                className="w-12 h-12 object-contain rounded-lg"
              />
              <h1 className="text-2xl font-bold text-gray-900">Mon Budget Personnel</h1>
            </div>
            <button
              onClick={() => {
                setEditingAccount(undefined);
                setIsFormOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <Plus className="w-5 h-5" />
              <span>Nouveau Compte</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isFormOpen ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingAccount ? 'Modifier le compte' : 'Ajouter un compte'}
            </h2>
            <AccountForm
              account={editingAccount}
              onSubmit={editingAccount ? handleEditAccount : handleAddAccount}
              onCancel={handleCloseForm}
            />
          </div>
        ) : null}

        <AccountsList
          accounts={accounts}
          onEdit={openEditForm}
          onDelete={handleDeleteAccount}
        />
      </main>
    </div>
  );
};

export default AccountsPage;