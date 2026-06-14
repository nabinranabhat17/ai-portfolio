// central configuration for the portfolio
export const config = {
  profile: {
    name: "Nabin Ranabhat",
    titles: ["AI/ML Engineer", "NLP Researcher", "Agentic AI Developer"],
    tagline: "Passionate about low-resource NLP, generative AI, fine-tuning transformer models, and deploying ML workflows.",
    resumeUrl: "/resume.pdf", // Place your resume.pdf in /public/resume.pdf
    email: import.meta.env.VITE_EMAIL || "nranabhat17@gmail.com",
    githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/nranabhat17", // Replace with your actual github url
    linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/nabin-ranabhat", // Replace with your actual linkedin url
    twitterUrl: "https://twitter.com/nranabhat17", // Optional/placeholder
    about: {
      bio: "I am a recent Computer Engineering graduate from Pulchowk Engineering Campus, passionate about training and deploying machine learning models. I specialize in fine-tuning transformer models, low-resource natural language processing, building robust data pipelines, and engineering intelligent multi-agent AI systems.",
      stats: [
        { label: "LeetCode solved", value: "150+" },
        { label: "ML Certifications", value: "3" },
        { label: "Graduation Status", value: "Graduate(Pulchowk Campus, 2026)" }
      ]
    }
  },
  
  experience: [
    {
      role: "AI/ML Engineer Intern",
      company: "Proventus Technology Pvt. Ltd.",
      duration: "Nov 2025 – Jan 2026",
      location: "Kathmandu, Nepal",
      points: [
        "Contributed to CratusPulse, a patient-monitoring platform built to FCC/FDA-aligned compliance standards.",
        "Evaluated ECG signal processing pipeline (Pan-Tompkins++) against MIT-BIH Arrhythmia, MIT-BIH NST, and LUDB datasets.",
        "Analyzed detection metrics to validate pipeline reliability for regulatory-grade vital-sign monitoring."
      ]
    }
  ],
  
  projects: [
    {
      title: "Low-Resource Translation of Code-Mixed Romanized Nepali-English to Devanagari Script",
      description: "Scraped 24K+ social media comments, manually annotated and curated a dataset of 2.8K+ sentence pairs. Fine-tuned Google's ByT5 tokenizer-free model and FastText word embeddings to achieve a translation BLEU-4 score of 0.4996.",
      tags: ["ByT5", "FastText", "YouTube Data API", "Pandas", "PyTorch"],
      githubUrl: "https://github.com/nranabhat17/low-res-translation-nepali",
    },
    {
      title: "News Agent: Personalized News Digest System",
      description: "A robust multi-agent pipeline featuring crawlers, embedding generators, user personalization models, editorial writers, and coordinator agents. Uses ChromaDB for vector retrieval and OpenRouter API for intelligent content extraction and structuring.",
      tags: ["Python", "ChromaDB", "OpenRouter API", "Flask", "LangChain"],
      githubUrl: "https://github.com/nranabhat17/news-agent-digest",
    },
    {
      title: "BERT-NER Document Extraction System",
      description: "Developed a BERT-based Named Entity Recognition (NER) model in TensorFlow to parse identity documents (like citizenship cards). Includes a custom Chrome browser extension for auto-filling application forms using extracted metadata.",
      tags: ["BERT", "TensorFlow", "Python", "Chrome Extension", "REST API"],
      githubUrl: "https://github.com/nranabhat17/bert-ner-extraction",
    },
    {
      title: "Automated CI/CD Pipeline for Node.js Application",
      description: "Designed a production-ready DevOps pipeline integrating Jenkins, Docker, Ansible, and automated testing. Implemented system monitoring dashboards with Prometheus and Grafana, reducing CI/CD cycle times from ~120s to ~70s.",
      tags: ["Jenkins", "Docker", "Ansible", "Prometheus", "Grafana", "CI/CD"],
      githubUrl: "https://github.com/nranabhat17/node-cicd-pipeline",
    }
  ],
  
  skills: [
    {
      category: "Languages",
      items: ["Python", "C/C++", "JavaScript (ES6+)", "SQL", "HTML5/CSS3"]
    },
    {
      category: "ML/DL Frameworks",
      items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face (Transformers, PEFT, TRL)"]
    },
    {
      category: "NLP & Models",
      items: ["BERT", "ByT5", "FastText", "Named Entity Recognition (NER)", "Tokenization", "Sentence Embeddings"]
    },
    {
      category: "Generative AI",
      items: ["LangChain", "LlamaIndex", "Multi-Agent Systems", "LLM Fine-tuning (LoRA/QLoRA)", "RAG Pipelines"]
    },
    {
      category: "Data & Pipelines",
      items: ["Pandas", "NumPy", "YouTube Data API", "Web Scraping (BeautifulSoup, Scrapy)", "Data Preprocessing"]
    },
    {
      category: "Backend & Deployment",
      items: ["Flask", "FastAPI", "Node.js", "Express", "RESTful APIs", "Nginx"]
    },
    {
      category: "DevOps & Monitoring",
      items: ["Docker", "Jenkins", "Ansible", "Prometheus", "Grafana", "GitHub Actions"]
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "ChromaDB (Vector DB)", "Redis", "SQLite"]
    },
    {
      category: "Other Engineering",
      items: ["Git/GitHub", "Linux (Bash)", "ECG Signal Processing (Pan-Tompkins++)", "MIT-BIH Dataset Validation"]
    }
  ],
  
  education: [
    {
      degree: "Bachelor in Computer Engineering",
      institution: "Pulchowk Engineering Campus, Institute of Engineering",
      duration: "2021 – April 2026",
      details: "Aggregate: 82% — Focused on Artificial Intelligence, Machine Learning, and NLP. Final Year Project in low-resource machine translation."
    },
    {
      degree: "Higher Secondary Education (+2 Science)",
      institution: "Gandaki Boarding School, Pokhara",
      duration: "2019 – 2021",
      details: "GPA: 3.64/4.0 — Maintained a focus on Mathematics, Physics, and Computer Science."
    }
  ],
  
  certifications: [
    {
      title: "Samsung Innovation Campus (AI; Coding & Programming)",
      issuer: "Samsung Electronics",
      description: "Rigorous coursework covering machine learning, deep learning, Python, and algorithm design, culminating in capstone project work."
    },
    {
      title: "AI Fellowship",
      issuer: "Fusemachines",
      description: "Exclusive training fellowship on cutting-edge deep learning, computer vision, natural language processing, and cloud ML deployment."
    }
  ],
  
  // Update this with your Formspree form ID (e.g. "mqkrpeoo")
  // You can set up a free form at https://formspree.io/ and paste your form ID here
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || "mqkrpeoo" 
};
