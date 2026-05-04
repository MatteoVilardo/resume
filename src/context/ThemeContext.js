import { createContext, useContext, useState, useMemo } from "react";
import { THEMES, DEFAULT_THEME_KEY } from "../data/themes";

const ThemeContext = createContext(null);

export function ThemeProvider({ children, defaultKey = DEFAULT_THEME_KEY }) {
  const [themeKey, setThemeKey] = useState(defaultKey);

  const value = useMemo(
    () => ({
      themeKey,
      setThemeKey,
      theme: THEMES[themeKey],
      themes: THEMES,
    }),
    [themeKey]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}
