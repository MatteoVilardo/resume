import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { PROFILE } from "../../data/profile";
import { STRINGS } from "../../data/strings";
import { PulseDot } from "../atoms/PulseDot";

export function SiteFooter() {
  const { theme } = useTheme();
  const { locale } = useLocale();
  const { tagline, copyright } = STRINGS[locale].sections.footer;

  return (
    <footer className="py-32 border-t border-white/5 text-center relative overflow-hidden pointer-events-auto">
      <div
        className="absolute inset-0 bg-gradient-to-t from-current/5 to-transparent pointer-events-none"
        style={{ color: theme.accent }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter italic">
          {tagline}
        </h3>
        <p className="text-zinc-500 text-sm md:text-base mb-12 font-medium tracking-widest uppercase">
          © {new Date().getFullYear()} {PROFILE.name} • {copyright}
        </p>
        <div
          className="flex justify-center gap-8 items-center"
          style={{ color: theme.accent }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
          <PulseDot size="sm" color={theme.accent} />
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
        </div>
      </div>
    </footer>
  );
}
