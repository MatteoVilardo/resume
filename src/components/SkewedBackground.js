import React from "react";
import { motion } from "framer-motion";
import { cn } from "./utils/cn";

export const SkewedBackground = ({ className }) => {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-black overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] grid grid-cols-6 md:grid-cols-12 gap-4 skew-y-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{
                duration: Math.random() * 5 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="h-32 bg-slate-900/40 rounded-lg border border-slate-800/30"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-1" />
    </div>
  );
};
