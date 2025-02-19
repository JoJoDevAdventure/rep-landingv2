"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUpVariants } from "./Animations";

const industries = [
  {
    index: 1,
    name: "Automotive",
    title: "Sell Smarter, Buy Faster with AI",
    description:
      "Revolutionizing vehicle sales with AI-driven smart listings, automated recommendations, and seamless transactions for both buyers and sellers.",
    link: "Learn more about Automotive ->",
    href: "https://auto.replicaide.com",
    image: "/auto.jpg",
    bgColor: "bg-purple-500",
    secondaryBgColor: "bg-purple-700",

    translateX1: "translate-x-10",
    translateY1: "translate-y-1",

    translateX2: "-translate-x-3",
    translateY2: "translate-y-8",

    scaleX1: "scale-x-125",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-100",
    scaleY2: "scale-y-75",
  },
  {
    index: 2,
    name: "Real Estate",
    title: "AI-Powered Property Management",
    description:
      "From smart property listings to intelligent market insights—AI simplifies real estate transactions, helping buyers and sellers make better decisions.",
    link: "Learn more about Real Estate ->",
    href: "https://property.replicaide.com",
    image: "/Property-UI.png",
    bgColor: "bg-yellow-500",
    secondaryBgColor: "bg-yellow-700",

    translateX1: "-translate-x-2",
    translateY1: "translate-y-32",

    translateX2: "-translate-x-3",
    translateY2: "-translate-y-16",

    scaleX1: "scale-x-25",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-100",
    scaleY2: "scale-y-100",
  },
  {
    index: 3,
    name: "E-Commerce",
    title: "Smarter Shopping, Personalized for You",
    description:
      "Enhancing online shopping with AI-driven recommendations, dynamic pricing, and optimized product listings—boosting engagement and sales.",
    link: "Learn more about E-Commerce ->",
    href: "https://list.replicaide.com",
    image: "/shopaideUI.jpg",
    bgColor: "bg-green-500",
    secondaryBgColor: "bg-green-700",

    translateX1: "translate-x-22",
    translateY1: "translate-y-32",

    translateX2: "translate-x-2",
    translateY2: "-translate-y-40",

    scaleX1: "scale-x-150",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-100",
    scaleY2: "scale-y-50",
  },
  {
    index: 4,
    name: "Hospitality & Travel",
    title: "AI-Driven Experiences for Travelers & Hosts",
    description:
      "From hotels to restaurants and travel bookings—AI optimizes operations, enhances guest experiences, and simplifies management.",
    link: "Learn more about Hospitality & Travel ->",
    href: "https://unity.replicaide.com",
    image: "/shopaideUI.jpg",

    bgColor: "bg-red-500",
    secondaryBgColor: "bg-red-700",

    translateX1: "translate-x-56",
    translateY1: "translate-y-36",

    translateX2: "-translate-x-56",
    translateY2: "-translate-y-22",

    scaleX1: "scale-x-25",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-50",
    scaleY2: "scale-y-25",
  },
  {
    index: 5,
    name: "Finance & Funding",
    title: "AI-Powered Financial Intelligence",
    description:
      "Optimizing investments, funding, and financial planning with AI-driven analytics, risk assessment, and smart automation.",
    link: "Learn more about Finance & Funding ->",
    href: "https://fund.replicaide.com",
    image: "/shopaideUI.jpg",
    bgColor: "bg-blue-500",
    secondaryBgColor: "bg-blue-700",
    
    translateX1: "-translate-x-2",
    translateY1: "-translate-y-5",
    translateX2: "translate-x-2",
    translateY2: "translate-y-2",
    scaleX1: "scale-x-2",
    scaleX2: "scale-x-2",
    scaleY1: "scale-y-2",
    scaleY2: "scale-y-2",
  },
];

const IndustriesSection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <section className="w-full py-20 flex flex-col items-center px-6 md:px-16 overflow-hidden">
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariants} // Apply fade from left to right for title
        className="text-4xl font-light text-black text-center"
      >
        Your Industry, Our Expertise
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {industries.map((industry) => (
          <motion.button
            key={industry.name}
            onClick={() => setSelectedIndustry(industry)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              selectedIndustry.name === industry.name
                ? "border border-orange-500 text-orange-500"
                : "bg-gray-200 text-gray-600"
            }`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeUpVariants} // Apply fade from left to right for title
            transition={{ delay: industry.index * 0.2 }}
          >
            {industry.name}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariants} // Apply fade from left to right for title
        className="flex flex-col-reverse md:flex-row w-full max-w-5xl mt-12 items-center gap-8"
      >
        {/* Text Content */}
        <motion.div
          key={selectedIndustry.name}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedIndustry.title}
          </h2>
          <p className="text-gray-700 mt-4">{selectedIndustry.description}</p>
          <a href={selectedIndustry.href} className="text-purple-500 mt-4 inline-block">
            {selectedIndustry.link}
          </a>
        </motion.div>

        {/* Image with Animated Background Rectangles */}
        <div className="relative w-full md:w-1/2 flex justify-center transition-all duration-1000">
          <motion.div
            className={`absolute -top-4 -left-4 w-72 h-56 rounded-lg transition-transform duration-1000 ${selectedIndustry.secondaryBgColor} ${selectedIndustry.translateX1} ${selectedIndustry.translateY1} ${selectedIndustry.scaleX1} ${selectedIndustry.scaleY1}`}
            layout // Enables Framer Motion's auto-layout animations
          ></motion.div>
          <motion.div
            className={`absolute top-12 -right-6 w-96 h-80 rounded-lg transition-transform duration-1000 ${selectedIndustry.bgColor} ${selectedIndustry.translateX2} ${selectedIndustry.translateY2} ${selectedIndustry.scaleX2} ${selectedIndustry.scaleY2}`}
            layout
          ></motion.div>
          <motion.img
            src={selectedIndustry.image}
            alt={selectedIndustry.name}
            className="relative z-10 rounded-lg shadow-lg w-full max-w-md"
            key={selectedIndustry.name + "-image"}
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default IndustriesSection;
