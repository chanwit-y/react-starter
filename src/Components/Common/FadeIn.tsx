import { FC } from "react";
import { motion } from "framer-motion";

export const FadeIn: FC<{ width?: string }> = ({
  children,
  width = "100%",
}) => {
  return (
    <motion.div
      style={{ width: width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};
