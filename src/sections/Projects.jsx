import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const PER_PAGE = 2;

const projects = [
  {
    number: "01",
    title: "Facebook Clone",
    icon: "🌐",
    desc: "A full-stack social media clone replicating core Facebook features — authentication, posts, likes, and real-time interactions.",
    tags: ["React", "Full-Stack", "Firebase"],
    github: "https://github.com/ambujsudegora/Facebook-Clone",
  },
  {
    number: "02",
    title: "ATM Software System",
    icon: "🏧",
    desc: "Simulated ATM banking system with account management, PIN verification, transactions, and secure balance operations.",
    tags: ["Java", "OOP", "CLI"],
    github: "https://github.com/ambujsudegora/ATM-Software-System",
  },
  {
    number: "03",
    title: "Major Project",
    icon: "💡",
    desc: "Full-stack project with strong backend and frontend integration, showcasing end-to-end engineering skills.",
    tags: ["Node.js", "React", "MongoDB"],
    github: "https://github.com/ambujsudegora",
  },
  {
    number: "04",
    title: "DSA Implementations",
    icon: "⚙️",
    desc: "Optimized data structures and algorithm solutions focused on competitive programming and system design patterns.",
    tags: ["C++", "Algorithms", "DSA"],
    github: "https://github.com/ambujsudegora",
  },
];

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 flex flex-col gap-5 overflow-hidden"
      style={{
        boxShadow: "0 8px 32px rgba(28,216,210,0.08), inset 0 1px 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-3xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, rgba(28,216,210,0.1) 0%, rgba(0,191,143,0.05) 50%, rgba(48,43,99,0.05) 100%)",
        }}
      />

      {/* Top shimmer line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(28,216,210,0.8), transparent)",
        }}
      />

      {/* Number */}
      <span
        className="text-[10px] tracking-[3px] uppercase font-bold relative z-10"
        style={{
          background: "linear-gradient(90deg, #1CD8D2, #00bf8f)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {project.number}
      </span>

      {/* Icon + Title */}
      <div className="flex items-center gap-4 relative z-10">
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{
            background: "linear-gradient(135deg, rgba(28,216,210,0.2), rgba(0,191,143,0.1))",
            border: "1px solid rgba(28,216,210,0.3)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
        >
          {project.icon}
        </motion.div>
        <h3
          className="text-xl font-bold text-white leading-tight"
        >
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed relative z-10" style={{ color: "rgba(255,255,255,0.6)" }}>
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tags.map((tag) => (
          <motion.span
            key={tag}
            className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-medium"
            whileHover={{ scale: 1.05 }}
            style={{
              background: "rgba(28,216,210,0.1)",
              border: "1px solid rgba(28,216,210,0.3)",
              color: "#00bf8f",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* GitHub button */}
      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold relative z-10 group/btn"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "linear-gradient(135deg, rgba(28,216,210,0.15), rgba(0,191,143,0.08))",
          border: "1px solid rgba(28,216,210,0.4)",
          color: "#1CD8D2",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, rgba(28,216,210,0.25), rgba(0,191,143,0.15))";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(28,216,210,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(135deg, rgba(28,216,210,0.15), rgba(0,191,143,0.08))";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <FaGithub size={14} />
        View Code
        <span className="text-xs">→</span>
      </motion.a>
    </motion.div>
  );
}

export default function Projects() {
  const [page, setPage] = React.useState(0);
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  const visibleProjects = projects.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const navigate = (dir) => {
    setPage((p) => Math.max(0, Math.min(totalPages - 1, p + dir)));
  };

  return (
    <section
      id="projects"
      className="relative text-white min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#1CD8D2]/12 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#302b63]/20 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-[#00bf8f]/8 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </div>


      <div className="text-center mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[11px] tracking-[4px] uppercase mb-4 font-bold"
          style={{
            background: "linear-gradient(90deg, #1CD8D2, #00bf8f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Featured Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-extrabold leading-tight"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            background: "linear-gradient(135deg, #fff 0%, #1CD8D2 40%, #00bf8f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Projects
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-6 h-1 rounded-full"
          style={{
            background: "linear-gradient(90deg, #1CD8D2, #00bf8f, #302b63)",
          }}
        />
      </div>

      <div className="relative z-10 w-full" style={{ maxWidth: 860 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
          >
            {visibleProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-6 mt-12"
        >

          <motion.button
            onClick={() => navigate(-1)}
            disabled={page === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={page !== 0 ? { scale: 1.1 } : {}}
            whileTap={page !== 0 ? { scale: 0.95 } : {}}
            style={{
              border: "1.5px solid rgba(28,216,210,0.4)",
              color: "#1CD8D2",
              background: "rgba(28,216,210,0.08)",
            }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.boxShadow = "0 0 20px rgba(28,216,210,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <HiArrowLeft size={20} />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-3 items-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setPage(i)}
                className="rounded-full transition-all duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: i === page ? 28 : 8,
                  height: 8,
                  background:
                    i === page
                      ? "linear-gradient(90deg, #1CD8D2, #00bf8f)"
                      : "rgba(28,216,210,0.25)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={() => navigate(1)}
            disabled={page === totalPages - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            whileHover={page !== totalPages - 1 ? { scale: 1.1 } : {}}
            whileTap={page !== totalPages - 1 ? { scale: 0.95 } : {}}
            style={{
              border: "1.5px solid rgba(28,216,210,0.4)",
              color: "#1CD8D2",
              background: "rgba(28,216,210,0.08)",
            }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.boxShadow = "0 0 20px rgba(28,216,210,0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <HiArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}