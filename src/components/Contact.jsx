import LikeButton from "./LikeButton";

const Contact = () => {
  return (
    <section id="contact" className="relative h-fit py-20 overflow-hidden">

      {/* Main content */}
<div className="px-4 sm:px-6 md:px-20 pt-10 pb-16">
  <h2 className="text-white text-4xl sm:text-6xl md:text-9xl font-extralight tracking-wide leading-tight">
    <span className="text-[#f8401a]">{'{ '}</span>
    <span className="italic">Connect</span>
    <span className="text-[#f8401a]">{' }'}</span>
  </h2>
</div>

{/* Footer */}
<div className="px-4 sm:px-6 md:px-20">
  <div className="flex justify-end mb-6">
    <LikeButton />
  </div>
  <div className="border-t border-dotted border-white/10 mb-6" />
  <div className="flex flex-col gap-4">
    <p className="text-white/40 text-xs font-light tracking-wide">
      © 2026 – 2027 Mahesh Babu Vishnumolakala
    </p>
    <div className="flex items-center gap-5">
      <a href="https://github.com/Maheshbabu777" target="_blank" rel="noopener noreferrer"
        className="group flex items-center gap-1 text-white text-xs tracking-widest uppercase hover:text-[#f8401a] transition-all duration-300">
        GitHub
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 group-hover:rotate-45 transition-all duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
      <a href="mailto:maheshbabuvishnumolakala@gmail.com"
        className="group flex items-center gap-1 text-white text-xs tracking-widest uppercase hover:text-[#f8401a] transition-all duration-300">
        Email
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 group-hover:rotate-45 transition-all duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
      <a href="https://linkedin.com/in/maheshbabu-v" target="_blank" rel="noopener noreferrer"
        className="group flex items-center gap-1 text-white text-xs tracking-widest uppercase hover:text-[#f8401a] transition-all duration-300">
        LinkedIn
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 group-hover:rotate-45 transition-all duration-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
    </div>
  </div>
</div>
    </section>
  );
};

export default Contact;