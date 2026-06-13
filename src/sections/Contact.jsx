import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaLinkedinIn, FaLocationDot, FaPaperPlane } from "react-icons/fa6";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import Astra from "../assets/Astra.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "ambujsudegora111@gmail.com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    opportunity: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          opportunity: formData.opportunity,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", opportunity: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }

    setTimeout(() => setStatus(""), 5000);
  };

  const inputClass =
    "rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-300/60 focus:bg-black/45";

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-transparent px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      <ParticlesBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-emerald-300/5" />

          <div className="relative">
            <p className="mb-3 text-xs font-mono uppercase tracking-[0.28em] text-cyan-300/80">
              Contact
            </p>
            <h2 className="bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              Let's Build Something
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              I am open to Software Development roles where I can contribute to scalable systems,
              clean architecture, and meaningful product delivery.
            </p>

            <motion.img
              src={Astra}
              alt="Ambuj Kumar Rai contact illustration"
              className="mx-auto mt-8 h-64 w-full max-w-sm rounded-2xl border border-white/10 bg-black/20 object-contain p-3 shadow-[0_0_40px_rgba(28,216,210,0.12)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-gray-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              <FaEnvelope className="text-cyan-200" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6">
            <p className="mb-2 text-xs font-mono uppercase tracking-[0.22em] text-cyan-300/80">
              Message
            </p>
            <h3 className="text-2xl font-semibold">Let's Connect</h3>
            <p className="mt-2 text-sm text-gray-400">
              Share the opportunity, timeline, or problem statement. I will get back to you soon.
            </p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClass}
            />

            <select
              name="opportunity"
              value={formData.opportunity}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="" disabled>
                Opportunity Type
              </option>
              <option value="Full-Time Role" className="text-black">
                Full-Time Role
              </option>
              <option value="Internship" className="text-black">
                Internship
              </option>
              <option value="Collaboration" className="text-black">
                Collaboration
              </option>
            </select>

            <textarea
              name="message"
              rows={4}
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputClass} min-h-32 resize-none`}
            />

            {status && (
              <p
                className={`text-sm ${status === "success"
                  ? "text-green-400"
                  : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                  }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message sent successfully."
                    : "Something went wrong. Please try again."}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              disabled={status === "sending"}
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 px-6 py-3 font-semibold text-black transition hover:from-cyan-200 hover:to-emerald-200 hover:shadow-[0_0_28px_rgba(28,216,210,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
              <FaPaperPlane size={14} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
