import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiGeeksforgeeks, SiHackerrank, SiLeetcode } from "react-icons/si";
import { FaExternalLinkAlt, FaLaptopCode } from "react-icons/fa";

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
      className="relative w-full overflow-hidden bg-[#050505] px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#1CD8D2]/12 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#302b63]/20 blur-[140px]" />
      </div>

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

            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative p-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:shadow-[0_0_30px_rgba(28,216,210,0.15)] transition cursor-pointer h-full"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#1CD8D2]/10 to-[#302b63]/10 blur-xl transition rounded-3xl" />


                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Icon className="text-xl text-[#1CD8D2] group-hover:scale-110 transition" />
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        {item.title}
                      </span>
                    </div>

                    <FaExternalLinkAlt
                      size={14}
                      className="text-gray-500 group-hover:text-[#00bf8f] transition-colors duration-300 pointer-events-none"
                    />
                  </div>


                  <div className="text-5xl font-extrabold bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] text-transparent bg-clip-text">
                    {isLC && isLeetCodeLoading ? (
                      <div className="h-10 w-28 bg-white/10 animate-pulse rounded" />
                    ) : (
                      <Counter value={item.value} />
                    )}
                  </div>

                  <p className="text-xs uppercase text-gray-400 mt-1">
                    {item.unit}
                  </p>

                  {isLC && !isLeetCodeLoading && (
                    <div className="mt-2 inline-block px-3 py-1 text-xs rounded-full bg-[#1CD8D2]/10 text-cyan-200 border border-[#1CD8D2]/30">
                      {item.solvedCount} solved
                    </div>
                  )}
                  <p className="mt-4 text-sm text-gray-300">{item.detail}</p>

                  <div className="mt-5 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]"
                    />
                  </div>
                </motion.div>
              </a>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.04] p-5 rounded-2xl border border-white/10 backdrop-blur-xl">
          {[
            ["1,256+", "Total Solved"],
            ["Top 5%", "GFG Global"],
            [`${Math.round(leet?.value ?? 1700)}+`, "LC Rating"],
            ["384", "Striver TUF"],
          ].map(([value, label]) => (
            <div key={label} className="text-center group">
              <p className="text-2xl font-bold text-white group-hover:text-[#1CD8D2] transition">
                {value}
              </p>
              <p className="text-xs uppercase text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
