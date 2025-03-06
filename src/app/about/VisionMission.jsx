'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const coreSections = [
  {
    title: "Our Mission",
    description:
      "Empowering meaningful interactions across all communication channels using our personalized & contextually coherent Agentic AIDE to enhance Human²AI experiences for win-win-WIN engagements.",
    imgSrc: "/mission.png",
  },
  {
    title: "Our Vision",
    description:
      "To be the leader in personalized Human²AI interactions, enabling mass collaboration for spiritual engagements that transforms communication for all.",
    imgSrc: "/vision.png",
  },
  {
    title: "Our Purpose",
    description:
      "Empowering meaningful interactions across all communication channels using our personalized & contextually coherent Agentic AIDE to enhance Human²AI experiences.",
    imgSrc: "/purpose.png",
  },
  {
    title: "Our Focus",
    description:
      "To be the leader in personalized Human²AI interactions, enabling mass collaboration for sustainable, positive relationships.",
    imgSrc: "/focus.png",
  },
];

const VisionMission = () => {
     // Ref for the section and useInView to check visibility
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { once: false });

  return (
    <div ref={sectionRef} className="flex flex-col gap-8">
      {/* Heading with fade-up effect */}
      <motion.h1
        className="h4 text-s1 text-center max-md:h6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        🔐 Unlock Your Business's Potential w/ our AI! 🚀
      </motion.h1>

      {/* Grid container for Vision, Mission, Purpose, Focus sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {coreSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: index < 2 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="border border-s3 rounded-xl px-6 pb-12 max-md:py-4 max-md:text-center"
          >
            <div className="w-full flex justify-start items-start max-md:justify-center">
              <div className="mb-2 flex items-center gap-4">
                <div className="hidden md:flex -ml-3 flex-col items-center">
                  <div className="w-0.5 h-8 bg-s3" />
                  <img
                    src={section.imgSrc}
                    className="w-20 h-auto rounded-full"
                    alt={section.title}
                  />
                </div>
                <h2 className="mt-8 max-md:mt-0 h3 max-md:h5 text-s1 max-md:text-center">{section.title}</h2>
              </div>
            </div>
            <p className="body-1 max-md:body-3">{section.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VisionMission;