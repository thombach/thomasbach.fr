import { motion } from "framer-motion";
import { Navigation } from "./Navigation";

export default function Header() {
  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{
          y: 0,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        className="flex justify-center pt-6 z-50 sticky top-0"
      >
        <Navigation />
      </motion.header>
    </>
  );
}
