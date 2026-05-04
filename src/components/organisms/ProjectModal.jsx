import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { Tag } from "../atoms/Tag";
import { ProjectMeta } from "../molecules/ProjectMeta";

export function ProjectModal({ project, isOpen, onClose }) {
  const { theme } = useTheme();
  const { t } = useLocale();
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
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
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
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-950 border shadow-3xl flex flex-col md:flex-row max-h-[90vh]"
            style={{
              borderColor: `${theme.accent}33`,
              boxShadow: `0 0 50px ${theme.accent}22`,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 text-white/70 hover:text-white transition-all border hover:bg-black/80"
              style={{ borderColor: `${theme.accent}44` }}
            >
              <X size={20} />
            </button>

            <div
              className="relative w-full md:w-1/2 bg-black overflow-hidden group aspect-[4/3] md:aspect-auto border-r"
              style={{ borderColor: `${theme.accent}22` }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={`${t(project.title)} - ${currentImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/800x600/1a1a1a/ffffff?text=" +
                      encodeURIComponent(t(project.title));
                  }}
                />
              </AnimatePresence>

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] p-2 rounded-full bg-black/60 text-white border opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                    style={{ borderColor: `${theme.accent}44` }}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] p-2 rounded-full bg-black/60 text-white border opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md"
                    style={{ borderColor: `${theme.accent}44` }}
                  >
                    <ChevronRight size={20} />
                  </button>

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
                        style={{
                          backgroundColor:
                            index === currentImageIndex ? theme.accent : "white",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-10 overflow-y-auto bg-zinc-950 flex flex-col relative">
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {project.tags.map((tag) => (
                  <Tag key={tag} size="sm">
                    {tag}
                  </Tag>
                ))}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight relative z-10">
                {t(project.title)}
              </h2>

              <p className="text-zinc-300 text-base leading-relaxed mb-8 font-medium relative z-10">
                {t(project.longDescription || project.description)}
              </p>

              <ProjectMeta metadata={project.metadata} />

              <div className="mt-8 relative z-10">
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl text-black text-base font-bold transition-all active:scale-[0.98]"
                  style={{
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 20px ${theme.accent}44`,
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
}
