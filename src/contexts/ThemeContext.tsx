import React, { createContext, useContext, useState } from 'react';

export type ThemeName = 'default' | 'sombre';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = {
  default: {
    primary: 'bg-gray-600',
    primaryHover: 'hover:bg-gray-100',
    primaryText: 'text-gray-600',
    secondary: 'bg-gray-50',
    accent: 'bg-gray-700',
    surface: 'bg-white',
    border: 'border-gray-200',
    text: 'text-gray-800',
    textMuted: 'text-gray-500',
    success: 'text-emerald-600',
    error: 'text-red-600',
    card: {
      base: 'bg-white',
      hover: 'hover:shadow-md',
      checking: {
        positive: 'bg-emerald-50 border-emerald-200',
        negative: 'bg-rose-50 border-rose-200',
        neutral: 'bg-gray-50 border-gray-200'
      },
      savings: 'bg-blue-50 border-blue-200'
    },
    button: {
      primary: 'bg-gray-600 hover:bg-gray-700 text-white',
      secondary: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
    }
  },
  sombre: {
    primary: 'bg-gray-900',
    primaryHover: 'hover:bg-gray-800',
    primaryText: 'text-gray-300',
    secondary: 'bg-gray-900',
    accent: 'bg-gray-900',
    surface: 'bg-gray-900',
    border: 'border-gray-800',
    text: 'text-gray-100',
    textMuted: 'text-gray-400',
    success: 'text-blue-400',
    error: 'text-red-400',
    card: {
      base: 'bg-gray-800',
      hover: 'hover:shadow-md',
      checking: {
        positive: 'bg-gray-800 border-blue-800 text-blue-100',
        negative: 'bg-gray-800 border-red-800 text-red-100',
        neutral: 'bg-gray-800 border-gray-700'
      },
      savings: 'bg-gray-800 border-gray-700'
    },
    button: {
      primary: 'bg-gray-800 hover:bg-gray-700 text-white',
      secondary: 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
    }
  }
};

export const themeNames: Record<ThemeName, string> = {
  default: 'Défaut',
  sombre: 'Sombre'
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>('default');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};