"use client";

import React from "react";
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
  } | null;
}

const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-red-500/80">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 border-4 border-blue-500">
        <h1 className="text-4xl font-bold text-black mb-4">
          VISIBLE TEST: {project.name}
        </h1>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
        <p className="text-lg text-black">
          If you can see this, the modal is working!
        </p>
        <div className="mt-4">
          <p className="text-black">Description: {project.description}</p>
          <p className="text-black">Language: {project.language}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
