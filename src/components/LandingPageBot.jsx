import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import avatar from "../assets/avator.png";

export default function LandingPageBot({ introDone }) {
  const [isOpen, setIsOpen] = useState(false);
  const [msg1Typed, setMsg1Typed] = useState(0);
  const [msg2Typed, setMsg2Typed] = useState(0);
  const [msg1Finished, setMsg1Finished] = useState(false);
  const [msg2Finished, setMsg2Finished] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  // Message 1 segments for formatting and styling
  const msg1Segments = [
    { text: "Hi, I'm ", style: "" },
    {
      text: "Ambuj",
      style: "font-bold bg-gradient-to-r from-[#1CD8D2] to-[#00bf8f] bg-clip-text text-transparent"
    },
    {
      text: "! Welcome to my portfolio — here I share my journey in coding, design, and problem-solving.",
      style: ""
    }
  ];

  const msg2Segments = [
    { text: "Thanks for visiting, your time means a lot!", style: "" }
  ];

  const totalMsg1Chars = msg1Segments.reduce((acc, seg) => acc + seg.text.length, 0);
  const totalMsg2Chars = msg2Segments.reduce((acc, seg) => acc + seg.text.length, 0);

  // Automatically open the bot after a delay once intro is done
  useEffect(() => {
    if (introDone && !hasOpenedOnce) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasOpenedOnce(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [introDone, hasOpenedOnce]);

  // Message 1 typewriter effect
  useEffect(() => {
    if (!isOpen || !introDone) return;
    if (msg1Typed < totalMsg1Chars) {
      const timer = setTimeout(() => {
        setMsg1Typed((prev) => prev + 1);
      }, 25);
      return () => clearTimeout(timer);
    } else {
      setMsg1Finished(true);
    }
  }, [isOpen, introDone, msg1Typed, totalMsg1Chars]);

  // Message 2 typewriter effect (starts after Message 1 is done + delay)
  useEffect(() => {
    if (!msg1Finished) return;
    const startDelay = setTimeout(() => {
      if (msg2Typed < totalMsg2Chars) {
        const timer = setTimeout(() => {
          setMsg2Typed((prev) => prev + 1);
        }, 25);
        return () => clearTimeout(timer);
      } else {
        setMsg2Finished(true);
      }
    }, 600);
    return () => clearTimeout(startDelay);
  }, [msg1Finished, msg2Typed, totalMsg2Chars]);

  // CTA Button fade in
  useEffect(() => {
    if (msg2Finished) {
      const timer = setTimeout(() => {
        setShowCTA(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [msg2Finished]);

  const handleExplore = () => {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Minimize the bot so it doesn't block projects view
    setIsOpen(false);
  };

  // Helper to render segment-based typewriter text with character zoomer classes
  const renderTypedSegments = (segments, typedCount) => {
    let charAccumulator = 0;
    return segments.map((seg, sIdx) => {
      const segText = seg.text;
      const startChar = charAccumulator;
      const endChar = charAccumulator + segText.length;
      charAccumulator = endChar;

      if (typedCount >= endChar) {
        return (
          <span key={sIdx} className={seg.style}>
            {segText.split("").map((char, cIdx) => (
              <span key={cIdx} className="char-zoom-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        );
      } else if (typedCount > startChar) {
        const visibleLength = typedCount - startChar;
        const visibleText = segText.slice(0, visibleLength);
        return (
          <span key={sIdx} className={seg.style}>
            {visibleText.split("").map((char, cIdx) => (
              <span key={cIdx} className="char-zoom-letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      {/* Floating Toggle Bubble (Closed State) */}
      <AnimatePresence>
        {!isOpen && introDone && (
          <motion.button
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[99] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#1CD8D2] to-[#00bf8f] text-white shadow-[0_8px_24px_rgba(28,216,210,0.4)] hover:scale-110 hover:shadow-[0_12px_30px_rgba(28,216,210,0.6)] cursor-pointer transition-all duration-300"
            aria-label="Open greeting bot"
          >
            <span className="relative flex h-full w-full items-center justify-center">
              {/* Notification badge */}
              {!msg2Finished && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold">
                  1
                </span>
              )}
              {/* Floating icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
                />
              </svg>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Greeting Bot Window */}
      <AnimatePresence>
        {isOpen && introDone && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="portfolio-bot fixed bottom-6 right-6 z-[99] flex w-[350px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Ambuj avatar"
                    className="h-9 w-9 rounded-full object-cover border border-white/20"
                  />
                  {/* Active Indicator Pulse */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00bf8f] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00bf8f] border border-black/80"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wide">Ambuj (SDE)</span>
                  <span className="text-[10px] text-gray-400">Online Assistant</span>
                </div>
              </div>

              {/* Minimize/Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                aria-label="Minimize bot"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto max-h-[300px] p-4 space-y-4 custom-scrollbar">
              {/* Message 1 */}
              {msg1Typed > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="flex flex-col max-w-[85%] rounded-2xl bg-white/10 px-4 py-2.5 text-sm leading-relaxed border border-white/5 shadow-inner">
                    <div className="flex items-start">
                      <span className="animate-wave mr-1 text-base select-none">👋</span>
                      <p className="flex-1">
                        {renderTypedSegments(msg1Segments, msg1Typed)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Message 2 */}
              {msg2Typed > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-end"
                >
                  <div className="flex flex-col max-w-[85%] rounded-2xl bg-gradient-to-tr from-[#1CD8D2]/10 to-[#00bf8f]/10 px-4 py-2.5 text-sm leading-relaxed border border-[#00bf8f]/20 shadow-lg text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="text-base select-none">✨</span>
                      <p className="flex-1 text-left">
                        {renderTypedSegments(msg2Segments, msg2Typed)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Typing indicator (while message 2 is waiting or message 1 typing) */}
              {((msg1Typed < totalMsg1Chars) || (msg1Finished && !msg2Finished && msg2Typed === 0)) && (
                <div className="flex gap-2">
                  <div className="bg-white/10 px-4 py-2 rounded-2xl flex items-center gap-1.5 w-fit border border-white/5">
                    <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Explore Button Area */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="p-4 bg-white/5 border-t border-white/10 flex justify-center"
                >
                  <button
                    onClick={handleExplore}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] hover:shadow-[0_0_20px_rgba(28,216,210,0.6)] hover:scale-105 active:scale-95 px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <span>Explore My Work</span>
                    <span className="text-xs">🚀</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
