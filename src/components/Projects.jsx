import React from 'react';
import { Github, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [4]:</div>
          <div className="cell-input-code w-full">
            model.get_projects()
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [4]:</div>
          <div className="w-full pt-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-left">
              Featured Projects
            </h2>

            {/* Project Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {config.projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  className="p-5 sm:p-6 rounded-xl flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm transition-all duration-300 relative group text-left"
                >
                  <div>
                    {/* Project Header Icons */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-lg text-teal-600 dark:text-accent-teal border border-slate-200/35 dark:border-slate-800/30">
                        <Code size={16} />
                      </div>
                      
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800/60 transition-all"
                        aria-label="GitHub Repository"
                      >
                        <Github size={15} />
                      </a>
                    </div>

                    {/* Project Info */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-accent-teal transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Badges/Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
