"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { urlFor } from "../sanity";
import type { Project } from "../typings";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";

type Props = {
  projects: Project[];
};

function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const getVisibleProjects = () => {
    if (projects.length === 1) {
      return [{ project: projects[0], position: 0 }];
    }

    if (projects.length === 2) {
      return [
        { project: projects[currentIndex], position: 0 },
        {
          project: projects[currentIndex === 0 ? 1 : 0],
          position: currentIndex === 0 ? 1 : -1,
        },
      ];
    }

    const positions = [-1, 0, 1];
    return positions.map((position) => {
      let index = currentIndex + position;
      if (index < 0) index = projects.length - 1;
      if (index >= projects.length) index = 0;
      return { project: projects[index], position };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
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
              id="projects-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          {/* Top-right shape */}
          <motion.path
            d="M100,0 Q80,0 80,20 Q100,20 100,0 Z"
            fill="url(#projects-gradient)"
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

          {/* Bottom-left shape */}
          <motion.path
            d="M0,100 Q20,100 20,80 Q0,80 0,100 Z"
            fill="url(#projects-gradient)"
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

          {/* Middle shape */}
          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="url(#projects-gradient)"
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
        Projects
      </h3>

      <div className="relative w-full flex justify-center items-start mt-32 sm:mt-20">
        {projects.length > 1 && (
          <button
            onClick={prevProject}
            className="absolute left-2 sm:left-10 z-30 p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 
                     backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark 
                     disabled:opacity-50 disabled:cursor-not-allowed top-1/2 -translate-y-1/2"
            disabled={projects.length <= 1}
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        )}

        <div className="relative w-full max-w-7xl h-[600px] flex items-start justify-center px-8 sm:px-16">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {getVisibleProjects().map(({ project, position }) => (
              <motion.div
                key={`${project._id}-${position}`}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 1000 : -1000,
                  scale: 0.8,
                }}
                animate={{
                  opacity: position === 0 ? 1 : 0.7,
                  x: `${position * 110}%`,
                  scale: position === 0 ? 1 : 0.8,
                  zIndex: position === 0 ? 10 : 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -1000 : 1000,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`absolute w-full max-w-2xl ${
                  position === 0 ? "z-20" : "z-10"
                }`}
              >
                <div
                  className={`glass-card mt-20 p-8 rounded-xl mx-4 ${
                    position === 0 ? "ring-2 ring-primary-mint/20" : ""
                  }`}
                >
                  <motion.img
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="w-40 h-44 sm:w-64 md:w-72 object-contain mx-auto"
                    src={urlFor(project?.image).url()}
                    alt={project?.title}
                  />
                  <h4 className="text-2xl md:text-4xl font-semibold text-center my-4">
                    <span className="text-primary-mint">
                      Project {currentIndex + 1} of {projects.length}:
                    </span>{" "}
                    {project?.title}
                  </h4>
                  <div className="flex items-center space-x-4 justify-center my-4">
                    {project?.technologies.map((technology) => (
                      <div key={technology._id} className="relative group/tech">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition duration-300"></div>
                        <Image
                          className="relative w-10 h-10 rounded-full bg-primary-dark p-1 transition-transform duration-300 group-hover/tech:scale-110"
                          src={
                            urlFor(technology.image).url() || "/placeholder.svg"
                          }
                          alt={technology.title}
                          width={40}
                          height={40}
                        />
                      </div>
                    ))}
                  </div>
                  {position === 0 && (
                    <>
                      <p className="text-sm sm:text-base md:text-lg text-center text-primary-mint/80 mb-6">
                        {project?.summary}
                      </p>
                      {project?.linkToBuild && (
                        <div className="flex justify-center">
                          <a
                            href={project.linkToBuild}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary-dark/60 
                                     text-primary-mint border border-primary-mint/30 rounded-lg overflow-hidden
                                     transition-all duration-300 hover:border-primary-mint/60"
                          >
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-primary-mint/20 via-primary-blue/20 to-primary-mint/20 
                                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            ></div>
                            <span className="relative font-medium">
                              View Project
                            </span>
                            <ExternalLink className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            <div
                              className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-mint/60 to-primary-blue/60 
                                          scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            ></div>
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {projects.length > 1 && (
          <button
            onClick={nextProject}
            className="absolute right-2 sm:right-10 z-30 p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 
                     backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark 
                     disabled:opacity-50 disabled:cursor-not-allowed top-1/2 -translate-y-1/2"
            disabled={projects.length <= 1}
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {projects.length > 1 && (
        <div className="absolute bottom-24 flex space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary-mint w-6"
                  : "bg-primary-mint/30 hover:bg-primary-mint/50"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Projects;
