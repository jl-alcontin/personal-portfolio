import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Skill from "./Skill"
import type { Skill as SkillType } from "../typings"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  skills: SkillType[]
}

function Skills({ skills }: Props) {
  const [itemsPerPage, setItemsPerPage] = useState(12) // Default to desktop value
  const [currentPage, setCurrentPage] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(6) // mobile
      else if (window.innerWidth < 1024) setItemsPerPage(9) // tablet
      else setItemsPerPage(12) // desktop
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isMounted) {
    return null // Return null on server-side and first client render
  }

  const totalPages = Math.ceil(skills.length / itemsPerPage)

  const getCurrentPageSkills = () => {
    const start = currentPage * itemsPerPage
    return skills.slice(start, start + itemsPerPage)
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const pageIndicators = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <div className="min-h-screen flex relative flex-col text-center md:text-left max-w-[2000px] xl:px-10 justify-center mx-auto items-center py-20">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,232,203,0.1),transparent_50%)]" />
      </div>

      <h3 className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">
        Tech Stack
      </h3>

      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-32">
        {/* Skills Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {getCurrentPageSkills().map((skill, index) => (
            <div
              key={skill._id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Skill skill={skill} directionLeft={index < itemsPerPage / 2} />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={prevPage}
              className="p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 
                       backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark 
                       disabled:opacity-50 disabled:cursor-not-allowed group"
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
              className="p-2 sm:p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 
                       backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark 
                       disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Skills