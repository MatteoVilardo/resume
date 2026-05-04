import { motion } from "framer-motion";
import { Icon } from "../atoms/Icon";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";

export function TechItem({ name, level, icon, color }) {
  const { theme } = useTheme();
  const { t } = useLocale();
  return (
    <motion.div
      whileHover={{ x: 10 }}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-current/5 transition-all duration-300"
      style={{ borderColor: `${theme.accent}22` }}
    >
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 text-white">
          <div
            className="p-2 rounded-lg bg-[#020617] border border-white/5 transition-colors"
            style={{ borderColor: `${theme.accent}33` }}
          >
            <Icon name={icon} size={24} className={color} />
          </div>
          <div>
            <h5
              className="font-bold text-lg transition-colors"
              style={{ color: theme.primary }}
            >
              {t(name)}
            </h5>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
              {t(level)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
