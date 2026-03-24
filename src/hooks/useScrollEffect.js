import Lenis from "lenis";
import { useEffect } from "react";

const useScrollEffect = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
            smoothWheel: true,
        });

        lenis.on("scroll", () => {});

        const handleWheel = (e) => {
            lenis.options.wheelMultiplier = e.deltaY < 0 ? 0.6 : 1.1;
        };

        const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
        const anchorHandlers = anchors.map((anchor) => {
            const handler = (e) => {
                e.preventDefault();
                const href = anchor.getAttribute("href");
                const target = href ? document.querySelector(href) : null;
                if (target) lenis.scrollTo(target);
            };
            anchor.addEventListener("click", handler);
            return { anchor, handler };
        });

        window.addEventListener("wheel", handleWheel, { passive: true });

        let rafId = 0;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            anchorHandlers.forEach(({ anchor, handler }) => {
                anchor.removeEventListener("click", handler);
            });
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
};

export default useScrollEffect;