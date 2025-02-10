"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import aiGrowthAnimation from "../../public/ai-growth.json"; // Ensure correct path

const AIFuture = () => {
  const sectionRef = useRef(null);
  const lottieRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // **🟠 Play animation when section is visible**
  useEffect(() => {
    if (isInView && lottieRef.current) {
      lottieRef.current.play();
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 md:py-32 flex flex-col-reverse md:flex-row items-center justify-between px-6 container"
    >
      {/* Background Rectangles */}
      <motion.div
        className="absolute top-0 md:top-22 left-2 md:-left-12 right-12 md:right-32 h-[90%] md:h-[341px] bg-[#FEEFE1] rounded-2xl scale-95 bg-opacity-60"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-12 md:top-40 left-12 md:left-14 right-2 md:-right-12 h-[90%] md:h-[340px] bg-[#FEEFE1] rounded-2xl scale-95 bg-opacity-50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Left Content */}
      <motion.div
        className="relative z-10 w-full md:w-[40%] text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          The Future is AI Driven
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          By <strong>2028</strong>, AI is expected to{" "}
          <strong>handle 60% of sales</strong> tasks. In 2023, it handled 45%.
          We mixed a smart computer brain with an empathetic conversationalist,
          so you can be at the forefront of sales efficiency and effectiveness.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-p1 text-white rounded-lg px-3 md:px-6 py-2 md:py-3 text-[14px] md:text-[18px]">
            Get a demo
          </button>
          <button className="border border-p1 text-p1 px-3 md:px-6 py-2 md:py-3 text-[14px] md:text-[18px] rounded-lg">
            Contact
          </button>
        </div>
      </motion.div>

      {/* Right Side: Lottie Chart Animation */}
      <motion.div
        className="relative w-full md:w-auto flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="w-72 md:w-96 bg-orange-100 p-4 rounded-xl">
          <Player
            ref={lottieRef}
            autoplay={false} // Set to false initially
            keepLastFrame={true} // Keeps the last frame instead of resetting
            loop={false}
            src={aiGrowthAnimation}
            className="w-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default AIFuture;