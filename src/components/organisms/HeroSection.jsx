import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { PROFILE } from "../../data/profile";
import { STRINGS } from "../../data/strings";
import { PulseDot } from "../atoms/PulseDot";
import { ContactSocialBar } from "../molecules/ContactSocialBar";
import { TextGenerateEffect } from "../atoms/effects/TextGenerateEffect";
import { CardContainer, CardBody, CardItem } from "../atoms/effects/ThreeDCard";

export function HeroSection() {
  const { theme } = useTheme();
  const { locale, t } = useLocale();
  const s = STRINGS[locale];
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen pointer-events-none">
      <motion.section
        style={{ opacity }}
        className="relative h-full flex flex-col items-center justify-center px-4 w-full z-10"
      >
        <div className="max-w-4xl text-center relative z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-md transition-colors duration-500"
              style={{
                backgroundColor: `${theme.accent}11`,
                borderColor: `${theme.accent}33`,
              }}
            >
              <PulseDot size="xs" color={theme.accent} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.3em]"
                style={{ color: theme.primary }}
              >
                {s.hero.available}
              </span>
            </div>

            <CardContainer className="inter-var mb-8">
              <CardBody className="bg-transparent relative group/card w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/[0.2] overflow-hidden transition-all duration-500">
                <CardItem translateZ="100" className="w-full h-full">
                  <img
                    src={PROFILE.image}
                    className="h-full w-full object-cover rounded-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    alt={PROFILE.name}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>

            <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-6">
              {PROFILE.name}
            </h1>

            <p
              className="text-xl md:text-4xl font-medium tracking-tight mb-8 transition-all duration-500"
              style={{ color: `${theme.primary}ee` }}
            >
              {t(PROFILE.title)}
            </p>

            <TextGenerateEffect
              key={locale}
              words={t(PROFILE.description)}
              className="mt-8 text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
            />

            <div className="mt-12 flex flex-col items-center justify-center gap-10">
              <ContactSocialBar />

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-4 mt-8"
              >
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-xs md:text-sm font-black uppercase tracking-[0.3em] px-8 py-3 rounded-full border-2 bg-[#020617]/80 backdrop-blur-xl transition-all duration-500 cursor-pointer hover:bg-white/5"
                  style={{
                    color: theme.accent,
                    borderColor: theme.accent,
                    boxShadow: `0 0 40px ${theme.accent}88, inset 0 0 20px ${theme.accent}44`,
                  }}
                >
                  {s.hero.explore}
                </motion.span>
                <div
                  className="w-[3px] h-24 rounded-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom, ${theme.accent}, transparent)`,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
