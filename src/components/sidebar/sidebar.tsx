"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  User,
  FolderOpen,
  Mail,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const GithubIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import ThemeToggle from "@/components/theme/theme-toggle";

interface SidebarProps {
  onContactClick?: () => void;
}

const menuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "About", icon: User, href: "/about" },
  { name: "Projects", icon: FolderOpen, href: "/#projects" },
  { name: "Contact", icon: Mail, href: null, isButton: true },
] as const;

const socialLinks = [
  { name: "GitHub", icon: GithubIcon, href: "https://github.com/albertshih3" },
  { name: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com/in/albertshih3" },
  {
    name: "Resume",
    icon: ExternalLink,
    href: "https://storage.googleapis.com/portfolio-c973b.firebasestorage.app/resumes/AI_Native_Resume.pdf",
  },
];

interface SidebarContentProps {
  onContactClick?: () => void;
  closeMenu: () => void;
  pathname: string;
}

const SidebarContent = ({ onContactClick, closeMenu, pathname }: SidebarContentProps) => {
  const isActive = (href: string | null | undefined) => {
    if (!href || href.includes("#")) return false;
    return pathname === href;
  };

  return (
    <div className="p-6 h-full overflow-y-auto flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-stone-200 dark:bg-stone-700 rounded-full mb-4 overflow-hidden">
          <Image
            src="/headshot.jpeg"
            alt="Albert Shih"
            width={80}
            height={80}
            className="w-full h-full object-cover object-left-top"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <h2 className="text-xl font-display font-bold text-stone-900 dark:text-stone-50">
          Albert Shih
        </h2>
        <p className="text-stone-500 dark:text-stone-400 text-center text-sm mt-1">
          SWE @ Palo Alto Networks
        </p>
      </div>

      {/* Navigation */}
      <nav className="mb-8" aria-label="Main navigation">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive("href" in item ? item.href : null);
            if ("isButton" in item && item.isButton) {
              return (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      onContactClick?.();
                      closeMenu();
                    }}
                    className="flex items-center px-4 py-3 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors w-full text-left"
                  >
                    <item.icon size={18} className="mr-3 flex-shrink-0" />
                    {item.name}
                  </button>
                </li>
              );
            }
            return (
              <li key={item.name}>
                <Link
                  href={"href" in item && item.href ? item.href : "/"}
                  onClick={closeMenu}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-medium"
                      : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <item.icon
                    size={18}
                    className={`mr-3 flex-shrink-0 ${
                      active ? "text-amber-600 dark:text-amber-400" : ""
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social links */}
      <div className="border-t border-stone-200 dark:border-stone-700 pt-6 flex-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3 px-1">
          Connect
        </h3>
        <div className="space-y-1">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              <link.icon size={16} className="mr-3 flex-shrink-0" />
              <span className="text-sm">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="mt-auto pt-4 border-t border-stone-200 dark:border-stone-700">
        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-stone-500 dark:text-stone-400">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ onContactClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 hidden lg:block fixed left-0 top-0 h-screen" />
    );
  }

  return (
    <>
      {/* Mobile menu button — top-right for better thumb reach */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="fixed top-4 right-4 z-50 lg:hidden bg-white dark:bg-stone-800 p-2.5 rounded-xl shadow-md border border-stone-200 dark:border-stone-700"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop Sidebar */}
      <div className="w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 hidden lg:block fixed left-0 top-0 h-screen z-10">
        <SidebarContent
          onContactClick={onContactClick}
          closeMenu={() => {}}
          pathname={pathname}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-50 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          onContactClick={onContactClick}
          closeMenu={() => setIsOpen(false)}
          pathname={pathname}
        />
      </div>
    </>
  );
};

export default Sidebar;
