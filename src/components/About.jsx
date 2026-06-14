import React from 'react';
import { Code, Award, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config';

const getStatIcon = (label) => {
  if (label.toLowerCase().includes('leetcode')) return <Code className="text-teal-600 dark:text-accent-teal" size={20} />;
  if (label.toLowerCase().includes('certifications')) return <Award className="text-blue-600 dark:text-accent-blue" size={20} />;
  return <GraduationCap className="text-indigo-600 dark:text-accent-indigo" size={20} />;
};

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [2]:</div>
          <div className="cell-input-code w-full">
            model.get_metadata()
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [2]:</div>
          <div className="w-full pt-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-left">
              About Nabin Ranabhat
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Bio Paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="md:col-span-3 space-y-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed text-left"
              >
                <p>
                  Hello! I'm Nabin Ranabhat, a passionate AI/ML Engineer and recent Computer Engineering graduate from 
                  <span className="font-semibold text-slate-900 dark:text-white"> Pulchowk Engineering Campus</span>. 
                  My technical focus revolves around training, evaluation, and scaling intelligent software systems.
                </p>
                <p>
                  I specialize in <span className="text-teal-600 dark:text-accent-teal font-medium">Natural Language Processing (NLP)</span>, 
                  specifically targeting transliteration and translation challenges in low-resource environments. Additionally, I am deeply 
                  involved in constructing agentic AI applications, implementing robust machine learning workflows, and designing 
                  automated DevOps pipelines to bridge the gap between research models and production applications.
                </p>
                <p>
                  Whether it is validating ECG pipelines against clinical Arrhythmia datasets, engineering scraper-to-training pipelines 
                  for custom transformers, or orchestrating local Vector Databases for RAG interfaces, I strive to write clean, 
                  highly maintainable code that delivers real-world business impact.
                </p>
              </motion.div>

              {/* Statistics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="md:col-span-2 grid gap-3"
              >
                {config.profile.about.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl flex items-center gap-4 border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-900/60 flex-shrink-0">
                      {getStatIcon(stat.label)}
                    </div>
                    <div className="text-left">
                      <div className="font-display text-xl font-bold text-slate-900 dark:text-white leading-none mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
