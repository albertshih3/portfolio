"use client";

import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
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

const ProjectCard = ({ name, description, language, topics, url, githubUrl, onProjectClick }: ProjectCardProps) => {
  const languageColors: { [key: string]: string } = {
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    React: "bg-cyan-500",
    "C++": "bg-purple-500",
    HTML: "bg-orange-500",
    CSS: "bg-pink-500",
  };

  const handleProjectClick = () => {
    // Track project card clicks
    if (analytics) {
      logEvent(analytics, 'project_click', {
        project_name: name,
        project_language: language,
        click_type: 'main_card'
      });
    }
    
    // Use the callback if provided, otherwise open URL
    if (onProjectClick) {
      onProjectClick();
    } else {
      window.open(url, "_blank");
    }
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (analytics) {
      logEvent(analytics, 'project_click', {
        project_name: name,
        project_language: language,
        click_type: 'github_button'
      });
    }
    window.open(githubUrl, "_blank");
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (analytics) {
      logEvent(analytics, 'project_click', {
        project_name: name,
        project_language: language,
        click_type: 'external_button'
      });
    }
    window.open(url, "_blank");
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer h-80 flex flex-col"
      onClick={handleProjectClick}
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleGithubClick}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github size={18} />
            </button>
            <button
              onClick={handleExternalClick}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 overflow-hidden flex-1">
          {description.length > 120 ? `${description.substring(0, 120)}...` : description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {language && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                languageColors[language] || "bg-gray-500"
              }`}
            >
              {language}
            </span>
          )}
          {topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
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