import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

export function ThemeSwitcher() {
  const { themeKey, setThemeKey, themes } = useTheme();
  return (
    <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3">
      {Object.entries(themes).map(([key, t]) => (
        <button
          key={key}
          onClick={() => setThemeKey(key)}
          className={cn(
            "p-3 rounded-full border transition-all duration-300 backdrop-blur-md group relative cursor-pointer pointer-events-auto",
            themeKey === key
              ? "bg-white/10 border-white/40 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              : "bg-black/40 border-white/10 hover:border-white/20"
          )}
          title={t.name}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: t.accent }}
          />
          <span className="absolute right-full mr-3 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {t.name} Palette
          </span>
        </button>
      ))}
    </div>
  );
}
