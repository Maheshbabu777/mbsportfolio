import { useLocation, useNavigate } from "react-router-dom";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// native scrolling: sections carry scroll-margin-top so they clear the sticky header
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
};

export const scrollToY = (y) => window.scrollTo({ top: y, left: 0, behavior: "instant" });

// lock page scroll under overlays (search menu, game) without the page jumping sideways
let locks = 0;
export const lockScroll = (on) => {
  locks = Math.max(0, locks + (on ? 1 : -1));
  document.documentElement.classList.toggle("scroll-locked", locks > 0);
};

export const isContactPath = (p) => /\/contact\/?$/.test(p);

// section links work from any page: on the contact page they go home first, then scroll
export const useNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onContact = isContactPath(pathname);
  return {
    onContact,
    section: (id) => (onContact ? navigate("/", { state: { scrollTo: id } }) : scrollToId(id)),
    contact: () => navigate("/contact"),
    home: () => navigate("/"),
  };
};
