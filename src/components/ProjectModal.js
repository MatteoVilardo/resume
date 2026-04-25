import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, User, Briefcase, Cpu } from "lucide-react";
import { cn } from "./utils/cn";

export const ProjectModal = ({ project, isOpen, onClose, theme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const accent = theme?.accent || "#3b82f6";
  const primary = theme?.primary || "#60a5fa";

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id]);

  if (!project) return null;

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-zinc-950 border shadow-3xl flex flex-col md:flex-row max-h-[85vh]"
            style={{ borderColor: `${accent}33`, boxShadow: `0 0 50px ${accent}22` }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 text-white/70 hover:text-white transition-all border hover:bg-black/80"
              style={{ borderColor: `${accent}44` }}
            >
              <X size={20} />
            </button>

            {/* Left: Image Carousel */}
            <div className="relative w-full md:w-1/2 bg-black overflow-hidden group aspect-[4/3] md:aspect-auto border-r" style={{ borderColor: `${accent}22` }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - ${currentImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/800x600/1a1a1a/ffffff?text=" + encodeURIComponent(project.title);
                  }}
                />
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2 rounded-full bg-black/60 text-white border opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                    style={{ borderColor: `${accent}44` }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-2 rounded-full bg-black/60 text-white border opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                    style={{ borderColor: `${accent}44` }}
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-[110]">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          index === currentImageIndex ? "w-6" : "w-1.5 opacity-50"
                        )}
                        style={{ backgroundColor: index === currentImageIndex ? accent : "white" }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto bg-zinc-950 flex flex-col relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
              
              <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border"
                    style={{ 
                      backgroundColor: `${accent}15`, 
                      color: primary,
                      borderColor: `${accent}33`
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight relative z-10">{project.title}</h2>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium relative z-10">
                {project.longDescription || project.description}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t mt-auto relative z-10" style={{ borderColor: `${accent}22` }}>
                <MetaItem icon={<User size={14} />} label="Role" value={project.metadata?.role} themeColor={accent} />
                <MetaItem icon={<Calendar size={14} />} label="Year" value={project.metadata?.year} themeColor={accent} />
                <MetaItem icon={<Briefcase size={14} />} label="Client" value={project.metadata?.client} themeColor={accent} />
                <MetaItem icon={<Cpu size={14} />} label="Stack" value={project.metadata?.tech} themeColor={accent} />
              </div>
              
              <div className="mt-8 relative z-10">
                <button 
                  onClick={onClose}
                  className="w-full py-3 rounded-xl text-black text-sm font-bold transition-all active:scale-[0.98]"
                  style={{ 
                    backgroundColor: accent,
                    boxShadow: `0 0 20px ${accent}44`
                  }}
                >
                  Close Project
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const MetaItem = ({ icon, label, value, themeColor }) => (
  <div className="flex items-start gap-2.5">
    <div 
      className="p-1.5 rounded-md border"
      style={{ 
        backgroundColor: `${themeColor}15`, 
        color: themeColor,
        borderColor: `${themeColor}33`
      }}
    >
      {icon}
    </div>
    <div>
      <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">{label}</p>
      <p className="text-[11px] text-zinc-200 font-semibold truncate max-w-[100px]">{value || "N/A"}</p>
    </div>
  </div>
);
