import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Hide toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus('submitting');

    try {
      const response = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setToast({
          show: true,
          message: 'Thank you! Your message has been sent successfully.',
          type: 'success',
        });
      } else {
        throw new Error('Formspree endpoint returned an error.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setToast({
        show: true,
        message: 'Submission failed. Please try again or email Nabin directly.',
        type: 'error',
      });
      console.error('Contact Form error:', err);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 relative">
      {/* Toast Notification */}
      <div className="fixed bottom-5 right-5 z-50 text-left">
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-lg border flex items-center gap-3 backdrop-blur-md ${
                toast.type === 'success'
                  ? 'bg-emerald-500/90 text-white border-emerald-500/20'
                  : 'bg-rose-500/90 text-white border-rose-500/20'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [8]:</div>
          <div className="cell-input-code w-full">
            send_message(name=<span className="text-teal-600 dark:text-accent-teal">""</span>, email=<span className="text-teal-600 dark:text-accent-teal">""</span>, message=<span className="text-teal-600 dark:text-accent-teal">""</span>)
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [8]:</div>
          <div className="w-full pt-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 text-left">
              Get In Touch
            </h2>

            {/* Contact Layout */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-left max-w-5xl">
              
              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-3">
                    Let's build something amazing!
                  </h3>
                  <p className="text-slate-650 dark:text-slate-400 leading-relaxed mb-6 text-xs sm:text-sm">
                    I am currently open to internship, full-time role opportunities, and collaborations in NLP, LLMs, fine-tuning, and software engineering. Drop me a line!
                  </p>

                  <div className="space-y-3">
                    <a
                      href={`mailto:${config.profile.email}`}
                      className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-accent-teal transition-colors"
                    >
                      <div className="p-2 bg-slate-150 dark:bg-slate-900 rounded-lg">
                        <Mail size={15} />
                      </div>
                      <span className="text-xs sm:text-sm font-medium break-all">{config.profile.email}</span>
                    </a>
                  </div>
                </div>

                {/* Social handles */}
                <div className="mt-6 border-t border-slate-200 dark:border-slate-850 pt-5 flex gap-3">
                  <a
                    href={config.profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:scale-105 rounded-lg transition-all"
                    aria-label="GitHub Profile"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={config.profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:scale-105 rounded-lg transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </motion.div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="md:col-span-3 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 backdrop-blur-sm"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Input */}
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      className={`block py-2 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer transition-colors ${
                        errors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-300 dark:border-slate-750 focus:border-teal-600 dark:focus:border-accent-teal'
                      }`}
                    />
                    <label
                      htmlFor="name"
                      className={`peer-focus:font-medium absolute text-xs duration-300 transform -translate-y-5 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all ${
                        errors.name
                          ? 'text-rose-500 peer-focus:text-rose-500'
                          : 'text-slate-500 dark:text-slate-400 peer-focus:text-teal-600 peer-focus:dark:text-accent-teal'
                      }`}
                    >
                      Your Name
                    </label>
                    {errors.name && (
                      <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="relative z-0 w-full group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      className={`block py-2 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer transition-colors ${
                        errors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-300 dark:border-slate-750 focus:border-teal-600 dark:focus:border-accent-teal'
                      }`}
                    />
                    <label
                      htmlFor="email"
                      className={`peer-focus:font-medium absolute text-xs duration-300 transform -translate-y-5 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all ${
                        errors.email
                          ? 'text-rose-500 peer-focus:text-rose-500'
                          : 'text-slate-500 dark:text-slate-400 peer-focus:text-teal-600 peer-focus:dark:text-accent-teal'
                      }`}
                    >
                      Email Address
                    </label>
                    {errors.email && (
                      <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="relative z-0 w-full group">
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder=" "
                      rows={3}
                      className={`block py-2 px-0 w-full text-sm text-slate-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer transition-colors resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-300 dark:border-slate-750 focus:border-teal-600 dark:focus:border-accent-teal'
                      }`}
                    />
                    <label
                      htmlFor="message"
                      className={`peer-focus:font-medium absolute text-xs duration-300 transform -translate-y-5 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all ${
                        errors.message
                          ? 'text-rose-500 peer-focus:text-rose-500'
                          : 'text-slate-500 dark:text-slate-400 peer-focus:text-teal-600 peer-focus:dark:text-accent-teal'
                      }`}
                    >
                      Your Message
                    </label>
                    {errors.message && (
                      <p className="text-[10px] text-rose-500 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full py-2.5 px-4 bg-teal-600 dark:bg-accent-teal hover:bg-teal-700 dark:hover:bg-teal-500 text-white dark:text-slate-950 font-medium rounded-lg text-xs transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        Send Message
                        <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
