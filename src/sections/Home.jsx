import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import avatar from "../assets/avator.png";
import ParticleBackground from "../components/ParticlesBackground";

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
];

const glowVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.15,
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  tap: { scale: 0.92 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = React.forwardRef(({ introDone, ...props }, ref) => {
  const roles = useMemo(
    () => [
      "Software Development Engineer",
      "Building High-Impact Systems",
      "Designing Scalable Architectures",
      "Solving Complex Engineering Problems",
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const speed = deleting ? 35 : 85;
    const pauseEnd = subIndex === current.length ? 1200 : 0;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < current.length) {
          setSubIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setDeleting(true), pauseEnd);
        }
      } else if (subIndex > 0) {
        setSubIndex((prev) => prev - 1);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black py-16 lg:py-0"
    >
      <ParticleBackground />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] animate-pulse rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[50vw] w-[50vw] max-h-[500px] max-w-[500px] animate-pulse rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-25 blur-[120px] delay-500" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={introDone ? "visible" : "hidden"}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">

          <motion.div
            variants={itemVariants}
            className="order-2 space-y-4 text-center lg:order-1 lg:text-left"
          >
            <div className="min-h-[2em] text-base font-semibold text-white sm:text-lg lg:text-xl">
              <span>{roles[index].substring(0, subIndex)}</span>
              <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-gradient-to-b from-[#1CD8D2] to-[#00bf8f] align-middle" />
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#1CD8D2] sm:text-sm">
                Product-Focused Engineer
              </span>
              <h1 className="font-bold leading-tight">
                <span className="block bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] bg-clip-text text-2xl text-transparent sm:text-3xl lg:text-4xl xl:text-5xl">
                  Hi, I&apos;m
                </span>
                <span className="mt-1 block text-3xl text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  Ambuj Kumar Rai
                </span>
              </h1>
            </div>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-200 sm:text-base lg:mx-0 lg:text-lg">
              I design and build high-performance software systems that solve
              real-world problems at scale. Focused on writing clean, reliable
              code and thinking deeply about architecture, performance, and
              long-term maintainability.
            </p>

            <div className="hidden xl:block space-y-4 pt-6 text-gray-200 text-lg leading-relaxed max-w-2xl">
              <p>
                I approach software engineering with a product mindset —
                understanding user needs, system constraints, and scalability
                challenges before writing a single line of code.
              </p>
              <p>
                My goal is to grow into an engineer who can design distributed
                systems, optimize performance bottlenecks, and contribute to
                products that impact millions of users.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start">
              {[
                { label: "View Projects", href: "#projects" },
                { label: "View My CV", href: "/cv/Ambuj_Resume_M.pdf", target: "_blank" },
                { label: "Contact Me", href: "#contact" },
              ].map(({ label, href, target }) => (
                <a
                  key={label}
                  href={href}
                  target={target}
                  className="rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1CD8D2]/50 sm:text-base"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex justify-center gap-5 pt-3 lg:justify-start">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-xl text-gray-200 transition-colors duration-300 hover:text-[#1CD8D2] sm:text-2xl"
                  aria-label={social.label}
                >
                  {React.createElement(social.Icon)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center lg:justify-end items-center w-full mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="absolute rounded-full blur-[70px]"
                style={{
                  width: "clamp(200px, 35vw, 420px)",
                  height: "clamp(200px, 35vw, 420px)",
                  background: "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
                }}
                animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, opacity: 0.6 }}
              />

              <motion.img
                src={avatar}
                alt="Ambuj Kumar Rai avatar"
                className="relative z-10 object-contain select-none cursor-pointer rounded-full border border-white/10 shadow-lg"
                style={{ width: "clamp(220px, 45vw, 520px)", maxHeight: "85vh" }}
                animate={{ y: [0, -12, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                whileHover={{
                  scale: 1.1,
                  rotate: 3,
                  y: -18,
                  filter: "drop-shadow(0 0 25px rgba(28,216,210,0.6))",
                  transition: { type: "spring", stiffness: 200 },
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
});

Home.displayName = "Home";
export default Home;
