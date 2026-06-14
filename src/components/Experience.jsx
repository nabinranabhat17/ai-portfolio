import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config';

export default function Experience() {
  return (
    <section id="experience" className="py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [3]:</div>
          <div className="cell-input-code w-full">
            model.get_experience()
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [3]:</div>
          <div className="w-full pt-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-left">
              Professional Experience
            </h2>

            <div className="max-w-3xl mr-auto relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-12 text-left">
              {config.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Marker Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 p-1 bg-slate-50 dark:bg-bg-dark rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-600 dark:bg-accent-teal shadow-md shadow-teal-500/20" />
                  </div>

                  {/* Experience Card */}
                  <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm transition-all duration-300">
                    
                    {/* Header Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Briefcase className="text-teal-600 dark:text-accent-teal flex-shrink-0" size={16} />
                          {exp.role}
                        </h3>
                        <p className="text-teal-600 dark:text-accent-teal text-sm font-medium mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 py-1 px-2.5 rounded-lg border border-slate-200/30 dark:border-slate-800/30">
                          <Calendar size={12} />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/60 py-1 px-2.5 rounded-lg border border-slate-200/30 dark:border-slate-800/30">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2.5 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed list-none text-left">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="text-teal-600 dark:text-accent-teal font-bold mt-1 text-xs select-none">
                            ✦
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
