"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Home, 
  User, 
  FolderOpen, 
  Mail, 
  Github, 
  Linkedin,
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

interface SidebarProps {
  onContactClick?: () => void;
}

const Sidebar = ({ onContactClick }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700"></div>;
  }

  const menuItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "About", icon: User, href: "/about" },
    { name: "Projects", icon: FolderOpen, href: "/#projects" },
    // { name: "Blog", icon: FileText, href: "/blog" }, // Hidden for now
    { name: "Contact", icon: Mail, href: "/contact", isButton: true },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/albertshih3" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/albertshih3" },
    { name: "Resume", icon: ExternalLink, href: "https://firebasestorage.googleapis.com/v0/b/portfolio-c973b.firebasestorage.app/o/resumes%2FResume.pdf?alt=media&token=160f41c0-7f08-43f4-b0a6-637eba12f03a" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className="w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 hidden lg:block fixed left-0 top-0 h-screen z-10">
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          {/* Profile section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mb-4 overflow-hidden">
              <Image
                src="/headshot.jpeg"
                alt="Albert Shih"
                width={80}
                height={80}
                className="w-full h-full object-cover object-left-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Albert Shih</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              Forward Deployed Engineer
            </p>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.isButton ? (
                    <button
                      onClick={() => {
                        onContactClick?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
                    >
                      <item.icon size={20} className="mr-3" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <item.icon size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Connect
            </h3>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <link.icon size={18} className="mr-3" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle at Bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto flex flex-col">
          {/* Profile section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src="/headshot.jpeg"
                alt="Albert Shih"
                width={80}
                height={80}
                className="rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Albert Shih</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
              Software Engineer
            </p>
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  {item.isButton ? (
                    <button
                      onClick={() => {
                        onContactClick?.();
                        setIsOpen(false);
                      }}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors w-full text-left"
                    >
                      <item.icon size={20} className="mr-3" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <item.icon size={20} className="mr-3" />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Connect
            </h3>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <link.icon size={18} className="mr-3" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Theme Toggle at Bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;