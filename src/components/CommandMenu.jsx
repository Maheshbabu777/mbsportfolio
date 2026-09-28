import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import { Arrow, Check, Copy, File, Github, LinkedIn, Moon, Paper, Search, SoundOn, XLogo, Palette } from "./Icons";
import { setSound, soundOn } from "./sound";
import { lockScroll, useNav } from "./nav";
import { toggleTheme } from "./theme";
import { startGhostGame } from "./Game";

const open = (url) => {
  const a = document.createElement("a");
  a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
  document.body.appendChild(a); a.click(); a.remove();
};

const CommandMenu = ({ openState, setOpen, theme, setTheme, color, setColor }) => {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const input = useRef(null);
  const lastFocus = useRef(null);
  const byKeyboard = useRef(false);
  const nav = useNav();
  const go = nav.section;

  const items = [
    { g: "Go to", label: "About", run: () => go("about") },
    { g: "Go to", label: "Experience", run: () => go("experience") },
    { g: "Go to", label: "Projects", run: () => go("work") },
    { g: "Go to", label: "Activity", run: () => go("activity") },
    { g: "Go to", label: "Skills", run: () => go("skills") },
    { g: "Go to", label: "Achievements", run: () => go("achievements") },
    { g: "Go to", label: "Contact", run: () => nav.contact() },
    { g: "Go to", label: "Home", run: () => nav.home() },
    { g: "Links", label: "Resume (PDF)", icon: File, run: () => open(profile.resume) },
    { g: "Links", label: "GitHub", icon: Github, run: () => open(profile.github) },
    { g: "Links", label: "LinkedIn", icon: LinkedIn, run: () => open(profile.linkedin) },
    { g: "Links", label: "X", icon: XLogo, run: () => open(profile.x) },
    { g: "Links", label: "IEEE paper", icon: Paper, run: () => open(profile.paper) },
    { g: "Links", label: "Semlogic live demo", icon: Arrow, run: () => open("https://semlogic.vercel.app/") },
    { g: "Actions", label: "Copy email", icon: copied ? Check : Copy, keep: true, run: async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch { /* ignore */ } } },
    { g: "Actions", label: soundOn() ? "Mute sounds" : "Turn sounds on", icon: SoundOn, run: () => setSound(!soundOn()) },
    { g: "Actions", label: color ? "Colour mode off" : "Colour mode on", icon: Palette, run: () => setColor(!color) },
    { g: "Actions", label: "Play: catch the ghost", run: () => setTimeout(startGhostGame, 50) },
    { g: "Actions", label: theme === "dark" ? "Light mode" : "Dark mode", icon: Moon, run: () => toggleTheme(theme, setTheme) },
  ];

  const list = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); byKeyboard.current = true; setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);

  useEffect(() => {
    if (openState) {
      lastFocus.current = document.activeElement;
      setQ(""); setActive(0); setTimeout(() => input.current?.focus(), 10); lockScroll(true);
      return () => lockScroll(false);
    } else {
      // give focus back to whatever opened the menu, without flashing a focus ring on it
      // keyboard users get focus back where they were; mouse users get no leftover focus ring
      const el = lastFocus.current;
      const kb = byKeyboard.current;
      byKeyboard.current = false;
      requestAnimationFrame(() => (kb ? el?.focus?.({ preventScroll: true }) : document.activeElement?.blur?.()));
    }
  }, [openState]);

  useEffect(() => setActive(0), [q]);
  // keep the highlighted row visible when moving with the arrow keys
  useEffect(() => {
    document.querySelector(`[data-cmd-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (item) => { if (!item.keep) setOpen(false); item.run(); };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    // preventDefault stops this Enter from also "clicking" the Search button once focus goes back to it
    if (e.key === "Enter" && list[active]) { e.preventDefault(); choose(list[active]); }
    if (e.key === "Tab") e.preventDefault(); // keep focus inside the dialog, arrows move the selection
  };

  if (!openState) return null;
  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/30 px-4 pt-[14vh] backdrop-blur-[2px]" onClick={() => setOpen(false)}>
      <div className="swap-enter w-full max-w-md overflow-hidden rounded-xl border border-line bg-card shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command menu">
        <div className="flex items-center gap-2 border-b border-line px-3">
          <Search className="size-4 text-faint" />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Type a command or search" aria-label="Search commands" className="h-11 flex-1 bg-transparent text-sm outline-none focus-visible:outline-none placeholder:text-faint" />
          <kbd className="chip rounded px-1.5 font-mono text-[11px] text-muted">esc</kbd>
        </div>
        <div className="no-scrollbar max-h-[min(26rem,60vh)] overflow-y-auto p-1.5" style={{ overscrollBehavior: "contain" }}>
          {list.length === 0 && <p className="px-3 py-6 text-center text-sm text-faint">Nothing found.</p>}
          {list.map((item, i) => {
            const header = item.g !== lastGroup ? (lastGroup = item.g) : null;
            const Icon = item.icon;
            return (
              <div key={item.g + item.label}>
                {header && <p className="px-2 pb-1 pt-2 font-mono text-[11px] uppercase tracking-wider text-faint">{header}</p>}
                <button
                  data-cmd-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(item)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm ${i === active ? "bg-[color:var(--chip)] text-fg" : "text-muted"}`}
                >
                  {Icon ? <Icon className="size-4" /> : <span className="grid size-4 place-items-center"><span className="size-1 bg-current" /></span>}
                  {item.label}
                  {i === active && <span className="ml-auto font-mono text-[11px] text-faint">↵</span>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;
