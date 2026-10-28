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
          className="font-display font-bold tracking-tight inline-flex items-center text-[#26153B]"
          style={{ fontSize: size }}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          Hidden<span className="text-heather ml-0.5">Terra</span>
          <span className="size-2 rounded-full bg-electric ml-1 shadow-[0_0_8px_#E4FF3B]" />
        </motion.span>
      )}
    </Link>
  );
}
