"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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

  useRef (() => { 
    startScrolling("left")
  })

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-100 to-orange-100">
      <div className="w-full flex justify-between px-36 align-top">
        <div className="w-[65%]">
          <h1 className="h1 font-bold text-left">
            Connecting Humanity <br /> Through Meaningful <br />
            <span className="text-orange-500">AI Conversations</span>
          </h1>
        </div>

        <div className="flex flex-col justify-center space-x-4 align-top gap-3">
          <p className="mt-4 text-lg text-gray-700">
            Fewer human hours spent on sales tasks. Same{" "}
            <span className="text-orange-500">humanity</span> in the sales
            process.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
              Schedule Demo
            </button>
            <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling Images */}
      <div
        className="relative mt-12 w-full overflow-hidden"
        ref={scrollRef}
      >
        <motion.div
          className="flex space-x-4 align-center h-auto align-middle flex-row"
          animate={controls}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {images.concat(images).map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt="AI Conversation"
              width={img.width}
              height={img.height}
              className="rounded-lg object-center h-full w-full"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
