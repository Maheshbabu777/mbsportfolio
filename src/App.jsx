import { useEffect, useState } from "react";
import Lenis from "lenis";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Activity from "./components/Activity";
import { Achievements, Certifications, Education, Skills } from "./components/Rest";
import Footer from "./components/Footer";
import CommandMenu from "./components/CommandMenu";
import { applyTheme, getInitialTheme } from "./components/theme";

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

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menu, setMenu] = useState(false);
  useEffect(() => applyTheme(theme), []);
  useLenis();

  return (
    <>
      <Cursor />
      <Header theme={theme} setTheme={setTheme} openMenu={() => setMenu(true)} />
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
      <CommandMenu openState={menu} setOpen={setMenu} theme={theme} setTheme={setTheme} />
    </>
  );
};

export default App;
