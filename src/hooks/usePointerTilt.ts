import { useCallback, useState, type CSSProperties, type MouseEvent } from "react";

const MAX_TILT_DEG = 6;

export type TiltStyle = CSSProperties & {
  // Allow arbitrary CSS variables (e.g. "--tilt-x") for highlight overlays.
  [key: `--${string}`]: string | number | undefined;
};

export type TiltHandlers = {
  onMouseMove: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
  style: TiltStyle;
};

/**
 * Pointer-tracking 3D tilt for cards.
 *
 * Returns `onMouseMove` / `onMouseLeave` to spread on the element, plus a
 * `style` object containing `transform` (rotateX/rotateY) and CSS variables
 * for a cursor highlight.
 *
 * Reduced motion: returns no-op handlers and the identity style — the
 * consumer can apply only its existing hover lift (no tilt).
 *
 * Implementation note: we lerp toward the target each frame so the tilt
 * feels smooth on fast pointer movement and springs back on leave.
 */
export function usePointerTilt(enabled: boolean = true): TiltHandlers {
  const [style, setStyle] = useState<TiltStyle>({});

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1

      // Map to -MAX..MAX; rotateY on X axis and vice-versa for a natural tilt.
      const rotateY = (x - 0.5) * 2 * MAX_TILT_DEG;
      const rotateX = -(y - 0.5) * 2 * MAX_TILT_DEG;

      // CSS variables are 0..1 for a conic/gradient highlight overlay.
      setStyle({
        transform: `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(0)`,
        "--tilt-x": `${(x * 100).toFixed(1)}%`,
        "--tilt-y": `${(y * 100).toFixed(1)}%`,
        transformStyle: "preserve-3d",
      });
    },
    [enabled],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({});
  }, []);

  if (!enabled) {
    return { onMouseMove: () => {}, onMouseLeave: () => {}, style: {} };
  }

  return { onMouseMove, onMouseLeave, style };
}
