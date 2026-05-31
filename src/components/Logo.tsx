import { Link } from "react-router-dom";

export function Logo({ size = 28, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="HiddenTerra home">
      <span className="inline-flex items-center justify-center transition-transform duration-300 ease-soft group-hover:scale-105">
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Map pin teardrop */}
          <path
            d="M20 3.5c-7.18 0-13 5.6-13 12.5 0 9 13 20.5 13 20.5s13-11.5 13-20.5c0-6.9-5.82-12.5-13-12.5z"
            fill="hsl(18 49% 53%)"
            stroke="hsl(18 49% 45%)"
            strokeWidth="0.8"
          />
          {/* Mountain inside pin */}
          <path
            d="M11.5 19.5l4.2-5.6 3.5 4.5 2.4-2.7 6.9 7.8H11.5z"
            fill="hsl(124 14% 55%)"
          />
          {/* Sun/dot */}
          <circle cx="25.5" cy="12" r="1.6" fill="hsl(36 53% 81%)" />
        </svg>
      </span>
      {withText && (
        <span className="font-display text-[1.35rem] leading-none text-foreground tracking-tight">
          Hidden<span className="text-primary">Terra</span>
        </span>
      )}
    </Link>
  );
}
