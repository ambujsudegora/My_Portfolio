import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCodeBranch,
  FaUsers,
} from "react-icons/fa";

const experiences = [
  {
    icon: FaCodeBranch,
    role: "Software Development Engineer",
    company: "Tata Consultancy Services",
    duration: "2024 - Present",
    type: "Full-time",
    description:
      "Designing scalable enterprise applications with a focus on modular architecture, performance, and clean delivery.",
    highlights: ["Enterprise apps", "Reusable UI", "Backend logic", "Performance"],
  },
  {
    icon: FaUsers,
    role: "Training & Placement Cell Coordinator",
    company: "Maulana Azad National Institute of Technology (MANIT), Bhopal",
    duration: "2023 - 2024",
    type: "Leadership",
    description:
      "Coordinated recruiters, students, and placement workflows while helping organize preparation and communication for campus hiring.",
    highlights: ["Many students", "Recruiter coordination", "Hiring process", "Communication"],
  },
];

function ExperienceCard({ exp, idx }) {
  const Icon = exp.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: idx % 2 === 0 ? 22 : -22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      viewport={{ once: true }}
      className="group min-h-[260px] w-full max-w-[390px] rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/40 hover:bg-white/[0.07] hover:shadow-[0_0_36px_rgba(28,216,210,0.14)]"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={18} />
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold text-emerald-100">
          {exp.type}
        </span>
      </div>

      <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-cyan-300/80">
        <FaCalendarAlt size={12} />
        {exp.duration}
      </div>

      <h3 className="text-xl font-bold tracking-tight text-white">{exp.role}</h3>
      <p className="mt-2 flex items-start gap-2 text-sm font-medium text-gray-400">
        <FaBuilding className="mt-0.5 shrink-0 text-[#1CD8D2]" size={13} />
        {exp.company}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-gray-300">{exp.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {exp.highlights.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#050505] px-4 py-20 text-white sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#1CD8D2]/10 blur-[120px]" />
        <div className="absolute bottom-16 -right-24 h-96 w-96 rounded-full bg-[#302b63]/22 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.28em] text-cyan-300/80">
            Career Timeline
          </p>
          <h2 className="bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Experience
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400 md:text-base">
            A focused snapshot of engineering delivery, leadership, and problem-solving work.
          </p>
        </motion.div>

        <div className="hidden min-h-[560px] items-center md:flex">
          <div className="relative grid w-full grid-cols-2 gap-12">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/10" />
            <motion.div
              className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-cyan-100 shadow-[0_0_16px_rgba(28,216,210,0.45)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />

            {experiences.map((exp, idx) => (
              <div
                key={exp.role}
                className={`relative flex min-h-[560px] justify-center ${idx % 2 === 0 ? "items-start" : "items-end"}`}
              >
                <div className="absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-black bg-cyan-300 shadow-[0_0_22px_rgba(28,216,210,0.8)]" />
                <div
                  className={`absolute left-1/2 h-20 w-[1px] -translate-x-1/2 bg-gradient-to-b from-cyan-300 to-transparent ${idx % 2 === 0 ? "top-[calc(50%-80px)] rotate-180" : "top-1/2"}`}
                />
                <ExperienceCard exp={exp} idx={idx} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col gap-8 md:hidden">
          <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-white/10" />
          <div className="absolute bottom-0 left-4 top-0 w-[2px] bg-gradient-to-b from-[#1CD8D2] to-[#00bf8f]" />

          {experiences.map((exp, idx) => (
            <div key={exp.role} className="relative pl-10">
              <div className="absolute left-4 top-6 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-black bg-cyan-300 shadow-[0_0_22px_rgba(28,216,210,0.8)]" />
              <ExperienceCard exp={exp} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
