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
          className="font-serif font-semibold tracking-tight inline-block"
          style={{ fontSize: size }}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          Hidden<span style={{ color: "hsl(18 49% 53%)" }}>Terra</span>
        </motion.span>
      )}
    </Link>
  );
}
