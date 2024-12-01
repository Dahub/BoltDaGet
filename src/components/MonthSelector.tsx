import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedDate, onDateChange }) => {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onDateChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onDateChange(newDate);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
      <button
        onClick={handlePreviousMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center space-x-3">
        <select
          value={selectedDate.getMonth()}
          onChange={(e) => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(parseInt(e.target.value));
            onDateChange(newDate);
          }}
          className="text-lg font-medium bg-transparent border-none focus:ring-0"
        >
          {months.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </select>
        <select
          value={selectedDate.getFullYear()}
          onChange={(e) => {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(parseInt(e.target.value));
            onDateChange(newDate);
          }}
          className="text-lg font-medium bg-transparent border-none focus:ring-0"
        >
          {Array.from({ length: 5 }, (_, i) => selectedDate.getFullYear() - 2 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MonthSelector;