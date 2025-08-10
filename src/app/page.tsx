"use client";

import { useState } from "react";
import type { FC } from "react";

import { AnimatePresence, motion } from "motion/react";
import projectsData from "@/data/projects.json";
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

import Image from "next/image";
import Sidebar from "@/components/sidebar/sidebar";
import ProjectCard from "@/components/projects/project-card";
import ProjectDetailModal from "@/components/projects/project-detail-modal";
import ContactModal from "@/components/contact/contact-modal";
import ChatBar from "@/components/chat/chat-bar";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

const personalProjects: Project[] = projectsData.personalProjects;
const workProjects: Project[] = projectsData.workProjects;
const academicProjects: Project[] = projectsData.academicProjects || [];

// Tabs component defined before Home component to avoid hoisting issues
interface TabsProps {
  personalProjects: Project[];
  academicProjects: Project[];
  ProjectCard: FC<Project & { onProjectClick?: () => void }>;
  onProjectClick: (project: Project) => void;
}

const Tabs: FC<TabsProps> = ({ personalProjects, academicProjects, ProjectCard, onProjectClick }) => {
  const [activeTab, setActiveTab] = useState<"personal" | "academic">("personal");
  
  return (
    <div>
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 rounded-t-lg font-medium focus:outline-none transition-colors ${activeTab === "personal" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Projects
        </button>
        <button
          className={`ml-2 px-4 py-2 rounded-t-lg font-medium focus:outline-none transition-colors ${activeTab === "academic" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
          onClick={() => setActiveTab("academic")}
        >
          Academic Projects
        </button>
      </div>
      <div className="min-h-[200px]">
        {activeTab === "personal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {personalProjects.map((project: Project) => (
              <div key={project.name}>
                <ProjectCard {...project} onProjectClick={() => onProjectClick(project)} />
              </div>
            ))}
          </div>
        )}
        {activeTab === "academic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {academicProjects.map((project: Project) => (
              <div key={project.name}>
                <ProjectCard {...project} onProjectClick={() => onProjectClick(project)} />
              </div>
            ))}
          </div>
        )}
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
    // Track contact button clicks
    if (analytics) {
      logEvent(analytics, 'contact_button_click', {
        button_source: source
      });
    }
    setIsContactModalOpen(true);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar onContactClick={() => handleContactClick('sidebar')} />

      <main className="lg:ml-72">
        <div className="pt-16 px-8 pb-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                  >
                    Hi, I&apos;m Albert! 👋
                  </motion.h1>
                    <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                    >
                    I&apos;m a software engineer and recent Computer Science graduate passionate about creating innovative solutions that make a positive impact. As an AI Native developer, I have extensive experience leveraging AI tools to achieve ambitious goals and accelerate development. I love building applications that solve real-world problems and connecting technology with meaningful purposes.
                    </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
    <a
      href="#projects"
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
    >
      View My Work
    </a>
    <button
      onClick={() => handleContactClick('hero_section')}
      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
    >
      Get In Touch
    </button>
  </motion.div>
</div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="relative">
                    <Image
                      src="/mainphoto.jpeg"
                      alt="Albert Shih - Forward Deployed Engineer"
                      width={400}
                      height={400}
                      className="rounded-2xl shadow-2xl object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Work Samples Section (now at the top) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Work Samples
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {workProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <ProjectCard {...project} onProjectClick={() => handleProjectClick(project)} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tabbed Personal/Academic Projects Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-16"
            id="projects"
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Browse my personal and academic projects below.
              </p>
            </div>
            <Tabs personalProjects={personalProjects} academicProjects={academicProjects} ProjectCard={ProjectCard} onProjectClick={handleProjectClick} />
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-center text-white"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg mb-8 opacity-90">
              I&apos;m always interested in new opportunities and collaborations.
              Feel free to reach out if you&apos;d like to connect!
            </p>
            <button
              onClick={() => handleContactClick('cta_section')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Contact Me
            </button>
          </motion.section>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        project={selectedProject}
      />

      {/* Chat Bar */}
      <ChatBar isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
