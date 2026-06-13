import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Layers3, Target, Terminal } from "lucide-react";
import p from "../assets/p.jpg";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const stats = [
    {
      label: "Expertise",
      value: "Full-Stack / SDE",
      detail: "Frontend + Backend delivery",
      icon: <Layers3 size={16} className="text-cyan-300" />,
    },
    {
      label: "Logic",
      value: "DSA Specialist",
      detail: "Optimized problem-solving",
      icon: <BrainCircuit size={16} className="text-emerald-300" />,
    },
    {
      label: "Goal",
      value: "Product Impact",
      detail: "Build solutions that scale",
      icon: <Target size={16} className="text-cyan-200" />,
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-transparent text-white overflow-hidden py-16 lg:py-12 xl:py-20"
      aria-label="About Ambuj Kumar Rai"
    >

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 lg:px-10 xl:px-12 flex flex-col gap-12 xl:gap-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">

          <motion.div
            className="lg:col-span-4 flex justify-center lg:justify-start"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <motion.div
                className="relative w-64 h-64 md:w-72 md:h-72 lg:w-[19rem] lg:h-[19rem] rounded-2xl overflow-hidden border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={p}
                  alt="Ambuj Kumar Rai"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
              <div className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Available for Hire</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-5 xl:space-y-6">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-2 mb-3">
                <Terminal size={18} className="text-cyan-400" />
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300/80 font-mono">
                  About Me
                </p>
              </div>
              <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-2">
                Ambuj Kumar{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]">
                  Rai
                </span>
              </h2>
              <h3 className="text-lg md:text-xl xl:text-2xl text-white/70 font-medium">
                SDE | Crafting Scalable Digital Architectures
              </h3>
            </motion.div>

            <motion.p
              className="text-gray-400 text-base xl:text-lg leading-relaxed max-w-3xl"
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              I am a mathematics-driven software engineer focused on the intersection of
              <span className="text-white font-medium"> clean code </span> and
              <span className="text-white font-medium"> performant systems</span>.
              I specialize in turning complex algorithms into reliable, user-centric applications.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="p-4 xl:p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <div className="mb-3 w-fit rounded-lg border border-white/10 bg-black/30 p-2">
                    {item.icon}
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{item.label}</p>
                  <p className="mt-1 text-sm md:text-base font-semibold text-white/95">{item.value}</p>
                  <p className="mt-2 text-xs text-gray-400">{item.detail}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap gap-4 pt-2 xl:pt-4"
              {...fadeInUp}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-cyan-300 to-emerald-300 hover:from-cyan-200 hover:to-emerald-200 hover:shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all duration-300"
              >
                View Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full border border-cyan-400/35 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20 hover:border-cyan-300/60 transition-all duration-300"
              >
                Contact Me
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="w-full p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-cyan-500" /> The Engineering Mindset
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                My background in <span className="text-cyan-400">Mathematics</span> isn't just a degree—it's my debugger. It taught me to view complex systems as sets of solvable equations. I prioritize modularity and future-proof architecture over quick hacks.
              </p>
              <p>
                Currently, I'm deep-diving into <span className="text-emerald-400">System Design</span> and high-concurrency patterns. I believe great software isn't just about code that works; it's about code that lasts.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}