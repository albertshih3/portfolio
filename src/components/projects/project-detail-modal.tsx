"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

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
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const hasLiveUrl = project?.url && project.url !== project.githubUrl;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center md:p-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-3xl h-[88vh] md:h-[80vh] bg-white dark:bg-stone-900 rounded-t-2xl md:rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden shadow-xl shadow-stone-900/10 dark:shadow-stone-950/40"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.7 }}
          >
            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 pb-1 md:hidden shrink-0">
              <div className="w-10 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
            </div>

            {/* Header */}
            <div className="px-6 pt-4 md:pt-6 pb-5 border-b border-stone-100 dark:border-stone-800 shrink-0">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2
                id="project-dialog-title"
                className="font-display font-bold text-2xl text-stone-900 dark:text-stone-50 pr-10 mb-3 leading-tight"
              >
                {project.name}
              </h2>

              <div className="flex flex-wrap gap-1.5">
                {project.language && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {project.language}
                  </span>
                )}
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">

              {/* My Role — primary, display-font heading */}
              {project.myRole && (
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-900 dark:text-stone-50 mb-2.5">
                    My Role
                  </h3>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {project.myRole}
                  </p>
                </div>
              )}

              <div className="border-t border-stone-100 dark:border-stone-800" />

              {/* Overview */}
              {project.overview && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
                    Overview
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                    {project.overview}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-[0.4rem] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges + Learnings — de-emphasized secondary tier */}
              {(project.challenges || project.learnings) && (
                <div className="space-y-5 border-t border-stone-100 dark:border-stone-800 pt-5">
                  {project.challenges && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                        Challenges
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-500 leading-relaxed">
                        {project.challenges}
                      </p>
                    </div>
                  )}
                  {project.learnings && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                        What I Learned
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-500 leading-relaxed">
                        {project.learnings}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer — sticky action buttons */}
            <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800 shrink-0 flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-sm font-medium"
                >
                  <GithubIcon size={15} />
                  View Code
                </a>
              )}
              {hasLiveUrl && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors text-sm font-medium"
                >
                  <ExternalLink size={15} />
                  View Project
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
