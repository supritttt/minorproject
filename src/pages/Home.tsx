import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PageShell } from "@/components/PageShell";
import { Magnetic } from "@/components/Magnetic";
import { EASE, DUR } from "@/lib/motion";

/**
 * Home — brand landing page.
 * Hero above, then a short intro panel that offers two clear paths
 * into the rest of the app.
 */
export default function Home() {
  const reduce = useReducedMotion();

  return (
    <PageShell showFooter={false}>
      <Hero />

      {/* Intro / CTAs */}
      <section className="container pb-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-secondary/90 bg-secondary/10 border border-secondary/20 rounded-full px-3 py-1 mb-5">
            <Sparkles className="size-3.5" />
            Two ways to explore
          </span>

          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Where do you want to go first?
          </h2>
          <p className="text-foreground/75 text-lg mb-10 max-w-2xl mx-auto">
            Browse our hand-picked featured destinations, or dive into the full
            catalogue with filters by state and category.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic max={6}>
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
              >
                Browse Destinations <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic max={6}>
              <Link
                to="/featured"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-8 border border-border bg-card/50 hover:bg-card"
              >
                See Featured <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </section>
    </PageShell>
  );
}