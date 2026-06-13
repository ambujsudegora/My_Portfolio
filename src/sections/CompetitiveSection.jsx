import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiGeeksforgeeks, SiHackerrank, SiLeetcode } from "react-icons/si";
import { FaExternalLinkAlt, FaLaptopCode } from "react-icons/fa";
import TiltCard from "../components/TiltCard";

const platformStats = [
  {
    icon: SiGeeksforgeeks,
    title: "GeeksforGeeks",
    value: 2811,
    unit: "Coding Score",
    detail: "Solved 1,256+ DSA problems. Top 5% global rank.",
    href: "https://www.geeksforgeeks.org/profile/warriors141",
  },
  {
    icon: SiLeetcode,
    title: "LeetCode",
    value: 1700,
    unit: "Contest Rating",
    solvedCount: 720,
    detail: "Top 12.7% globally with strong contest consistency.",
    href: "https://leetcode.com/u/AmbujRai/",
  },
  {
    icon: SiHackerrank,
    title: "HackerRank",
    value: 4,
    unit: "Gold Badges",
    detail: "Gold in C++, Java, and Problem Solving domains.",
    href: "https://www.hackerrank.com/profile/ambujkumarrai126",
  },
  {
    icon: FaLaptopCode,
    title: "Striver TUF",
    value: 384,
    unit: "Problems Solved",
    detail: "Completed core interview-focused DSA sheet coverage.",
    href: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
  },
];

const platformConfigs = {
  "GeeksforGeeks": {
    brandColor: "#2f8d46",
    hoverShadow: "rgba(47,141,70,0.25)",
    borderColor: "group-hover:border-[#2f8d46]/40",
  },
  "LeetCode": {
    brandColor: "#ffa116",
    hoverShadow: "rgba(255,161,22,0.25)",
    borderColor: "group-hover:border-[#ffa116]/40",
  },
  "HackerRank": {
    brandColor: "#2ec866",
    hoverShadow: "rgba(46,200,102,0.25)",
    borderColor: "group-hover:border-[#2ec866]/40",
  },
  "Striver TUF": {
    brandColor: "#e82a2a",
    hoverShadow: "rgba(232,42,42,0.25)",
    borderColor: "group-hover:border-[#e82a2a]/40",
  },
};

const LEETCODE_API_URL = import.meta.env.VITE_LEETCODE_API_URL || "/api/leetcode";

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
};

export default function CompetitiveSection() {
  const [stats, setStats] = useState(platformStats);
  const [isLeetCodeLoading, setIsLeetCodeLoading] = useState(true);
  const [leetCodeFailed, setLeetCodeFailed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchLeetCode = async () => {
      try {
        const res = await fetch(LEETCODE_API_URL);
        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        if (!mounted) return;

        const rating = Number(data?.contestRating ?? 1700);
        const solved = Number(data?.solved ?? 720);
        const rank = data?.rank ? `Rank #${data.rank}` : "Global rank improving";

        setStats((prev) =>
          prev.map((item) =>
            item.title === "LeetCode"
              ? {
                ...item,
                value: rating,
                solvedCount: solved,
                detail: `${solved}+ problems solved. ${rank}`,
              }
              : item
          )
        );

        setLastUpdated(new Date().toLocaleTimeString());
        setLeetCodeFailed(false);
      } catch (err) {
        console.error(err);
        setLeetCodeFailed(true);
      } finally {
        setIsLeetCodeLoading(false);
      }
    };

    fetchLeetCode();
  }, []);

  const leet = stats.find((item) => item.title === "LeetCode");

  return (
    <section
      id="competitive"
      className="relative w-full overflow-hidden bg-transparent px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70 mb-3">
            Performance Profile
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text">
            Competitive Programming
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Verified coding performance across major platforms with strong
            problem-solving consistency.
          </p>

          {lastUpdated && (
            <p className="mt-2 text-xs text-gray-500">
              Updated at {lastUpdated}
            </p>
          )}

          {leetCodeFailed && (
            <p className="mt-2 text-xs text-amber-400">
              Failed to fetch live data
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {stats.map((item, i) => {
            const Icon = item.icon;
            const isLC = item.title === "LeetCode";
            const cfg = platformConfigs[item.title] || {
              brandColor: "#1CD8D2",
              hoverShadow: "rgba(28,216,210,0.2)",
              borderColor: "group-hover:border-[#1CD8D2]/40",
            };

            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full h-full"
              >
                <TiltCard
                  className={`relative p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_35px_var(--hover-shadow)] ${cfg.borderColor} cursor-pointer h-full flex flex-col justify-between`}
                  style={{
                    "--hover-shadow": cfg.hoverShadow,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.05)",
                  }}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[var(--brand-color)]/8 to-transparent blur-xl transition duration-500 rounded-3xl"
                    style={{ "--brand-color": cfg.brandColor }}
                  />

                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4 translate-z-30">
                        <div 
                          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner"
                          style={{
                            color: cfg.brandColor,
                            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.1)",
                          }}
                        >
                          <Icon className="text-2xl" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono mt-0.5">Verified Profile</span>
                        </div>
                      </div>
                      <div 
                        className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-gray-500 group-hover:text-[var(--brand-color)] group-hover:border-[var(--brand-color)]/30 transition-all duration-300"
                        style={{ "--brand-color": cfg.brandColor }}
                      >
                        <FaExternalLinkAlt size={11} />
                      </div>
                    </div>

                    <div className="space-y-1 my-4 translate-z-50 preserve-3d">
                      <div 
                        className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--rating-number-from)] to-[var(--rating-number-to)] bg-clip-text text-transparent group-hover:from-[var(--rating-number-from)] group-hover:to-[var(--brand-color)] transition-all duration-500"
                        style={{ "--brand-color": cfg.brandColor }}
                      >
                        {isLC && isLeetCodeLoading ? (
                          <div className="h-10 w-28 bg-white/10 animate-pulse rounded" />
                        ) : (
                          <Counter value={item.value} />
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 mt-1">
                        {item.unit}
                      </p>
                    </div>

                    {isLC && !isLeetCodeLoading && (
                      <div className="mt-2 inline-flex items-center px-3 py-1 text-xs rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/25 font-semibold translate-z-30">
                        {item.solvedCount} Problems Solved
                      </div>
                    )}

                    <p className="mt-4 text-sm text-gray-300 leading-relaxed translate-z-30">
                      {item.detail}
                    </p>
                  </div>

                  <div className="mt-6 h-1.5 bg-white/[0.06] rounded-full overflow-hidden translate-z-30">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${cfg.brandColor}, ${cfg.brandColor}cc, rgba(255,255,255,0.1))`
                      }}
                    />
                  </div>
                </TiltCard>
              </a>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.02] p-5 rounded-2xl border border-white/10 backdrop-blur-xl">
          {[
            ["1,256+", "Total Solved"],
            ["Top 5%", "GFG Global"],
            [`${Math.round(leet?.value ?? 1700)}+`, "LC Rating"],
            ["384", "Striver TUF"],
          ].map(([value, label], idx) => (
            <div key={label} className="text-center group py-4 relative px-2">
              <p className="text-3xl font-extrabold tracking-tight text-white group-hover:text-[#1CD8D2] transition-colors duration-300">
                {value}
              </p>
              <p className="text-[10px] font-semibold uppercase text-gray-500 mt-1.5 tracking-widest">
                {label}
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#1CD8D2] to-[#00bf8f] group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
