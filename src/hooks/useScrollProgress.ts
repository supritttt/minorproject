import { useEffect, useState } from "react";

/**
 * Returns the user's scroll progress through the document as a 0–1 number.
 * Uses requestAnimationFrame to coalesce scroll events to one paint frame.
 *
 * Returns 0 if `prefers-reduced-motion: reduce` is set — callers can then
 * render a static bar instead of an animated one.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0);
      return;
    }

    let ticking = false;
    const compute = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    // Set initial value (in case the page loads scrolled).
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}
