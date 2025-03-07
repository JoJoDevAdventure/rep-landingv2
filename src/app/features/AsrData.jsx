"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const dataPoints = [
  { label: "Consumer Data Points", value: 1, suffix: "Trillion+" },
  { label: "US-based Consumer Profiles", value: 280, suffix: "Million" },
  { label: "Accuracy on Contact Data", value: 95, suffix: "%" },
  { label: "Behaviors & URLs Scanned Weekly", value: 60, suffix: "Billion+" },
  { label: "Advertisers & Agencies Using Audiences", value: 1000, suffix: "+" },
  { label: "Verified B2B Emails", value: 629, suffix: "Billion+" },
  { label: "Consumer Emails with Deep Validation", value: 46, suffix: "Billion+" },
  { label: "Pre-Made Audiences Updating Daily", value: 26000, suffix: "+" },
];

const AsrData = () => {
  const [bgOpacity, setBgOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("asr-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much the section is visible
      let progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));

      // Adjust opacity based on scroll
      setBgOpacity(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="asr-section"
      className="py-12 md:py-24 text-black text-center transition-all duration-300"
      style={{
        backgroundColor: `rgba(248, 147, 31, ${bgOpacity*0.4})`, // Adjusts from transparent to full yellow
      }}
    >
      <div className="container">
        {/* Title Section */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          AI-Powered ASR: A Data-Driven Revolution
        </motion.h1>
        <p className="text-lg text-black/80 max-w-3xl mx-auto">
          Our cutting-edge <strong>ASR technology</strong> is backed by a <strong>massive dataset</strong>, ensuring unparalleled accuracy, targeting precision, and real-time insights that power the future of <strong>automated speech recognition</strong>.
        </p>

        {/* Animated Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12">
          {dataPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
                <CountUp end={point.value} duration={3} separator="," />
                {point.suffix}
              </h2>
              <p className="text-gray-800 text-sm mt-2 uppercase tracking-wider">
                {point.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AsrData;