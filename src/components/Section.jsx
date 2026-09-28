import { Reveal } from "./Reveal";

// one row of the ruled column: dashed top rule with corner dots, title band, body
const Section = ({ id, title, aside, children, className = "" }) => (
  <section id={id} className={`hline scroll-mt-14 ${className}`}>
    {title && (
      <div className="flex items-end justify-between border-b border-dashed border-line px-4 pb-2 pt-6 sm:px-6">
        <Reveal as="h2" className="text-2xl font-normal tracking-tight sm:text-[28px]">{title}</Reveal>
        {aside && <span className="pb-1 font-mono text-xs text-faint">{aside}</span>}
      </div>
    )}
    {children}
  </section>
);

export default Section;
