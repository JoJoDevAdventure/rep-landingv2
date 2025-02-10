"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUpVariants } from "./Animations";

const industries = [
  {
    name: "Automotive",
    title: "AI-Powered Smart Listings for Faster Sales",
    description:
      "AI-powered auto listing made effortless—helping sellers list cars instantly and buyers find the perfect ride with smart recommendations.",
    link: "Learn more about Automotive ->",
    image: "/auto.jpg",
    bgColor: "bg-purple-500",
    textColor: "text-purple-700",
    secondaryBgColor: "bg-purple-700",

    translateX1: "translate-x-4",
    translateY1: "translate-y-1",

    translateX2: "-translate-x-1",
    translateY2: "translate-y-6",

    scaleX1: "scale-x-125",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-100",
    scaleY2: "scale-y-75",
  },
  {
    name: "Real-Estate",
    title: "AI-Driven Real Estate Solutions",
    description:
      "Optimize real estate transactions with AI, providing smarter insights for buyers and sellers.",
    link: "Learn more about Real-Estate ->",
    image: "/auto.jpg",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    secondaryBgColor: "bg-yellow-700",

    translateX1: "translate-x-1",
    translateY1: "translate-y-12",

    translateX2: "-translate-x-0",
    translateY2: "-translate-y-20",

    scaleX1: "scale-x-25",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-100",
    scaleY2: "scale-y-100",
  },
  {
    name: "Ecommerce",
    title: "AI-Powered Product Recommendations",
    description:
      "Boost sales with AI-powered product recommendations and personalized shopping experiences.",
    link: "Learn more about Ecommerce ->",
    image: "/auto.jpg",
    bgColor: "bg-blue-500",
    textColor: "text-blue-700",
    secondaryBgColor: "bg-blue-700",

    translateX1: "translate-x-28",
    translateY1: "translate-y-12",

    translateX2: "-translate-x-28",
    translateY2: "-translate-y-32",

    scaleX1: "scale-x-150",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-100",
    scaleY2: "scale-y-50",
  },
  {
    name: "Utility",
    title: "Optimized Utility Management with AI",
    description:
      "Improve efficiency in utility management using AI-driven automation and analytics.",
    link: "Learn more about Utility ->",
    image: "/auto.jpg",
    bgColor: "bg-green-500",
    textColor: "text-green-700",
    secondaryBgColor: "bg-green-700",

    translateX1: "translate-x-44",
    translateY1: "translate-y-12",

    translateX2: "-translate-x-44",
    translateY2: "-translate-y-22",

    scaleX1: "scale-x-25",
    scaleY1: "scale-y-100",

    scaleX2: "scale-x-50",
    scaleY2: "scale-y-25",
  },
  {
    name: "Funding",
    title: "AI-Enhanced Financial Solutions",
    description:
      "Streamline funding and investment processes with AI-powered financial insights.",
    link: "Learn more about Funding ->",
    image: "/auto.jpg",
    bgColor: "bg-red-500",
    textColor: "text-red-700",
    secondaryBgColor: "bg-red-700",
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

const IndustriesSectionMobile = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  const handleIndustryClick = (industry, index) => {
    setSelectedIndustry(industry);
    document.getElementById(`industry-${index}`).scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };

  return (
    <section className="w-full py-8 flex flex-col items-center px-6 md:px-16 overflow-hidden">
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariants} // Apply fade from left to right for title
        className="text-3xl font-light text-black text-center"
      >
        Your Industry, Our Expertise
      </motion.h1>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariants} // Apply fade from left to right for title
        className="flex flex-row justify-start gap-4 mt-4 w-screen overflow-x-scroll overflow-y-hidden py-2 scrollbar-hide"
      >
        {industries.map((industry) => (
          <motion.button
            key={industry.name}
            onClick={() => setSelectedIndustry(industry)}
            className={`first:ml-4 last:mr-4 px-6 py-3 rounded-full transition-all duration-300 text-[12px] snap-start ${
              industry.name == "Real-Estate" ? "min-w-32" : ""
            } ${
              selectedIndustry.name === industry.name
                ? "border border-orange-500 text-orange-500"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {industry.name}
          </motion.button>
        ))}
      </motion.div>

      <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl mt-12 items-center gap-8">
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
          <a
            href="#"
            className={`${selectedIndustry.textColor} text-purple-500 mt-4 inline-block`}
          >
            {selectedIndustry.link}
          </a>
        </motion.div>

        {/* Image with Animated Background Rectangles */}
        <div className="relative w-full md:w-1/2 flex justify-center transition-all duration-1000">
          <motion.div
            className={`absolute -top-4 -left-4 w-40 h-52 rounded-lg transition-transform duration-1000 ${selectedIndustry.secondaryBgColor} ${selectedIndustry.translateX1} ${selectedIndustry.translateY1} ${selectedIndustry.scaleX1} ${selectedIndustry.scaleY1}`}
            layout // Enables Framer Motion's auto-layout animations
          ></motion.div>
          <motion.div
            className={`absolute top-12 -right-4 w-52 h-44 rounded-lg transition-transform duration-1000 ${selectedIndustry.bgColor} ${selectedIndustry.translateX2} ${selectedIndustry.translateY2} ${selectedIndustry.scaleX2} ${selectedIndustry.scaleY2}`}
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
      </div>
    </section>
  );
};

export default IndustriesSectionMobile;
