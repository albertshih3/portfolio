"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home,
  Construction,
  Rocket,
  Coffee,
  ArrowLeft
} from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import ContactModal from "@/components/contact/contact-modal";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export default function Blog() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Track unexpected blog access
    if (analytics) {
      logEvent(analytics, 'blog_access_attempt', {
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      });
    }
  }, []);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, 'contact_button_click', {
        button_source: source,
        page: 'blog_construction'
      });
    }
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      {/* Under Construction Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full"
            >
              <Construction size={48} className="text-yellow-600 dark:text-yellow-400" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Well, well, well... 🤔
          </h1>
          
          <div className="space-y-3 text-gray-600 dark:text-gray-300">
            <p className="text-lg">
              <strong>How did you get here?</strong>
            </p>
            <p>
              You&apos;ve stumbled upon a secret area! 🕵️‍♂️
            </p>
            <p>
              The blog is currently being crafted with the finest digital tools and a concerning amount of coffee.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Rocket size={20} className="text-blue-500" />
              <span>Coming Soon™</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee size={20} className="text-amber-500" />
              <span>Fueled by Caffeine</span>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Coming Soon:</strong> Tech insights, project breakdowns, and probably some questionable coding decisions from my journey as a software engineer.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Escape to Safety (Home Page)
          </Link>
          
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-sm">or</p>
          </div>
          
          <button
            onClick={() => handleContactClick('blog_construction')}
            className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home size={20} />
            Ask Me About the Blog
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-xs text-gray-400 dark:text-gray-500 mt-6"
        >
          Pro tip: Bookmark this page and check back later... or don&apos;t, I&apos;m not your boss 😄
        </motion.p>
      </motion.div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}