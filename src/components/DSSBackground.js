import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, animate, useMotionValue } from "framer-motion";
import { cn } from "./utils/cn";

export const DSSBackground = ({ className, theme }) => {
  const containerRef = useRef(null);
  const primaryColor = theme?.accent || "#3b82f6";
  const gridColor = theme?.grid || "rgba(59, 130, 246, 0.3)";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // MotionValues for the Volumetric Scan
  const scanZ = useMotionValue(1000);
  const scanOpacity = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  const tunnelSize = 1000; // Perfect square to prevent wall intersection
  const tunnelDepth = 4000; 

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    let currentAnimZ;
    let currentAnimOpacity;

    const triggerScan = () => {
      if (currentAnimZ) currentAnimZ.stop();
      if (currentAnimOpacity) currentAnimOpacity.stop();

      // Start the scan from near the camera and push it deep into the tunnel
      scanZ.set(800); 
      scanOpacity.set(1);
      
      currentAnimZ = animate(scanZ, -tunnelDepth / 2, {
        duration: 3,
        ease: "linear",
      });

      currentAnimOpacity = animate(scanOpacity, 0, {
        duration: 3,
        ease: "easeIn",
        delay: 0.5
      });
    };

    // Auto-loop the scan every 4 seconds
    const interval = setInterval(triggerScan, 4000);
    triggerScan(); // Trigger immediately on mount

    const handleClick = () => {
      // Force trigger scan on mouse click
      triggerScan();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
      if (currentAnimZ) currentAnimZ.stop();
      if (currentAnimOpacity) currentAnimOpacity.stop();
    };
  }, [mouseX, mouseY, scanZ, scanOpacity, tunnelDepth]);

  // Subtle parallax
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  
  const lightX = useTransform(springX, [-0.5, 0.5], ["20vw", "80vw"]);
  const lightY = useTransform(springY, [-0.5, 0.5], ["20vh", "80vh"]);

  return (
    <div ref={containerRef} className={cn("fixed inset-0 z-0 overflow-hidden bg-black", className)}>
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ perspective: "600px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* CEILING */}
          <div className="absolute top-1/2 left-1/2" style={{
            width: tunnelSize,
            height: tunnelDepth,
            transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${tunnelSize / 2}px)`,
            backgroundImage: `linear-gradient(to right, ${gridColor} 2px, transparent 2px), linear-gradient(to bottom, ${gridColor} 2px, transparent 2px)`,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
          }} />

          {/* FLOOR */}
          <div className="absolute top-1/2 left-1/2" style={{
            width: tunnelSize,
            height: tunnelDepth,
            transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${tunnelSize / 2}px)`,
            backgroundImage: `linear-gradient(to right, ${gridColor} 2px, transparent 2px), linear-gradient(to bottom, ${gridColor} 2px, transparent 2px)`,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to bottom, black 10%, transparent 90%)',
          }} />

          {/* LEFT WALL */}
          <div className="absolute top-1/2 left-1/2" style={{
            width: tunnelDepth,
            height: tunnelSize,
            transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${tunnelSize / 2}px)`,
            backgroundImage: `linear-gradient(to right, ${gridColor} 2px, transparent 2px), linear-gradient(to bottom, ${gridColor} 2px, transparent 2px)`,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to right, black 10%, transparent 90%)',
          }} />

          {/* RIGHT WALL */}
          <div className="absolute top-1/2 left-1/2" style={{
            width: tunnelDepth,
            height: tunnelSize,
            transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${tunnelSize / 2}px)`,
            backgroundImage: `linear-gradient(to right, ${gridColor} 2px, transparent 2px), linear-gradient(to bottom, ${gridColor} 2px, transparent 2px)`,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to left, black 10%, transparent 90%)',
          }} />

          {/* BACK WALL (To hide the sharp cut off) */}
          <div className="absolute top-1/2 left-1/2 bg-black" style={{
            width: tunnelSize,
            height: tunnelSize,
            transform: `translate(-50%, -50%) translateZ(-${tunnelDepth / 2}px)`,
            boxShadow: "0 0 150px 150px black",
          }} />

          {/* VOLUMETRIC SCAN SLICE */}
          <motion.div
            style={{
              width: tunnelSize,
              height: tunnelSize,
              border: `6px solid ${primaryColor}`,
              boxShadow: `0 0 80px ${primaryColor}, inset 0 0 80px ${primaryColor}`,
              z: scanZ,
              opacity: scanOpacity,
              position: "absolute",
              pointerEvents: "none"
            }}
          >
            <div className="w-full h-full opacity-10" style={{ backgroundColor: primaryColor }} />
          </motion.div>

          {/* Static Depth Frames for better perspective reading */}
          {[0, 1000, 2000].map((d) => (
            <div 
              key={d}
              className="absolute border border-white/10"
              style={{
                width: tunnelSize,
                height: tunnelSize,
                transform: `translateZ(-${d}px)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Atmospheric Fog (Vignette) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />
      
      {/* Light following mouse cursor */}
      <motion.div 
        className="absolute pointer-events-none"
        style={{
          left: lightX,
          top: lightY,
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 60%)`,
          x: "-50%",
          y: "-50%",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
};