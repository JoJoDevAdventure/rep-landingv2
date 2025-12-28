"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { fadeUpVariants } from "./Animations";

const logos = [
  { src: "/att.png", alt: "AT&T" },
  { src: "/verizon.png", alt: "Verizon" },
  { src: "/comcast.png", alt: "Comcast" },
  { src: "/highlevel.svg", alt: "HighLevel" },
  { src: "/mariott.svg", alt: "Marriott" },
  { src: "/microsoft.svg", alt: "Microsoft" },
  { src: "/shopify.svg", alt: "shopify" },
  { src: "/meta.svg", alt: "meta" },
  { src: "/att.png", alt: "AT&T" },
  { src: "/verizon.png", alt: "Verizon" },
  { src: "/comcast.png", alt: "Comcast" },
  { src: "/highlevel.svg", alt: "HighLevel" },
  { src: "/mariott.svg", alt: "Marriott" },
  { src: "/microsoft.svg", alt: "Microsoft" },
  { src: "/shopify.svg", alt: "shopify" },
  { src: "/meta.svg", alt: "meta" },
];

const Partners = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: { repeat: Infinity, duration: 20, ease: "linear" },
    });
  }, [controls]);

  return (
    <section className="w-full py-10 bg-white text-center">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.9 }}
        variants={fadeUpVariants}
        className="font-klik text-base md:text-2xl mb-8 md:mb-16 text-gray-600 px-6 md:px-0 leading-relaxed"
      >
        Trusted by the most <span className="text-p1 font-semibold">forward looking</span> companies in the world
      </motion.h2>

      {/* Scrollable container with manual & auto scroll */}
      <div
        className="relative w-full overflow-x-scroll scrollbar-hide"
      >
        <motion.div
          className="flex space-x-10 md:space-x-20 justify-start items-center whitespace-nowrap"
          animate={controls}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={50}
              className="opacity-70 object-contain cursor-grab h-12 md:h-full"
              draggable="false"
              aria-hidden="true"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;