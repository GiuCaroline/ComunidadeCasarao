import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const systemTheme = Appearance.getColorScheme(); // dark | light
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    NativeWindStyleSheet.setColorScheme(theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
