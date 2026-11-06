"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Sidebar from "@/components/sidebar/sidebar";
import Splash from "@/components/splash/splash";
import ContactModal from "@/components/contact/contact-modal";
import ChatBar from "@/components/chat/chat-bar";
import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // /contact redirects here with ?contact=open so there's one contact form, not two
  const [isContactModalOpen, setIsContactModalOpen] = useState(
    () => searchParams.get("contact") === "open"
  );
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("contact") === "open") {
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  const handleContactClick = (source: string) => {
    if (analytics) {
      logEvent(analytics, "contact_button_click", { button_source: source });
    }
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <Splash />

      <Sidebar onContactClick={() => handleContactClick("sidebar")} />

      <main className="lg:ml-72">
        <div className="pt-12 px-6 lg:px-12 pb-12">

          {/* Hero */}
          <div className="mb-20 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-amber-600 dark:text-amber-500 font-semibold text-sm uppercase tracking-widest mb-4">
                  Software Engineer @ Palo Alto Networks
                </p>
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-display font-bold text-stone-900 dark:text-stone-50 mb-6 leading-[0.95] tracking-tight text-balance">
                  Albert Shih
                </h1>
                <p className="text-lg text-stone-600 dark:text-stone-400 mb-8 leading-relaxed max-w-xl">
                  I build software that earns its keep. From an AI-powered
                  health monitoring system to a mobile app that replaced paper
                  workflows at my local zoo — I work best at the
                  intersection of technical depth and real-world impact.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/projects"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-7 py-3 rounded-lg font-medium transition-colors"
                  >
                    See My Work
                  </Link>
                  <button
                    onClick={() => handleContactClick("hero_section")}
                    className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 px-7 py-3 rounded-lg font-medium transition-colors"
                  >
                    Get In Touch
                  </button>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/mainphoto.jpeg"
                  alt="Albert Shih"
                  width={380}
                  height={380}
                  className="rounded-2xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Entry points — Projects is the dominant surface (strongest evidence),
              Writing is a subordinate link, not a second identical card. */}
          <section className="mb-20 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <Link
                href="/projects"
                className="group lg:col-span-2 block bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-800 hover:shadow-md transition-all duration-200 p-8 lg:p-10"
              >
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-3">
                  Projects
                </h2>
                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-md">
                  A selection of professional, personal, and academic work.
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-amber-600 dark:text-amber-500 font-medium">
                  Browse the work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800 pt-6 lg:pt-0 lg:pl-8">
                <Link
                  href="/blog"
                  className="group flex items-center justify-between text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
                >
                  <span className="font-display text-xl font-semibold">Writing</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">
                  Notes on building software and leading teams.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-stone-950 dark:bg-stone-900 border border-stone-800 rounded-2xl p-8 lg:p-12 text-center max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
              Let&apos;s Work Together
            </h2>
            <p className="text-stone-400 text-lg mb-8 max-w-xl mx-auto">
              I&apos;m open to new opportunities and genuine collaborations.
              Reach out if you want to build something worth building.
            </p>
            <button
              onClick={() => handleContactClick("cta_section")}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get In Touch
            </button>
          </section>
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

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
