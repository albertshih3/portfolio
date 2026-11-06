"use client";

import { motion } from "motion/react";
import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  BookOpen,
  ChevronRight
} from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import ContactModal from "@/components/contact/contact-modal";
import { blogPosts } from "@/data/blog-posts";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const post = blogPosts.find(p => p.id === slug) ?? null;

  // Track blog post view once the post resolves
  useEffect(() => {
    if (post && analytics) {
      logEvent(analytics, 'blog_post_view', {
        post_id: post.id,
        post_title: post.title
      });
    }
  }, [post]);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, 'contact_button_click', {
        button_source: source,
        page: 'blog_post',
        post_id: post?.id
      });
    }
    setIsContactModalOpen(true);
  };

  const handleShare = () => {
    if (analytics) {
      logEvent(analytics, 'blog_post_share', {
        post_id: post?.id,
        post_title: post?.title
      });
    }

    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!post) {
    return notFound();
  }

  // Get other posts for recommendations
  const otherPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Sidebar onContactClick={() => handleContactClick('sidebar')} />

      <main className="lg:ml-72">
        <div className="p-8 max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                >
                  <Tag size={14} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-50 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-6 text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {post.readTime}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>

            <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
              {post.excerpt}
            </p>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="prose prose-lg dark:prose-invert max-w-none mb-16 prose-headings:font-display prose-headings:text-stone-900 dark:prose-headings:text-stone-50 prose-p:text-stone-700 dark:prose-p:text-stone-300 prose-li:text-stone-700 dark:prose-li:text-stone-300 prose-strong:text-stone-900 dark:prose-strong:text-stone-50 prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-code:text-amber-700 dark:prose-code:text-amber-400 prose-code:bg-stone-100 dark:prose-code:bg-stone-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-stone-100 dark:prose-pre:bg-stone-800 prose-pre:text-stone-800 dark:prose-pre:text-stone-200"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.article>

          {/* Author CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-stone-950 dark:bg-stone-900 border border-stone-800 rounded-2xl p-8 text-center mb-16"
          >
            <h3 className="font-display text-2xl font-bold text-white mb-4">Enjoyed this article?</h3>
            <p className="text-stone-400 text-lg mb-6 max-w-xl mx-auto">
              I&apos;d love to hear your thoughts or discuss how we can work together
              on similar projects and challenges.
            </p>
            <button
              onClick={() => handleContactClick('blog_post_cta')}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get In Touch
            </button>
          </motion.section>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-50 mb-8 flex items-center gap-2">
                <BookOpen size={24} className="text-amber-600 dark:text-amber-500" />
                More Articles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200"
                  >
                    <Link href={`/blog/${relatedPost.id}`} className="block">
                      <div className="p-6">
                        <h4 className="font-display text-lg font-bold text-stone-900 dark:text-stone-50 mb-3 line-clamp-2">
                          {relatedPost.title}
                        </h4>

                        <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-stone-500 dark:text-stone-400">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {relatedPost.readTime}
                          </span>
                          <ChevronRight size={16} className="text-amber-600 dark:text-amber-500" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </motion.section>
          )}
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
