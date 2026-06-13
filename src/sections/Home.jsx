import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import robotIntro from "../assets/Ambujrobot_intro.mp4";
import cyberAmbuj from "../assets/cyber_ambuj.png";
import HologramCanvas from "../components/HologramCanvas";

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
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const playIntroVideo = () => {
    setIsMuted(false);
    setIsPlayingVideo(true);
  };

  useEffect(() => {
    if (introDone) {
      setIsMuted(false);
      setIsPlayingVideo(true);
    }
  }, [introDone]);

  useEffect(() => {
    if (isPlayingVideo && videoRef.current) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Speech playback blocked:", err);
        });
      }
    }
  }, [isPlayingVideo, isMuted]);

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
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-transparent py-16 lg:py-0"
    >
      <HologramCanvas />

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
                  Hi, I'm
                  <span className="animate-wave ml-2 select-none inline-block origin-[70%_70%] text-3xl">👋</span>
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
            <div className="relative flex flex-col items-center justify-center w-full max-w-[440px] md:max-w-[520px] gap-6">
              
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

                <motion.div
                  className="relative z-10 overflow-hidden cursor-pointer rounded-full border border-white/10 shadow-lg bg-black/60 flex items-center justify-center aspect-square"
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
                  onClick={isPlayingVideo ? toggleMute : playIntroVideo}
                >
                  {isPlayingVideo ? (
                    <>
                      <video
                        ref={videoRef}
                        key="intro-video"
                        src={robotIntro}
                        loop={false}
                        onEnded={() => {
                          setIsPlayingVideo(false);
                          setIsMuted(true);
                        }}
                        muted={isMuted}
                        playsInline
                        className="h-full w-full object-cover select-none"
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-black/75 border border-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
                      >
                        {isMuted ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-red-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6H4.51c-.88 0-1.704.507-1.938 1.354A9.01 9.01 0 002.25 12c0 .83.112 1.633.322 2.396C2.806 15.244 3.63 15.75 4.51 15.75H6.75l4.72a.75 0 001.28-.53V3.85a.75 0 00-1.28-.53L6.75 8.25z" />
                            </svg>
                            <span className="text-[10px] uppercase font-semibold text-gray-200 tracking-wider">Tap for Sound</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#1cd8d2] animate-pulse">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                            <span className="text-[10px] uppercase font-semibold text-[#1cd8d2] tracking-wider">Sound On</span>
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <img
                      src={cyberAmbuj}
                      alt="Ambuj Kumar Rai cyber likeness"
                      className="h-full w-full object-cover select-none"
                    />
                  )}
                </motion.div>
              </motion.div>

              {!isPlayingVideo && (
                <motion.button
                  onClick={playIntroVideo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center rounded-full bg-gradient-to-tr from-[#1CD8D2] via-[#00bf8f] to-[#302b63] px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#1CD8D2]/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer tracking-wider"
                >
                  <span>Tap for Intro</span>
                </motion.button>
              )}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
});

Home.displayName = "Home";
export default Home;
