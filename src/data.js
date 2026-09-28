export const profile = {
  name: "Mahesh Babu Vishnumolakala",
  short: "Mahesh",
  roles: ["AI / ML Engineer", "Intern at Perseverance AI", "Published on IEEE Xplore", "Final-year CSE at LPU"],
  location: "Phagwara, Punjab",
  timezone: "Asia/Kolkata",
  email: "maheshbabuvishnumolakala@gmail.com",
  github: "https://github.com/Maheshbabu777",
  githubUser: "Maheshbabu777",
  linkedin: "https://linkedin.com/in/maheshbabu-v",
  x: "https://x.com/mahesh____i",
  xHandle: "@mahesh____i",
  resume: "/Mahesh_Resume.pdf",
  paper: "https://ieeexplore.ieee.org/document/11565004",
};

export const about = [
  "I'm Mahesh, a final-year CSE student at Lovely Professional University. I like taking an ML idea out of the notebook and turning it into *something people can actually use*.",
  "Right now I'm an AI engineering intern at *Perseverance AI*, working on Lensy, a product that audits technical documentation for AI readiness.",
  "Before that I did NLP research with my department, which ended up as *a paper on IEEE Xplore*.",
  "I mostly write Python (PyTorch, HuggingFace, scikit-learn, FastAPI) and use Java for DSA.",
];

export const experience = [
  {
    company: "Perseverance AI",
    role: "AI Engineering Intern",
    meta: "Lensy",
    date: "Sep 2026 - Present",
    link: "https://perseveranceai.com",
    logo: "perseverance",
    current: true,
    summary: "Working on an AI-readiness auditing product for technical documentation.",
    points: [
      "Built a fallback pipeline for JS-rendered pages, with retry handling for rate-limit failures and a consent step before analysis.",
      "Found and fixed classification rules that were wrongly rejecting valid URLs.",
      "Rebuilt the product frontend from the Figma design to a live deployment, restructuring every route without breaking existing logic.",
    ],
    tags: ["Python", "LLMs", "Pipelines", "Frontend"],
  },
  {
    company: "Dept. of CSE, LPU",
    role: "Research Assistant",
    meta: "under Prof. Enjula Uchoi",
    date: "Dec 2025 - Apr 2026",
    link: "https://ieeexplore.ieee.org/document/11565004",
    logo: "lpu",
    summary: "Token-level language identification for Hinglish (code-switched Hindi and English) text.",
    points: [
      "Fine-tuned and compared four transformers (mDeBERTa-v3, XLM-RoBERTa, mBERT, DistilBERT) on 74,813 labeled tokens across zero-shot, few-shot and full fine-tuning.",
      "Best model reached 96.68% accuracy and 0.88 macro-F1.",
      "Paper published on IEEE Xplore and presented at ICICI 2026.",
    ],
    tags: ["NLP", "Transformers", "HuggingFace", "Research"],
  },
];

export const projects = [
  {
    name: "CredFraud",
    kind: "fraud",
    tagline: "Fraud model bake-off",
    date: "Aug 2026",
    desc: "XGBoost, LightGBM and a custom PyTorch MLP trained and compared on *590K+ real card transactions* under the same conditions. SMOTE on the training split only, so nothing leaks.",
    stats: [
      { k: "Test AUC", v: "0.961" },
      { k: "Recall", v: "0.59 → 0.69" },
      { k: "Transactions", v: "590K+" },
    ],
    models: [
      { n: "LightGBM", auc: 0.961 },
      { n: "XGBoost", auc: 0.954 },
      { n: "PyTorch MLP", auc: 0.939 },
    ],
    tags: ["Python", "LightGBM", "XGBoost", "PyTorch", "MLflow"],
    code: "https://github.com/Maheshbabu777/fraud-detection",
  },
  {
    name: "Semlogic",
    kind: "image",
    tagline: "Semantic code search",
    date: "Apr 2026",
    desc: "Ask a question in *plain English* and get back *the code that matches*. Transformer embeddings and ChromaDB for retrieval, a cross-encoder to rerank, all behind a FastAPI backend.",
    tags: ["FastAPI", "ChromaDB", "Transformers", "Docker", "RAG"],
    code: "https://github.com/Maheshbabu777/semantic-code-search",
    live: "https://semlogic.vercel.app/",
  },
];

export const moreProjects = [
  {
    name: "EV Battery Charging Optimization",
    desc: "Predicting optimal charging duration from EV battery data with scikit-learn.",
    link: "https://github.com/Maheshbabu777/EV-battery-optimisation",
    icon: "battery",
  },
  {
    name: "NoteIT",
    desc: "Full-stack notes app with CRUD and user authentication.",
    link: "https://github.com/Maheshbabu777/NoteIT",
    icon: "note",
  },
];

export const skills = [
  {
    group: "AI coding tools",
    note: "what I build with every day",
    items: [
      ["Claude Code", "claude"], ["Codex", "codex"], ["Kiro", "kiro"], ["GitHub Copilot", "githubcopilot"],
      ["Gemini", "googlegemini"], ["Antigravity", "antigravity"],
    ],
  },
  {
    group: "ML / DL",
    items: [
      ["PyTorch", "pytorch"], ["Hugging Face", "huggingface"], ["Scikit-learn", "scikitlearn"], ["MLflow", "mlflow"], ["Pandas", "pandas"], ["NumPy", "numpy"],
    ],
  },
  {
    group: "LLM & RAG",
    items: [
      ["RAG pipelines", "rag"], ["ChromaDB", "chroma"], ["Prompt engineering", "prompt"],
      ["Agentic patterns", "agent"], ["Model evaluation", "eval"],
    ],
  },
  { group: "Languages", items: [["Python", "python"], ["Java", "openjdk"], ["SQL", "db"]] },
  {
    group: "Backend & infra",
    items: [["FastAPI", "fastapi"], ["REST APIs", "api"], ["Docker", "docker"], ["AWS", "aws"], ["Vercel", "vercel"]],
  },
  {
    group: "Workflow",
    items: [["Git", "git"], ["GitHub", "github"], ["Jupyter", "jupyter"], ["Google Colab", "googlecolab"], ["Kaggle", "kagglek"], ["Figma", "figma"]],
  },
];

export const achievements = [
  { title: "2nd place, university hackathon", desc: "Malicious URL detection system built with ML.", date: "Feb 2026" },
  { title: "Paper published on IEEE Xplore", desc: "Presented at ICICI 2026.", date: "May 2026", link: "https://ieeexplore.ieee.org/document/11565004" },
  { title: "Top 10% of the university", desc: "Academic ranking at LPU.", date: "Mar 2025" },
];

export const certs = [
  { title: "McKinsey Forward Program", issuer: "McKinsey & Company", date: "Jun 2026", link: "https://www.credly.com/badges/8c495cf3-013b-4da0-b42d-d8d4a1215d29/public_url" },
  { title: "OCI Generative AI Professional", issuer: "Oracle University", date: "Oct 2025", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=30DBF7665730981E6AD363EA3592D5E5C2802AE613B8C997FD1672545FB4205D" },
];

export const education = {
  school: "Lovely Professional University",
  degree: "B.Tech, Computer Science and Engineering",
  date: "2023 - 2027",
  grade: "CGPA 8.89",
  place: "Phagwara, Punjab",
};
