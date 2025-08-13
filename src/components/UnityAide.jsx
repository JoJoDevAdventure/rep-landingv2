"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
// import arrow1 from "../../public/arrows/arrow1.json";
// import arrow2 from "../../public/arrows/arrow2.json";
// import arrow3 from "../../public/arrows/arrow3.json";
// import arrow4 from "../../public/arrows/arrow4.json";
// import arrow5 from "../../public/arrows/arrow5.json";
// import arrow6 from "../../public/arrows/arrow6.json";

// const arrows = [arrow1, arrow2, arrow3, arrow4, arrow5, arrow6];

const UnityAide = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="mt-8 relative w-full py-4 md:py-8 flex flex-col items-center overflow-hidden bg-white px-6 md:px-16 min-h-screen"
    >
      {/* Title */}
      <motion.h1
        className="text-2xl md:text-4xl font-light text-black text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        Your All-in-One Service Companion
      </motion.h1>

      {/* Iframe & Arrows */}
      <div className="relative h-full w-full max-w-[100%] md:max-w-[90%] mt-4 md:mt-12 z-10">
        {/* Background */}
        <motion.div
          className="absolute inset-0 bg-orange-100 rounded-lg opacity-50"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        />

        {/* Iframe */}
        <motion.div
          className="relative bg-white shadow-lg rounded-lg overflow-hidden w-full md:h-full z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/W-Nnobg1npc?si=xnFgwgoOmPKxbmtx"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
                        className="w-full h-[500px] md:h-[700px] rounded-lg border-p1 border-2 md:border-none shadow-lg"
          />
        </motion.div>
        {/* <Player src={arrow} autoplay={isInView} loop={false} className="w-24 h-24" /> */}
      </div>
      <div className="absolute flex top-0 left-0 md:left-24 right-0 md:right-24 bottom-44 bg-[url('/unity-bg.png')] bg-cover bg-center z-0 " />
    </section>
  );
};

export default UnityAide;
