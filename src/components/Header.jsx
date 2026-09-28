import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useNav } from "./nav";
import { startGhostGame } from "./Game";
import { Moon, Search, SoundOff, SoundOn, Sun } from "./Icons";
import { onSoundChange, setSound, soundOn } from "./sound";
import { toggleTheme } from "./theme";

const Header = ({ theme, setTheme, openMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // one-time nudge so people find the game
  const [hint, setHint] = useState(false);
  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem("mb-ghost-hint") === "1"; } catch { /* ignore */ }
    if (seen) return;
    const a = setTimeout(() => setHint(true), 5000);
    const b = setTimeout(() => { setHint(false); try { localStorage.setItem("mb-ghost-hint", "1"); } catch { /* ignore */ } }, 11000);
    const off = () => setHint(false);
    window.addEventListener("ghost:play", off);
    return () => { clearTimeout(a); clearTimeout(b); window.removeEventListener("ghost:play", off); };
  }, []);

  const nav = useNav();
  const [sound, setSoundState] = useState(soundOn);
  useEffect(() => onSoundChange(setSoundState), []);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className={`sticky top-0 z-50 transition-[background,backdrop-filter] duration-300 ${scrolled ? "backdrop-blur-md glass border-b border-dashed border-line" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between rail px-4 sm:px-6">
        <div className="relative flex items-center">
          <button onClick={startGhostGame} data-ghost-home data-cursor="catch me" className="flex items-center" aria-label="Play catch the ghost">
            <Logo className="h-7 w-auto" />
          </button>
          {hint && (
            <span className="swap-enter pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-line bg-card px-1.5 py-0.5 font-mono text-[11px] text-muted shadow-sm">
              ← psst, try catching me
            </span>
          )}
        </div>
        <nav className="flex items-center gap-1 sm:gap-2">
          <button onClick={() => nav.section("work")} className="hidden rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-fg sm:block">Work</button>
          <button onClick={() => nav.section("experience")} className="hidden rounded-md px-2 py-1 text-sm text-muted transition-colors hover:text-fg sm:block">Experience</button>
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
