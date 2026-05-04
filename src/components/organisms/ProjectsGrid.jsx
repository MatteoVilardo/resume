import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../../data/projects";
import { STRINGS, PROJECT_FILTERS } from "../../data/strings";
import { useLocale } from "../../context/LocaleContext";
import { SectionHeading } from "../molecules/SectionHeading";
import { ProjectFilterBar } from "../molecules/ProjectFilterBar";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function ProjectsGrid() {
  const { locale } = useLocale();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const { title, subtitle, description } = STRINGS[locale].sections.projects;
  const visibleProjects = PROJECTS.filter(
    (p) => activeFilter === "All" || (p.categories || []).includes(activeFilter)
  );

  return (
    <section id="projects" className="py-32 px-4 relative pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <ProjectFilterBar
          filters={PROJECT_FILTERS}
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
