import { motion } from "framer-motion"
import { urlFor } from "../sanity"
import type { Experience } from "../typings"
import { Calendar, LinkIcon } from "lucide-react"
import Image from "next/image"

type Props = {
  experience: Experience
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col rounded-2xl items-center flex-shrink-0 w-[380px] sm:w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-gradient-to-b from-primary-dark/95 to-primary-dark/80 p-8 backdrop-blur-sm border border-primary-mint/10 group"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary-mint/50 to-transparent" />
        <div className="absolute top-0 right-0 w-[1px] h-1/2 bg-gradient-to-b from-primary-mint/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-[1px] bg-gradient-to-l from-transparent via-primary-mint/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[1px] h-1/2 bg-gradient-to-t from-primary-mint/50 to-transparent" />
      </div>

      {/* Company Logo */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="relative group-hover:scale-110 transition-transform duration-300">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint to-primary-blue rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
          <Image
            src={urlFor(experience?.companyImage).url() || "/placeholder.svg"}
            alt={experience?.company}
            className="relative w-24 h-24 rounded-full xl:w-[140px] xl:h-[140px] object-cover object-center bg-primary-dark p-1"
            width={96}
            height={96}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-0 md:px-10 w-full mt-8 relative z-10">
        {/* Title and Company */}
        <div className="text-center space-y-2">
          <h4 className="text-2xl md:text-4xl font-bold text-primary-mint">{experience.jobTitle}</h4>
          <p className="text-xl text-primary-blue font-medium">{experience.company}</p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-3 my-6 justify-center">
          {experience.technologies.map((technology) => (
            <div key={technology._id} className="relative group/tech">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-full blur opacity-0 group-hover/tech:opacity-100 transition duration-300"></div>
              <Image
                className="relative w-10 h-10 rounded-full bg-primary-dark p-1 transition-transform duration-300 group-hover/tech:scale-110"
                src={urlFor(technology.image).url() || "/placeholder.svg"}
                alt={technology.title || "Technology"}
                width={40}
                height={40}
              />
            </div>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center justify-center gap-2 text-primary-mint/70 text-sm mb-6">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(experience.dateStarted).toDateString()} -{" "}
            {experience.isCurrentlyWorkingHere ? "Present" : new Date(experience.dateEnded).toDateString()}
          </span>
        </div>

        {/* Points */}
        <ul className="space-y-4 ml-5 text-sm md:text-base max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-primary-dark/20 scrollbar-thumb-primary-mint/50 pr-5">
          {experience.points.map((point, i) => (
            <li key={i} className="text-primary-mint/90 list-none flex items-start gap-3 group/point">
              <LinkIcon className="w-5 h-5 mt-1 flex-shrink-0 text-primary-mint/50 group-hover/point:text-primary-mint transition-colors duration-300" />
              <span className="group-hover/point:text-primary-mint transition-colors duration-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

