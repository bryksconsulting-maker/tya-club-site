import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [savedTheme, setSavedTheme] = useState<Theme | null>(() => {
    if (!switchable) return null;
    try {
      const stored = localStorage.getItem("theme");
      return stored === "light" || stored === "dark" ? stored : null;
    } catch {
      return null;
    }
  });
  const [systemTheme, setSystemTheme] = useState<Theme>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return defaultTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const theme = switchable ? (savedTheme ?? systemTheme) : defaultTheme;

  useEffect(() => {
    if (!switchable || savedTheme) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event: MediaQueryListEvent) => setSystemTheme(event.matches ? "dark" : "light");
    setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener?.("change", updateSystemTheme);
    return () => media.removeEventListener?.("change", updateSystemTheme);
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
      localStorage.setItem("theme", nextTheme);
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
