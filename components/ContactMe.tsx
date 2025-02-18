import React from "react";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactMe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const mailtoLink = `mailto:jesrel203alcontin@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=Hi, my name is ${encodeURIComponent(
      formData.name
    )}. %0D%0A%0D%0A${encodeURIComponent(
      formData.message
    )}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
    reset();
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      label: "Phone",
      value: "09454605338",
      animation: {
        y: [0, -5, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      icon: EnvelopeIcon,
      label: "Email",
      value: "jesrel203alcontin@gmail.com",
      animation: {
        y: [0, -5, 0],
        transition: { duration: 2, repeat: Infinity, delay: 0.3 },
      },
    },
    {
      icon: MapPinIcon,
      label: "Location",
      value: "Cogon Pardo Cebu City",
      animation: {
        y: [0, -5, 0],
        transition: { duration: 2, repeat: Infinity, delay: 0.6 },
      },
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(139,232,203,0.1),transparent_50%)]" />
      </div>

      <motion.h3
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold"
      >
        Contact
      </motion.h3>

      <div className="w-full max-w-7xl mx-auto mt-32 sm:mt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-6 sm:p-8 rounded-xl space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-mint">
                  Let&apos;s Connect
                </h4>
                <p className="text-primary-mint/80 text-base sm:text-lg">
                  Feel free to reach out. I&apos;m always open to discussing new
                  projects and opportunities.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 sm:space-x-6 group"
                  >
                    <div className="bg-primary-dark/60 p-3 sm:p-4 rounded-lg">
                      <info.icon className="text-primary-mint h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="text-primary-mint/60 text-sm">
                        {info.label}
                      </p>
                      <p className="text-primary-mint text-base sm:text-lg font-medium break-all">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card p-6 sm:p-8 rounded-xl space-y-4 sm:space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm text-primary-mint/80"
                  >
                    Your Name
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                    <input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="relative w-full bg-primary-dark/60 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-primary-mint placeholder-primary-mint/50
                               border border-primary-mint/20 focus:border-primary-mint/60 focus:ring-2 focus:ring-primary-mint/20
                               transition-all duration-300 text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm text-primary-mint/80"
                  >
                    Your Email
                  </label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="relative w-full bg-primary-dark/60 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-primary-mint placeholder-primary-mint/50
                               border border-primary-mint/20 focus:border-primary-mint/60 focus:ring-2 focus:ring-primary-mint/20
                               transition-all duration-300 text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm text-primary-mint/80"
                >
                  Subject
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                  <input
                    id="subject"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                    className="relative w-full bg-primary-dark/60 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-primary-mint placeholder-primary-mint/50
                             border border-primary-mint/20 focus:border-primary-mint/60 focus:ring-2 focus:ring-primary-mint/20
                             transition-all duration-300 text-sm sm:text-base"
                    placeholder="How can I help you?"
                  />
                </div>
                {errors.subject && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm text-primary-mint/80"
                >
                  Message
                </label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-mint/50 to-primary-blue/50 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                  <textarea
                    id="message"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    rows={4}
                    className="relative w-full bg-primary-dark/60 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-primary-mint placeholder-primary-mint/50
                             border border-primary-mint/20 focus:border-primary-mint/60 focus:ring-2 focus:ring-primary-mint/20
                             transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder="Your message here..."
                  />
                </div>
                {errors.message && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary-mint to-primary-blue 
                         px-6 sm:px-8 py-3 sm:py-4 text-primary-dark font-semibold text-sm sm:text-base transition-all duration-300 
                         hover:shadow-[0_0_20px_rgba(139,232,203,0.4)] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;