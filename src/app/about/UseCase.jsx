'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const useCases = [
  {
    emoji: "💸",
    title: "Sales",
    description: "Close deals faster than a speeding bullet",
  },
  {
    emoji: "👩‍🏫",
    title: "Training Staff",
    description: "Enhance human abilities through AI",
  },
  {
    emoji: "👨‍💻",
    title: "Customer Support",
    description: "Provide fastest help possible",
  },
  {
    emoji: "👥",
    title: "Recruiting",
    description: "Automated Outreach & Screening",
  },
  {
    emoji: "📈",
    title: "Marketing",
    description: "Boost Engagement & Conversions",
  },
  {
    emoji: "🧐",
    title: "Lead Qualification",
    description: "Separate wheat from the chaff effortlessly",
  },
];

const UseCase = () => {
  // Ref for the section and useInView to check visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section ref={sectionRef} className="container mx-auto py-16 text-center">
      {/* Caption and Heading */}
      <div className="text-center mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-p1"
        >
          Use Cases
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="h3 mb-0 text-s1"
        >
          Where Can You Use Our AI? 🌐
        </motion.h1>
      </div>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((caseItem, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 border-2 border-p1 rounded-3xl bg-p1/20 shadow-lg transition-all duration-500 hover:bg-p1/50 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          >
            <div className="text-6xl mb-4">{caseItem.emoji}</div>
            <h2 className="h4 mb-2 text-center">{caseItem.title}</h2>
            <p className="body-2 text-center">{caseItem.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UseCase;
