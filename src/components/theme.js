const KEY = "mb-theme";

export const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch { /* storage blocked */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (t) => {
  document.documentElement.classList.toggle("dark", t === "dark");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "dark" ? "#0a0a0a" : "#fafaf9");
  try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
};

export const toggleTheme = (current, set) => {
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  set(next);
};
