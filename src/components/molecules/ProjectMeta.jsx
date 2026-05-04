import { User, Calendar, Briefcase, Cpu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";

const FIELDS = [
  { key: "role", label: { it: "Ruolo", en: "Role" }, icon: User },
  { key: "year", label: { it: "Anno", en: "Year" }, icon: Calendar },
  { key: "client", label: { it: "Cliente", en: "Client" }, icon: Briefcase },
  { key: "tech", label: { it: "Stack", en: "Stack" }, icon: Cpu },
];

export function ProjectMeta({ metadata = {} }) {
  const { theme } = useTheme();
  const { t } = useLocale();
  return (
    <div
      className="grid grid-cols-2 gap-4 pt-6 border-t mt-auto relative z-10"
      style={{ borderColor: `${theme.accent}22` }}
    >
      {FIELDS.map(({ key, label, icon: Icon }) => (
        <div key={key} className="flex items-start gap-3">
          <div
            className="p-2 rounded-md border"
            style={{
              backgroundColor: `${theme.accent}15`,
              color: theme.accent,
              borderColor: `${theme.accent}33`,
            }}
          >
            <Icon size={16} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
              {t(label)}
            </p>
            <p className="text-sm text-zinc-200 font-semibold truncate max-w-[140px]">
              {t(metadata[key]) || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
