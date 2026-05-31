import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";

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

  useEffect(() => {
    let rafId;
    let last = performance.now();

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      const track = trackRef.current;
      if (track) {
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;
        xRef.current -= speedRef.current * dt;

        const loopWidth = track.scrollWidth / 2;
        if (loopWidth > 0 && -xRef.current >= loopWidth) {
          xRef.current += loopWidth;
        }

        track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section id="achievement" className="w-full bg-[#050505] py-12 lg:py-10 xl:py-16 overflow-hidden">
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

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-4 sm:gap-5 xl:gap-6 px-4 will-change-transform"
          onMouseEnter={() => (targetSpeedRef.current = 0)}
          onMouseLeave={() => (targetSpeedRef.current = 36)}
        >
          {repeated.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              whileHover={{ scale: 1.03 }}
              className="w-[82vw] max-w-[360px] lg:max-w-[320px] xl:max-w-[420px] rounded-2xl border border-white/10 bg-white/5 p-3 xl:p-4 backdrop-blur-xl"
            >
              <div className="aspect-[1.4/1] w-full rounded-lg bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-3 xl:mt-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 text-[#1CD8D2]">
                  {item.icon}
                  <h3 className="text-base xl:text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  {item.count}
                </span>
              </div>

              <p className="mt-2 text-xs xl:text-sm text-gray-300">{item.desc}</p>

              <a
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 xl:mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 xl:px-4 py-1.5 text-xs text-cyan-100 transition hover:bg-cyan-400/20"
              >
                View Screenshot
                <FaExternalLinkAlt size={10} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
