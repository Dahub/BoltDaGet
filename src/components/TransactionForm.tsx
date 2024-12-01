import React from 'react';
import { Transaction, TransactionType, TransactionCategory, getCategoryLabel } from '../types/transaction';

interface TransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    date: transaction?.date || new Date().toISOString().split('T')[0],
    label: transaction?.label || '',
    category: transaction?.category || 'FOOD' as TransactionCategory,
    type: transaction?.type || 'DEBIT' as TransactionType,
    amount: transaction?.amount?.toString() || '',
    validated: transaction?.validated || false
  });

  const categories: TransactionCategory[] = ['TRANSPORT', 'RENT', 'SALARY', 'FOOD'];
  const types: TransactionType[] = ['DEBIT', 'CREDIT'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
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
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Nature
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as TransactionCategory })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {getCategoryLabel(category)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as TransactionType })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type === 'CREDIT' ? 'Crédit' : 'Débit'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Montant
        </label>
        <input
          type="number"
          id="amount"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="validated"
          checked={formData.validated}
          onChange={(e) => setFormData({ ...formData, validated: e.target.checked })}
          className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
        />
        <label htmlFor="validated" className="ml-2 block text-sm text-gray-700">
          Opération validée
        </label>
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
        >
          {transaction ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;