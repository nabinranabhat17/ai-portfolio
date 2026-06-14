import React from 'react';
import { Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [6]:</div>
          <div className="cell-input-code w-full">
            model.list_skills()
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [6]:</div>
          <div className="w-full pt-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-left">
              Skills & Expertise
            </h2>

            {/* Responsive Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {config.skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm flex flex-col text-left"
                >
                  {/* Category Title */}
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Cpu size={14} className="text-teal-600 dark:text-accent-teal" />
                    {skillGroup.category}
                  </h3>
                  
                  {/* Tag Cloud */}
                  <div className="flex flex-wrap gap-1.5">
                    {skillGroup.items.map((skill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:border-teal-500/30 dark:hover:border-accent-teal/30 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
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
