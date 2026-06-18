import React, { createContext, useState, useContext } from 'react';

// 1. Define the shape of our context
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    card: string;
  };
};

// 2. Create the Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the Provider Component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Pre-define your color palettes here so you don't have to write them on every screen
  const colors = {
    background: isDarkMode ? '#151515' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    card: isDarkMode ? '#575656' : '#f9f9f9', // Great for product cards or bottom bars
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Create a custom hook for easy access (just like useCart)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}