"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUpVariants } from "./Animations";

const logos = [
  { src: "/att.png", alt: "AT&T" },
  { src: "/verizon.png", alt: "Verizon" },
  { src: "/comcast.png", alt: "Comcast" },
  { src: "/highlevel.svg", alt: "highlevel" },
  { src: "/mariott.svg", alt: "Mariott" },
  { src: "/microsoft.svg", alt: "Microsoft" },
  { src: "/att.png", alt: "AT&T" },
  { src: "/verizon.png", alt: "Verizon" },
  { src: "/comcast.png", alt: "Comcast" },
  { src: "/highlevel.svg", alt: "highlevel" },
  { src: "/mariott.svg", alt: "Mariott" },
  { src: "/microsoft.svg", alt: "Microsoft" },
];

const Partners = () => {
  return (
    <section className="w-full py-10 bg-white text-center overflow-hidden">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.9 }}
        variants={fadeUpVariants} // Apply fade from left to right for title
        className="font-klik text-l md:text-2xl mb-8 md:mb-16 text-gray-500"
      >
        Trusted by the biggest companies in the world
      </motion.h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.8 }}
        variants={fadeUpVariants} // Apply fade from left to right for title
        className="relative w-full overflow-hidden"
      >
        <motion.div
          className="hidden md:flex space-x-20 justify-end align-middle items-center"
          animate={{ x: ["20%", "0%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={50}
              className="opacity-70 object-contain"
            />
          ))}
        </motion.div>

        <motion.div
          className="flex space-x-10 justify-end align-middle items-center md:hidden"
          animate={{ x: ["200%", "-200%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={50}
              className="opacity-70 object-contain"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Partners;
