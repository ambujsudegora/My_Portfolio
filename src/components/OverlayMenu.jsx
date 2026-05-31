import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 1024;

  const origin = isMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-4 text-center">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Competitive", href: "#competitive" },
                { label: "Achievement", href: "#achievement" },
                { label: "Projects", href: "#projects" },
                { label: "Certification", href: "#certification" },
                { label: "Experience", href: "#experience" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.a
                    href={item.href}
                    onClick={onClose}
                    className="group relative inline-block px-6 py-3 text-2xl sm:text-3xl font-semibold text-white transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      color: "#1CD8D2",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}

                    <motion.span
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#22c55e] rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}