import noteIT from '../assets/noteIT.png';
import MultiTrans from '../assets/MultiTrans.png';
import Ev from '../assets/EV.png';
import semlogic from '../assets/semlogic.png';

const Projects = () => {
  return (
    <section id="projects" className="px-4 sm:px-6 md:px-20 py-16 md:py-24 w-full">
      <div className="max-w-7xl mx-auto w-full">

        <div className="mb-10">
          <h2 className="text-white text-3xl md:text-5xl font-light mb-8 text-center">
            <span className="text-[#f8401a]">{'{ '}</span>
            <span className="italic">Curated Work</span>
            <span className="text-[#f8401a]">{' }'}</span>
          </h2>
          <p className="text-white/70 font-light text-xl leading-normal text-center mb-12">
            Things that I have built. From each project, I have learned something new and exciting.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-5">

            <div className="group block p-7 border-2 border-[#ffffff]/30 rounded-[20px] hover:border-[#ffffff] transition-all duration-300 ease-out hover:scale-[1.03]">
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-white/50 font-[600] text-lg mb-2">
                  Multilingual Language Identification
                </h3>
                <a href="https://github.com/Maheshbabu777/Transformer-text-classification/blob/main/IEEE.pdf" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="w-4 h-4 text-white/30 group-hover:text-[#f8401a] group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
              <p className="text-white text-base font-[400] leading-relaxed mb-6">
                Transformer-based NLP system achieving 96.68% accuracy for token-level language detection in code-switched text.
              </p>
              <img src={MultiTrans} alt="Multilingual Language Identification"
                className="h-full w-full rounded-lg object-cover group-hover:scale-105 transition-all duration-500" />
            </div>

            <div className="group block p-7 border-2 border-[#ffffff]/30 rounded-[20px] hover:border-[#ffffff] transition-all duration-300 ease-out hover:scale-[1.03]">
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-white/50 font-[600] text-lg mb-2">
                  EV Battery Charging Optimization
                </h3>
                <a href="https://github.com/Maheshbabu777/EV-battery-optimisation" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="w-4 h-4 text-white/30 group-hover:text-[#f8401a] group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
              <p className="text-white text-base font-[400] leading-relaxed mb-5">
                Machine learning models to optimize EV charging behavior with 90% prediction accuracy and ∼0.98 average ROC-AUC with Logistic Regression.
              </p>
              <img src={Ev} alt="EV Battery Charging Optimization"
                className="w-auto h-auto rounded-lg object-cover group-hover:scale-105 transition-all duration-500" />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col gap-5">

            <div className="group block p-7 border-2 border-[#ffffff]/30 rounded-[20px] hover:border-[#ffffff] transition-all duration-300 ease-out hover:scale-[1.03]">
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-white/50 font-[600] text-lg mb-2">
                  semlogic
                </h3>
                <a href="https://github.com/Maheshbabu777/semantic-code-search" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="w-4 h-4 text-white/30 group-hover:text-[#f8401a] group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
              <p className="text-white text-base font-[400] leading-relaxed mb-5">
                Retrieval Augmented Generation for Codebases used to understand internal code by searching semantically.
              </p>
              <img src={semlogic} alt="semlogic"
                className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-all duration-500" />
            </div>

            <div className="group block p-7 border-2 border-[#ffffff]/30 rounded-[20px] hover:border-[#ffffff] transition-all duration-300 ease-out hover:scale-[1.03]">
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-white/50 font-[600] text-lg mb-2">
                  NoteIT
                </h3>
                <a href="https://github.com/Maheshbabu777/NoteIT" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                    className="w-4 h-4 text-white/30 group-hover:text-[#f8401a] group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
              <p className="text-white text-base font-[400] leading-relaxed mb-5">
                Full-stack notes application with CRUD operations and user authentication for managing personal notes.
              </p>
              <img src={noteIT} alt="NoteIT"
                className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition-all duration-500" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;