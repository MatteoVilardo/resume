import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";

export function ProjectFilterBar({ filters, active, onChange }) {
  const { theme } = useTheme();
  const { t } = useLocale();
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-16 relative z-20">
      {filters.map((filter) => {
        const value = typeof filter === "string" ? filter : filter.value;
        const label = typeof filter === "string" ? filter : filter.label;
        const isActive = value === active;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border backdrop-blur-md",
              isActive
                ? "text-black border-transparent"
                : "bg-white/5 text-zinc-400 hover:text-white"
            )}
            style={{
              backgroundColor: isActive ? theme.accent : undefined,
              borderColor: !isActive ? `${theme.accent}44` : undefined,
              boxShadow: isActive ? `0 0 20px ${theme.accent}66` : "none",
            }}
          >
            {t(label)}
          </button>
        );
      })}
    </div>
  );
}
