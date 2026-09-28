import { useState } from "react";
import { profile } from "../data";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { Arrow, ArrowRight, Check, LinkedIn, Mail, Send, XLogo } from "./Icons";
import { play } from "./sound";

// If VITE_WEB3FORMS_KEY is set (free key from web3forms.com), messages post straight to the inbox.
// Without it the form falls back to opening the visitor's mail app with everything filled in.
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const Route = ({ href, icon, title, sub, dark, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className={`group flex items-center gap-3 rounded-xl border p-3 transition-transform duration-200 hover:-translate-y-0.5 ${dark ? "btn-dark border-transparent" : "border-line bg-card"}`}
  >
    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${dark ? "bg-white/10" : "chip"}`}>{icon}</span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-medium">{title}</span>
      <span className={`block truncate text-xs ${dark ? "opacity-60" : "text-muted"}`}>{sub}</span>
    </span>
    <Arrow className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
  </a>
);

const Contact = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email) && msg.trim().length >= 10;

  const copyEmail = async (e) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); play("toggle"); setTimeout(() => setCopied(false), 1500); }
    catch { window.location.href = `mailto:${profile.email}`; }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || state === "sending") return;
    if (!FORM_KEY) {
      const body = encodeURIComponent(`${msg}\n\nFrom: ${email}`);
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${body}`;
      setState("sent");
      return;
    }
    setState("sending");
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: FORM_KEY, subject: "New message from your portfolio", email, message: msg, from_name: "Portfolio" }),
      });
      const j = await r.json();
      if (!j.success) throw new Error();
      setState("sent"); setEmail(""); setMsg(""); play("catch");
    } catch { setState("error"); }
  };

  return (
    <div id="contact">
      <div className="px-4 pt-8 sm:px-6">
        <Reveal as="p" className="text-2xl text-faint sm:text-[28px]">Contact</Reveal>
        <Reveal as="h1" delay={40} className="mt-1 text-[26px] font-medium leading-tight tracking-tight sm:text-4xl">Let's talk about what you're building</Reveal>
        <Reveal as="p" delay={80} className="mt-2 text-sm text-muted">Roles, internships, a project idea, or a question about something I've built. All welcome.</Reveal>
      </div>
      <div className="mt-5 flex items-center justify-between border-y border-dashed border-line px-4 py-2.5 sm:px-6">
        <Link to="/" className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          <ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" /> Home
        </Link>
        <span className="chip inline-flex items-center gap-2 rounded-full py-0.5 pl-3 pr-2.5 text-xs text-muted">
          <span className="pulse-dot inline-block size-1.5 rounded-full bg-fg text-fg" /> Open to work
        </span>
      </div>

      <div className="hline px-4 py-5 sm:px-6">
        <h2 className="mb-3 text-2xl tracking-tight sm:text-[28px]">Fastest routes</h2>
        <Reveal className="grid gap-2 sm:grid-cols-3">
          <Route dark href={`mailto:${profile.email}`} onClick={copyEmail} icon={copied ? <Check className="size-4" /> : <Mail className="size-4" />} title={copied ? "Copied" : "Email"} sub={copied ? profile.email : "click to copy"} />
          <Route href={profile.x} icon={<XLogo className="size-4" />} title="DM me on X" sub={profile.xHandle} />
          <Route href={profile.linkedin} icon={<LinkedIn className="size-4" />} title="LinkedIn" sub="maheshbabu-v" />
        </Reveal>
      </div>

      <form onSubmit={submit} className="hline px-4 py-5 sm:px-6">
        <h2 className="mb-1 text-2xl tracking-tight sm:text-[28px]">Send a message</h2>
        <p className="mb-4 text-sm text-muted">Write here and it lands in my inbox. I usually reply within a day.</p>
        <label className="block text-sm font-medium" htmlFor="c-email">Your email</label>
        <input
          id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
          className="mt-1.5 w-full rounded-lg border border-line bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-faint focus:border-[color:var(--fg)]"
        />
        <label className="mt-4 block text-sm font-medium" htmlFor="c-msg">Your message</label>
        <textarea
          id="c-msg" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What are you building, and where can I help?" required
          className="mt-1.5 w-full resize-y rounded-lg border border-line bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-faint focus:border-[color:var(--fg)]"
        />
        <p className="mt-1 text-xs text-faint">At least 10 characters so I know what you need.</p>
        <button
          type="submit" disabled={!valid || state === "sending"}
          className="btn-dark mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-opacity disabled:opacity-40"
        >
          {state === "sent" ? <><Check className="size-4" /> {FORM_KEY ? "Sent, talk soon" : "Opening your mail app"}</>
            : state === "sending" ? "Sending..."
            : <><Send className="size-4" /> Send message</>}
        </button>
        <p className="mt-2 text-right text-xs text-faint">
          {state === "error" ? "Something broke. Email me directly at " : "Goes straight to "}
          <a href={`mailto:${profile.email}`} className="ulink-static text-fg">{profile.email}</a>
        </p>
      </form>
    </div>
  );
};

export default Contact;
