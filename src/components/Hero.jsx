import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Globe, FileText, Play, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { config } from '../config';

export default function Hero() {
  // Typewriter effect state
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Simulated Training loop state
  const [epoch, setEpoch] = useState(0);
  const [lossHistory, setLossHistory] = useState([]);
  const [valLossHistory, setValLossHistory] = useState([]);
  const [bleuScore, setBleuScore] = useState(0);
  const [isTraining, setIsTraining] = useState(true);

  // Typewriter Effect
  useEffect(() => {
    const titles = config.profile.titles;
    let timer;

    const handleType = () => {
      const fullText = titles[titleIndex];
      
      if (!isDeleting) {
        const nextText = fullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        
        if (nextText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
        } else {
          timer = setTimeout(handleType, 70);
        }
      } else {
        const nextText = fullText.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        
        if (nextText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          timer = setTimeout(handleType, 300);
        } else {
          timer = setTimeout(handleType, 35);
        }
      }
    };

    timer = setTimeout(handleType, isDeleting ? 35 : 70);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  // Live Simulated ML Training Loop
  useEffect(() => {
    if (!isTraining) return;

    const maxEpochs = 100;
    const interval = setInterval(() => {
      setEpoch((prevEpoch) => {
        const nextEpoch = prevEpoch + 1;
        
        // Calculate training parameters
        // Loss starts around 1.5 and decays exponentially to ~0.08
        const currentLoss = 1.42 * Math.exp(-nextEpoch / 25) + 0.08 + Math.random() * 0.02;
        const currentValLoss = 1.55 * Math.exp(-nextEpoch / 28) + 0.11 + Math.random() * 0.03;
        
        // BLEU score starts at 0.10 and rises to 0.4996
        const currentBleu = Math.min(0.4996, 0.10 + (0.3996 * (nextEpoch / 100)) + (Math.random() * 0.01 - 0.005));

        setLossHistory((prev) => [...prev, currentLoss].slice(-40)); // Keep last 40 steps for display
        setValLossHistory((prev) => [...prev, currentValLoss].slice(-40));
        setBleuScore(currentBleu);

        if (nextEpoch >= maxEpochs) {
          clearInterval(interval);
          setIsTraining(false);
          return maxEpochs;
        }
        return nextEpoch;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isTraining]);

  const restartTraining = () => {
    setEpoch(0);
    setLossHistory([]);
    setValLossHistory([]);
    setBleuScore(0);
    setIsTraining(true);
  };

  // SVG Helper to render loss graph path
  const getSvgPath = (history) => {
    if (history.length < 2) return '';
    const width = 240;
    const height = 90;
    const maxVal = 1.6;
    
    return history.map((val, idx) => {
      const x = (idx / 39) * width;
      const y = height - (val / maxVal) * height;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  return (
    <section id="hero" className="py-12 md:py-20 border-b border-slate-200/50 dark:border-slate-800/40">
      {/* Jupyter cell input */}
      <div className="notebook-cell-active space-y-4 mb-6">
        <div className="flex items-start">
          <div className="cell-label text-teal-600 dark:text-accent-teal">In [1]:</div>
          <div className="cell-input-code w-full">
            <span className="text-teal-600 dark:text-accent-teal font-semibold">import</span> portfolio as pf<br />
            <span className="text-indigo-600 dark:text-accent-indigo">model</span> = pf.models.load_agent(<span className="text-teal-600 dark:text-accent-teal">"Nabin Ranabhat"</span>)<br />
            model.train(epochs=<span className="text-amber-600 dark:text-amber-500">100</span>, target_loss=<span className="text-amber-600 dark:text-amber-500">0.08</span>)
          </div>
        </div>

        {/* Jupyter cell output */}
        <div className="flex items-start">
          <div className="cell-label">Out [1]:</div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Profile Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-mono px-2 py-1 bg-teal-500/10 dark:bg-accent-teal/10 text-teal-600 dark:text-accent-teal border border-teal-500/20 dark:border-accent-teal/20 rounded-md">
                  EPOCH {epoch}/100 STATUS: {epoch === 100 ? 'SUCCESS' : 'OPTIMIZING'}
                </span>
                <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-slate-900 dark:text-white tracking-tight mt-3 mb-2">
                  {config.profile.name}
                </h1>
                
                {/* Typewriter Title */}
                <div className="h-8 flex items-center font-display text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-accent-teal dark:to-accent-indigo">
                    {currentText}
                  </span>
                  <span className="typewriter-cursor text-teal-600 dark:text-accent-teal"></span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                {config.profile.tagline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="px-5 py-2.5 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-medium rounded-lg text-sm transition-all shadow-md flex items-center gap-2 group"
                >
                  View Projects
                </a>
                <a
                  href={config.profile.resumeUrl}
                  download
                  className="px-5 py-2.5 border border-slate-300 dark:border-slate-800 hover:border-teal-600 dark:hover:border-accent-teal text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-accent-teal font-medium rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all flex items-center gap-2"
                >
                  <FileText size={14} />
                  Download Resume
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                {[
                  { icon: <Mail size={16} />, href: `mailto:${config.profile.email}`, label: 'Email' },
                  { icon: <Github size={16} />, href: config.profile.githubUrl, label: 'GitHub' },
                  { icon: <Linkedin size={16} />, href: config.profile.linkedinUrl, label: 'LinkedIn' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal hover:border-teal-600/30 dark:hover:border-accent-teal/30 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:scale-105 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Simulated Training Dashboard Widget */}
            <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isTraining ? 'bg-teal-500 animate-ping' : 'bg-green-500'}`} />
                  TRAINING_LOG: byT5_translation
                </span>
                
                <button
                  onClick={restartTraining}
                  disabled={isTraining}
                  className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-teal-600 dark:hover:text-accent-teal disabled:opacity-40 transition-colors"
                  title="Restart Training Loop"
                >
                  <RotateCcw size={13} />
                </button>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-3 gap-2 mb-4 bg-slate-100/55 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800/40">
                <div className="text-left">
                  <div className="text-[10px] font-mono text-slate-400">EPOCH</div>
                  <div className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">{epoch}/100</div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-slate-400">LOSS</div>
                  <div className="text-sm font-mono font-bold text-teal-600 dark:text-accent-teal">
                    {lossHistory.length > 0 ? lossHistory[lossHistory.length - 1].toFixed(4) : '1.5000'}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-slate-400">VAL_BLEU</div>
                  <div className="text-sm font-mono font-bold text-indigo-600 dark:text-accent-indigo">
                    {bleuScore.toFixed(4)}
                  </div>
                </div>
              </div>

              {/* SVG Curve Plot */}
              <div className="w-full h-24 border border-slate-200 dark:border-slate-850 rounded-lg bg-slate-50 dark:bg-slate-950/40 p-1 flex items-center justify-center relative overflow-hidden mb-3">
                {lossHistory.length < 2 ? (
                  <span className="text-[10px] font-mono text-slate-400">Initializing parameters...</span>
                ) : (
                  <svg viewBox="0 0 240 90" className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    <line x1="0" y1="30" x2="240" y2="30" stroke="currentColor" strokeDasharray="3,3" className="text-slate-200 dark:text-slate-800/50" />
                    <line x1="0" y1="60" x2="240" y2="60" stroke="currentColor" strokeDasharray="3,3" className="text-slate-200 dark:text-slate-800/50" />
                    
                    {/* Val Loss Curve */}
                    <path
                      d={getSvgPath(valLossHistory)}
                      fill="none"
                      stroke="rgba(99, 102, 241, 0.45)"
                      strokeWidth="1.5"
                    />
                    {/* Train Loss Curve */}
                    <path
                      d={getSvgPath(lossHistory)}
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                {/* Graph Legend */}
                <div className="absolute bottom-1 right-2 flex gap-3 text-[9px] font-mono text-slate-400 select-none">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" /> loss</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" /> val_loss</span>
                </div>
              </div>

              {/* Raw Console Logs */}
              <div className="terminal-window h-20 text-left text-[10px] leading-tight select-none">
                {lossHistory.length === 0 ? (
                  <div className="text-slate-500 animate-pulse">&gt; Initializing CUDA devices...</div>
                ) : (
                  <>
                    <div>&gt; Model: ByT5 (transliteration tokenizer-free)</div>
                    <div>&gt; Optim: AdamW(lr=3e-4, weight_decay=0.01)</div>
                    {epoch > 0 && (
                      <div className="text-teal-500/90 font-semibold">
                        &gt; epoch {epoch}/100: loss={lossHistory[lossHistory.length - 1].toFixed(4)} val_loss={valLossHistory[valLossHistory.length - 1]?.toFixed(4)} BLEU={bleuScore.toFixed(4)}
                      </div>
                    )}
                    {epoch === 100 && (
                      <div className="text-green-500 font-bold animate-bounce">
                        &gt; Training completed! BLEU score 0.4996 achieved. Checkpoint saved!
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
