import React from "react";
import { motion } from "framer-motion";

const MH2 = motion.h2;
const MDiv = motion.div;

const testimonials = [
  {
    name: "Rajendra Devra",
    role: "Senior Engineer",
    review:
      "Ambuj brings strong ownership and technical clarity to engineering work. His ability to approach problems with structure and deliver dependable solutions stands out.",
  },
  {
    name: "Akash Kingare",
    role: "Technical Lead Developer",
    review:
      "Ambuj is consistent, proactive, and thoughtful about scalable implementation. He collaborates well and keeps quality at the center of delivery.",
  },
  {
    name: "Amey Shinde",
    role: "Backend Engineer",
    review:
      "Ambuj’s backend expertise and attention to detail make him a reliable developer. He takes ownership and delivers quality work every time.",
  },
  {
    name: "Nitesh Tiwari",
    role: "Software Engineer",
    review:
      "Ambuj is a focused and disciplined developer. His problem-solving mindset and consistency really stand out in team projects.",
  },
  {
    name: "Prerna Malviya",
    role: "Technical Lead",
    review:
      "Ambuj demonstrates strong ownership, technical depth, and learning agility. He adapts quickly and delivers solutions with long-term scalability in mind.",
  },
  {
    name: "Tripali Mitra",
    role: "Engineering Manager",
    review:
      "Ambuj is dependable, technically sound, and proactive. His contributions positively impact both delivery timelines and overall code quality.",
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <MH2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-16"
      >
        What People Say
      </MH2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
        {testimonials.map((testi, idx) => (
          <MDiv
            key={testi.name + idx}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6
                       flex flex-col items-center text-center
                       transform transition duration-500
                       hover:scale-105 hover:-rotate-1"
          >
            <div
              aria-hidden="true"
              className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-[#1CD8D2]/25 via-[#00bf8f]/20 to-[#302b63]/35 text-xl font-bold text-cyan-100 shadow-[0_0_28px_rgba(28,216,210,0.18)]"
            >
              {getInitials(testi.name)}
            </div>
            <p className="text-gray-200 italic mb-4">
              “{testi.review}”
            </p>

            <h3 className="text-lg font-semibold">{testi.name}</h3>

            <p className="text-sm text-gray-400">{testi.role}</p>
          </MDiv>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
