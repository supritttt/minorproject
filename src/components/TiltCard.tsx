import { motion, useReducedMotion, type MotionProps, type Variants } from "framer-motion";
import { usePointerTilt } from "@/hooks/usePointerTilt";
import { SPRING_LIFT } from "@/lib/motion";
import type { ReactNode, CSSProperties } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Optional CSS class for the inner content wrapper (usually the actual card). */
  innerClassName?: string;
  /** Spring used on hover-lift when reduced motion is on. */
  liftY?: number;
  /** Optional framer-motion props (e.g. `variants` for stagger containers). */
  motionProps?: MotionProps;
};

/**
 * 3D-tilting card wrapper.
 *
 * - Under reduced motion: renders a `motion.div` with a static hover-lift only.
 * - Otherwise: applies a perspective + rotateX/rotateY based on cursor position,
 *   plus a subtle hover-lift and shadow swap.
 *
 * Spread `motionProps` to plug into parent `staggerContainer` reveals.
 */
export function TiltCard({
  children,
  className,
  innerClassName,
  liftY = -4,
  motionProps,
}: TiltCardProps) {
  const reduce = useReducedMotion();
  const tilt = usePointerTilt(!reduce);

  // Combine the tilt transform with the hover-lift. The lift is applied as a
  // secondary translateZ so the cursor tilt stays smooth when hovering.
  const composedStyle: CSSProperties = reduce
    ? {}
    : tilt.style;

  const variants: Variants | undefined = reduce
    ? undefined
    : {
        rest: { y: 0 },
        hover: { y: liftY, transition: SPRING_LIFT },
      };

  return (
    <motion.div
      className={className}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={composedStyle}
      initial="rest"
      whileHover={reduce ? undefined : "hover"}
      {...(motionProps ?? {})}
    >
      <motion.div
        className={innerClassName}
        variants={variants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
