import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useNavigationType } from "react-router-dom";
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
import { scrollToId, scrollToY } from "./components/nav";

const Home = () => {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  // arriving from the contact page with a section to jump to. The request is used once and then
  // cleared from history, so a reload later opens the page at the top instead of jumping again.
  useEffect(() => {
    if (!state?.scrollTo) return;
    const id = state.scrollTo;
    navigate(pathname, { replace: true, state: null });
    requestAnimationFrame(() => scrollToId(id));
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
// New pages open at the top, and so does every reload. The browser back button returns to where you were.
const saved = new Map();
const useScrollReset = () => {
  const { pathname, state, key } = useLocation();
  const type = useNavigationType();
  // layout effect so the position is saved before the next page's DOM can clamp it
  useLayoutEffect(() => {
    let latest = window.scrollY;
    const remember = () => { latest = window.scrollY; };
    window.addEventListener("scroll", remember, { passive: true });
    if (type !== "REPLACE" && !state?.scrollTo) {
      const y = type === "POP" ? saved.get(key) ?? 0 : 0;
      requestAnimationFrame(() => scrollToY(y));
    }
    return () => { saved.set(key, latest); window.removeEventListener("scroll", remember); };
  }, [pathname, key]);
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [menu, setMenu] = useState(false);
  const [color, setColor] = useState(getInitialColor);
  useEffect(() => applyColor(color), [color]);
  useEffect(() => applyTheme(theme), []);
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
