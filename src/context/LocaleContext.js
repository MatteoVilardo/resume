import { createContext, useContext, useState, useMemo, useCallback } from "react";

const STORAGE_KEY = "locale";
const SUPPORTED = ["it", "en"];

function detectInitial() {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(stored)) return stored;
  } catch {}
  const lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  return lang.startsWith("it") ? "it" : "en";
}

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectInitial);

  const setLocale = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const t = useCallback(
    (value) => {
      if (value == null) return "";
      if (typeof value === "string" || typeof value === "number") return value;
      if (Array.isArray(value)) return value;
      if (typeof value === "object") {
        return value[locale] ?? value.en ?? value.it ?? "";
      }
      return String(value);
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, locales: SUPPORTED }),
    [locale, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
