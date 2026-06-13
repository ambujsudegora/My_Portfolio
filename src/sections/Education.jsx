import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School, Award, MapPin, Calendar } from "lucide-react";
import TiltCard from "../components/TiltCard";

const educationData = [
  {
    icon: GraduationCap,
    degree: "Master of Computer Application [MCA]",
    institution: "Maulana Azad National Institute of Technology [MANIT]",
    location: "Bhopal, Madhya Pradesh",
    duration: "Oct 2021 – May 2024",
    metricType: "CGPA",
    metricValue: "8.49",
    summary: "Acquired deep expertise in computer science fundamentals, advanced data structures, algorithms, database systems, and full-stack software development.",
  },
  {
    icon: BookOpen,
    degree: "Bachelor in Science (Hons) in Mathematics [BSC]",
    institution: "Indira Gandhi National Open University [IGNOU]",
    location: "Patna, Bihar",
    duration: "Oct 2018 – May 2021",
    metricType: "Division",
    metricValue: "1st Division",
    summary: "Mastered advanced mathematical logic, abstract algebra, statistics, and computational methods.",
  },
  {
    icon: School,
    degree: "Senior Secondary – PCM [BSEB]",
    institution: "H/S-CUM-Inter College Kusaundhi-Gopalganj",
    location: "Gopalganj, Bihar",
    duration: "July 2016 – July 2018",
    metricType: "Division",
    metricValue: "1st Division",
    summary: "Focused on Physics, Chemistry, and Mathematics (PCM), developing core problem-solving logic.",
  },
  {
    icon: Award,
    degree: "Secondary [BSEB]",
    institution: "H/S- Kusaundhi-Gopalganj",
    location: "Gopalganj, Bihar",
    duration: "July 2015 – July 2016",
    metricType: "Division",
    metricValue: "1st Division",
    summary: "Laid a strong foundation in science, mathematics, and analytical reasoning.",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative w-full overflow-hidden bg-transparent px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70 mb-3 font-mono">
            Academic Background
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text">
            Education
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            My academic progression and key learning milestones.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-[#302b63] -translate-x-1/2 hidden md:block" />

          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/10 md:hidden" />
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1CD8D2] via-[#00bf8f] to-[#302b63] md:hidden" />

          <div className="space-y-12 md:space-y-16">
            {educationData.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;

              return (
                <div 
                  key={item.degree} 
                  className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? "md:justify-start" : "md:justify-end"}`}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full border border-[#1CD8D2]/40 bg-black">
                    <div className="h-3 w-3 rounded-full bg-[#1CD8D2] shadow-[0_0_12px_rgba(28,216,210,0.8)] animate-pulse" />
                  </div>

                  <div className="absolute left-4 -translate-x-1/2 z-20 md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-[#1CD8D2]/40 bg-black top-6">
                    <div className="h-3 w-3 rounded-full bg-[#1CD8D2] shadow-[0_0_12px_rgba(28,216,210,0.8)] animate-pulse" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0"
                  >
                    <TiltCard
                      className="relative p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-[#1CD8D2]/40 hover:shadow-[0_0_35px_rgba(28,216,210,0.15)] h-full flex flex-col justify-between"
                      style={{
                        boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.05)",
                      }}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1CD8D2]/20 bg-[#1CD8D2]/5 text-[#1CD8D2] shadow-inner">
                            <Icon size={20} />
                          </div>
                          
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] text-[10px] sm:text-xs text-gray-400 font-mono">
                            <Calendar size={12} className="text-[#00bf8f]" />
                            <span>{item.duration}</span>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white translate-z-50 my-2">
                          {item.degree}
                        </h3>

                        <p className="text-sm sm:text-base text-gray-200 font-medium translate-z-30 leading-snug">
                          {item.institution}
                        </p>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mt-2 translate-z-30">
                          <MapPin size={12} className="text-[#302b63]" />
                          <span>{item.location}</span>
                        </div>

                        <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.01] border border-white/5 translate-z-30">
                          <p className="text-[10px] text-[#00bf8f] font-mono uppercase tracking-wider mb-1 font-semibold">Key Focus</p>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">{item.summary}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 translate-z-30">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                          Performance
                        </span>
                        <span className="rounded-full border border-cyan-300/25 bg-[#1CD8D2]/10 px-3 py-1 text-xs font-semibold text-cyan-200 shadow-[0_0_15px_rgba(28,216,210,0.1)]">
                          {item.metricType}: {item.metricValue}
                        </span>
                      </div>
                    </TiltCard>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
