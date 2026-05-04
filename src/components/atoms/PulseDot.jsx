import { memo } from "react";
import { cn } from "../../utils/cn";

const SIZES = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-3 w-3",
  lg: "h-5 w-5",
};

export const PulseDot = memo(function PulseDot({
  size = "md",
  color,
  active = true,
  className,
}) {
  return (
    <div className={cn("relative flex shrink-0", SIZES[size], className)}>
      {active && (
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
      )}
      <span
        className={cn(
          "relative inline-flex rounded-full h-full w-full border border-black/20",
          !active && "opacity-50"
        )}
        style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
      />
    </div>
  );
});
