'use client';

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const images = [
  { src: "/image1.png", width: 1400, height: 800 },
  { src: "/image2.png", width: 1000, height: 500 },
  { src: "/image3.png", width: 1000, height: 350 },
  { src: "/image4.png", width: 1200, height: 280 },
];

const Hero = () => {
  const controls = useAnimation();
  const scrollRef = useRef(null);

  const startScrolling = (direction) => {
    controls.start({ x: direction === "left" ? "-100%" : "100%" });
  };

  const stopScrolling = () => {
    controls.stop();
  };

  useEffect(() => {
    startScrolling("left");
  });

  return (
    <section className="relative w-full h-[95vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-100 to-orange-100 pt-22 md:pt-12">
      <div className="w-full flex flex-col md:flex-row justify-between align-top px-6 md:px-16 lg:px-40">
        <motion.div
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-[65%]"
        >
          <h1 className="md:h1 font-klik font-regular text-left text-3xl md:text-5xl lg:text-6xl leading-normal">
            Connecting Humanity <br /> <span className="mt-4"> Through Meaningful</span> <br />
            <motion.span
              className="text-p1 text-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {["A", "I", " ", "C", "o", "n", "v", "e", "r", "s", "a", "t", "i", "o", "n", "s"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05, delay: 1 + index * 0.1 }}
                  className="inline-block"
                >
                  {letter === " " ? <span>&nbsp;</span> : letter}
                </motion.span>
              ))}
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col text-left justify-start gap-4 mt-2 md:mt-8 w-full md:w-auto align-top"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 text-sm md:text-xl text-gray-700"
          >
            Fewer human hours spent on sales tasks. <br />
            Same
            <span className="text-p1"> humanity</span> in the sales
            process.
          </motion.p>
          <div className="flex flex-row gap-4 w-full m-0">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="bg-p1 text-white border-p1 border hover:bg-orange-500 transition-all duration-300 px-2 md:px-6 py-3 rounded-lg w-full md:w-auto text-[12px] md:text-[18px]"
            >
              Schedule Demo
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="bg-transparent text-s1 px-2 md:px-6 py-3 rounded-lg w-full border hover:bg-p1/20 border-p1 transition-all duration-300 md:w-auto text-[12px] md:text-[18px]"
            >
              Learn more
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Images */}
      <motion.div
        className="relative mt-4 md:mt-20 w-full overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <motion.div
          className="hidden space-x-4 align-center h-auto flex-row items-center justify-center md:flex"
          animate={{ x: ['-20%', '30%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>

          {images.concat(images).map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt="AI Conversation"
              width={img.width}
              height={img.height}
              className="rounded-lg h-auto w-auto max-w-full md:max-w-none"
            />
          ))}
        </motion.div>
        <motion.div
          className="flex space-x-4 align-center h-auto flex-row items-center justify-end md:hidden"
          animate={{ x: ['20%', '400%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>

          {images.concat(images).map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt="AI Conversation"
              width={img.width}
              height={img.height}
              className="rounded-lg h-auto w-auto max-w-full md:max-w-none"
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
