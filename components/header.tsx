import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Social } from "../typings";

type Props = {
  socials: Social[];
};

export default function Header({ socials }: Props) {
  return (
    <header className="sticky top-0 p-5 z-20">
      <nav className="glass-card rounded-2xl max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Social Icons */}
          <motion.div
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="flex items-center space-x-4"
          >
            {socials.map((social) => (
              <motion.div
                key={social._id}
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint to-primary-blue rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <SocialIcon
                  url={social.url}
                  fgColor="#8BE8CB"
                  bgColor="transparent"
                  className="relative"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Button */}
          <Link href="#contact">
            <motion.div
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 100 }}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint to-primary-blue rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <SocialIcon
                  network="email"
                  fgColor="#8BE8CB"
                  bgColor="transparent"
                  className="relative"
                />
              </div>
              <motion.p
                className="hidden md:inline-flex text-primary-mint font-semibold tracking-wider uppercase text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative">
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-mint transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  Get in Touch
                </span>
              </motion.p>
            </motion.div>
          </Link>
        </div>
      </nav>
    </header>
  );
}