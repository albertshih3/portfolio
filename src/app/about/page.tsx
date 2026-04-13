"use client";

import { motion } from "motion/react";
import {
  Code,
  Brain,
  Cloud,
  Database,
  Users,
  GraduationCap,
  Calendar,
  MapPin,
  GitBranch,
  Globe,
} from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import { useState } from "react";
import ContactModal from "@/components/contact/contact-modal";
import ChatBar from "@/components/chat/chat-bar";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

const skills = {
  languages: ["Python", "JavaScript (ES6+)", "C++", "C", "SQL", "HTML5", "CSS3", "Swift"],
  aiml: ["TensorFlow", "PyTorch", "NumPy", "Matplotlib", "LLM Architecture (Transformers)", "Data Analysis", "Model Evaluation"],
  cloud: ["AWS (EC2, S3, Lambda, RDS, VPC, IAM, API Gateway, Bedrock)", "GCP (Firebase Suite, Compute Engine, Cloud Functions, VertexAI)"],
  fullstack: ["React", "React Native", "Vite", "Node.js", "Flask", "PostgreSQL", "Firestore NoSQL", "RESTful APIs", "GraphQL"],
  tools: ["Git", "GitHub", "Docker", "MIPS Assembly", "CI/CD"],
  soft: ["Project Management", "Strategic Communication", "Team Leadership & Mentorship", "Problem-Solving"],
};

const experiences = [
  {
    title: "Software Engineer (IT)",
    company: "Palo Alto Networks",
    location: "Santa Clara, CA",
    period: "2025 – Present",
    type: "Software Engineering",
    highlights: [
      "Building AI-native products at enterprise scale on the IT team, shipping internal tools used by real teams across the company",
      "Developed a multi-agent Sales Workbench to help sellers consolidate and interact with their Salesforce accounts and opportunities — built one of the agents using Gemini GenKit and TypeScript, with Spanner, BigQuery, and Cloud Logging for data access and observability",
      "Designed and implemented an enterprise-grade evaluation framework in Python to assess the three-agent system across SQL query generation, execution correctness, and response quality",
      "Contributing to AI Quoting, an agentic overhaul of the CPQ process — leading frontend development with fast iteration cycles powered by AI coding tools (Cursor)",
    ],
  },
  {
    title: "Student Supervisor (Design Experience and Outreach)",
    company: "University of California, Merced — Office of Information Technology",
    location: "Merced, CA",
    period: "June 2023 – Present",
    type: "Supervisory Leadership",
    highlights: [
      "Trained and mentored a team of 7 student employees over a 2-year period, enhancing team capabilities and service delivery for campus-wide IT initiatives",
      "Managed and executed IT communications, including content strategy and maintenance for the official IT website and UC Merced Connect mobile application",
      "Led outreach efforts to communicate IT services and updates to the campus community, fostering better understanding and adoption of key technology resources",
    ],
  },
  {
    title: "SEED 2023 Internship",
    company: "Modo Labs",
    location: "Remote",
    period: "June 2023 – August 2023",
    type: "Software Development",
    highlights: [
      "Developed two working prototypes using the Modo application platform to improve campus mobile app functionality",
      "Implemented JavaScript solutions for REST API requests and built custom database architecture using PostgreSQL",
      "Utilized AWS cloud services including Lambda, API Gateway, and CloudWatch to create serverless functions and debug services",
      "Designed responsive mobile and desktop user experiences using the Modo XModule Platform",
    ],
  },
  {
    title: "Frontend & AI Integration Developer",
    company: "x10e Health Monitoring System (CSE 120 Capstone)",
    location: "Merced, CA",
    period: "January 2025 – May 2025",
    type: "AI Integration",
    highlights: [
      "Engineered an AI-powered chat interface by integrating an AWS Bedrock LLM with the system's frontend, enabling users to receive personalized health insights",
      "Led frontend development (React, TypeScript, Vite), creating an intuitive UI with Recharts for biomarker data visualization and Ant Design for core components",
      "Built the backend data pipeline (Node.js, Express) to process and stream biomarker data from SQLite to AWS Bedrock LLM for analysis",
    ],
  },
];

const skillCategories = [
  { key: "languages" as const, icon: Code, label: "Languages" },
  { key: "aiml" as const, icon: Brain, label: "AI / ML" },
  { key: "cloud" as const, icon: Cloud, label: "Cloud Services" },
  { key: "fullstack" as const, icon: Globe, label: "Full-Stack" },
  { key: "tools" as const, icon: GitBranch, label: "Developer Tools" },
  { key: "soft" as const, icon: Users, label: "Leadership" },
];

export default function About() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, "contact_button_click", {
        button_source: source,
        page: "about",
      });
    }
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Sidebar onContactClick={() => handleContactClick("sidebar")} />

      <main className="lg:ml-72">
        <div className="pt-12 px-6 lg:px-12 pb-12 max-w-5xl">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-col lg:flex-row items-start gap-10">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-stone-900 dark:text-stone-50 mb-6 tracking-tight">
                  About Me
                </h1>
                <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                  I&apos;m a Computer Science and Engineering graduate from UC Merced who builds software that solves problems worth solving.
                </p>
                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                  My work spans AI integration, full-stack development, and digital transformation — from replacing paper workflows at my local zoo to building AI-powered health monitoring systems. I lead teams, ship production code, and care about the impact of what I build.
                </p>

                <div className="flex flex-wrap gap-3 mt-8">
                  <button
                    onClick={() => handleContactClick("about_hero")}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Get In Touch
                  </button>
                  <a
                    href="https://storage.googleapis.com/portfolio-c973b.firebasestorage.app/resumes/AI_Native_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    View Resume
                  </a>
                </div>
              </div>

              <div className="lg:w-72 w-full">
                <div className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800">
                  <h3 className="font-semibold text-stone-900 dark:text-stone-50 mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <GraduationCap size={16} className="text-amber-600 flex-shrink-0" />
                      <span className="text-stone-600 dark:text-stone-400">BS Computer Science &amp; Engineering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-amber-600 flex-shrink-0" />
                      <span className="text-stone-600 dark:text-stone-400">UC Merced, CA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-amber-600 flex-shrink-0" />
                      <span className="text-stone-600 dark:text-stone-400">Graduated May 2025</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-amber-600 flex-shrink-0" />
                      <span className="text-stone-600 dark:text-stone-400">Team Lead &amp; Mentor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-stone-900 dark:text-stone-50 mb-8">
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillCategories.map(({ key, icon: Icon, label }) => (
                <div
                  key={key}
                  className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <Icon className="text-amber-600 dark:text-amber-500 flex-shrink-0" size={20} />
                    <h3 className="font-semibold text-stone-900 dark:text-stone-50">{label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills[key].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Professional Experience */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-stone-900 dark:text-stone-50 mb-8">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                        {exp.title}
                      </h3>
                      <p className="text-amber-600 dark:text-amber-500 font-medium text-sm mt-0.5">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-stone-500 dark:text-stone-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={13} />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 whitespace-nowrap self-start">
                      {exp.type}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education + CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3 mb-5">
                <GraduationCap className="text-amber-600" size={22} />
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                  Education
                </h3>
              </div>

              <h4 className="font-semibold text-stone-900 dark:text-stone-50 text-sm">
                Bachelor of Science in Computer Science and Engineering
              </h4>
              <p className="text-amber-600 dark:text-amber-500 text-sm mt-0.5">
                University of California, Merced
              </p>
              <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Graduated May 2025</p>

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
                  Relevant Coursework
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  Data Structures &amp; Algorithms, Database Systems, Full Stack Web Development,
                  Computer Vision, Artificial Intelligence, Computer Architecture, Human-Computer Interaction
                </p>
              </div>
            </div>

            <div className="bg-stone-950 dark:bg-stone-900 border border-stone-800 rounded-xl p-6 text-white">
              <h3 className="text-lg font-display font-semibold mb-4">Let&apos;s Connect</h3>
              <p className="mb-6 text-stone-400 text-sm leading-relaxed">
                I&apos;m always open to discussing new opportunities, collaborating on projects,
                or connecting with fellow builders and engineers.
              </p>
              <button
                onClick={() => handleContactClick("about_cta")}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3 rounded-lg font-semibold transition-colors text-sm"
              >
                Start a Conversation
              </button>
            </div>
          </motion.section>
        </div>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <ChatBar isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
