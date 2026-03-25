import { useEffect, useState } from 'react';
import logo from '../assets/logo-red.svg';
import resume from '../assets/revision-1.pdf';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['intro', 'about', 'projects', 'skills', 'certificates', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Intro',        href: '#intro'        },
    { name: 'About',        href: '#about'        },
    { name: 'Projects',     href: '#projects'     },
    { name: 'Skills',       href: '#skills'       },
    { name: 'Certificates', href: '#certificates' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 md:px-20 transition-all duration-300
        ${scrolled ? 'bg-black/60 backdrop-blur-[3px] shadow-lg' : 'bg-transparent'}`}
      >
        <div className="mx-auto max-w-7xl py-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <img src={logo} alt="logo" className="w-8 h-8" />

            {/* Desktop links — hidden on mobile */}
            <div className="hidden md:flex items-center gap-4 sm:gap-8 md:gap-12 text-sm sm:text-base">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-[400] transition ${
                    activeSection === link.href.slice(1)
                      ? 'opacity-100 text-white'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="group font-display flex items-center gap-1 text-[#f8401a] px-3 py-2 hover:text-[#f65c3d] transition"
              >
                <span>Resume</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                  className="w-3 h-3 transition-transform duration-200 ease-out group-hover:rotate-45">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

            {/* Hamburger — visible only on mobile */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 transition-all duration-300
        ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-light transition-all duration-300 ${
              activeSection === link.href.slice(1)
                ? 'text-[#f8401a]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {link.name}
          </a>
        ))}
        <a
          href={resume}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-[#f8401a] text-2xl font-light"
        >
          Resume
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </>
  );
};

export default Navbar;