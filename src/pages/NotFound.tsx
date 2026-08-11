import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { DUR, EASE } from "@/lib/motion";

const NotFound = () => {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="text-center"
      >
        <motion.h1
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="mb-4 text-4xl font-bold"
        >
          404
        </motion.h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <motion.a
          href="/"
          whileHover={reduce ? undefined : { x: 2 }}
          className="text-primary underline hover:text-primary/90"
        >
          Return to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
