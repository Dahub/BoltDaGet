import React, { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useTheme, themes, themeNames, ThemeName } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = themes[theme];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors ${currentTheme.textMuted} ${currentTheme.primaryHover}`}
        title="Changer le thème"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 ${currentTheme.surface} rounded-md shadow-lg ${currentTheme.border} border z-50`}>
          {(Object.keys(themeNames) as ThemeName[]).map((themeName) => (
            <button
              key={themeName}
              onClick={() => {
                setTheme(themeName);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2 text-sm text-left ${
                theme === themeName 
                  ? `${currentTheme.text} ${currentTheme.secondary}`
                  : `${currentTheme.textMuted} hover:${currentTheme.secondary}`
              }`}
            >
              {themeNames[themeName]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;