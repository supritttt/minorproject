import { useCallback, useState, type CSSProperties, type MouseEvent } from "react";

export type MagneticStyle = CSSProperties;

export type MagneticHandlers = {
  onMouseMove: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  style: MagneticStyle;
};

const DEFAULT_MAX_PX = 6;
const DEFAULT_RADIUS_FACTOR = 1.6; // pull radius = button width × this factor

/**
 * Magnetic pointer-pull hook for CTA buttons.
 *
 * The button subtly slides toward the cursor when the cursor is near it
 * (within `radius` px of the button's bounding rect). The closer the cursor,
 * the stronger the pull, capped at `max` px. Springs back on leave.
 *
 * Math:
 *   - Radius = max(40, boundingRect.width * DEFAULT_RADIUS_FACTOR).
 *   - Factor = (1 - dist / radius) clamped to [0, 1].
 *   - k      = factor² · max  (quadratic curve — gentle at distance, punchy up close).
 *   - tx,ty  = (unit vector from rect center to cursor) * k.
 *
 * Reduced motion: returns no-op handlers and empty style.
 */
export function useMagnetic(
  enabled: boolean = true,
  max: number = DEFAULT_MAX_PX,
  radiusFactor: number = DEFAULT_RADIUS_FACTOR,
): MagneticHandlers {
  const [style, setStyle] = useState<MagneticStyle>({});

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      const radius = Math.max(40, rect.width * radiusFactor);
      const factor = Math.max(0, Math.min(1, 1 - dist / radius));
      const k = factor * factor * max;

      // unit vector × k (handle dist === 0 — just sit still)
      const tx = dist === 0 ? 0 : (dx / dist) * k;
      const ty = dist === 0 ? 0 : (dy / dist) * k;

      setStyle({ transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)` });
    },
    [enabled, max, radiusFactor],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({});
  }, []);

  if (!enabled) {
    return {
      onMouseMove: () => {},
      onMouseLeave: () => {},
      style: {},
    };
  }

  return { onMouseMove, onMouseLeave, style };
}
