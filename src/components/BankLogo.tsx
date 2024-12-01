import React from 'react';
import { Building2 } from 'lucide-react';
import { bankLogos } from '../data/bankLogos';

interface BankLogoProps {
  bankId?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BankLogo: React.FC<BankLogoProps> = ({ 
  bankId, 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  if (!bankId) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}>
        <Building2 className="w-6 h-6 text-gray-400" />
      </div>
    );
  }

  const bank = bankLogos.find(b => b.id === bankId);
  if (!bank) return null;

  return (
    <div 
      className={`bg-white rounded-lg flex items-center justify-center overflow-hidden ${sizeClasses[size]} ${className} border border-gray-200`}
      style={{ backgroundColor: 'white' }}
    >
      <img 
        src={bank.logoUrl} 
        alt={`Logo ${bank.name}`}
        className="w-full h-full object-contain p-1.5"
      />
    </div>
  );
};

export default BankLogo;