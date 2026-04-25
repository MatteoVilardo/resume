import React, { useMemo } from "react";
import { motion } from "framer-motion";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const particles = useMemo(() => {
    const count = particleDensity || 100;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
  }, [particleDensity, minSize, maxSize]);

  return (
    <div className={className} id={id}>
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particleColor || "#FFF",
              borderRadius: "50%",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
