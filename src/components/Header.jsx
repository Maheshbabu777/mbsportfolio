import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { scrollToId, useNav } from "./nav";
import { startGhostGame } from "./Game";
import { ArrowRight, Moon, Palette, Search, SoundOff, SoundOn, Sun } from "./Icons";
import { onSoundChange, setSound, soundOn } from "./sound";
import { toggleTheme } from "./theme";

const Header = ({ theme, setTheme, color, setColor, openMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const nav = useNav();
  const [sound, setSoundState] = useState(soundOn);
  useEffect(() => onSoundChange(setSoundState), []);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={`sticky top-0 z-50 transition-[background,backdrop-filter] duration-300 ${scrolled ? "backdrop-blur-md glass border-b border-dashed border-line" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between rail px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => { if (!nav.onContact) scrollToId("main"); }}
          data-ghost-home
          data-cursor={nav.onContact ? "home" : "top"}
          className="flex items-center"
          aria-label={nav.onContact ? "Back to home" : "Back to top"}
        >
          <Logo className="h-7 w-auto" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.onContact && (
            <Link to="/" className="group flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-fg">
              <ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" /> Home
            </Link>
          )}
          <button onClick={startGhostGame} className="rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-fg" data-cursor="catch the ghost" aria-label="Play catch the ghost">
            Play
          </button>
          <Link to="/contact" className={`rounded-md px-2 py-1 text-sm transition-colors hover:text-fg ${nav.onContact ? "text-fg underline decoration-[color:var(--faint)] underline-offset-4" : "text-muted"}`}>Contact</Link>
          <button onClick={openMenu} className="chip ml-1 flex items-center gap-2 rounded-full py-1 px-2 text-sm sm:pl-2.5 sm:pr-1.5 text-muted transition-colors hover:text-fg" aria-label="Open command menu">
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded-full border border-line bg-bg px-1.5 font-mono text-[11px] sm:inline">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <span className="mx-1 h-5 w-px bg-line" />
          <div className="chip flex items-center rounded-full p-0.5">
            <button onClick={() => setSound(!sound)} className="grid size-7 place-items-center rounded-full transition-colors hover:bg-[color:var(--bg)]" aria-label={sound ? "Mute sounds" : "Turn sounds on"} aria-pressed={sound}>
              {sound ? <SoundOn className="size-4" /> : <SoundOff className="size-4 text-muted" />}
            </button>
            <button onClick={() => setColor(!color)} className={`grid size-7 place-items-center rounded-full transition-colors hover:bg-[color:var(--bg)] ${color ? "" : "text-muted"}`} aria-label={color ? "Turn off colour mode" : "Show logos in real colours"} aria-pressed={color} title="Colour mode">
              <Palette className="size-4" on={color} />
            </button>
            <button onClick={() => toggleTheme(theme, setTheme)} className="grid size-7 place-items-center rounded-full transition-colors hover:bg-[color:var(--bg)]" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
