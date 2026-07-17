const skills = [
  { category: "Languages", items: ["Java", "Python", "C++", "C"] },
  { category: "Frameworks & Libraries", items: ["PyTorch", "Node.js", "Express.js", "Flask", "Hugging Face Transformers", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"] },
  { category: "Tools & Platforms", items: ["VS Code", "Git", "GitHub", "Jupyter Notebook", "Figma", "HackerRank", "Leetcode", "MongoDB"] },
  { category: "Core Competencies", items: ["Data Structures & Algorithms", "Machine Learning", "OOP", "DBMS", "Operating Systems"] },
];

const Skills = () => {
  return (
    <section id="skills" className="px-4 sm:px-6 md:px-20 py-16 md:py-24 w-full">
      <div className="max-w-7xl mx-auto w-full">

        <div className="mb-10">
          <h2 className="text-white text-3xl md:text-5xl font-light mb-8 text-center">
            <span className="text-[#f8401a]">{'{ '}</span>
            <span className="italic">Skills</span>
            <span className="text-[#f8401a]">{' }'}</span>
          </h2>
          <p className="text-white/70 font-light text-xl leading-normal text-center mb-12">
            Technologies and tools I work with.
          </p>
        </div>

        <div className="md:mx-20 flex flex-col gap-10">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="text-[#f8401a] text-sm tracking-widest uppercase mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-white/70 text-sm font-light px-4 py-2 border border-white/20 rounded-full hover:border-white hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;