import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";
import TiltCard from "../components/TiltCard";

const achievements = [
  {
    icon: <FaAward />,
    title: "Appreciation Certificate",
    count: "6x",
    desc: "Recognition for consistent impact, ownership, and performance.",
    image: "/award/appreciation-certificate.png",
  },
  {
    icon: <FaAward />,
    title: "On The Spot Award",
    count: "4x",
    desc: "Recognized for fast delivery, team impact, and deadline ownership.",
    image: "/award/spot-award.png",
  },
  {
    icon: <FaAward />,
    title: "Star of the Month",
    count: "2x",
    desc: "Special recognition for initiative, consistency, and ownership.",
    image: "/award/star-of-the-month.jpg",
  },
  {
    icon: <FaAward />,
    title: "Star Team Award",
    count: "2x",
    desc: "Team excellence award for quality and collaboration.",
    image: "/award/star-team.png",
  },
];

const repeated = [...achievements, ...achievements];

export default function Achievement() {
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const speedRef = useRef(36);
  const targetSpeedRef = useRef(36);
  const targetX = useRef(null);
  const scrollTimeout = useRef(null);

  const handleScroll = (direction) => {
    // Each card's width plus its gap
    const cardEl = trackRef.current?.firstElementChild;
    const cardWidth = cardEl ? cardEl.getBoundingClientRect().width : 320;
    const gap = window.innerWidth < 640 ? 16 : 24; // gap-4 is 16px, gap-6 is 24px
    const step = cardWidth + gap;

    if (targetX.current === null) {
      targetX.current = xRef.current;
    }

    // Left scroll: scroll content right (increase xRef.current)
    // Right scroll: scroll content left (decrease xRef.current)
    targetX.current = direction === "left" ? targetX.current + step : targetX.current - step;

    // Pause auto-scroll
    targetSpeedRef.current = 0;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      targetSpeedRef.current = 36;
      targetX.current = null;
    }, 4000);
  };

  useEffect(() => {
    let rafId;
    let last = performance.now();

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      const track = trackRef.current;
      if (track) {
        if (targetX.current !== null) {
          const diff = targetX.current - xRef.current;
          if (Math.abs(diff) > 0.5) {
            xRef.current += diff * 0.15; // lerp transition
          } else {
            xRef.current = targetX.current;
            targetX.current = null;
          }
        } else {
          speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
          xRef.current -= speedRef.current * dt;
        }

        const loopWidth = track.scrollWidth / 2;
        if (loopWidth > 0) {
          if (-xRef.current >= loopWidth) {
            xRef.current += loopWidth;
            if (targetX.current !== null) targetX.current += loopWidth;
          }
          if (xRef.current > 0) {
            xRef.current -= loopWidth;
            if (targetX.current !== null) targetX.current -= loopWidth;
          }
        }

        track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <section id="achievement" className="w-full bg-transparent py-12 lg:py-10 xl:py-16 overflow-hidden">
      <motion.div
        className="mb-10 text-center lg:mb-8 xl:mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.28em] text-cyan-300/80">
          Milestones
        </p>
        <h2 className="bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-4xl xl:text-5xl">
          Achievements
        </h2>
      </motion.div>

      <div className="relative w-full px-4 md:px-8">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[#1cd8d2] shadow-lg hover:scale-110 hover:bg-[#1cd8d2] hover:text-black hover:border-transparent active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[#1cd8d2] shadow-lg hover:scale-110 hover:bg-[#1cd8d2] hover:text-black hover:border-transparent active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max gap-4 sm:gap-5 xl:gap-6 px-4 will-change-transform"
            onMouseEnter={() => {
              targetSpeedRef.current = 0;
            }}
            onMouseLeave={() => {
              if (targetX.current === null) {
                targetSpeedRef.current = 36;
              }
            }}
          >
            {repeated.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="w-[82vw] max-w-[360px] lg:max-w-[320px] xl:max-w-[420px] shrink-0"
              >
                <TiltCard
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 xl:p-4 backdrop-blur-xl h-full flex flex-col justify-between"
                >
                  <div className="aspect-[1.4/1] w-full rounded-lg bg-black flex items-center justify-center overflow-hidden translate-z-30">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="mt-3 xl:mt-4 flex items-start justify-between gap-3 translate-z-50 preserve-3d">
                    <div className="flex items-center gap-3 text-[#1CD8D2] preserve-3d">
                      <span className="translate-z-50 flex items-center">{item.icon}</span>
                      <h3 className="text-base xl:text-lg font-semibold text-white translate-z-50">
                        {item.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100 translate-z-50">
                      {item.count}
                    </span>
                  </div>

                  <p className="mt-2 text-xs xl:text-sm text-gray-300 translate-z-30">{item.desc}</p>

                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 xl:mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 xl:px-4 py-1.5 text-xs text-cyan-100 transition hover:bg-cyan-400/20 translate-z-50 self-start"
                  >
                    View Screenshot
                    <FaExternalLinkAlt size={10} />
                  </a>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
