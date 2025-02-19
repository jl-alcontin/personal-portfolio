"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { PageInfo } from "../typings"
import { urlFor } from "../sanity"
import { GraduationCap, Briefcase, Code, Palette, ChevronRight } from "lucide-react"
import Image from "next/image"

type Props = {
  pageInfo: PageInfo
}

export default function About({ pageInfo }: Props) {
  const [activeSection, setActiveSection] = useState("Background")
  const [isHovered, setIsHovered] = useState(false)

  const sections = [
    {
      title: "Background",
      icon: GraduationCap,
      content: pageInfo?.backgroundInformation,
    },
    {
      title: "Experience",
      icon: Briefcase,
      content: pageInfo?.experienceInformation,
    },
    {
      title: "Technical",
      icon: Code,
      content: pageInfo.technicalInformation,
    },
    {
      title: "Creative",
      icon: Palette,
      content: pageInfo.creativeInformation,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative min-h-screen text-center md:text-left md:flex-row max-w-7xl px-4 sm:px-8 md:px-10 justify-evenly mx-auto items-center"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="shape-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          {/* Top-left shape */}
          <motion.path
            d="M0,0 Q20,0 20,20 Q0,20 0,0 Z"
            fill="url(#shape-gradient)"
            animate={{
              d: ["M0,0 Q20,0 20,20 Q0,20 0,0 Z", "M0,0 Q25,5 20,25 Q-5,20 0,0 Z", "M0,0 Q20,0 20,20 Q0,20 0,0 Z"],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
          />

          {/* Bottom-right shape */}
          <motion.path
            d="M100,100 Q80,100 80,80 Q100,80 100,100 Z"
            fill="url(#shape-gradient)"
            animate={{
              d: [
                "M100,100 Q80,100 80,80 Q100,80 100,100 Z",
                "M100,100 Q75,95 80,75 Q105,80 100,100 Z",
                "M100,100 Q80,100 80,80 Q100,80 100,100 Z",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 12, ease: "easeInOut" }}
          />

          {/* Middle shape */}
          <motion.circle
            cx="50"
            cy="50"
            r="10"
            fill="url(#shape-gradient)"
            animate={{
              r: [10, 15, 10],
              cx: [50, 52, 50],
              cy: [50, 48, 50],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <h3 className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">About</h3>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-32 sm:mt-20 md:mt-0 w-full max-w-6xl">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-shrink-0 md:w-[350px] md:h-[350px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="hexagon-container mx-auto">
            <motion.div
              className="hexagon-inner"
              animate={{ rotateY: isHovered ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hexagon-front">
                <Image
                  src={urlFor(pageInfo?.profilePic).url() || "/placeholder.svg"}
                  alt={pageInfo?.name}
                  className="object-cover w-full h-full"
                  width={500}
                  height={500}
                />
              </div>
              <div className="hexagon-back">
                <div className="flex flex-col items-center justify-center h-full text-primary-mint p-4">
                  <h4 className="text-lg sm:text-xl font-bold mb-2">{pageInfo?.name}</h4>
                  <p className="text-xs sm:text-sm text-center">{pageInfo?.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 w-full px-4 sm:px-6 md:px-0"
        >
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-mint">
            Here&apos;s a <span className="underline decoration-primary-blue/50">little</span> about me
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4">
            {sections.map((section) => (
              <motion.button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm ${
                  activeSection === section.title
                    ? "bg-primary-mint text-primary-dark"
                    : "bg-primary-dark/40 text-primary-mint"
                } hover:bg-primary-mint hover:text-primary-dark transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <section.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{section.title}</span>
              </motion.button>
            ))}
          </div>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-primary-mint/80 glass-card p-4 sm:p-6 rounded-lg min-h-[150px] relative overflow-hidden"
          >
            {sections.find((s) => s.title === activeSection)?.content}
            <motion.div
              className="absolute bottom-2 right-2 bg-primary-mint/20 rounded-full p-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <ChevronRight className="w-4 h-4 text-primary-mint" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}