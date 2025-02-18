import React, { useEffect, useRef } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Link from "next/link";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";
import { motion, useAnimation, useInView } from "framer-motion";

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
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative flex flex-col items-center px-4 space-y-12 mt-24"
      >
        {/* Animated Profile Section */}
        <motion.div
          variants={itemVariants}
          className="relative group perspective-1000"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-mint via-primary-blue to-primary-purple rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
          <motion.div
            className="relative hexagon-container"
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hexagon-front">
              <motion.img
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                dragElastic={0.1}
                src={urlFor(pageInfo?.heroImage).url()}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
            <div className="hexagon-back">
              <div className="flex flex-col items-center justify-center h-full text-primary-mint p-4">
                <p className="text-sm font-medium text-center">
                  {pageInfo?.backgroundInformation?.slice(0, 100)}...
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dynamic Text Content */}
        <motion.div variants={itemVariants} className="mt-8 text-center space-y-6">
          <motion.h2
            className="text-lg uppercase text-[#B4F4E3] tracking-[15px] font-semibold drop-shadow-[0_0_12px_rgba(139,232,203,0.5)]"
            whileHover={{ letterSpacing: "20px" }}
            transition={{ duration: 0.3 }}
          >
            {pageInfo?.role}
          </motion.h2>
          <h1 className="text-5xl lg:text-7xl font-bold px-10">
            <span className="mr-3 bg-gradient-to-r from-[#B4F4E3] via-[#8BE8CB] to-[#7EA2AA] text-transparent bg-clip-text bg-300% animate-gradient drop-shadow-[0_0_15px_rgba(139,232,203,0.6)]">
              {text}
            </span>
            <Cursor cursorColor="#B4F4E3" />
          </h1>
        </motion.div>

        {/* Interactive CTA Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { href: "#about", text: "About", icon: "👋" },
            { href: "#experience", text: "Experience", icon: "💼" },
            { href: "#skills", text: "Skills", icon: "⚡" },
            { href: "#projects", text: "Projects", icon: "🚀" },
          ].map((item) => (
            <Link href={item.href} key={item.text}>
              <motion.button
                className="heroButton group relative overflow-hidden bg-[#303633]/40 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#B4F4E3] to-[#7EA2AA] opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-2">
                  <span className="hidden md:inline">{item.icon}</span>
                  {item.text}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#B4F4E3] to-[#7EA2AA] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </motion.button>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}