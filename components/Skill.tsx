import { motion } from "framer-motion";
import { urlFor } from "../sanity";
import { Skill } from "../typings";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  skill: Skill;
  directionLeft?: boolean;
};

function Skill({ skill, directionLeft }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side and first client render
  }

  return (
    <div className="group relative flex cursor-pointer">
      <motion.div
        initial={{
          x: directionLeft ? -50 : 50,
          opacity: 0,
        }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative flex items-center justify-center rounded-xl border border-primary-mint/20 
                   bg-primary-dark/30 backdrop-blur-sm overflow-hidden p-4 transition-all duration-300
                   group-hover:border-primary-mint/50 group-hover:bg-primary-dark/50 w-full h-full"
      >
        {/* Background Glow Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-mint/10 to-primary-blue/10 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Skill Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 xl:w-24 xl:h-24 transition-all duration-300">
          <Image
            src={urlFor(skill?.image).url() || "/placeholder.svg"}
            alt={skill.title}
            className="object-contain w-full h-full p-2 transition-all duration-300 
                     group-hover:blur-sm group-hover:scale-110 rounded-xl"
            width={500}
            height={500}
          />
          {/* Hover Overlay with Title */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm sm:text-base font-medium text-primary-mint text-center bg-primary-dark/80 px-3 py-1 rounded-lg backdrop-blur-sm">
              {skill.title}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Skill;
