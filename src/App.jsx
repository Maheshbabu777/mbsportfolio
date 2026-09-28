import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
import { applyTheme, getInitialTheme } from "./components/theme";
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
    <main className="mx-auto max-w-3xl rail">
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
    <main className="mx-auto min-h-screen max-w-3xl rail">
      <Contact />
      <Footer compact />
    </main>
  );
};

// start each page at the top unless we were asked to jump somewhere
const useScrollReset = () => {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state?.scrollTo) return;
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  }, [pathname]);
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menu, setMenu] = useState(false);
  useEffect(() => applyTheme(theme), []);
  useLenis();
  useEffect(() => wireSounds(), []);
  useScrollReset();

  return (
    <>
      <Cursor />
      <Header theme={theme} setTheme={setTheme} openMenu={() => setMenu(true)} />
      <Routes>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Game />
      <CommandMenu openState={menu} setOpen={setMenu} theme={theme} setTheme={setTheme} />
    </>
  );
};

export default App;
