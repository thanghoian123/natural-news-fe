import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem('theme') || 'system'; // 'light', 'dark', or 'system'
  const [theme, setTheme] = useState(savedTheme);
  const [curTheme, setCurTheme] = useState(savedTheme);

  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (t) => {
    const root = document.documentElement;
    const body = document.body;

    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('ThemeDark');
      body.classList.remove('ThemeLight');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      body.classList.remove('ThemeDark');
      body.classList.add('ThemeLight');
    }
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    const current = theme === 'system' ? getSystemTheme() : theme;

    applyTheme(current);
    setCurTheme(current);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemChangeHandler = (e) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', systemChangeHandler);
    return () => mediaQuery.removeEventListener('change', systemChangeHandler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, curTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
