import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import heroImage from "@/assets/hero.jpg";
import { EASE, DUR } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return; // skip parallax under reduced motion
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        // gentle parallax: image moves at 35% of scroll
        setOffset(Math.min(y * 0.35, 200));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [reduce]);

  return (
    <section ref={ref} className="relative h-[78vh] min-h-[520px] max-h-[780px] overflow-hidden">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        aria-hidden="true"
      >
        <img
          src={heroImage}
          alt="Misty Indian Himalayan mountains at sunrise"
          className="w-full h-[120%] object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/20 to-background/90" />
      </div>
      <div className="relative h-full container flex items-end pb-16 md:pb-24">
        <div className="max-w-3xl">
          <motion.h1
            className="font-display text-[2.5rem] md:text-6xl lg:text-7xl leading-[1.05] text-background drop-shadow-md"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.12 }}
          >
            India has a secret.
          </motion.h1>
          <motion.p
            className="mt-3 font-display text-2xl md:text-4xl text-background/95 drop-shadow"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.26 }}
          >
            Wanna Know? <span className="text-accent">Let us show you the way.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
