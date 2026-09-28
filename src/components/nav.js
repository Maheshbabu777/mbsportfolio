import { useLocation, useNavigate } from "react-router-dom";

export const scrollToId = (id, instant = false) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  lenis?.start();
  requestAnimationFrame(() => {
    if (lenis) lenis.scrollTo(el, { offset: -56, immediate: instant });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: instant ? "auto" : "smooth" });
  });
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
