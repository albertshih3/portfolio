"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

interface ProjectCardProps {
  name: string;
  description: string;
  language: string;
  topics: string[];
  url: string;
  githubUrl: string;
  onProjectClick?: () => void;
}

const ProjectCard = ({
  name,
  description,
  language,
  topics,
  url,
  githubUrl,
  onProjectClick,
}: ProjectCardProps) => {
  const handleProjectClick = () => {
    if (analytics) {
      logEvent(analytics, "project_click", {
        project_name: name,
        project_language: language,
        click_type: "main_card",
      });
    }
    if (onProjectClick) {
      onProjectClick();
    } else {
      window.open(url, "_blank");
    }
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (analytics) {
      logEvent(analytics, "project_click", {
        project_name: name,
        project_language: language,
        click_type: "github_button",
      });
    }
    window.open(githubUrl, "_blank");
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (analytics) {
      logEvent(analytics, "project_click", {
        project_name: name,
        project_language: language,
        click_type: "external_button",
      });
    }
    window.open(url, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
      onClick={handleProjectClick}
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 leading-snug">
            {name}
          </h3>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={handleGithubClick}
              aria-label={`View ${name} on GitHub`}
              className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <GithubIcon size={16} />
            </button>
            <button
              onClick={handleExternalClick}
              aria-label={`Open ${name}`}
              className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-4 flex-1">
          {description.length > 130
            ? `${description.substring(0, 130)}…`
            : description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {language && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
              {language}
            </span>
          )}
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
