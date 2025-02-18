"use client";

import { motion, AnimatePresence } from "framer-motion";
import type React from "react";
import { useRef, useState } from "react";
import { Experience } from "../typings";
import { ChevronLeft, ChevronRight, Calendar, Building2 } from "lucide-react";
import { urlFor } from "../sanity";
import Image from "next/image";

type Props = {
  experiences: Experience[];
};

function Experience({ experiences }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = experiences.length;

  const getVisibleExperiences = () => {
    if (experiences.length === 1) {
      return [{ experience: experiences[0], position: 0 }];
    }

    if (experiences.length === 2) {
      return [
        { experience: experiences[currentPage], position: 0 },
        {
          experience: experiences[currentPage === 0 ? 1 : 0],
          position: currentPage === 0 ? 1 : -1,
        },
      ];
    }

    const positions = [-1, 0, 1];
    return positions.map((position) => {
      let index = currentPage + position;
      if (index < 0) index = experiences.length - 1;
      if (index >= experiences.length) index = 0;
      return { experience: experiences[index], position };
    });
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const pageIndicators = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen relative flex flex-col text-left max-w-full justify-center mx-auto items-center py-20 px-4"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="experience-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          <motion.path
            d="M100,0 Q80,0 80,20 Q100,20 100,0 Z"
            fill="url(#experience-gradient)"
            animate={{
              d: [
                "M100,0 Q80,0 80,20 Q100,20 100,0 Z",
                "M100,0 Q75,5 80,25 Q105,20 100,0 Z",
                "M100,0 Q80,0 80,20 Q100,20 100,0 Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 10,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M0,100 Q20,100 20,80 Q0,80 0,100 Z"
            fill="url(#experience-gradient)"
            animate={{
              d: [
                "M0,100 Q20,100 20,80 Q0,80 0,100 Z",
                "M0,100 Q25,95 20,75 Q-5,80 0,100 Z",
                "M0,100 Q20,100 20,80 Q0,80 0,100 Z",
              ],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 12,
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="url(#experience-gradient)"
            animate={{
              r: [8, 12, 8],
              cx: [50, 48, 50],
              cy: [50, 52, 50],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 8,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      <h3 className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">
        Experience
      </h3>

      <div className="w-full max-w-6xl mt-32">
        <div className="relative h-[400px] sm:h-[450px] flex items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            {getVisibleExperiences().map(({ experience, position }) => (
              <motion.div
                key={`${experience._id}-${position}`}
                initial={{
                  opacity: 0,
                  x: position * 200,
                  scale: 0.8,
                }}
                animate={{
                  opacity: position === 0 ? 1 : 0.7,
                  x: position * 110 + "%",
                  scale: position === 0 ? 1 : 0.8,
                  zIndex: position === 0 ? 10 : 0,
                }}
                exit={{
                  opacity: 0,
                  x: position * 200,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`absolute w-full max-w-lg ${
                  position === 0 ? "z-20" : "z-10"
                }`}
              >
                <div
                  className={`glass-card p-6 sm:p-8 rounded-xl mx-4 ${
                    position === 0 ? "ring-2 ring-primary-mint/20" : ""
                  }`}
                >
                  {/* Company Logo */}
                  <div className="relative group mb-6 flex justify-center items-center">
                    <div className="absolute w-28 h-28 bg-gradient-to-r from-primary-mint to-primary-blue rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                    <motion.img
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1.2 }}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto rounded-full bg-primary-dark p-2"
                      src={urlFor(experience?.companyImage).url()}
                      alt={experience?.company}
                    />
                  </div>

                  {/* Title and Company */}
                  <div className="text-center space-y-2 mb-4">
                    <h4 className="text-xl sm:text-2xl font-bold text-primary-mint">
                      {experience?.jobTitle}
                    </h4>
                    <div className="flex items-center justify-center gap-2 text-primary-mint/80">
                      <Building2 className="w-4 h-4" />
                      <p className="text-sm sm:text-base">
                        {experience?.company}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-primary-mint/70 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(experience.dateStarted).toLocaleDateString()}{" "}
                        -{" "}
                        {experience.isCurrentlyWorkingHere
                          ? "Present"
                          : new Date(experience.dateEnded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    {experience?.technologies.map((technology) => (
                      <div key={technology._id} className="relative group/tech">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition duration-300"></div>
                        <Image
                          className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary-dark p-1 transition-transform duration-300 group-hover/tech:scale-110"
                          src={
                            urlFor(technology.image).url() || "/placeholder.svg"
                          }
                          alt={technology.title}
                          width={24}
                          height={24}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Points */}
                  {position === 0 && (
                    <div className="max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-track-primary-dark/20 scrollbar-thumb-primary-mint/50 pr-2">
                      <ul className="space-y-2">
                        {experience?.points.map((point, index) => (
                          <li
                            key={index}
                            className="text-xs sm:text-sm text-primary-mint/80 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary-mint"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevPage}
              className="p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1" />
            </button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {pageIndicators.map((pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentPage(pageIndex)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentPage === pageIndex
                      ? "w-6 bg-primary-mint"
                      : "w-2 bg-primary-mint/30 hover:bg-primary-mint/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark group"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Experience;
