"use client";

import { useState } from "react";
import type { FC } from "react";
import { motion } from "motion/react";
import projectsData from "@/data/projects.json";
import Image from "next/image";
import Sidebar from "@/components/sidebar/sidebar";
import ProjectCard from "@/components/projects/project-card";
import ProjectDetailModal from "@/components/projects/project-detail-modal";
import ContactModal from "@/components/contact/contact-modal";
import ChatBar from "@/components/chat/chat-bar";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

type Project = {
  name: string;
  description: string;
  language: string;
  topics: string[];
  url: string;
  githubUrl: string;
  overview?: string;
  myRole?: string;
  features?: string[];
  challenges?: string;
  learnings?: string;
};

const workProjects: Project[] = projectsData.workProjects;
const personalProjects: Project[] = projectsData.personalProjects;
const academicProjects: Project[] = projectsData.academicProjects || [];

const projectTabs = [
  { id: "work" as const, label: "Professional Work" },
  { id: "personal" as const, label: "Personal" },
  { id: "academic" as const, label: "Academic" },
] as const;

type TabId = (typeof projectTabs)[number]["id"];

interface TabsProps {
  workProjects: Project[];
  personalProjects: Project[];
  academicProjects: Project[];
  ProjectCard: FC<Project & { onProjectClick?: () => void }>;
  onProjectClick: (project: Project) => void;
}

const Tabs: FC<TabsProps> = ({
  workProjects,
  personalProjects,
  academicProjects,
  ProjectCard,
  onProjectClick,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("work");

  const projectsByTab: Record<TabId, Project[]> = {
    work: workProjects,
    personal: personalProjects,
    academic: academicProjects,
  };
  const activeProjects = projectsByTab[activeTab];

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap" role="tablist" aria-label="Project categories">
        {projectTabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
              activeTab === tab.id
                ? "bg-amber-600 text-white"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="min-h-[200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeProjects.map((project: Project) => (
            <ProjectCard
              key={project.name}
              {...project}
              onProjectClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, "contact_button_click", { button_source: source });
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
        <div className="pt-12 px-6 lg:px-12 pb-12">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20 max-w-6xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="text-amber-600 dark:text-amber-500 font-semibold text-sm uppercase tracking-widest mb-4"
                >
                  Software Engineer @ Palo Alto Networks
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-5xl lg:text-7xl font-display font-bold text-stone-900 dark:text-stone-50 mb-6 leading-tight tracking-tight"
                >
                  Albert Shih
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-stone-600 dark:text-stone-400 mb-8 leading-relaxed max-w-xl"
                >
                  I build software that earns its keep. From an AI-powered
                  health monitoring system to a mobile app that replaced paper
                  workflows at my local zoo — I work best at the
                  intersection of technical depth and real-world impact.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-wrap gap-3"
                >
                  <a
                    href="#projects"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-7 py-3 rounded-lg font-medium transition-colors"
                  >
                    See My Work
                  </a>
                  <button
                    onClick={() => handleContactClick("hero_section")}
                    className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 px-7 py-3 rounded-lg font-medium transition-colors"
                  >
                    Get In Touch
                  </button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center lg:justify-end"
              >
                <Image
                  src="/mainphoto.jpeg"
                  alt="Albert Shih"
                  width={380}
                  height={380}
                  className="rounded-2xl object-cover"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Projects — merged Work / Personal / Academic into one section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            id="projects"
            className="mb-20 max-w-6xl"
          >
            <div className="mb-10">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-stone-900 dark:text-stone-50 mb-3">
                Projects
              </h2>
              <p className="text-stone-500 dark:text-stone-400">
                A selection of professional, personal, and academic work.
              </p>
            </div>
            <Tabs
              workProjects={workProjects}
              personalProjects={personalProjects}
              academicProjects={academicProjects}
              ProjectCard={ProjectCard}
              onProjectClick={handleProjectClick}
            />
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-stone-950 dark:bg-stone-900 border border-stone-800 rounded-2xl p-8 lg:p-12 text-center max-w-6xl"
          >
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-stone-400 text-lg mb-8 max-w-xl mx-auto">
              I&apos;m open to new opportunities and genuine collaborations.
              Reach out if you want to build something worth building.
            </p>
            <button
              onClick={() => handleContactClick("cta_section")}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get In Touch
            </button>
          </motion.section>
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
      <ChatBar isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
