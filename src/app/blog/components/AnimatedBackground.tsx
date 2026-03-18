"use client";

import { motion } from "framer-motion";

const blobs = [
  { top: "10%", left: "15%" },
  { top: "25%", left: "70%" },
  { top: "60%", left: "20%" },
  { top: "75%", left: "80%" },
  { top: "40%", left: "50%" },
  { top: "85%", left: "35%" },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-[500px] h-[500px] rounded-full blur-3xl will-change-transform ${
            i % 2 === 0 ? "bg-purple-600/30" : "bg-purple-900/20"
          }`}
          style={pos}
          animate={{
            x: [0, 120, -80, 60, 0],
            y: [0, -100, 60, -40, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 25 + i * 4,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );
}