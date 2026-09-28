import { useEffect, useState } from "react";
import line from "../assets/avatar-line.jpg";
import photo from "../assets/avatar-photo.jpg";
import { profile, about } from "../data";
import { BlurText, Reveal } from "./Reveal";
import { File, Github, LinkedIn, Mail, Paper } from "./Icons";

const Clock = () => {
  const fmt = () => new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: profile.timezone });
  const [t, setT] = useState(fmt);
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id); }, []);
  return <span>{t} IST</span>;
};

const Roles = () => {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % profile.roles.length), 2600); return () => clearInterval(id); }, []);
  return (
    <span className="relative block h-6 overflow-hidden">
      <span key={i} className="swap-enter absolute left-0 top-0 whitespace-nowrap">{profile.roles[i]}</span>
    </span>
  );
};

const Avatar = () => {
  const [photoOn, setPhotoOn] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`avatar relative size-[104px] overflow-hidden rounded-xl border border-line bg-white p-0.5 shadow-[0_1px_0_var(--line)] sm:size-[120px] ${photoOn ? "show-photo" : ""}`}
        data-cursor={photoOn ? "draw" : "real"}
        onClick={() => setPhotoOn((v) => !v)}
        role="button"
        aria-label="Switch avatar"
      >
        <img src={line} alt="Illustration of Mahesh" className="size-full rounded-[10px] object-cover" draggable="false" />
        <img src={photo} alt="Photo of Mahesh" className="avatar-photo absolute inset-0.5 size-[calc(100%-4px)] rounded-[10px] object-cover" draggable="false" />
      </div>
      <button
        onClick={() => setPhotoOn((v) => !v)}
        className={`relative h-4 w-7 rounded-full border border-line transition-colors ${photoOn ? "btn-dark" : "chip"}`}
        aria-label="Toggle real photo"
        aria-pressed={photoOn}
      >
        <span className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full transition-all duration-300 ${photoOn ? "left-[14px] bg-[color:var(--bg)]" : "left-[2px] bg-[color:var(--faint)]"}`} />
      </button>
    </div>
  );
};

const Btn = ({ href, children, dark, ...rest }) => (
  <a
    href={href}
    target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-transform duration-200 active:scale-95 ${dark ? "btn-dark hover:opacity-90" : "chip text-fg hover:-translate-y-0.5"}`}
    {...rest}
  >
    {children}
  </a>
);

const Hero = () => (
  <div id="top">
    {/* empty banner band like prathm, with a dotted field */}
    <div className="relative h-24 overflow-hidden border-b border-dashed border-line sm:h-32">
      <div className="dots-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_60%)]" />
      <div className="absolute bottom-2 right-4 flex items-center gap-2.5 font-mono text-[11px] text-muted sm:right-6">
        <span className="pulse-dot mr-0.5 inline-block size-1.5 rounded-full bg-fg text-fg" />
        {profile.location} · <Clock />
      </div>
    </div>

    <div className="flex items-start gap-4 px-4 py-6 sm:gap-6 sm:px-6">
      <Reveal><Avatar /></Reveal>
      <div className="min-w-0 pt-1">
        <Reveal as="h1" className="text-[26px] font-medium leading-tight tracking-tight sm:text-4xl">Mahesh Babu</Reveal>
        <Reveal delay={80} className="mt-1 text-base text-muted sm:text-lg"><Roles /></Reveal>
        <Reveal delay={160} className="mt-4 flex flex-wrap gap-2">
          <Btn href={profile.resume} dark><File className="size-3.5" /> Resume</Btn>
          <Btn href={`mailto:${profile.email}`}><Mail className="size-3.5" /> Email me</Btn>
        </Reveal>
      </div>
    </div>

    <div className="hline px-4 py-6 sm:px-6" id="about">
      <h2 className="mb-4 text-2xl tracking-tight sm:text-[28px]"><BlurText text="About" /></h2>
      <ul className="space-y-3 text-[15px] leading-relaxed text-muted">
        {about.map((p, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[9px] size-1 shrink-0 bg-fg" />
            <BlurText text={p} start={i * 120} step={14} />
          </li>
        ))}
      </ul>
    </div>

    <div className="hline px-4 py-5 sm:px-6">
      <Reveal className="flex flex-wrap gap-2">
        <Btn href={profile.github} dark><Github className="size-3.5" /> GitHub</Btn>
        <Btn href={profile.linkedin} dark><LinkedIn className="size-3.5" /> LinkedIn</Btn>
        <Btn href={profile.paper} dark><Paper className="size-3.5" /> IEEE paper</Btn>
        <Btn href={`mailto:${profile.email}`} dark><Mail className="size-3.5" /> Email</Btn>
      </Reveal>
    </div>
  </div>
);

export default Hero;
