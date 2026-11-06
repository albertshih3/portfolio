"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import ContactModal from "@/components/contact/contact-modal";
import { blogPosts } from "@/data/blog-posts";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export default function Blog() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, "contact_button_click", {
        button_source: source,
        page: "blog",
      });
    }
    setIsContactModalOpen(true);
  };

  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Sidebar onContactClick={() => handleContactClick("sidebar")} />

      <main className="lg:ml-72">
        <div className="pt-12 px-6 lg:px-12 pb-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-50 mb-3 tracking-tight text-balance">
              Writing
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
              Notes on building software, integrating AI, and leading student
              engineering teams — mostly things I wished someone had told me first.
            </p>
          </motion.div>

          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="group block bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200 p-6"
                >
                  <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-amber-600 dark:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
