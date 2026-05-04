import { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LOADING_DURATION_MS = 900;

export const Preloader = memo(function Preloader() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020617] backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                style={{
                  borderColor: `${theme.accent}22`,
                  borderTopColor: theme.accent,
                }}
              />
              <div
                className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin-reverse"
                style={{
                  borderColor: `${theme.primary}22`,
                  borderBottomColor: theme.primary,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Terminal
                  size={32}
                  style={{ color: theme.accent }}
                  className="animate-pulse"
                />
              </div>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-2xl font-bold tracking-[0.5em] uppercase"
                style={{ color: theme.primary }}
              >
                Initializing
              </motion.h2>
            </div>
            <motion.div
              className="h-1 w-48 rounded-full overflow-hidden"
              style={{ backgroundColor: `${theme.accent}22` }}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full w-full"
                style={{ backgroundColor: theme.accent }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
