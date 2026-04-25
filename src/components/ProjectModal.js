import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Calendar, User, Briefcase, Cpu } from "lucide-react";
import { cn } from "./utils/cn";

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 shadow-3xl flex flex-col md:flex-row max-h-[85vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 text-white/70 hover:text-white transition-all border border-white/10 hover:bg-black/80"
            >
              <X size={20} />
            </button>

            {/* Left: Image Carousel (Fixed 4:3 Aspect Ratio for elegance) */}
            <div className="relative w-full md:w-1/2 bg-neutral-950 overflow-hidden group aspect-[4/3] md:aspect-auto">
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2 rounded-full bg-black/40 text-white border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-2 rounded-full bg-black/40 text-white border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
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
                          "h-1 rounded-full transition-all duration-300",
                          index === currentImageIndex ? "w-6 bg-blue-500" : "w-1 bg-white/20 hover:bg-white/40"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto bg-zinc-900 flex flex-col border-t md:border-t-0 md:border-l border-white/5">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/10">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight">{project.title}</h2>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                {project.longDescription || project.description}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-auto">
                <MetaItem icon={<User size={14} />} label="Role" value={project.metadata?.role} />
                <MetaItem icon={<Calendar size={14} />} label="Year" value={project.metadata?.year} />
                <MetaItem icon={<Briefcase size={14} />} label="Client" value={project.metadata?.client} />
                <MetaItem icon={<Cpu size={14} />} label="Stack" value={project.metadata?.tech} />
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
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

const MetaItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <div className="p-1.5 rounded-md bg-blue-500/5 text-blue-500 border border-blue-500/10">
      {icon}
    </div>
    <div>
      <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold mb-0.5">{label}</p>
      <p className="text-[11px] text-zinc-200 font-semibold truncate max-w-[100px]">{value || "N/A"}</p>
    </div>
  </div>
);