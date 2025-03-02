import React, { useEffect, useRef } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Link from "next/link";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";
import { motion, useAnimation, useInView } from "framer-motion";
import { Briefcase, Code, Layers, User } from "lucide-react";

type Props = {
  pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [text] = useTypewriter({
    words: [
      `Hi, I'm ${pageInfo?.name}`,
      "I Create Digital Experiences",
      "< Innovation Through Code />",
      "Let's Build Something Amazing",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6 order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-1 rounded-full bg-primary-mint/10 border border-primary-mint/30 text-primary-mint text-sm font-medium"
            >
              {pageInfo?.role || "Full Stack Developer"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            >
              <span className="bg-gradient-to-r from-primary-mint via-primary-blue to-primary-mint bg-clip-text text-transparent bg-300% animate-gradient">
                {text}
              </span>
              <Cursor cursorColor="#8BE8CB" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-primary-mint/80 text-lg max-w-lg"
            >
              {(() => {
                const backgroundInformation =
                  pageInfo?.backgroundInformation || "";
                const firstSentence =
                  backgroundInformation.split(". ")[0] + ".";
                return firstSentence;
              })()}
            </motion.p>

            {/* CTA buttons */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="#projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-primary-mint text-primary-dark font-medium rounded-lg flex items-center gap-2 hover:shadow-[0_0_20px_rgba(139,232,203,0.3)] transition-all duration-300"
                >
                  View My Work
                </motion.button>
              </Link>
            </motion.div> */}

            {/* Navigation links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {[
                { icon: User, text: "About", href: "#about" },
                { icon: Briefcase, text: "Experience", href: "#experience" },
                { icon: Code, text: "Skills", href: "#skills" },
                { icon: Layers, text: "Projects", href: "#projects" },
              ].map((item, index) => (
                <Link href={item.href} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-dark/60 border border-primary-mint/20 rounded-lg text-primary-mint/90 hover:bg-primary-mint/10 hover:border-primary-mint/40 hover:text-primary-mint transition-all duration-300 cursor-pointer"
                  >
                    <item.icon size={16} />
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px]">
              {/* Rotating circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-mint/80"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-blue/80"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-purple/80"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-mauve/80"></div>
                <div className="absolute inset-0 border-[1px] border-dashed border-primary-mint/30 rounded-full"></div>
              </motion.div>

              {/* Inner rotating circle */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[15%]"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-mint/60"></div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-blue/60"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary-purple/60"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-mauve/60"></div>
                <div className="absolute inset-0 border-[1px] border-dashed border-primary-mint/20 rounded-full"></div>
              </motion.div>

              {/* Center element */}
              <div className="absolute inset-[30%] bg-primary-mint/10 backdrop-blur-md rounded-full border border-primary-mint/30 flex items-center justify-center">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px 0px rgba(139,232,203,0.3)",
                      "0 0 40px 10px rgba(139,232,203,0.5)",
                      "0 0 20px 0px rgba(139,232,203,0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-[60%] h-[60%] rounded-full bg-gradient-to-br from-primary-mint to-primary-blue flex items-center justify-center text-primary-dark font-bold text-4xl"
                >
                  {pageInfo?.name?.charAt(0) || "J"}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
