"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/sidebar/sidebar";
import ProjectCard from "@/components/projects/project-card";
import ContactModal from "@/components/contact/contact-modal";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

const projects = [
  {
    name: "CropSwap",
    description: "HackMerced IX submission! Winner of Best Use of Auth0 by Okta! A platform connecting farmers with surplus crops to reduce food waste.",
    language: "JavaScript",
    topics: ["auth0", "hackathon", "javascript", "mongodb", "react"],
    url: "https://github.com/albertshih3/CropSwap",
    githubUrl: "https://github.com/albertshih3/CropSwap"
  },
  {
    name: "How-Are-You",
    description: "A mental health focused web app designed by a college student for college students, providing resources and support.",
    language: "TypeScript",
    topics: ["mental-health", "web-app", "typescript", "react"],
    url: "https://github.com/albertshih3/How-Are-You",
    githubUrl: "https://github.com/albertshih3/How-Are-You"
  },
  {
    name: "Oz Empathy App",
    description: "Oakland Zoo Empathy Guide mobile app, for internal staff use to enhance visitor experiences and animal care.",
    language: "TypeScript",
    topics: ["mobile-app", "zoo", "empathy", "staff-tools"],
    url: "https://github.com/albertshih3/oz-empathy-app",
    githubUrl: "https://github.com/albertshih3/oz-empathy-app"
  },
  {
    name: "CatTracksXM",
    description: "Bus schedule module created for the Transportation and Parking Department at UC Merced to improve campus transportation.",
    language: "JavaScript",
    topics: ["transportation", "schedule", "university", "javascript"],
    url: "https://github.com/albertshih3/CatTracksXM",
    githubUrl: "https://github.com/albertshih3/CatTracksXM"
  },
  {
    name: "Merced Meals",
    description: "CSE 108 Final Project @ UC Merced - A meal planning and nutrition tracking application for students.",
    language: "Python",
    topics: ["python", "meal-planning", "nutrition", "university"],
    url: "https://github.com/albertshih3/merced-meals",
    githubUrl: "https://github.com/albertshih3/merced-meals"
  }
];

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = (source: string) => {
    // Track contact button clicks
    if (analytics) {
      logEvent(analytics, 'contact_button_click', {
        button_source: source
      });
    }
    setIsContactModalOpen(true);
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
            <div className="max-w-4xl">
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
                I&apos;m a software engineer and recent Computer Science graduate passionate about creating innovative solutions 
                that make a positive impact. I love building applications that solve real-world 
                problems and connecting technology with meaningful purposes.
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
          </motion.div>

          {/* Projects Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            id="projects"
            className="mb-16"
          >
            <div className="mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Here are some of the projects I&apos;ve worked on that showcase my skills and interests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
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
    </div>
  );
}
