import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { cn } from "../../utils/cn";
import { PulseDot } from "../atoms/PulseDot";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";

const PRESENT_LABEL = { it: "ATTUALE", en: "PRESENT" };

export function TimelineEntry({ entry, index, isLatest }) {
  const { theme } = useTheme();
  const { t } = useLocale();
  const dotColor = isLatest ? theme.accent : "#52525b";
  const tasks = t(entry.tasks) || [];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-24 last:mb-0 relative"
    >
      <div className="flex items-center gap-4 mb-6 relative">
        <div
          className="absolute right-full mr-2 md:mr-6 top-1/2 -translate-y-1/2 h-[2px] w-6 md:w-16 rounded-full opacity-50"
          style={{
            background: `linear-gradient(to right, transparent, ${dotColor})`,
          }}
        />
        <PulseDot
          size={isLatest ? "lg" : "md"}
          color={dotColor}
          active={isLatest}
        />
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md transition-all duration-500",
            isLatest ? "" : "bg-zinc-900/50 border-white/10 text-zinc-400"
          )}
          style={
            isLatest
              ? {
                  color: theme.accent,
                  borderColor: theme.accent,
                  backgroundColor: `${theme.accent}1a`,
                }
              : undefined
          }
        >
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {t(entry.period)}
          </span>
          {isLatest && (
            <span className="text-[9px] font-bold opacity-60 ml-2 animate-pulse uppercase">
              {t(PRESENT_LABEL)}
            </span>
          )}
        </div>
      </div>

      <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
        {t(entry.role)}
      </h3>
      <div
        className="flex items-center gap-2 text-xl font-semibold mb-8 transition-colors duration-500"
        style={{ color: theme.primary }}
      >
        <Briefcase size={18} />
        <span>{entry.company}</span>
      </div>

      <div
        className={cn(
          "relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 group/card",
          isLatest ? "" : "bg-white/5 border-white/10 hover:border-white/20"
        )}
        style={
          isLatest
            ? {
                borderColor: `${theme.accent}66`,
                backgroundColor: `${theme.accent}0d`,
                boxShadow: `0 0 50px ${theme.accent}22`,
              }
            : undefined
        }
      >
        <ul className="space-y-6">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="text-zinc-300 text-base md:text-lg leading-relaxed flex items-start gap-4"
            >
              <span
                className="mt-2.5 h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0 group-hover/card:bg-current transition-colors"
                style={{ color: theme.accent }}
              />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
