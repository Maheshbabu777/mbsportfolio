import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import { Achievements, Certifications, Education } from "./components/Rest";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { wireSounds } from "./components/sound";
import Footer from "./components/Footer";
import CommandMenu from "./components/CommandMenu";
import Game from "./components/Game";
import { applyColor, applyTheme, getInitialColor, getInitialTheme } from "./components/theme";
import { isContactPath, scrollToId } from "./components/nav";

const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const click = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -56 }); }
    };
    document.addEventListener("click", click);
    return () => { cancelAnimationFrame(id); document.removeEventListener("click", click); lenis.destroy(); window.__lenis = null; };
  }, []);
};

const Home = () => {
  const { state } = useLocation();
  // arriving from another page with a section to jump to
  useEffect(() => {
    if (!state?.scrollTo) return;
    const t = setTimeout(() => scrollToId(state.scrollTo), 250);
    return () => clearTimeout(t);
  }, [state]);
  useEffect(() => { document.title = "Mahesh Babu | AI/ML Engineer"; }, []);
  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-3xl rail outline-none">
      <Hero />
      <Experience />
      <Projects />
      <Activity />
      <Skills />
      <Achievements />
      <Certifications />
      <Education />
      <Footer />
    </main>
  );
};

const ContactPage = () => {
  useEffect(() => { document.title = "Contact | Mahesh Babu"; }, []);
  return (
    <main id="main" tabIndex={-1} className="mx-auto min-h-screen max-w-3xl rail outline-none">
      <Contact />
      <Footer compact />
    </main>
  );
};

// start each page at the top unless we were asked to jump somewhere
// New pages open at the top. Going back (browser back button) returns to where you were.
const saved = new Map();
const useScrollReset = () => {
  const { pathname, state, key } = useLocation();
  const type = useNavigationType();
  useEffect(() => {
    const remember = () => saved.set(key, window.scrollY);
    window.addEventListener("scroll", remember, { passive: true });
    if (!state?.scrollTo) {
      const y = type === "POP" ? saved.get(key) ?? 0 : 0;
      const to = () => {
        const lenis = window.__lenis;
        lenis?.resize(); // the page height just changed, let smooth scroll re-measure first
        if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo(0, y);
      };
      // wait for layout, then jump
      requestAnimationFrame(() => requestAnimationFrame(to));
    }
    return () => window.removeEventListener("scroll", remember);
  }, [pathname, key]);
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menu, setMenu] = useState(false);
  const [color, setColor] = useState(getInitialColor);
  useEffect(() => applyColor(color), [color]);
  useEffect(() => applyTheme(theme), []);
  useLenis();
  useEffect(() => wireSounds(), []);
  useScrollReset();

  return (
    <>
      <a href="#main" className="skip-link btn-dark rounded-md px-3 py-1.5 text-sm">Skip to content</a>
      <Cursor />
      <Header theme={theme} setTheme={setTheme} color={color} setColor={setColor} openMenu={() => setMenu(true)} />
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Game />
      <CommandMenu openState={menu} setOpen={setMenu} theme={theme} setTheme={setTheme} color={color} setColor={setColor} />
    </>
  );
};

export default App;
