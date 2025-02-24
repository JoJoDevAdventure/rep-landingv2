"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  fadeLeftVariants,
  fadeRightVariants,
  fadeUpVariants,
} from "./Animations";
const aides = [
  {
    name: "PropertyAide",
    logo: "/propertyaide.svg",
    color: "bg-[#EBBF2B]",
    textColor: "text-[#EBBF2B]",
    title: "Smarter Real Estate, Powered by AI",
    description:
      "Effortlessly list, manage, and discover properties with AI-driven insights. PropertyAide streamlines the buying, selling, and renting experience with intelligent automation and market analytics.",
    buttonColor: "bg-[#EBBF2B]",
    image: "/Property-UI.png",
    svg: "/yellow.svg",
    rotation: "rotate-[0deg]",
  },
  {
    name: "AutoAide",
    logo: "/autoaide.svg",
    color: "bg-[#612EA7]",
    textColor: "text-[#612EA7]",
    title: "Sell Faster, Buy Smarter with AI",
    description:
      "AutoAide revolutionizes car transactions by optimizing listings, matching buyers with the perfect vehicles, and automating the entire process—making selling and buying seamless, efficient, and hassle-free.",
    buttonColor: "bg-[#612EA7]",
    image: "/auto.jpg",
    svg: "/violet.svg",
    rotation: "rotate-[70deg]",
  },
  {
    name: "ShopAide",
    logo: "/listaide.svg",
    color: "bg-[#07B446]",
    textColor: "text-[#07B446]",
    title: "AI-Powered Retail Optimization",
    description:
      "Boost your store’s performance with AI-enhanced product listings, automated pricing strategies, and smart recommendations. ShopAide helps sellers maximize sales and visibility effortlessly.",
    buttonColor: "bg-[#07B446]",
    image: "/shopaideUI.jpg",
    svg: "/green.svg",
    rotation: "rotate-[180deg]",
  },
  {
    name: "UnityAide",
    logo: "/Unity.svg",
    color: "bg-[#FA4276]",
    textColor: "text-[#FA4276]",
    title: "AI Solutions for Every Industry",
    description:
      "A unified AI assistant across hospitality, dining, travel, and more. UnityAide powers HostAide for hotels, Prepaide for restaurants, TravelAide for trips, and beyond—streamlining operations with intelligent automation.",
    buttonColor: "bg-[#FA4276]",
    image: "/Property-UI.png",
    svg: "/blue.svg",
    rotation: "rotate-[120deg]",
  },
];

const AidesSection = ({onClickDemo}) => {
  const [selectedAide, setSelectedAide] = useState(aides[1]);

  return (
    <div>
      <section
        className={`hidden relative w-full md:flex flex-col items-center justify-center transition-colors duration-500 md:px-28 px-4 py-24 bg-p1/10 overflow-hidden`}
      >
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={fadeUpVariants} // Apply fade from left to right for title
        >
          Ditch your CRM
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={fadeUpVariants} // Apply fade from left to right for title
          className="flex justify-center items-bottom align-bottom w-128 gap-3"
        >
          <h1 className="text-5xl font-light text-black mt-9">Find your</h1>
          <img src="/aide.svg" alt="" className="w-28 h-auto"/>
        </motion.div>

        <div className="relative flex w-full gap-14 mt-12 items-center flex-col md:flex-row z-40">
          {/* Left Side: Aide Selection */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeRightVariants} // Apply fade from left to right for title
            className="relative w-[19%] flex flex-col space-y-6 text-2xl font-medium left-16 z-40 cursor-pointer"
          >
            {aides.map((aide, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedAide(aide)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className={`px-8 py-2 rounded-lg flex items-center cursor-pointer w-auto transition-all duration-300 justify-between relative ${
                  selectedAide.name === aide.name
                    ? "bg-white shadow-xl hover:bg-white"
                    : "bg-transparent"
                }`}
              >
                <Image
                  src={aide.logo}
                  alt={aide.name}
                  width={0}
                  height={0}
                  className="rounded-lg w-auto h-12"
                />
                {selectedAide.name === aide.name && (
                  <motion.span
                    className="ml-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    &gt;
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Right Side: Aide Details */}
          <div className="relative w-3/4 items-top flex gap-8">
            {/* Background SVG */}
            <motion.div
              className={`absolute inset-0 flex items-center justify-center z-0 w-[60%] transition-all duration-1000 ${selectedAide.rotation}`}
            >
              <Image
                src={selectedAide.svg}
                alt="Background SVG"
                width={500}
                height={500}
                className="opacity-30 w-full"
              />
            </motion.div>

            <motion.div
              className="relative w-[70%]"
              key={selectedAide.name}
              initial="hidden"
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0.8, x: 40, scale: 1 }}
              transition={{ duration: 0.7 }}
              whileInView="visible"
              viewport={{ once: false, amount: 0.7 }}
              variants={fadeUpVariants} // Apply fade from left to right for title
            >
              <Image
                src={selectedAide.image}
                alt={selectedAide.name}
                width={700}
                height={450}
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              transition={{ duration: 0.5 }}
              className="w-2/5 text-left"
              whileInView="visible"
              viewport={{ once: false, amount: 0.7 }}
              variants={fadeLeftVariants} // Apply fade from left to right for title
            >
              <h2
                className={`text-3xl font-bold transition-all duration-500 ${selectedAide.textColor}`}
              >
                {selectedAide.title}
              </h2>
              <p className="text-lg text-gray-700 mt-4">
                {selectedAide.description}
              </p>
              <motion.button
                className={`mt-6 px-6 py-3 rounded-lg transition-all duration-500 text-white ${selectedAide.buttonColor}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={onClickDemo}
              >
                Schedule Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOBILE */}
      <section className="md:hidden relative w-full flex flex-col items-center justify-center transition-colors duration-500 px-4 md:px-28 py-8 bg-p1/10 overflow-hidden">
      <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={fadeUpVariants} // Apply fade from left to right for title
        >
          Ditch your CRM
        </motion.p>
      <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={fadeUpVariants} // Apply fade from left to right for title
          className="flex justify-center items-bottom align-bottom h-24 w-128 gap-3"
        >
          <h1 className="text-3xl font-light text-black mt-10">Find your</h1>
          <img src="/aide.svg" alt="" className="w-[68px] h-auto"/>
        </motion.div>

        {/* Aides List - Horizontal Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.7 }}
          variants={fadeUpVariants} // Apply fade from left to right for title
          className="relative flex w-full overflow-x-auto mt-4 space-x-4 md:justify-center md:pb-0 z-40"
        >
          {aides.map((aide, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedAide(aide)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`px-2 py-1 flex items-center cursor-pointer transition-all duration-300 justify-between rounded-lg whitespace-nowrap ${
                selectedAide.name === aide.name ? "bg-white" : "bg-transparent"
              }`}
            >
              <Image
                src={aide.logo}
                alt={aide.name}
                width={40}
                height={40}
                className="rounded-lg w-full h-10 md:w-auto md:h-12"
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Aide Details - Below List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeUpVariants} // Apply fade from left to right for title
          className="relative w-full flex flex-col items-center mt-8"
        >
          {/* Background SVG */}
          <motion.div
            className={`absolute -top-6 flex items-center justify-center z-0 w-[100%] md:w-[60%] transition-all duration-1000 ${selectedAide.rotation}`}
          >
            <Image
              src={selectedAide.svg}
              alt="Background SVG"
              width={400}
              height={400}
              className="opacity-30 w-full"
            />
          </motion.div>

          <motion.div
            className="relative w-full md:w-[70%]"
            key={selectedAide.name}
            initial={{ opacity: 0.8, y: 40, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0.8, y: 40, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={selectedAide.image}
              alt={selectedAide.name}
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-3/4 text-center mt-4"
          >
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeUpVariants} // Apply fade from left to right for title
              className={`text-2xl font-bold ${selectedAide.textColor}`}
            >
              {selectedAide.title}
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeUpVariants} // Apply fade from left to right for title
              className="text-m text-gray-700 mt-2"
            >
              {selectedAide.description}
            </motion.p>
            <motion.button
              className={`mt-4 px-3 py-2 rounded-lg text-white text-sm ${selectedAide.buttonColor}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeUpVariants} // Apply fade from left to right for title
            >
              Schedule Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default AidesSection;
