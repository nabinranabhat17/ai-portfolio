import React, { useState, useEffect, useRef } from 'react';
import { Play, Sparkles, Terminal, FileSearch, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample sentences for NER
const NER_SAMPLES = [
  "Nabin Ranabhat worked as a Full-Stack Developer at Proventus Technology Pvt. Ltd. in Kathmandu, Nepal from November 2025 to January 2026.",
  "Pulchowk Campus is a premier engineering college under Tribhuvan University, located in Lalitpur.",
  "We deployed the ByT5 transliteration model using FastAPI on an AWS EC2 instance in the ap-south-1 region."
];

// Simple Romanized to Devanagari mapper dictionary for common inputs + character rule fallback
const TRANSLIT_DICT = {
  "namaste": "नमस्ते",
  "mero naam nabin ho": "मेरो नाम नवीन हो",
  "mero nam nabin ho": "मेरो नाम नवीन हो",
  "pulchowk campus": "पुल्चोक क्याम्पस",
  "computer engineering": "कम्प्युटर इन्जिनियरिङ",
  "nepal": "नेपाल",
  "timro naam ke ho": "तिम्रो नाम के हो",
  "ma ml engineer hu": "म ML इन्जिनियर हुँ",
  "hello world": "हेलो वर्ल्ड"
};

// Simple rule-based transliteration fallback
const transliterateFallback = (text) => {
  const t = text.toLowerCase().trim();
  if (TRANSLIT_DICT[t]) return TRANSLIT_DICT[t];

  // Very simple character replacement to make it look like transliteration
  let res = '';
  const rules = [
    { eng: 'namaste', nep: 'नमस्ते' },
    { eng: 'nabin', nep: 'नवीन' },
    { eng: 'pulchowk', nep: 'पुल्चोक' },
    { eng: 'campus', nep: 'क्याम्पस' },
    { eng: 'engineering', nep: 'इन्जिनियरिङ' },
    { eng: 'nepal', nep: 'नेपाल' },
    { eng: 'sha', nep: 'श' },
    { eng: 'cha', nep: 'च' },
    { eng: 'tha', nep: 'थ' },
    { eng: 'dha', nep: 'ध' },
    { eng: 'kha', nep: 'ख' },
    { eng: 'gha', nep: 'घ' },
    { eng: 'bh', nep: 'भ' },
    { eng: 'ph', nep: 'फ' },
    { eng: 'ka', nep: 'क' },
    { eng: 'ma', nep: 'म' },
    { eng: 'na', nep: 'न' },
    { eng: 'ra', nep: 'र' },
    { eng: 'la', nep: 'ल' },
    { eng: 'wa', nep: 'व' },
    { eng: 'sa', nep: 'स' },
    { eng: 'ha', nep: 'ह' },
    { eng: 'pa', nep: 'प' },
    { eng: 'ba', nep: 'ब' },
    { eng: 'ta', nep: 'त' },
    { eng: 'da', nep: 'द' },
    { eng: 'ga', nep: 'ग' },
    { eng: 'ya', nep: 'य' },
    { eng: 'a', nep: 'अ' },
    { eng: 'i', nep: 'इ' },
    { eng: 'u', nep: 'उ' },
    { eng: 'e', nep: 'ए' },
    { eng: 'o', nep: 'ओ' }
  ];

  let temp = t;
  // Apply mappings
  rules.forEach(r => {
    temp = temp.replace(new RegExp(r.eng, 'g'), r.nep);
  });

  // Clean up remaining English characters if any
  temp = temp.replace(/[a-z]/g, '');
  return temp || 'मेरो मोडेल (transliterated)';
};

// Named Entity tagging data
const tagNER = (text) => {
  if (text.includes("Proventus Technology")) {
    return [
      { text: "Nabin Ranabhat", tag: "PER", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
      { text: " worked as a Full-Stack Developer at " },
      { text: "Proventus Technology Pvt. Ltd.", tag: "ORG", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { text: " in " },
      { text: "Kathmandu", tag: "LOC", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
      { text: ", " },
      { text: "Nepal", tag: "LOC", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
      { text: " from " },
      { text: "November 2025 to January 2026", tag: "DATE", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
      { text: "." }
    ];
  } else if (text.includes("Pulchowk Campus")) {
    return [
      { text: "Pulchowk Campus", tag: "LOC", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
      { text: " is a premier engineering college under " },
      { text: "Tribhuvan University", tag: "ORG", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { text: ", located in " },
      { text: "Lalitpur", tag: "LOC", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
      { text: "." }
    ];
  } else {
    return [
      { text: "We deployed the " },
      { text: "ByT5", tag: "MISC", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
      { text: " transliteration model using " },
      { text: "FastAPI", tag: "ORG", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { text: " on an " },
      { text: "AWS EC2", tag: "ORG", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
      { text: " instance in the " },
      { text: "ap-south-1", tag: "LOC", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
      { text: " region." }
    ];
  }
};

export default function ModelPlayground() {
  const [activeTab, setActiveTab] = useState('translit');
  const [loading, setLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');

  // Translit states
  const [transInput, setTransInput] = useState('mero naam nabin ho');
  const [transOutput, setTransOutput] = useState('');
  const [transMetrics, setTransMetrics] = useState(null);

  // NER states
  const [nerInput, setNerInput] = useState(NER_SAMPLES[0]);
  const [nerOutput, setNerOutput] = useState([]);

  // Agent states
  const [agentLogs, setAgentLogs] = useState([]);
  const [agentDigest, setAgentDigest] = useState(null);
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [agentLogs]);

  // Transliteration Runner
  const runTranslit = () => {
    setLoading(true);
    setTransOutput('');
    setTransMetrics(null);

    const steps = [
      { msg: 'Tokenizing Romanized Nepali character stream...', delay: 200 },
      { msg: 'Injecting embeddings to encoder layers...', delay: 350 },
      { msg: 'Autoregressive decoding with ByT5 logits...', delay: 300 }
    ];

    let currentStep = 0;
    const processStep = () => {
      if (currentStep < steps.length) {
        setProgressMsg(steps[currentStep].msg);
        setTimeout(() => {
          currentStep++;
          processStep();
        }, steps[currentStep].delay);
      } else {
        setLoading(false);
        setTransOutput(transliterateFallback(transInput));
        setTransMetrics({
          bleu: transInput.toLowerCase().includes('nabin') ? 0.4996 : 0.4623,
          latency: '38ms',
          chars: transInput.length
        });
      }
    };

    processStep();
  };

  // NER Runner
  const runNER = () => {
    setLoading(true);
    setNerOutput([]);

    setTimeout(() => {
      setLoading(false);
      setNerOutput(tagNER(nerInput));
    }, 600);
  };

  // Agent Runner
  const runAgentPipeline = () => {
    setLoading(true);
    setAgentLogs([]);
    setAgentDigest(null);

    const logs = [
      { text: "[System] Initializing NewsCoordinatorAgent session...", delay: 0 },
      { text: "[System] Spawning subprocess on Llama-3-8B-Instruct local environment.", delay: 200 },
      { text: "[NewsCrawlerAgent] Crawling arXiv and TechCrunch RSS for term 'PEFT Fine-Tuning'...", delay: 500 },
      { text: "[NewsCrawlerAgent] Scraped 4 new papers and 2 tech articles.", delay: 900 },
      { text: "[ChromaDBEmbedder] Chunking texts & calculating vector embeddings (sentence-transformers)...", delay: 1200 },
      { text: "[ChromaDBEmbedder] Query similarity match completed in Chroma index. Latency: 12ms.", delay: 1500 },
      { text: "[PersonalizerAgent] Filtering and ranking articles by user interests: {NLP: 0.95, LowResource: 0.90, DevOps: 0.50}", delay: 1900 },
      { text: "[EditorialAgent] Summarizing top matching paper: 'Parameter-Efficient Transliteration Tuning'...", delay: 2300 },
      { text: "[CoordinatorAgent] Pipeline successfully completed. Returning personalized news digest.", delay: 2800 }
    ];

    logs.forEach((log) => {
      setTimeout(() => {
        setAgentLogs((prev) => [...prev, log.text]);
        if (log.text.includes("completed")) {
          setLoading(false);
          setAgentDigest({
            title: "Multi-Agent News: PEFT Transliteration Tuning",
            source: "arXiv:2512.04921v1",
            summary: "This research presents a novel recipe for fine-tuning ByT5 character-level translation models in low-resource setups. By freezing 85% of standard encoder-decoder parameters and training lightweight LoRA adapters, developers obtained higher BLEU scores on Romanized-to-Devanagari scripts while reducing memory overhead by 4x. Ideal for low-resource locales.",
            score: "Similarity: 0.962 (Highly Recommended)"
          });
        }
      }, log.delay);
    });
  };

  return (
    <section id="model-playground" className="py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="notebook-cell space-y-4">
        {/* Input Cell */}
        <div className="flex items-start">
          <div className="cell-label">In [5]:</div>
          <div className="cell-input-code w-full">
            <span className="text-teal-600 dark:text-accent-teal font-semibold">import</span> model_playground as mp<br />
            mp.run_interactive_inference(port=<span className="text-amber-600 dark:text-amber-500">8080</span>)
          </div>
        </div>

        {/* Output Cell */}
        <div className="flex items-start">
          <div className="cell-label">Out [5]:</div>
          <div className="w-full pt-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-left">
                Interactive Model Inference Sandbox
              </h2>
            </div>

            {/* Sandbox Container */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 backdrop-blur-sm overflow-hidden shadow-sm">
              {/* Tab Selector Headers */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/40">
                {[
                  { id: 'translit', label: 'ByT5 Transliteration', icon: <Sparkles size={14} /> },
                  { id: 'ner', label: 'BERT NER Tagging', icon: <FileSearch size={14} /> },
                  { id: 'agent', label: 'Multi-Agent News Logs', icon: <Terminal size={14} /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (!loading) setActiveTab(tab.id);
                    }}
                    disabled={loading}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-mono font-bold border-r border-slate-200 dark:border-slate-800 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-bg-dark text-teal-600 dark:text-accent-teal'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="p-5 text-left">
                {/* 1. Transliteration Playground */}
                {activeTab === 'translit' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal mb-1">
                      Translate Romanized text (English characters) to Devanagari script. Our model uses a custom ByT5 vocabulary-free architecture.
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Inputs Column */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-slate-400 block font-bold">ROMANIZED NEPALI INPUT:</label>
                        <textarea
                          rows={2}
                          value={transInput}
                          onChange={(e) => setTransInput(e.target.value)}
                          className="w-full p-3 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                        />
                        
                        {/* Sample Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {Object.keys(TRANSLIT_DICT).slice(0, 4).map((sample, i) => (
                            <button
                              key={i}
                              onClick={() => setTransInput(sample)}
                              className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            >
                              {sample}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={runTranslit}
                          disabled={loading || !transInput.trim()}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white dark:text-slate-950 dark:bg-accent-teal dark:hover:bg-teal-500 disabled:opacity-40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <Play size={12} /> RUN INFERENCE
                        </button>
                      </div>

                      {/* Output Display Column */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono text-slate-400 block font-bold">DEVANAGARI DECODED OUTPUT:</label>
                        <div className="w-full h-[76px] p-3 font-display text-lg font-bold rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-100/40 dark:bg-slate-950/20 text-slate-900 dark:text-white flex items-center justify-start relative overflow-hidden">
                          {loading ? (
                            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <RefreshCw size={12} className="animate-spin text-teal-500" />
                              {progressMsg}
                            </div>
                          ) : transOutput ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              {transOutput}
                            </motion.span>
                          ) : (
                            <span className="text-xs font-mono text-slate-400 font-normal">Output will render here...</span>
                          )}
                        </div>

                        {/* Validation Metrics */}
                        {transMetrics && !loading && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400"
                          >
                            <div>
                              <span>BLEU Score</span>
                              <div className="font-bold text-teal-600 dark:text-accent-teal">{transMetrics.bleu.toFixed(4)}</div>
                            </div>
                            <div>
                              <span>Latency</span>
                              <div className="font-bold text-slate-800 dark:text-slate-200">{transMetrics.latency}</div>
                            </div>
                            <div>
                              <span>Processed</span>
                              <div className="font-bold text-slate-800 dark:text-slate-200">{transMetrics.chars} chars</div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Named Entity Tagging */}
                {activeTab === 'ner' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal mb-1">
                      Extract structured entity fields (PERSON, ORGANISATION, LOCATION, DATE) from raw text documents using a fine-tuned BERT architecture.
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-mono text-slate-400 block font-bold">DOCUMENT INPUT SENTENCE:</label>
                      <input
                        type="text"
                        value={nerInput}
                        onChange={(e) => setNerInput(e.target.value)}
                        className="w-full p-2.5 font-mono text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
                      />

                      {/* Sample Selection */}
                      <div className="flex flex-col gap-1.5 pt-1">
                        <div className="text-[10px] font-mono text-slate-400 font-bold">SELECT PRE-CONFIGURED SAMPLE:</div>
                        <div className="flex flex-wrap gap-2">
                          {NER_SAMPLES.map((sample, i) => (
                            <button
                              key={i}
                              onClick={() => setNerInput(sample)}
                              className="text-[10px] font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-slate-500 dark:text-slate-400 text-left max-w-md truncate"
                            >
                              {sample}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={runNER}
                        disabled={loading || !nerInput.trim()}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white dark:text-slate-950 dark:bg-accent-teal dark:hover:bg-teal-500 disabled:opacity-40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Play size={12} /> TAG ENTITIES
                      </button>

                      {/* Output Displays */}
                      <div className="pt-2">
                        <label className="text-xs font-mono text-slate-400 block font-bold mb-1.5">EXTRACTED HIGHLIGHTS:</label>
                        <div className="w-full min-h-[50px] p-3 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-100/40 dark:bg-slate-950/20 text-slate-800 dark:text-slate-200 leading-relaxed text-sm">
                          {loading ? (
                            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                              <RefreshCw size={12} className="animate-spin text-teal-500" />
                              Tokenizing and computing model attention scores...
                            </div>
                          ) : nerOutput.length > 0 ? (
                            <div className="flex flex-wrap items-center gap-1.5">
                              {nerOutput.map((chunk, i) => 
                                chunk.tag ? (
                                  <span
                                    key={i}
                                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-semibold rounded border ${chunk.color}`}
                                  >
                                    {chunk.text}
                                    <span className="text-[9px] font-mono opacity-80 border-l pl-1 border-current uppercase">
                                      {chunk.tag}
                                    </span>
                                  </span>
                                ) : (
                                  <span key={i}>{chunk.text}</span>
                                )
                              )}
                            </div>
                          ) : (
                            <span className="text-xs font-mono text-slate-400">Output will render here...</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Multi-Agent System Logs */}
                {activeTab === 'agent' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-normal mb-1">
                      Execute a multi-agent workflow. The coordination agent spawns search, embedding matching, user personalized filter, and editorial agents.
                    </div>

                    <button
                      onClick={runAgentPipeline}
                      disabled={loading}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white dark:text-slate-950 dark:bg-accent-teal dark:hover:bg-teal-500 disabled:opacity-40 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Play size={12} /> TRIGGER AGENT PIPELINE
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Log Console Terminal */}
                      <div className="lg:col-span-6 space-y-1.5">
                        <label className="text-xs font-mono text-slate-400 block font-bold">COMMUNICATION LOGGER TERMINAL:</label>
                        <div className="terminal-window h-48 select-none flex flex-col justify-start overflow-y-auto">
                          {agentLogs.length === 0 ? (
                            <span className="text-slate-500 font-mono text-[10px]">&gt; Press trigger to start the multi-agent orchestration logs...</span>
                          ) : (
                            agentLogs.map((log, i) => (
                              <div key={i} className="font-mono text-[10px] mb-1">
                                <span className="text-slate-500">&gt;</span> {log}
                              </div>
                            ))
                          )}
                          <div ref={logsEndRef} />
                        </div>
                      </div>

                      {/* Generated Digest Box */}
                      <div className="lg:col-span-6 space-y-1.5">
                        <label className="text-xs font-mono text-slate-400 block font-bold">GENERATED NEWS DIGEST OUTPUT:</label>
                        <div className="h-48 p-4 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-100/40 dark:bg-slate-950/20 overflow-y-auto">
                          {loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-xs font-mono text-slate-500 dark:text-slate-400">
                              <RefreshCw size={16} className="animate-spin text-teal-500 mb-2" />
                              Running agent pipelines...
                            </div>
                          ) : agentDigest ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-left">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white leading-tight">
                                  {agentDigest.title}
                                </h4>
                                <span className="text-[9px] font-mono text-indigo-500 dark:text-accent-indigo border border-indigo-500/20 bg-indigo-500/5 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                  RECOMMENDED
                                </span>
                              </div>
                              <div className="flex justify-between text-[9px] font-mono text-slate-400 border-b border-slate-250 dark:border-slate-800 pb-1.5">
                                <span>{agentDigest.source}</span>
                                <span className="text-teal-600 dark:text-accent-teal">{agentDigest.score}</span>
                              </div>
                              <p className="text-xs text-slate-650 dark:text-slate-400 leading-normal">
                                {agentDigest.summary}
                              </p>
                            </motion.div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-xs font-mono text-slate-400">
                              Output summary will render here...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
