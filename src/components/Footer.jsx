import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { config } from '../config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-bg-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Copyright */}
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          © {currentYear} {config.profile.name}. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${config.profile.email}`}
            className="p-2 text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={config.profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-all"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={config.profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>

      </div>
    </footer>
  );
}
