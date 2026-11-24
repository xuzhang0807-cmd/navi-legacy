import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeName = "light" | "dark";

/** 与 index.html 里首屏脚本使用的键名一致。 */
const STORAGE_KEY = "navi.theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

type ThemeContextValue = { theme: ThemeName; toggleTheme: () => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): ThemeName | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): ThemeName {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/** 未手动选择时跟随系统；手动切换后记住选择。 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [explicit, setExplicit] = useState<ThemeName | null>(readStoredTheme);
  const [system, setSystem] = useState<ThemeName>(systemTheme);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onChange = () => setSystem(media.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (explicit) root.dataset.theme = explicit;
    else delete root.dataset.theme;
  }, [explicit]);

  const theme = explicit ?? system;
  const toggleTheme = useCallback(() => {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    setExplicit(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* 无法保存时仅本页生效 */ }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
