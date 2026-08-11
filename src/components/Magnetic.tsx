import { useReducedMotion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { type ReactNode, isValidElement, cloneElement, type CSSProperties } from "react";

type MagneticProps = {
  children: ReactNode;
  /** Maximum translate in px. Default 6. */
  max?: number;
  /** Pull radius as a multiple of the button width. Default 1.6. */
  radiusFactor?: number;
  /** Optional className appended to the child. */
  className?: string;
};

const TRANSITION = "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Wraps a single child (typically a shadcn `<Button>` or `<Link>`) with a
 * magnetic pointer-pull effect. The child must accept `onMouseMove`,
 * `onMouseLeave`, and `style` props.
 *
 * Under reduced motion the wrapper renders the child untouched (no extra
 * transform, no transition).
 *
 * Implementation note: we don't wrap the child in an extra motion element —
 * that would create double-transforms. Instead we set `transform` on the
 * child via `style` and rely on a CSS `transition` to smooth the spring
 * back when the transform changes (e.g. on leave).
 */
export function Magnetic({ children, max = 6, radiusFactor = 1.6, className }: MagneticProps) {
  const reduce = useReducedMotion();
  const { onMouseMove, onMouseLeave, style: magneticStyle } = useMagnetic(
    !reduce,
    max,
    radiusFactor,
  );

  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  const childProps = children.props as {
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
    style?: CSSProperties;
    className?: string;
  };

  const mergedStyle: CSSProperties = reduce
    ? { ...(childProps.style ?? {}) }
    : {
        ...(childProps.style ?? {}),
        ...magneticStyle,
        transition: TRANSITION,
        willChange: "transform",
      };

  return cloneElement(children as React.ReactElement, {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseMove?.(e);
      if (!reduce) onMouseMove(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(e);
      if (!reduce) onMouseLeave();
    },
    style: mergedStyle,
    className: className
      ? [childProps.className, className].filter(Boolean).join(" ")
      : childProps.className,
  });
}
