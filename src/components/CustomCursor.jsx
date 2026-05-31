import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPosition, setTrailPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveHandler = (e) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseOverHandler = (e) => {
      const target = e.target;
      if (!target) return;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest(".cursor-pointer") ||
        (target.classList && target.classList.contains("cursor-pointer"))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const mouseLeaveHandler = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", mouseOverHandler);
    document.addEventListener("mouseleave", mouseLeaveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", mouseOverHandler);
      document.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, [isVisible]);

  // Trail position interpolation (adds a spring lag effect)
  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId;

    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Linear interpolation for smooth trailing lag
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner solid dot (follows immediately) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1CD8D2] to-[#00bf8f] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 1.5 : 1})`,
        }}
      />

      {/* Outer tracking ring (follows with lag) */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50 transition-all duration-300 ease-out"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 1.6 : 1})`,
          backgroundColor: hovered ? "rgba(28, 216, 210, 0.08)" : "transparent",
          borderColor: hovered ? "rgba(0, 191, 143, 0.8)" : "rgba(28, 216, 210, 0.5)",
          boxShadow: hovered ? "0 0 15px rgba(28, 216, 210, 0.25)" : "none",
        }}
      />

      {/* Subtle background cursor glow */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1CD8D2]/10 to-[#00bf8f]/5 blur-3xl opacity-80"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
      />
    </>
  );
}