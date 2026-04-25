import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "./utils/cn";

export const TracingBeam = ({ children, className, color = "#3b82f6" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-4 md:-left-20 top-3">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className=" ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0 V ${svgHeight * 0.8} l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="4"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0 V ${svgHeight * 0.8} l 18 24 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            style={{ filter: `drop-shadow(0 0 15px ${color})` }}
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor={color} stopOpacity="0"></stop>
              <stop stopColor={color}></stop>
              <stop stopColor={color}></stop>
              <stop stopColor={color} stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
