import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = Theme | "system";

const THEME_OVERRIDE_KEY = "tya-theme-override-v2";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemePreference;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  switchable = false,
}: ThemeProviderProps) {
  const [savedTheme, setSavedTheme] = useState<Theme | null>(null);
  const [systemTheme, setSystemTheme] = useState<Theme>(defaultTheme === "dark" ? "dark" : "light");
  const systemDefault = defaultTheme === "system" ? systemTheme : defaultTheme;
  const theme = switchable ? (savedTheme ?? systemDefault) : systemDefault;

  useEffect(() => {
    if (!switchable) return;
    try {
      const stored = localStorage.getItem(THEME_OVERRIDE_KEY);
      if (stored === "light" || stored === "dark") setSavedTheme(stored);
    } catch {
      // The default theme still works when browser storage is unavailable.
    }
  }, [switchable]);

  useEffect(() => {
    if ((switchable && savedTheme) || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event: MediaQueryListEvent) => setSystemTheme(event.matches ? "dark" : "light");
    setSystemTheme(media.matches ? "dark" : "light");
    if (media.addEventListener) {
      media.addEventListener("change", updateSystemTheme);
      return () => media.removeEventListener("change", updateSystemTheme);
    }
    media.addListener(updateSystemTheme);
    return () => media.removeListener(updateSystemTheme);
  }, [savedTheme, switchable]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const chooseTheme = (nextTheme: Theme) => {
    if (!switchable) return;
    setSavedTheme(nextTheme);
    try {
      localStorage.setItem(THEME_OVERRIDE_KEY, nextTheme);
    } catch {
      // The current selection still applies when browser storage is unavailable.
    }
  };

  const toggleTheme = switchable
    ? () => {
        chooseTheme(theme === "light" ? "dark" : "light");
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, setTheme: chooseTheme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
