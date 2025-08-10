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
  Award,
  GitBranch,
  Smartphone,
  Globe
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
  cv: ["OpenCV", "Python", "C++", "Image Processing", "Object Detection"],
  tools: ["Git", "GitHub", "Docker", "MIPS Assembly", "CI/CD"],
  soft: ["Project Management", "Strategic Communication", "Team Leadership & Mentorship", "Problem-Solving"]
};

const experiences = [
  {
    title: "Student Supervisor (Design Experience and Outreach)",
    company: "University of California, Merced - Office of Information Technology",
    location: "Merced, CA",
    period: "June 2023 – Present",
    type: "Supervisory Leadership",
    highlights: [
      "Trained and mentored a team of 7 student employees over a 2-year period, enhancing team capabilities and service delivery for campus-wide IT initiatives",
      "Managed and executed IT communications, including content strategy and maintenance for the official IT website and UC Merced Connect mobile application",
      "Led outreach efforts to communicate IT services and updates to the campus community, fostering better understanding and adoption of key technology resources"
    ]
  },
  {
    title: "SEED 2023 Internship",
    company: "Modo Labs",
    location: "Remote",
    period: "June 2023 – August 2023",
    type: "Software Development Internship",
    highlights: [
      "Developed two working prototypes using the Modo application platform to improve campus mobile app functionality",
      "Implemented JavaScript solutions for REST API requests and built custom database architecture using PostgreSQL",
      "Utilized AWS cloud services including Lambda, API Gateway, and CloudWatch to create serverless functions and debug services",
      "Designed responsive mobile and desktop user experiences using the Modo XModule Platform"
    ]
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
      "Built the backend data pipeline (Node.js, Express) to process and stream biomarker data from SQLite to AWS Bedrock LLM for analysis"
    ]
  }
];

const projects = [
  {
    title: "Empathy Guide Mobile App + Web Portal",
    technologies: ["React Native", "Firebase", "GCP", "VertexAI"],
    period: "June 2024 – Present",
    type: "Digital Transformation",
    description: "Replaced manual, paper-based workflows with a modern mobile app and web portal, streamlining animal data access by 70% with offline functionality for field staff."
  },
  {
    title: "Oakland Zoo Booster Pack Generator",
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Vercel"],
    period: "August 2024 – Present",
    type: "Web Application",
    description: "Automated trading card pack generation, replacing paper-based methods and saving significant staff hours with secure admin interface and bulk generation features."
  }
];


export default function About() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, 'contact_button_click', {
        button_source: source,
        page: 'about'
      });
    }
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar onContactClick={() => handleContactClick('sidebar')} />

      <main className="lg:ml-72">
        <div className="p-8 max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  About Me
                </h1>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    I&apos;m a Computer Science and Engineering graduate from UC Merced, passionate about
                    creating innovative solutions that bridge technology with real-world impact. My expertise
                    spans AI/ML, full-stack development, and digital transformation initiatives.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    With experience in supervisory leadership and a track record of developing applications
                    that streamline workflows and improve user experiences, I&apos;m driven by the opportunity
                    to solve complex problems through thoughtful engineering and strategic technology implementation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={() => handleContactClick('about_hero')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Get In Touch
                  </button>
                  <a
                    href="https://storage.googleapis.com/portfolio-c973b.firebasestorage.app/resumes/AI_Native_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    View Resume
                  </a>
                </div>
              </div>

              <div className="lg:w-80">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <GraduationCap size={16} className="text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">BS Computer Science & Engineering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">UC Merced, CA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">Graduated May 2025</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-300">Team Lead & Mentor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Technical Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="text-blue-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="text-purple-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI/ML</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.aiml.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="text-green-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Cloud Services</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.cloud.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-orange-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Full-Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.fullstack.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <GitBranch className="text-red-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Developer Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-indigo-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Leadership</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.soft.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Professional Experience</h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Featured Projects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Projects</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="mb-4">
                    <div className="text-green-800 dark:text-green-200 font-extrabold uppercase tracking-wide text-base mb-1">
                      {project.type}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar size={14} />
                    {project.period}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education & Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-blue-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Bachelor of Science in Computer Science and Engineering</h4>
                <p className="text-blue-600 dark:text-blue-400">University of California, Merced</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Graduated: May 2025</p>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Relevant Coursework:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Data Structures & Algorithms, Database Systems, Full Stack Web Development,
                    Computer Vision, Artificial Intelligence, Computer Architecture, Human-Computer Interaction
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Let&apos;s Connect</h3>
              <p className="mb-6 opacity-90">
                I&apos;m always interested in discussing new opportunities, collaborating on projects,
                or just connecting with fellow developers and innovators.
              </p>
              <button
                onClick={() => handleContactClick('about_cta')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start a Conversation
              </button>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Chat Bar */}
      <ChatBar isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}