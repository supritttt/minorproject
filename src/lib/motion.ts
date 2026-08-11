import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion tokens.
 * Easing matches the existing `ease-soft` Tailwind key
 * (`cubic-bezier(0.22, 1, 0.36, 1)` from `tailwind.config.ts`).
 */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

export const DUR = {
  fast: 0.22,
  base: 0.4,
  slow: 0.6,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
};

export const staggerContainer = (
  stagger = 0.06,
  delay = 0,
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  in: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
  out: {
    opacity: 0,
    y: -8,
    transition: { duration: DUR.fast, ease: EASE },
  },
};

/**
 * iOS sheet-style page transitions.
 * Enter: slide up from bottom with a subtle scale-in (bouncy spring).
 * Exit:  quick fade + lift (snappy ease).
 *
 * Use with <AnimatePresence mode="wait"> in App.tsx.
 */
export const iosSheetVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.985 },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 32, mass: 0.9 } as Transition,
  },
  out: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: { duration: DUR.fast, ease: EASE },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE },
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 } as Transition,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: DUR.fast, ease: EASE },
  },
};

export const popoverVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -4 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DUR.fast, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: DUR.fast, ease: EASE },
  },
};

/**
 * Spring presets — match `transition-all duration-300 ease-soft` feel.
 */
export const SPRING_LIFT: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 24,
};

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 26,
};

/** Bouncy spring — Apple's signature snap with a tiny overshoot. */
export const SPRING_BOUNCY: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 22,
  mass: 0.9,
};

/** Gentle spring — slow, no overshoot, for parallax / list reflow. */
export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 28,
  mass: 1,
};

/** Tight spring — button press feedback. */
export const SPRING_BUTTON: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.7,
};

/**
 * Default `whileInView` viewport options used across `Reveal` and grid
 * reveals. `once: true` keeps the section revealed after first scroll-in.
 */
export const viewportOnce = { once: true, margin: "-10% 0px" } as const;
