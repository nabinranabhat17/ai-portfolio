import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config';

export default function Education() {
  return (
    <section id="education" className="py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [7]:</div>
          <div className="cell-input-code w-full">
            model.get_education_and_credentials()
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [7]:</div>
          <div className="w-full pt-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-left">
              Education & Credentials
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left">
              
              {/* Academic Timeline */}
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="text-teal-600 dark:text-accent-teal" size={18} />
                  Academic Journey
                </h3>
                
                <div className="relative pl-5 border-l border-slate-200 dark:border-slate-800 space-y-8">
                  {config.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.45, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Circle dot on line */}
                      <div className="absolute -left-[27px] top-1 p-0.5 bg-slate-50 dark:bg-bg-dark rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-teal-600 dark:bg-accent-teal" />
                      </div>

                      <div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-teal-50 dark:bg-accent-teal/10 text-teal-600 dark:text-accent-teal rounded-md mb-2">
                          <Calendar size={10} />
                          {edu.duration}
                        </span>
                        <h4 className="font-display text-base font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                          <BookOpen size={12} />
                          {edu.institution}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-405 mt-2 leading-relaxed">
                          {edu.details}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications column */}
              <div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="text-blue-600 dark:text-accent-blue" size={18} />
                  Professional Credentials
                </h3>

                <div className="space-y-4">
                  {config.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.45, delay: index * 0.1 }}
                      className="p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm relative shadow-sm"
                    >
                      <h4 className="font-display text-base font-bold text-slate-900 dark:text-white mb-1 flex items-start gap-1.5">
                        <span className="text-blue-600 dark:text-accent-blue select-none text-xs mt-0.5">🏆</span>
                        <span>{cert.title}</span>
                      </h4>
                      <p className="text-[10px] font-mono font-semibold text-teal-600 dark:text-accent-teal mb-2 uppercase tracking-wider">
                        Issued by: {cert.issuer}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-605 dark:text-slate-400 leading-relaxed">
                        {cert.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
