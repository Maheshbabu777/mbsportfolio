import ppic from '../assets/ppic.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-20 py-10 md:py-16">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="206" height="206" patternUnits="userSpaceOnUse">
            <path d="M 206 0 L 0 0 0 206 206 206 206 0" fill="none" stroke="rgba(255,255,255,50)" strokeWidth="0.105" />
          </pattern>
          <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="1" />
            <stop offset="85%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fade-mask">
            <rect width="100%" height="100%" fill="url(#fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fade-mask)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 lg:gap-20 items-center">

          {/* LEFT */}
          <div className="flex flex-col order-last lg:order-first">
            <p className="text-white italic font-[150] text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:ml-40 lg:mb-20 mb-6">
              Mahesh here,
            </p>
            <p className="text-white font-light text-lg sm:text-xl md:text-2xl lg:text-4xl leading-snug max-w-xl mb-6 lg:ml-40">
              Turning ideas into reality. I am a Developer specializing in building clear and usable systems.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 lg:ml-40">

              {/* LinkedIn button */}
              <a
                href="https://linkedin.com/in/maheshbabu-v"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#f8401a] text-black px-6 py-3 border-2 border-transparent rounded-lg hover:bg-white hover:border-stone-300 transition-all duration-300 ease-out hover:scale-[1.03]"
              >
                <span>LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              {/* Email button */}
              <a
                href="mailto:maheshbabuvishnumolakala@gmail.com"
                className="group flex items-center gap-2 bg-[#000000] border-2 border-[#f8401a] text-white px-6 py-3 hover:border-[#ffffff] rounded-lg transition-all duration-300 ease-out hover:scale-[1.03]"
              >
                <span>Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 rotate-[-44deg] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="order-first lg:order-last w-full flex items-center justify-center">
            <img
              src={ppic}
              alt="Mahesh"
              className="w-36 h-44 sm:w-44 sm:h-52 md:w-56 md:h-64 lg:w-80 lg:h-96 rounded-lg shadow-lg object-cover transition duration-300"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;