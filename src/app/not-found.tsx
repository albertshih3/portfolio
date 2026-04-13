"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl py-8 px-10 w-full max-w-sm text-center shadow-sm">
        <h1 className="text-6xl font-black text-stone-900 dark:text-stone-50 mb-5">Oopsies!</h1>
        <h3 className="text-base font-bold text-stone-700 dark:text-stone-300 mb-4">
          It looks like the page you&apos;re looking for doesn&apos;t exist. (404)
        </h3>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-8">
          This could be due to a broken link, a mistyped URL, or the page might have been removed.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-medium text-sm"
          >
            Go Back
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors font-medium text-sm"
          >
            Homepage
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
