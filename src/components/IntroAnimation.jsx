import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png";

export default function IntroAnimation({ onFinish }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Disable scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startClose = setTimeout(() => setClosing(true), 1900);
    const finish = setTimeout(() => onFinish?.(), 2400);

    return () => {
      clearTimeout(startClose);
      clearTimeout(finish);
      // Restore scrolling
      document.body.style.overflow = originalOverflow;
    };
  }, [onFinish]);

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  const nameLetters = "Ambuj".split("");

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-700 ease-in-out ${
        closing ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6 text-white">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.1,
          }}
          className="relative"
        >
          {/* Glowing Ring behind logo */}
          <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-[#1CD8D2]/30 to-[#00bf8f]/30 blur-md animate-pulse" />
          <img src={Logo} alt="Ambuj Logo" className="relative z-10 h-16 w-16 select-none" />
        </motion.div>

        {/* Name Letter Animation */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          {nameLetters.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent"
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle / Loader bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 140, opacity: 0.8 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
          className="h-[2px] bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] rounded-full mt-2"
        />
      </div>
    </div>
  );
}
