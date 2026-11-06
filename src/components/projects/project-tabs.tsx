"use client";

import { useRef, useState } from "react";
import { Briefcase, Sparkles, GraduationCap } from "lucide-react";
import projectsData from "@/data/projects.json";
import ProjectCard from "@/components/projects/project-card";

export type Project = {
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
  {
    id: "work" as const,
    label: "Professional Work",
    icon: Briefcase,
    framing: "Production systems, built for real teams and real constraints.",
  },
  {
    id: "personal" as const,
    label: "Personal",
    icon: Sparkles,
    framing: "Side projects I built because the idea wouldn't leave me alone.",
  },
  {
    id: "academic" as const,
    label: "Academic",
    icon: GraduationCap,
    framing: "Coursework and capstone research from UC Merced.",
  },
] as const;

type TabId = (typeof projectTabs)[number]["id"];

interface ProjectTabsProps {
  onProjectClick: (project: Project) => void;
}

const ProjectTabs = ({ onProjectClick }: ProjectTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("work");
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    work: null,
    personal: null,
    academic: null,
  });

  const projectsByTab: Record<TabId, Project[]> = {
    work: workProjects,
    personal: personalProjects,
    academic: academicProjects,
  };
  const activeProjects = projectsByTab[activeTab];

  const focusTab = (id: TabId) => {
    setActiveTab(id);
    tabRefs.current[id]?.focus();
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const direction = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + projectTabs.length) % projectTabs.length;
    focusTab(projectTabs[nextIndex].id);
  };

  const activeTabMeta = projectTabs.find((tab) => tab.id === activeTab)!;

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap" role="tablist" aria-label="Project categories">
        {projectTabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => handleTabKeyDown(e, index)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors min-h-[44px] ${
              activeTab === tab.id
                ? "bg-amber-600 text-white font-semibold"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            <tab.icon size={16} aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </div>
      <p className="text-stone-500 dark:text-stone-400 text-sm mb-8 max-w-xl">
        {activeTabMeta.framing}
      </p>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="min-h-[200px]"
      >
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

export default ProjectTabs;
