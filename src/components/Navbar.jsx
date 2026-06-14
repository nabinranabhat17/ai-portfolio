import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';

const navLinks = [
  { name: 'About', href: '#about', label: '[1] About' },
  { name: 'Experience', href: '#experience', label: '[2] Experience' },
  { name: 'Projects', href: '#projects', label: '[3] Projects' },
  { name: 'Playground', href: '#model-playground', label: '[4] Inference' },
  { name: 'Skills', href: '#skills', label: '[5] Skills' },
  { name: 'Education', href: '#education', label: '[6] Education' },
  { name: 'Contact', href: '#contact', label: '[7] Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;
      
      const sections = navLinks.map(link => {
        const el = document.querySelector(link.href);
        if (el) {
          return {
            id: link.href,
            top: el.offsetTop,
            bottom: el.offsetTop + el.offsetHeight,
          };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find(
        section => scrollPosition >= section.top && scrollPosition < section.bottom
      );

      if (current) {
        setActiveSection(current.id);
      } else if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/40 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 group"
            >
              <span className="text-teal-600 dark:text-accent-teal font-mono">&gt;_</span>
              <span>{config.profile.name.split(' ')[0]}</span>
              <span className="text-teal-600 dark:text-accent-teal">.py</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-mono font-bold transition-colors relative py-1.5 px-2 rounded-md ${
                  activeSection === link.href
                    ? 'text-teal-600 dark:text-accent-teal bg-teal-500/5'
                    : 'text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:bg-slate-100 dark:hover:bg-slate-900/40'
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Resume Button */}
            <a
              href={config.profile.resumeUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-teal-600/30 dark:border-accent-teal/30 hover:border-teal-600 dark:hover:border-accent-teal hover:bg-teal-50 dark:hover:bg-accent-teal/10 text-teal-600 dark:text-accent-teal text-xs font-mono font-bold rounded-lg transition-all"
            >
              <FileText size={12} />
              Resume
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
            </button>
          </nav>

          {/* Mobile menu and theme toggle buttons */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass backdrop-blur-lg bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-left">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                    activeSection === link.href
                      ? 'bg-teal-50 dark:bg-accent-teal/10 text-teal-600 dark:text-accent-teal'
                      : 'text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={config.profile.resumeUrl}
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-1.5 mt-4 mx-3 py-2 border border-teal-600/30 dark:border-accent-teal/30 text-teal-600 dark:text-accent-teal text-xs font-mono font-bold rounded-lg transition-all"
              >
                <FileText size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
