import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Logo({
  size = 28,
  withText = true,
}: {
  size?: number;
  withText?: boolean;
}) {
  return (
    <Link to="/" className="flex items-center">
      {withText && (
        <motion.span
          className="font-display font-semibold tracking-tight inline-block"
          style={{ fontSize: size }}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          Hidden<span className="text-primary">Terra</span>
        </motion.span>
      )}
    </Link>
  );
}
