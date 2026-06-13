import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import TiltCard from "../components/TiltCard";

const projects = [
  {
    number: "01",
    title: "Major Project (DevSpace)",
    desc: "Full-stack project with strong backend and frontend integration, showcasing end-to-end engineering skills.",
    tags: ["Node.js", "React", "MongoDB"],
    github: "https://github.com/ambujsudegora",
    metric: "Scalable MVC",
    brandColor: "#a855f7",
    hoverShadow: "rgba(168,85,247,0.25)",
    borderColor: "group-hover:border-[#a855f7]/40",
    mockup: APIControllerMockup,
  },
  {
    number: "02",
    title: "Facebook Clone",
    desc: "A full-stack social media clone replicating core Facebook features — authentication, posts, likes, and real-time interactions.",
    tags: ["React", "Full-Stack", "Firebase"],
    github: "https://github.com/ambujsudegora/Facebook-Clone",
    metric: "Real-time sync",
    brandColor: "#1877f2",
    hoverShadow: "rgba(24,119,242,0.25)",
    borderColor: "group-hover:border-[#1877f2]/40",
    mockup: FacebookMockup,
  },
  {
    number: "03",
    title: "ATM Software System",
    desc: "Simulated ATM banking system with account management, PIN verification, transactions, and secure balance operations.",
    tags: ["Java", "OOPS", "JDBC", "Swing"],
    github: "https://github.com/ambujsudegora/ATM-Software-System",
    metric: "SHA-256 secure",
    brandColor: "#2ec866",
    hoverShadow: "rgba(46,200,102,0.25)",
    borderColor: "group-hover:border-[#2ec866]/40",
    mockup: ATMMockup,
  },
  {
    number: "04",
    title: "DSA Implementations",
    desc: "Optimized data structures and algorithm solutions focused on competitive programming and system design patterns.",
    tags: ["C++", "Algorithms", "DSA"],
    github: "https://github.com/ambujsudegora",
    metric: "O(log N) Search",
    brandColor: "#1CD8D2",
    hoverShadow: "rgba(28,216,210,0.25)",
    borderColor: "group-hover:border-[#1CD8D2]/40",
    mockup: DSATreeMockup,
  },
];

function FacebookMockup() {
  return (
    <div className="w-full h-36 bg-[var(--mockup-bg)] border border-[var(--mockup-border)] rounded-2xl p-4 flex flex-col gap-3 overflow-hidden select-none font-mono text-[10px] relative">
      <div className="flex items-center gap-2 border-b border-[var(--mockup-border)] pb-2">
        <div className="w-6 h-6 rounded-full bg-[#1877f2]/20 border border-[#1877f2]/40 flex items-center justify-center text-[#1877f2] font-sans font-bold text-[8px]">F</div>
        <div className="flex flex-col gap-1 w-full">
          <div className="h-2 w-20 bg-[var(--mockup-bar-1)] rounded-full" />
          <div className="h-1.5 w-12 bg-[var(--mockup-bar-2)] rounded-full" />
        </div>
      </div>
      <div className="h-12 bg-gradient-to-tr from-[#1877f2]/10 to-transparent border border-[#1877f2]/10 rounded-lg flex items-center justify-center text-[9px] text-[#1877f2] font-semibold">
        Feed Post Container
      </div>
      <div className="flex justify-between items-center px-1">
        <div className="h-2 w-8 bg-[var(--mockup-bar-1)] rounded-full" />
        <div className="h-2 w-8 bg-[var(--mockup-bar-1)] rounded-full" />
        <div className="h-2 w-8 bg-[#1877f2]/30 rounded-full" />
      </div>
    </div>
  );
}

function ATMMockup() {
  return (
    <div className="w-full h-36 bg-[var(--atm-bg)] border border-[var(--atm-border)] rounded-2xl p-4 flex flex-col gap-1.5 overflow-hidden select-none font-mono text-[9px] text-[var(--atm-text)]">
      <div className="flex gap-1 border-b border-[var(--atm-border)]/50 pb-1.5 mb-1 justify-between items-center">
        <span className="text-[8px] uppercase tracking-wider text-[var(--atm-text)]/60">Terminal console</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
        </div>
      </div>
      <p className="opacity-40">{`> Booting Bank System...`}</p>
      <p>{`> USER VERIFICATION: SUCCESS`}</p>
      <p className="text-[var(--atm-text-white)]">{`> WITHDRAWAL AMOUNT: $400.00`}</p>
      <p>{`> DISPENSING CASH...`}</p>
      <p className="font-bold flex items-center gap-1">
        {`> BAL: $10,480.00`}
        <span className="w-1.5 h-3 bg-[var(--atm-text)] animate-pulse inline-block" />
      </p>
    </div>
  );
}

function APIControllerMockup() {
  return (
    <div className="w-full h-36 bg-[var(--mockup-bg)] border border-[var(--mockup-border)] rounded-2xl p-4 flex flex-col gap-2 overflow-hidden select-none font-mono text-[9px]">
      <div className="flex justify-between items-center border-b border-[var(--mockup-border)] pb-1.5 mb-1">
        <span className="text-[var(--mockup-text-secondary)] text-[8px]">gateway_controller.js</span>
        <span className="text-purple-400">REST API</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold text-[8px]">GET</span>
        <span className="text-[var(--mockup-text-primary)]">/api/v1/projects</span>
        <span className="text-[var(--mockup-text-muted)] ml-auto">200 OK</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold text-[8px]">POST</span>
        <span className="text-[var(--mockup-text-primary)]">/api/v1/auth/login</span>
        <span className="text-[var(--mockup-text-muted)] ml-auto">201 CREATED</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-[#1CD8D2]/10 text-[#1CD8D2] font-semibold text-[8px]">PUT</span>
        <span className="text-[var(--mockup-text-primary)]">/api/v1/users/profile</span>
        <span className="text-[var(--mockup-text-muted)] ml-auto">200 OK</span>
      </div>
    </div>
  );
}

function DSATreeMockup() {
  return (
    <div className="w-full h-36 bg-[var(--mockup-bg)] border border-[var(--mockup-border)] rounded-2xl p-4 flex flex-col gap-2 justify-center items-center overflow-hidden select-none relative">
      <div className="absolute top-2 left-4 text-[var(--mockup-text-secondary)] font-mono text-[8px] uppercase tracking-wider">BST Traversal</div>
      <svg className="w-24 h-20 text-cyan-300/40" viewBox="0 0 100 80">
        <line x1="50" y1="15" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <line x1="50" y1="15" x2="75" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="12" y2="65" stroke="currentColor" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="38" y2="65" stroke="currentColor" strokeWidth="1.5" />
        
        <circle cx="50" cy="15" r="8" className="fill-[var(--mockup-svg-circle-fill)] stroke-cyan-400" strokeWidth="2" />
        <text x="50" y="18" className="fill-[var(--mockup-svg-text)] font-mono text-[7px]" textAnchor="middle">23</text>
        
        <circle cx="25" cy="40" r="8" className="fill-[var(--mockup-svg-circle-fill)] stroke-[#00bf8f]" strokeWidth="2" />
        <text x="25" y="43" className="fill-[var(--mockup-svg-text)] font-mono text-[7px]" textAnchor="middle">12</text>
        
        <circle cx="75" cy="40" r="8" className="fill-[var(--mockup-svg-circle-fill)] stroke-cyan-400" strokeWidth="1.5" />
        <text x="75" y="43" className="fill-[var(--mockup-svg-text)] font-mono text-[7px]" textAnchor="middle">45</text>
        
        <circle cx="12" cy="65" r="7" className="fill-[var(--mockup-svg-circle-fill)] stroke-[#00bf8f]" strokeWidth="2" />
        <text x="12" y="68" className="fill-[var(--mockup-svg-text)] font-mono text-[6px]" textAnchor="middle">8</text>
        
        <circle cx="38" cy="65" r="7" className="fill-[var(--mockup-svg-circle-fill)] stroke-cyan-400" strokeWidth="1.5" />
        <text x="38" y="68" className="fill-[var(--mockup-svg-text)] font-mono text-[6px]" textAnchor="middle">18</text>
      </svg>
    </div>
  );
}

function ProjectCard({ project }) {
  const Mockup = project.mockup;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full h-full"
    >
      <TiltCard
        className={`group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 flex flex-col gap-6 overflow-hidden h-full transition-all duration-300 hover:shadow-[0_0_35px_var(--hover-shadow)] ${project.borderColor}`}
        style={{
          "--hover-shadow": project.hoverShadow,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.05)",
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[var(--brand-color)]/5 to-transparent blur-xl transition duration-500 rounded-3xl"
          style={{ "--brand-color": project.brandColor }}
        />

        <div className="flex justify-between items-center relative z-10 translate-z-30">
          <span
            className="text-[10px] tracking-[3px] uppercase font-bold"
            style={{
              background: `linear-gradient(90deg, ${project.brandColor}, #ffffff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Project {project.number}
          </span>
          <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-[10px] text-gray-400 font-mono">
            {project.metric}
          </span>
        </div>

        <div className="relative z-10 translate-z-30 w-full overflow-hidden">
          <Mockup />
        </div>

        <div className="space-y-3 relative z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight translate-z-50 group-hover:text-[var(--brand-color)] transition-colors duration-300" style={{ "--brand-color": project.brandColor }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-300 translate-z-30 h-16 overflow-y-auto custom-scrollbar">
            {project.desc}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 relative z-10 translate-z-30">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-semibold border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/[0.02] text-neutral-600 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto relative z-10 translate-z-50">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold border transition-all duration-300 bg-[var(--btn-bg)] border-[var(--btn-border)] text-[var(--brand-color)] hover:text-white hover:bg-[var(--brand-color)]"
            style={{
              "--brand-color": project.brandColor,
              "--btn-bg": `${project.brandColor}15`,
              "--btn-border": `${project.brandColor}35`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub size={13} />
            View Source Code
          </motion.a>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative text-white min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      <div className="text-center mb-16 relative z-10">
        <p
          className="text-[11px] tracking-[4px] uppercase mb-4 font-bold"
          style={{
            background: "linear-gradient(90deg, #1CD8D2, #00bf8f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Featured Work
        </p>
        <h2
          className="font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-[#1CD8D2] to-[#00bf8f] bg-clip-text text-transparent"
        >
          My Projects
        </h2>
        <div
          className="mx-auto mt-6 h-1 w-20 rounded-full"
          style={{
            background: "linear-gradient(90deg, #1CD8D2, #00bf8f, #302b63)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}