import { motion } from "framer-motion";
import instaIcon from "@/assets/insta-icon.png";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FloatingInstagram() {
  return (
    <motion.a
      href="https://instagram.com/vintagecvunt"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white text-white shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Follow us on Instagram"
    >
      <img src={instaIcon} alt="Instagram" className="h-6 w-6 object-contain" />
    </motion.a>
  );
}
