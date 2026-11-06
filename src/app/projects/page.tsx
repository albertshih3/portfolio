"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Sidebar from "@/components/sidebar/sidebar";
import ProjectTabs, { type Project } from "@/components/projects/project-tabs";
import ProjectDetailModal from "@/components/projects/project-detail-modal";
import ContactModal from "@/components/contact/contact-modal";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export default function Projects() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, "contact_button_click", { button_source: source, page: "projects" });
    }
    setIsContactModalOpen(true);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Sidebar onContactClick={() => handleContactClick("sidebar")} />

      <main className="lg:ml-72">
        <div className="pt-12 px-6 lg:px-12 pb-12 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-50 mb-3 tracking-tight text-balance">
              Projects
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
              A selection of professional, personal, and academic work.
            </p>
          </motion.div>

          <ProjectTabs onProjectClick={handleProjectClick} />
        </div>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <ProjectDetailModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
}
