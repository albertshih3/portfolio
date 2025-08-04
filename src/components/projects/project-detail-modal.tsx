"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
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
  } | null;
}

const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl h-[80vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/20 dark:border-gray-700/20 flex flex-col"
            initial={{ y: 100, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.7, duration: 0.7 }}
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
          >
            {/* Modern modal header */}
            <div className="relative px-6 pt-6 pb-3 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shrink-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-2">
                  Project Info
                </span>
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {project.name}
                </h1>
                <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mt-1">
                  {project.description}
                </p>
              </div>
              {/* Action buttons at the top, centered */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors"
                  >
                    View Project
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-semibold rounded-lg shadow transition-colors"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
            {/* Content (scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10">
              {/* Detailed Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4 items-center md:items-start">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Primary Language</span>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {project.language}
                  </div>
                </div>
                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-col gap-4 items-center md:items-start">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {project.topics.slice(0, 4).map((topic, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Overview Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Overview</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.overview || "Add a detailed overview of the project here."}
                </p>
              </div>

              {/* My Role Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">My Role</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.myRole || "Describe your responsibilities and contributions."}
                </p>
              </div>

              {/* Key Features Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Key Features</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  {(project.features && project.features.length > 0)
                    ? project.features.map((feature, idx) => <li key={idx}>{feature}</li>)
                    : <li>Add key features of the project here.</li>}
                </ul>
              </div>

              {/* Challenges Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Challenges</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.challenges || "Describe any challenges you faced during the project."}
                </p>
              </div>

              {/* Learnings Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What I Learned</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.learnings || "Share what you learned from this project."}
                </p>
              </div>

              {/* ...existing code... */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
