import { useMotionValue, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";

export default function TiltCard({ children, className = "", style = {}, ...props }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  const glintOpacity = useTransform(
    useTransform(springX, [0, 0.5, 1], [0.3, 0.05, 0.3]),
    (v) => v
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    x.set(mouseX);
    y.set(mouseY);

    if (props.onMouseMove) {
      props.onMouseMove(e);
    }
  };

  const handleMouseLeave = (e) => {
    x.set(0.5);
    y.set(0.5);

    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        {...props}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          ...style,
        }}
        className={`relative preserve-3d futuristic-card ${className}`}
      >
        {/* Holographic Glint/Shine Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-gradient-to-tr from-transparent via-[#1CD8D2]/10 to-[#00bf8f]/10"
          style={{ opacity: glintOpacity }}
        />
        
        {children}
      </motion.div>
    </div>
  );
}
