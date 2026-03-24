import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";
import useScrollEffect from "./hooks/useScrollEffect";

const App = () => {
  useScrollEffect();
  return (
    <>
      <div id="intro" className="h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center">
          <Hero />
        </main>
      </div>
      <div id="about" className="h-screen flex items-center">
        <About />
      </div>
      <div id="projects" className="flex">
        <Projects />
      </div>
      <div id="skills" className="flex">
        <Skills />
      </div>
      <div id="certificates" className="h-screen flex items-center">
        <Certificates />
      </div>
      <div id="contact" className="">
        <Contact />
      </div>
    </>
  );
};

export default App;