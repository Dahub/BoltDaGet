import React from 'react';
import { Account, AccountType } from '../types/account';
import { getAccountTypeLabel } from '../utils/formatters';
import { validateBalance, getBalanceErrorMessage } from '../utils/validators';
import { bankLogos } from '../data/bankLogos';
import BankLogo from './BankLogo';

interface AccountFormProps {
  account?: Account;
  onSubmit: (account: Omit<Account, 'id' | 'transactions'>) => void;
  onCancel: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ account, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    label: account?.label || '',
    type: account?.type || 'CHECKING',
    initialBalance: account?.initialBalance?.toString() || '0',
    bankId: account?.bankId || ''
  });
  const [balanceError, setBalanceError] = React.useState<string>('');

  const accountTypes: AccountType[] = ['CHECKING', 'LIVRET_A', 'LDDS', 'PEL', 'PEA', 'PER'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceValue = parseFloat(formData.initialBalance) || 0;
    
    if (!validateBalance(formData.type as AccountType, balanceValue)) {
      setBalanceError(getBalanceErrorMessage(formData.type as AccountType));
      return;
    }

    onSubmit({
      label: formData.label,
      type: formData.type as AccountType,
      initialBalance: balanceValue,
      bankId: formData.bankId || undefined
    });
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, initialBalance: value });
      
      const balanceValue = parseFloat(value) || 0;
      if (!validateBalance(formData.type as AccountType, balanceValue)) {
        setBalanceError(getBalanceErrorMessage(formData.type as AccountType));
      } else {
        setBalanceError('');
      }
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as AccountType;
    setFormData({ ...formData, type: newType });
    
    const balanceValue = parseFloat(formData.initialBalance) || 0;
    if (!validateBalance(newType, balanceValue)) {
      setBalanceError(getBalanceErrorMessage(newType));
    } else {
      setBalanceError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bankId" className="block text-sm font-medium text-gray-700 mb-2">
          Banque
        </label>
        <div className="grid grid-cols-3 gap-4">
          {bankLogos.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => setFormData({ ...formData, bankId: bank.id })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.bankId === bank.id
                  ? 'border-gray-500 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <BankLogo bankId={bank.id} size="lg" />
                <span className="text-sm text-gray-600">{bank.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700">
          Libellé
        </label>
        <input
          type="text"
          id="label"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type de compte
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          {accountTypes.map((type) => (
            <option key={type} value={type}>
              {getAccountTypeLabel(type)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700">
          Solde initial
        </label>
        <input
          type="text"
          inputMode="decimal"
          id="initialBalance"
          value={formData.initialBalance}
          onChange={handleBalanceChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-gray-500 ${
            balanceError 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-gray-500'
          }`}
          required
          placeholder="0.00"
        />
        {balanceError && (
          <p className="mt-1 text-sm text-red-600">{balanceError}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700"
          disabled={!!balanceError}
        >
          {account ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;