import { useEffect, useRef, useState } from "react";

export const useInView = (opts = { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
};

// plain wrapper: sections are visible at rest, so there is nothing to observe or animate
// eslint-disable-next-line no-unused-vars
export const Reveal = ({ as: Tag = "div", delay, className = "", children, ...rest }) => (
  <Tag className={className} {...rest}>{children}</Tag>
);

// word-by-word fade in, starts when scrolled into view
export const BlurText = ({ text, className = "", start = 0, step = 28 }) => {
  const [ref, inView] = useInView();
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {inView
        ? words.map((w, i) => (
            <span key={i} className="word" style={{ animationDelay: `${start + i * step}ms` }}>
              {w}{i < words.length - 1 ? " " : ""}
            </span>
          ))
        : <span style={{ opacity: 0 }}>{text}</span>}
    </span>
  );
};
