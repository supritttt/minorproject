import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type DivProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView">;

interface RevealProps extends DivProps {
  children: ReactNode;
  /** Per-item delay (seconds). Combine with `Viewport` to stagger across siblings. */
  delay?: number;
  /** Translate distance in px. Defaults to 16 to match the CSS `.fade-up` utility. */
  y?: number;
  /** Once the section has been revealed, do not replay on re-entry. */
  once?: boolean;
  /** Render as a different element (e.g. `"li"`, `"section"`). Default: `"div"`. */
  as?: "div" | "section" | "ul" | "li" | "article" | "aside" | "footer" | "span";
}

/**
 * Drop-in replacement for `className="fade-up"`:
 * fades + translates up when the element scrolls into view.
 *
 * Honors `prefers-reduced-motion` — content renders in place, no animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  once = true,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  // Under reduced motion, render a plain element with no animation.
  if (reduce) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
