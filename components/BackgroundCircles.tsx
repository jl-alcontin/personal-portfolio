import React from "react";
import { motion } from "framer-motion";

export default function BackgroundCircles() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{ duration: 5, repeat: Infinity }}
      className="relative flex justify-center items-center"
    >
      {/* Animated gradient circles */}
      <div className="absolute w-[200px] h-[200px] animate-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-mint/20 to-primary-blue/20 blur-lg transform rotate-45"></div>
      </div>
      <div className="absolute w-[300px] h-[300px] animate-pulse delay-75">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue/15 to-primary-purple/15 blur-lg transform -rotate-45"></div>
      </div>
      <div className="absolute w-[500px] h-[500px] animate-pulse delay-150">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-purple/10 to-primary-mauve/10 blur-lg transform rotate-90"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-mint rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary-blue rounded-full animate-ping delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary-purple rounded-full animate-ping delay-700"></div>
      </div>
    </motion.div>
  );
}
