import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Certification() {

  const certifications = [
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

      if (!isDragging.current && !isPaused) {
        current += AUTO_SPEED * dt;
      }

      if (!isDragging.current && Math.abs(velocity.current) > 0.1) {
        current += velocity.current * dt;
        velocity.current *= 0.95;
      }

      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (current <= -loop) current += loop;
        if (current >= 0) current -= loop;
      }

      x.set(current);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);

  }, [active, isPaused, x]);

  const onDragStart = (e) => {
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

  return (
    <section
      ref={sectionRef}
      id="certification"
      className="relative w-full py-16 lg:py-14 xl:py-24 bg-black text-white overflow-hidden"
    >
      <motion.h2
        className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-bold text-center mb-10 lg:mb-8 xl:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        My Certifications
      </motion.h2>

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
            <motion.div
              key={i}
              whileHover={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="min-w-[280px] sm:min-w-[330px] lg:min-w-[300px] xl:min-w-[380px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl xl:rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(28,216,210,0.4)] transition-all duration-500"
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
                className="h-44 sm:h-52 lg:h-40 xl:h-56 w-full object-contain bg-black pointer-events-none"
              />

              <div className="p-4 xl:p-6">
                <h3 className="text-base sm:text-lg xl:text-xl font-semibold">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {cert.issuer}
                </p>
                <p className="text-sm text-[#1cd8d2] mt-1">
                  {cert.year}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
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
