import { useEffect, useMemo, useState } from "react";
import { profile } from "../data";
import Section from "./Section";
import { useInView } from "./Reveal";

const LEVEL_OPACITY = [0, 0.25, 0.45, 0.7, 1];

// public contributions via github-contributions-api (no token needed)
const Activity = () => {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState(null);
  const [ref, inView] = useInView();

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${profile.githubUser}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, []);

  const weeks = useMemo(() => {
    if (!data) return [];
    const days = data.contributions;
    const out = [];
    const pad = new Date(days[0].date).getDay();
    let week = Array(pad).fill(null);
    days.forEach((d) => {
      week.push(d);
      if (week.length === 7) { out.push(week); week = []; }
    });
    if (week.length) out.push(week);
    return out;
  }, [data]);

  const months = useMemo(() => {
    const seen = new Set();
    return weeks.map((w) => {
      const first = w.find(Boolean);
      if (!first) return "";
      const m = new Date(first.date).toLocaleString("en", { month: "short" });
      if (seen.has(m) || new Date(first.date).getDate() > 7) return "";
      seen.add(m);
      return m;
    });
  }, [weeks]);

  if (failed) return null;
  const total = data ? Object.values(data.total)[0] : null;

  return (
    <Section id="activity" title="Activity" aside={total != null ? `${total} contributions this year` : "loading"}>
      <div ref={ref} className="relative overflow-x-auto px-4 py-5 sm:px-6">
        <div className="min-w-[640px]">
          <div className="mb-1 flex gap-[3px] font-mono text-[10px] text-faint">
            {months.map((m, i) => <span key={i} className="w-[10px] overflow-visible whitespace-nowrap">{m}</span>)}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const d = w[di];
                  return (
                    <span
                      key={di}
                      onMouseEnter={() => d && setHover(d)}
                      onMouseLeave={() => setHover(null)}
                      className="relative block size-[10px] rounded-[2px] bg-[color:var(--line)]"
                    >
                      {d && d.level > 0 && (
                        <span
                          className="absolute inset-0 rounded-[2px] bg-fg transition-opacity duration-500"
                          style={{ opacity: inView ? LEVEL_OPACITY[d.level] : 0, transitionDelay: `${wi * 12}ms` }}
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-faint">
            <span className="h-4">{hover ? `${hover.count} on ${new Date(hover.date).toDateString().slice(4)}` : <a href={profile.github} target="_blank" rel="noopener noreferrer" className="ulink hover:text-fg">@{profile.githubUser}</a>}</span>
            <span className="flex items-center gap-1">less
              {LEVEL_OPACITY.map((o, i) => (
                <span key={i} className="relative size-[10px] rounded-[2px] bg-[color:var(--line)]"><span className="absolute inset-0 rounded-[2px] bg-fg" style={{ opacity: o }} /></span>
              ))} more</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Activity;
