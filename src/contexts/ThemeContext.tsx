import React, { createContext, useContext, useState } from 'react';

type ColorScheme = 'dark' | 'light';

interface ThemeModeContextValue {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue>({
  colorScheme: 'dark',
  toggleColorScheme: () => {},
});

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('color-scheme') as ColorScheme | null;
    const resolved = saved ?? 'dark';
    document.documentElement.setAttribute('data-theme', resolved);
    return resolved;
  });

  const toggleColorScheme = () => {
    setColorScheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('color-scheme', next);
      return next;
    });
  };

  return (
    <ThemeModeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useColorScheme = () => useContext(ThemeModeContext);
