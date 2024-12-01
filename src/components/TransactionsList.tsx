import React from 'react';
import { Transaction } from '../types/transaction';
import { formatCurrency } from '../utils/formatters';
import { getCategoryLabel } from '../types/transaction';
import { Calendar, Tag, Trash2, Pencil } from 'lucide-react';

interface TransactionsListProps {
  transactions: Transaction[];
  onToggleValidation?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions,
  onToggleValidation,
  onDelete,
  onEdit
}) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`p-4 rounded-lg border ${
            transaction.validated 
              ? 'bg-white'
              : 'bg-gray-50 border-dashed'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`text-lg font-semibold ${
                transaction.type === 'CREDIT' 
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'CREDIT' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </div>
              <span className="text-gray-600">{transaction.label}</span>
            </div>
            <div className="flex items-center space-x-4">
              {onToggleValidation && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={transaction.validated}
                    onChange={() => onToggleValidation(transaction.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                  <span className="sr-only">
                    {transaction.validated ? "Dévalider l'opération" : "Valider l'opération"}
                  </span>
                </label>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(transaction)}
                  className="p-1.5 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-50 transition-colors"
                  title="Modifier l'opération"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette opération ?')) {
                      onDelete(transaction.id);
                    }
                  }}
                  className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  title="Supprimer l'opération"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-4 h-4" />
              <span>{getCategoryLabel(transaction.category)}</span>
            </div>
          </div>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          Aucune opération à afficher
        </div>
      )}
    </div>
  );
};

export default TransactionsList;