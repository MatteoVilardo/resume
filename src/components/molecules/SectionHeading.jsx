import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export const SectionHeading = memo(function SectionHeading({
  title,
  subtitle,
  description,
}) {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter leading-none">
          {title}{" "}
          <span
            className="italic drop-shadow-2xl transition-colors duration-500"
            style={{ color: theme.accent }}
          >
            {subtitle}
          </span>
        </h2>
        <div
          className="h-1.5 w-32 mx-auto rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${theme.accent}, #ffffff22)`,
          }}
        />
        <p className="text-zinc-400 max-w-xl mx-auto text-lg font-medium pt-4">
          {description}
        </p>
      </motion.div>
    </div>
  );
});
