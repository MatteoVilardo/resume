import { memo } from "react";
import { useTheme } from "../../context/ThemeContext";

export const ContactIcon = memo(function ContactIcon({
  icon,
  href,
  isExternal,
  label,
}) {
  const { theme } = useTheme();
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative p-4 text-slate-400 hover:text-white transition-all duration-300 flex flex-col items-center"
    >
      <div
        className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 border bg-current/10"
        style={{ color: theme.accent, borderColor: `${theme.accent}33` }}
      />
      <div className="relative z-10 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {label && (
        <span
          className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-all duration-200 text-[10px] font-bold uppercase tracking-widest bg-[#020617] px-2 py-1 border rounded-md backdrop-blur-md whitespace-nowrap"
          style={{ color: theme.accent, borderColor: `${theme.accent}44` }}
        >
          {label}
        </span>
      )}
    </a>
  );
});
