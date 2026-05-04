import { cn } from "../../utils/cn";
import { useLocale } from "../../context/LocaleContext";
import { useTheme } from "../../context/ThemeContext";

const LABELS = {
  it: "IT",
  en: "EN",
};

export function LanguageSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const { theme } = useTheme();

  return (
    <div className="fixed top-24 left-6 z-[100] flex flex-col gap-3 pointer-events-auto">
      {locales.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            onClick={() => setLocale(code)}
            className={cn(
              "w-12 h-12 rounded-full border text-xs font-black tracking-widest backdrop-blur-md transition-all duration-300 cursor-pointer",
              isActive
                ? "bg-white/10 border-white/40 scale-110 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "bg-black/40 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
            )}
            style={
              isActive
                ? {
                    borderColor: theme.accent,
                    color: theme.accent,
                    boxShadow: `0 0 20px ${theme.accent}66, inset 0 0 12px ${theme.accent}33`,
                  }
                : undefined
            }
            title={code.toUpperCase()}
          >
            {LABELS[code] || code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
