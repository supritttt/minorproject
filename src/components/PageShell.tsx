import { type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Navbar } from "@/components/Navbar";

/**
 * Shared page chrome for the marketing pages (Home, Destinations, Featured).
 * Renders the aurora background mesh, Navbar, optional footer, and standard
 * main padding. Each route stays focused on its own content; this wrapper
 * provides consistent frame + animation rhythm.
 *
 * Pages that don't want the footer (e.g. the NotFound page) can pass
 * `showFooter={false}`.
 */
export function PageShell({
  children,
  showFooter = true,
  /** Optional className appended to the <main> element. */
  mainClassName,
}: {
  children: ReactNode;
  showFooter?: boolean;
  mainClassName?: string;
}) {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Coastal background mesh — fixed, pointer-events-none, behind content.
          Soft ocean-blue + sandy-gold radial washes give the page a clean,
          airy "travel-product" backdrop aligned with the Coastal Trust palette. */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(60rem 60rem at 0% 0%, hsl(212 71% 23% / 0.08), transparent 60%)",
              "radial-gradient(50rem 50rem at 100% 100%, hsl(32 49% 64% / 0.10), transparent 60%)",
              "radial-gradient(40rem 40rem at 50% 40%, hsl(212 50% 40% / 0.06), transparent 70%)",
            ].join(","),
          }}
        />
      </div>

      <Navbar />
      {children}

      {showFooter && (
        <Reveal as="footer" className="border-t border-border bg-card/50 py-12 mt-12">
          <div className="container grid gap-8 md:grid-cols-3 text-sm">
            <div>
              <h3 className="font-display text-xl mb-2">HiddenTerra</h3>
              <p className="text-muted-foreground">A peaceful guide to India's most loved hotspots and best-kept hidden gems.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Coverage</h4>
              <p className="text-muted-foreground">Currently featuring Sikkim, Odisha, Maharashtra, Tamil Nadu and Himachal Pradesh. More states coming soon.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Disclaimer</h4>
              <p className="text-muted-foreground">Weather and AQI data is approximated.</p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} HiddenTerra · A non-commercial demo project</p>
        </Reveal>
      )}
    </div>
  );
}