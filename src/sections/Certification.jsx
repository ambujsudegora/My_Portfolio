import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TiltCard from "../components/TiltCard";

export default function Certification() {


  const certifications = [
    {
      title: "Data Structure Striver",
      issuer: "Striver",
      year: "2026",
      image: "/certifications/DSA-Striver.png",
    },
    {
      title: "Salesforce AI Associate",
      issuer: "Salesforce",
      year: "2024",
      image: "/certifications/salesforce-ai.jpg",
    },
    {
      title: "Salesforce Associate",
      issuer: "Salesforce",
      year: "2024",
      image: "/certifications/salesforce-associate.jpg",
    },
    {
      title: "Salesforce Data Cloud",
      issuer: "Salesforce",
      year: "2024",
      image: "/certifications/salesforce-data-cloud.png",
    },
    {
      title: "Platform Developer I",
      issuer: "Salesforce",
      year: "2024",
      image: "/certifications/salesforce-platform.png",
    },
    {
      title: "JavaScript",
      issuer: "Certification",
      year: "2025",
      image: "/certifications/javascript.png",
    },
    {
      title: "DSA",
      issuer: "Certification",
      year: "2025",
      image: "/certifications/dsa.jpg",
    },
    {
      title: "SQL",
      issuer: "Certification",
      year: "2025",
      image: "/certifications/sql.jpg",
    },
  ];

  const repeated = [...certifications, ...certifications];

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const targetX = useRef(null);

  const x = useMotionValue(0);

  const [active, setActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let id;
    let last = performance.now();
    const AUTO_SPEED = -80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!active) {
        id = requestAnimationFrame(tick);
        return;
      }

      let current = x.get();

      // If manual navigation is active, lerp towards the targetX
      if (targetX.current !== null) {
        const diff = targetX.current - current;
        if (Math.abs(diff) > 0.5) {
          current += diff * 0.15; // lerp transition speed
        } else {
          current = targetX.current;
          targetX.current = null;
        }
      } else {
        if (!isDragging.current && !isPaused) {
          current += AUTO_SPEED * dt;
        }

        if (!isDragging.current && Math.abs(velocity.current) > 0.1) {
          current += velocity.current * dt;
          velocity.current *= 0.95;
        }
      }

      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (current <= -loop) {
          current += loop;
          if (targetX.current !== null) targetX.current += loop;
        }
        if (current >= 0) {
          current -= loop;
          if (targetX.current !== null) targetX.current -= loop;
        }
      }

      x.set(current);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);

  }, [active, isPaused, x]);

  const onDragStart = (e) => {
    targetX.current = null; // cancel manual scroll
    isDragging.current = true;
    velocity.current = 0;
    lastX.current = e.clientX || e.touches?.[0]?.clientX;
  };

  const onDragMove = (e) => {
    if (!isDragging.current) return;

    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const delta = clientX - lastX.current;
    lastX.current = clientX;

    x.set(x.get() + delta);
    velocity.current = delta * 10;
  };

  const onDragEnd = () => {
    isDragging.current = false;
  };

  const handleScroll = (direction) => {
    const step = window.innerWidth < 640 ? 300 : 436; // Card size + gap
    const current = x.get();
    
    // Left arrow increases x (scrolls content to the right)
    // Right arrow decreases x (scrolls content to the left)
    targetX.current = direction === "left" ? current + step : current - step;
    setIsPaused(true);

    if (window.certificationScrollTimeout) {
      clearTimeout(window.certificationScrollTimeout);
    }
    window.certificationScrollTimeout = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="certification"
      className="relative w-full py-16 lg:py-14 xl:py-24 bg-transparent text-white overflow-hidden"
    >
      <motion.h2
        className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold text-center mb-10 lg:mb-8 xl:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        My Certifications
      </motion.h2>

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

        <div
          className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setPreviewCert(null);
          }}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeaveCapture={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          <motion.div
            ref={trackRef}
            className="flex gap-6 sm:gap-10 xl:gap-14"
            style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
          >
            {repeated.map((cert, i) => (
              <div
                key={i}
                className="min-w-[280px] sm:min-w-[330px] lg:min-w-[300px] xl:min-w-[380px] shrink-0"
              >
                <TiltCard
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl xl:rounded-3xl overflow-hidden shadow-lg h-full flex flex-col justify-between"
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setPreviewCert(cert);
                  }}
                  onFocus={() => {
                    setIsPaused(true);
                    setPreviewCert(cert);
                  }}
                  onBlur={() => setPreviewCert(null)}
                  tabIndex={0}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-44 sm:h-52 lg:h-40 xl:h-56 w-full object-contain bg-black pointer-events-none translate-z-30"
                  />

                  <div className="p-4 xl:p-6 translate-z-50 preserve-3d">
                    <h3 className="text-base sm:text-lg xl:text-xl font-semibold translate-z-50">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 translate-z-30">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-[#1cd8d2] mt-1 translate-z-30">
                      {cert.year}
                    </p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {previewCert && (
        <motion.div
          className="pointer-events-none fixed inset-x-8 top-1/2 z-[120] hidden -translate-y-1/2 justify-center lg:flex"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          <div className="max-h-[82vh] w-fit max-w-[92vw] rounded-2xl border border-cyan-300/25 bg-black/90 p-4 shadow-[0_0_60px_rgba(28,216,210,0.24)] backdrop-blur-xl">
            <img
              src={previewCert.image}
              alt=""
              className="max-h-[74vh] max-w-[88vw] object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
