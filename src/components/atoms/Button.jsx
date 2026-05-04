import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";

export function Button({
  children,
  type = "button",
  variant = "solid",
  className,
  onClick,
  ...rest
}) {
  const { theme } = useTheme();

  if (variant === "ghost") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "px-4 py-2 rounded-lg text-xs font-bold border bg-white/5 text-zinc-300 hover:text-white transition-all duration-300",
          className
        )}
        style={{ borderColor: `${theme.accent}44` }}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "px-8 py-4 rounded-xl text-black font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      style={{
        backgroundColor: theme.accent,
        boxShadow: `0 0 20px ${theme.accent}66`,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
