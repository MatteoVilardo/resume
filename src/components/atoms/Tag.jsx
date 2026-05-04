import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

const SIZES = {
  xs: "px-2 py-0.5 text-[9px]",
  sm: "px-2 py-1 text-[10px]",
  md: "px-3 py-1 text-xs",
};

export function Tag({ children, size = "sm", active = false, className }) {
  const { theme } = useTheme();
  return (
    <span
      className={cn(
        "rounded-md font-medium uppercase tracking-tighter border transition-colors duration-300",
        SIZES[size],
        className
      )}
      style={{
        backgroundColor: active ? theme.accent : `${theme.accent}15`,
        color: active ? "#000" : theme.primary,
        borderColor: `${theme.accent}33`,
      }}
    >
      {children}
    </span>
  );
}
