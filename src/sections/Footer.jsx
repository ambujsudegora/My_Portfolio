import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaGithub,
  FaCode,
  FaEnvelope,
} from "react-icons/fa6";

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "your-email@example.com";

const socials = [
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ambujkumarrai/",
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/ambujsudegora",
  },
  {
    Icon: FaCode,
    label: "LeetCode",
    href: "https://leetcode.com/u/AmbujRai/",
  },
  {
    Icon: FaEnvelope,
    label: "Email",
    href: `mailto:${CONTACT_EMAIL}`,
  },
];

const glowVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.15,
    y: -3,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95 },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,204,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(16,185,129,0.30),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 px-6 py-16 flex flex-col items-center text-center space-y-6"
      >
        <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300/80">
          Thanks for visiting
        </p>

        <h1
          className="font-bold text-white select-none"
          style={{
            fontSize: "clamp(3rem, 5vw, 8rem)",
            letterSpacing: "0.02em",
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          Ambuj Kumar Rai
        </h1>

        <div className="h-[3px] w-24 rounded-full bg-gradient-to-r from-[#0D58CC] via-cyan-300 to-emerald-400" />

        <div className="flex gap-6 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 hover:text-white transition"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <p className="text-gray-300 max-w-xl">
          Software Development Engineer focused on building scalable,
          high-performance systems and solving complex engineering problems.
        </p>

        <p className="text-xs text-gray-400">
          © {currentYear} Ambuj Kumar Rai. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
