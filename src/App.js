import React, { useState, useRef, useEffect, memo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { DATA } from "./data";
import { BackgroundBeams } from "./components/BackgroundBeams";
import { TextGenerateEffect } from "./components/TextGenerateEffect";
import { BentoGrid, BentoGridItem } from "./components/BentoGrid";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectModal } from "./components/ProjectModal";
import { TracingBeam } from "./components/TracingBeam";
import { SparklesCore } from "./components/Sparkles";
import { FloatingNav } from "./components/FloatingNavbar";
import { InfiniteMovingCards } from "./components/InfiniteMovingCards";
import { AuroraBackground } from "./components/AuroraBackground";
import { DSSBackground } from "./components/DSSBackground";
import { CardContainer, CardBody, CardItem } from "./components/ThreeDCard";
import { cn } from "./components/utils/cn";
import { 
  Code, Cpu, Globe, Database, Terminal, 
  ExternalLink, Mail, Home, Briefcase, Layers,
  FileDown, Palette
} from "lucide-react";

const navItems = [
  { name: "Home", link: "#", icon: <Home size={20} /> },
  { name: "Projects", link: "#projects", icon: <Layers size={20} /> },
  { name: "Experience", link: "#experience", icon: <Briefcase size={20} /> },
  { name: "Skills", link: "#tech", icon: <Cpu size={20} /> },
];

const techQuotes = [
  { quote: "Unity è lo standard industriale per il tempo reale 3D, dai giochi alle simulazioni industriali.", name: "Unity Engine", title: "Game & Simulation" },
  { quote: "Asp Net Core offre prestazioni e scalabilità imbattibili per backend enterprise.", name: ".NET Core", title: "Backend Development" },
  { quote: "React e Tailwind permettono di creare interfacce moderne, veloci e altamente personalizzabili.", name: "React JS", title: "Frontend Development" },
  { quote: "Le esperienze VR/AR trasformano il modo in cui interagiamo con i dati e la realtà.", name: "Meta Quest / VR", title: "Immersive Tech" },
];

const techGroups = [
  {
    category: "Languages & Core",
    items: [
      { name: "C#", level: "Expert", icon: <Code className="text-purple-500" /> },
      { name: "Asp Net Core", level: "Senior", icon: <Terminal className="text-blue-500" /> },
      { name: "Javascript/TS", level: "Advanced", icon: <Globe className="text-yellow-500" /> },
    ]
  },
  {
    category: "Engines & Tools",
    items: [
      { name: "Unity", level: "Expert", icon: <Cpu className="text-indigo-500" /> },
      { name: "PostgreSQL", level: "Senior", icon: <Database className="text-cyan-500" /> },
      { name: "React/Angular", level: "Senior", icon: <Globe className="text-sky-500" /> },
    ]
  },
  {
    category: "Immersive & Specialized",
    items: [
      { name: "WebGL / Three.js", level: "Advanced", icon: <Layers className="text-orange-500" /> },
      { name: "VR/AR (Oculus/HTC)", level: "Advanced", icon: <Cpu className="text-emerald-500" /> },
      { name: "Digital Twin / DSS", level: "Senior", icon: <Terminal className="text-rose-500" /> },
    ]
  }
];

// Optimized Preloader Component
const Preloader = memo(({ theme }) => (
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
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: `${theme.accent}22`, borderTopColor: theme.accent }} />
        <div className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin-reverse" style={{ borderColor: `${theme.primary}22`, borderBottomColor: theme.primary }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Terminal size={32} style={{ color: theme.accent }} className="animate-pulse" />
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
));

const LOADING_DURATION_MS = 900; // Tunable loading duration

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [themeKey, setThemeKey] = useState("cyber");
  const currentTheme = DATA.themes[themeKey];
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    // Artificial delay for the reveal effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader theme={currentTheme} />}
      </AnimatePresence>

      <div ref={containerRef} className={cn("relative min-h-screen w-full bg-[#020617] text-white selection:bg-white/20", isLoading ? "h-screen overflow-hidden" : "")}>
        {/* GLOBAL DYNAMIC BACKGROUND */}
        <DSSBackground theme={currentTheme} />
        
        <FloatingNav navItems={navItems} />

        {/* Theme Switcher Floating */}
        <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3">
          {Object.entries(DATA.themes).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setThemeKey(key)}
              className={cn(
                "p-3 rounded-full border transition-all duration-300 backdrop-blur-md group relative",
                themeKey === key 
                  ? "bg-white/10 border-white/40 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                  : "bg-black/40 border-white/10 hover:border-white/20"
              )}
              title={t.name}
            >
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: t.accent }} 
              />
              <span className="absolute right-full mr-3 px-2 py-1 rounded bg-black/80 border border-white/10 text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {t.name} Palette
              </span>
            </button>
          ))}
        </div>

        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
          theme={currentTheme}
        />
        
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="relative h-screen overflow-hidden">
            <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
              <AuroraBackground className="h-full" />
            </motion.div>
            
            <motion.section 
              style={{ opacity: heroOpacity }}
              className="relative h-full flex flex-col items-center justify-center px-4 overflow-hidden w-full z-10"
            >
              <div className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                <SparklesCore
                  id="tsparticleshero"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={50}
                  className="w-full h-full"
                  particleColor={currentTheme.accent}
                />
              </div>
              
              <div className="max-w-4xl text-center relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                >
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-md transition-colors duration-500"
                    style={{ backgroundColor: `${currentTheme.accent}11`, borderColor: `${currentTheme.accent}33` }}
                  >
                    <PulseDot size="xs" color="custom" customColor={currentTheme.accent} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: currentTheme.primary }}>
                      Available for Projects
                    </span>
                  </div>
                  
                  {/* Profile Picture with Aceternity UI Effect */}
                  <CardContainer className="inter-var mb-8">
                    <CardBody className="bg-transparent relative group/card w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/[0.2] overflow-hidden transition-all duration-500">
                      <CardItem
                        translateZ="100"
                        className="w-full h-full"
                      >
                        <img
                          src={DATA.profile.image}
                          className="h-full w-full object-cover rounded-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                          alt={DATA.profile.name}
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>

                  <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-none mb-6">
                    {DATA.profile.name}
                  </h1>
                  
                  <p 
                    className="text-xl md:text-4xl font-medium tracking-tight mb-8 transition-all duration-500"
                    style={{ color: `${currentTheme.primary}ee` }}
                  >
                    {DATA.profile.title}
                  </p>
                  
                  {!isLoading && (
                    <TextGenerateEffect 
                      words={DATA.profile.description} 
                      className="mt-8 text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
                    />
                  )}
                  
                  <div className="mt-12 flex flex-col items-center justify-center gap-10">
                    <div className="flex items-center justify-center gap-6 md:gap-10">
                      <ContactIcon 
                        href={DATA.profile.contacts.linkedin} 
                        themeColor={currentTheme.accent}
                        icon={
                          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        } 
                        isExternal 
                        label="LinkedIn"
                      />
                      <ContactIcon 
                        href={DATA.profile.contacts.upwork} 
                        themeColor={currentTheme.accent}
                        icon={
                          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                            <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076c.417-1.929 1.488-3.414 3.012-3.414 1.05 0 1.834.742 1.834 2.193 0 2.016-1.066 3.524-2 3.524zm1.906-8.625c-2.31 0-4.04 1.637-4.832 3.864-.53 1.472-.88 3.12-1.11 4.67-.85-.92-1.89-1.95-3.07-2.67.54-2.8 1.14-5.91-.71-8.23-1.07-1.34-2.74-2.16-4.63-2.16-3.83 0-6.11 2.87-6.11 6.55v6.92h2.89v-6.92c0-2.17 1.13-3.69 3.22-3.69 1.5 0 2.4 1.05 2.4 3.24v7.37h2.89v-4.14c.82.72 1.7 1.41 2.58 2l-.93 4.38h2.91l.66-3.11c.8.31 1.61.47 2.44.47 2.65 0 4.88-2.15 4.88-5.74 0-4.04-2.22-5.88-4.52-5.88z"/>
                          </svg>
                        } 
                        isExternal 
                        label="Upwork"
                      />
                      <ContactIcon 
                        href={DATA.profile.contacts.cv} 
                        themeColor={currentTheme.accent}
                        icon={<FileDown size={28} />} 
                        isExternal 
                        label="Download CV"
                      />
                      <ContactIcon 
                        href={`mailto:${DATA.profile.contacts.email}`} 
                        themeColor={currentTheme.accent}
                        icon={<Mail size={28} />} 
                        label="Email"
                      />
                    </div>
                    
                    {/* Scroll Indicator */}
                    <motion.div 
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex flex-col items-center gap-4 mt-8"
                    >
                      <span 
                        className="text-xs md:text-sm font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full border-2 bg-[#020617]/80 backdrop-blur-xl shadow-[0_0_30px_rgba(var(--current-color),0.5)] transition-all duration-500"
                        style={{ 
                          color: currentTheme.accent, 
                          borderColor: currentTheme.accent,
                          boxShadow: `0 0 30px ${currentTheme.accent}44`
                        }}
                      >
                        Explore My Work
                      </span>
                      <div className="w-[3px] h-24 rounded-full transition-all duration-500" style={{ background: `linear-gradient(to bottom, ${currentTheme.accent}, transparent)` }} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </div>

          {/* Projects Section */}
          <section id="projects" className="py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <SectionHeading 
                title="Featured" 
                subtitle="Masterpieces" 
                accentColor={currentTheme.accent}
                description="Selezione di progetti che fondono ingegneria e design."
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {DATA.projects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    {...project} 
                    theme={currentTheme}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <SectionHeading 
                title="Professional" 
                subtitle="Journey" 
                accentColor={currentTheme.accent}
                description="Un percorso evolutivo tra simulazione 3D e architetture backend."
              />

              <TracingBeam className="px-6" color={currentTheme.accent}>
                <div className="max-w-2xl mx-auto antialiased pt-4 relative pl-4 md:pl-0">
                  {DATA.experience.map((item, index) => (
                    <motion.div 
                      key={`content-${index}`} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-24 last:mb-0 relative"
                    >
                      <div className="flex items-center gap-4 mb-6 relative">
                        {/* Connecting Line to Timeline */}
                        <div 
                          className="absolute right-full mr-2 md:mr-6 top-1/2 -translate-y-1/2 h-[2px] w-6 md:w-16 rounded-full opacity-50"
                          style={{ background: `linear-gradient(to right, transparent, ${index === 0 ? currentTheme.accent : '#52525b'})` }}
                        />
                        <PulseDot 
                          size={index === 0 ? "lg" : "md"} 
                          color="custom" 
                          customColor={index === 0 ? currentTheme.accent : "#52525b"}
                          active={index === 0}
                        />
                        <div className={cn(
                          "inline-flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md transition-all duration-500",
                          index === 0 ? "border-current bg-current/10" : "bg-zinc-900/50 border-white/10 text-zinc-400"
                        )} style={{ color: index === 0 ? currentTheme.accent : undefined }}>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                            {item.period}
                          </span>
                          {index === 0 && <span className="text-[9px] font-bold opacity-60 ml-2 animate-pulse uppercase">PRESENT</span>}
                        </div>
                      </div>

                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xl font-semibold mb-8 transition-colors duration-500" style={{ color: currentTheme.primary }}>
                        <Briefcase size={18} />
                        <span>{item.company}</span>
                      </div>

                      <div className={cn(
                        "relative p-8 rounded-3xl border backdrop-blur-md transition-all duration-500 group/card",
                        index === 0 ? "border-current bg-current/5 shadow-[0_0_50px] shadow-current/10" : "bg-white/5 border-white/10 hover:border-white/20"
                      )} style={{ color: index === 0 ? `${currentTheme.accent}44` : undefined }}>
                        <ul className="space-y-6">
                          {item.tasks.map((task, i) => (
                            <li key={i} className="text-zinc-300 text-base md:text-lg leading-relaxed flex items-start gap-4">
                              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0 group-hover/card:bg-current transition-colors" style={{ color: currentTheme.accent }} />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TracingBeam>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section id="tech" className="py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
              <SectionHeading 
                title="Tech" 
                subtitle="Ecosystem" 
                accentColor={currentTheme.accent}
                description="Un ecosistema di strumenti per scalabilità e innovazione digitale."
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {techGroups.map((group, idx) => (
                  <div key={idx} className="flex flex-col gap-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-60" style={{ color: currentTheme.accent }}>
                      {group.category}
                    </h4>
                    <div className="space-y-4">
                      {group.items.map((item, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ x: 10 }}
                          className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-current hover:bg-current/5 transition-all duration-300"
                          style={{ color: `${currentTheme.accent}44` }}
                        >
                          <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4 text-white">
                              <div className="p-2 rounded-lg bg-[#020617] border border-white/5 group-hover:border-current transition-colors">
                                {React.cloneElement(item.icon, { size: 24 })}
                              </div>
                              <div>
                                <h5 className="font-bold text-lg text-white group-hover:text-current transition-colors" style={{ color: currentTheme.primary }}>
                                  {item.name}
                                </h5>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                                  {item.level}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-24">
                <InfiniteMovingCards
                  items={techQuotes}
                  direction="right"
                  speed="slow"
                  className="opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-32 border-t border-white/5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-current/5 to-transparent pointer-events-none" style={{ color: currentTheme.accent }} />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter italic">Let's build something epic.</h3>
              <p className="text-zinc-500 text-sm md:text-base mb-12 font-medium tracking-widest uppercase">
                © {new Date().getFullYear()} {DATA.profile.name} • High-End Digital Solutions
              </p>
              <div className="flex justify-center gap-8 items-center" style={{ color: currentTheme.accent }}>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
                <PulseDot size="sm" color="custom" customColor={currentTheme.accent} />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-current to-transparent" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

// Optimized smaller components using memo
const SectionHeading = memo(({ title, subtitle, description, accentColor }) => (
  <div className="flex flex-col items-center text-center mb-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h2 className="text-4xl md:text-8xl font-bold text-white tracking-tighter leading-none">
        {title} <span className="italic drop-shadow-2xl transition-colors duration-500" style={{ color: accentColor }}>{subtitle}</span>
      </h2>
      <div className="h-1.5 w-32 mx-auto rounded-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${accentColor}, #ffffff22)` }} />
      <p className="text-zinc-400 max-w-xl mx-auto text-lg font-medium pt-4">
        {description}
      </p>
    </motion.div>
  </div>
));

const PulseDot = memo(({ size = "md", color = "blue", active = true, className, customColor }) => {
  const sizes = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-5 w-5"
  };
  
  const colors = {
    blue: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.9)]",
    zinc: "bg-zinc-600 shadow-none",
    purple: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]",
    white: "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]",
    custom: ""
  };

  const pingColors = {
    blue: "bg-blue-400",
    zinc: "bg-zinc-500",
    purple: "bg-purple-400",
    white: "bg-white",
    custom: ""
  };

  return (
    <div className={cn("relative flex shrink-0", sizes[size], className)}>
      {active && (
        <span 
          className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pingColors[color])}
          style={color === "custom" ? { backgroundColor: customColor } : {}}
        ></span>
      )}
      <span 
        className={cn(
          "relative inline-flex rounded-full h-full w-full border border-black/20", 
          colors[color],
          !active && "opacity-50"
        )}
        style={color === "custom" ? { backgroundColor: customColor, boxShadow: `0 0 15px ${customColor}` } : {}}
      ></span>
    </div>
  );
});

const ContactIcon = memo(({ icon, href, isExternal, label, themeColor }) => (
  <a 
    href={href} 
    target={isExternal ? "_blank" : undefined} 
    rel={isExternal ? "noopener noreferrer" : undefined}
    className="group relative p-4 text-slate-400 hover:text-white transition-all duration-300 flex flex-col items-center"
  >
    <div 
      className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 border border-current/20 bg-current/10" 
      style={{ color: themeColor }}
    />
    <div className="relative z-10 group-hover:scale-110 transition-transform">{icon}</div>
    {label && (
      <span 
        className="absolute -bottom-8 scale-0 group-hover:scale-100 transition-all duration-200 text-[10px] font-bold uppercase tracking-widest bg-[#020617] px-2 py-1 border rounded-md backdrop-blur-md whitespace-nowrap"
        style={{ color: themeColor, borderColor: `${themeColor}44` }}
      >
        {label}
      </span>
    )}
  </a>
));

export default App;