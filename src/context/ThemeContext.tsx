import React, { createContext, useState, useContext } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    card: string;
    special?: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = {
    background: isDarkMode ? '#151515' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    card: isDarkMode ? '#575656' : '#f9f9f9',
    special: isDarkMode ? '#575656' : '#f9f9f9',
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
