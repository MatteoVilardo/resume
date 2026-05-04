import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../utils/cn";
import { Icon } from "../atoms/Icon";
import { NAV_ITEMS } from "../../data/navigation";
import { useLocale } from "../../context/LocaleContext";

const CONTACT_LABEL = { it: "Contatti", en: "Contact" };

export function FloatingNavbar({ className }) {
  const { t } = useLocale();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;
    if (scrollYProgress.get() < 0.05) {
      setVisible(false);
      return;
    }
    const direction = current - scrollYProgress.getPrevious();
    setVisible(direction < 0);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/50 backdrop-blur-md z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className="relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
          >
            <span className="block sm:hidden">
              <Icon name={item.icon} size={20} />
            </span>
            <span className="hidden sm:block text-sm">{t(item.name)}</span>
          </a>
        ))}
        <a
          href="#contact"
          className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full"
        >
          <span>{t(CONTACT_LABEL)}</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
