import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme, themes } from '../contexts/ThemeContext';

interface DateRangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onQuickSelect?: (range: 'week' | 'month' | 'quarter' | 'year') => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onQuickSelect
}) => {
  const { theme } = useTheme();
  const currentTheme = themes[theme];

  const handleQuickSelect = (range: 'week' | 'month' | 'quarter' | 'year') => {
    const end = new Date();
    const start = new Date();

    switch (range) {
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(end.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(end.getMonth() - 3);
        break;
      case 'year':
        start.setFullYear(end.getFullYear() - 1);
        break;
    }

    onStartDateChange(start);
    onEndDateChange(end);
    onQuickSelect?.(range);
  };

  return (
    <div className={`${currentTheme.surface} rounded-lg shadow-sm p-4`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-6">
          <div>
            <label htmlFor="start-date" className={`block text-sm font-medium ${currentTheme.textMuted} mb-1`}>
              Date de début
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className={`h-5 w-5 ${currentTheme.textMuted}`} />
              </div>
              <input
                type="date"
                id="start-date"
                value={startDate.toISOString().split('T')[0]}
                onChange={(e) => onStartDateChange(new Date(e.target.value))}
                max={endDate.toISOString().split('T')[0]}
                className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="end-date" className={`block text-sm font-medium ${currentTheme.textMuted} mb-1`}>
              Date de fin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className={`h-5 w-5 ${currentTheme.textMuted}`} />
              </div>
              <input
                type="date"
                id="end-date"
                value={endDate.toISOString().split('T')[0]}
                onChange={(e) => onEndDateChange(new Date(e.target.value))}
                min={startDate.toISOString().split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
                className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuickSelect('week')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentTheme.button.secondary}`}
          >
            7 derniers jours
          </button>
          <button
            onClick={() => handleQuickSelect('month')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentTheme.button.secondary}`}
          >
            30 derniers jours
          </button>
          <button
            onClick={() => handleQuickSelect('quarter')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentTheme.button.secondary}`}
          >
            3 derniers mois
          </button>
          <button
            onClick={() => handleQuickSelect('year')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${currentTheme.button.secondary}`}
          >
            12 derniers mois
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;