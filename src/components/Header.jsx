import { useEffect, useState } from "react";
import BitText from "./PixelLogo";
import { Moon, Search, Sun } from "./Icons";
import { toggleTheme } from "./theme";

const Header = ({ theme, setTheme, openMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={`sticky top-0 z-50 transition-[background,backdrop-filter] duration-300 ${scrolled ? "backdrop-blur-md glass border-b border-dashed border-line" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between rail px-4 sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Home">
          <BitText text="MAHESH" px={3.2} gap={0.6} />
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a href="#work" className="hidden rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-fg sm:block">Work</a>
          <a href="#experience" className="hidden rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-fg sm:block">Experience</a>
          <button onClick={openMenu} className="chip ml-1 flex items-center gap-2 rounded-full py-1 px-2 text-sm sm:pl-2.5 sm:pr-1.5 text-muted transition-colors hover:text-fg" aria-label="Open command menu">
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded-full border border-line bg-bg px-1.5 font-mono text-[10px] sm:inline">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <span className="mx-1 h-5 w-px bg-line" />
          <button onClick={(e) => toggleTheme(theme, setTheme, e)} className="chip grid size-8 place-items-center rounded-full" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
