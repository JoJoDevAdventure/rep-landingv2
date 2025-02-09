"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const aides = [
  {
    name: "Propertyaide",
    logo: "/propertyaide.svg",
    color: "bg-[#EBBF2B]",
    textColor: "text-[#EBBF2B]",
    title: "The best automotive experience",
    description:
      "Helping you find and manage properties effortlessly with AI-driven real estate solutions.",
    buttonColor: "bg-[#EBBF2B]",
    image: "/auto.jpg",
    svg: "/yellow.svg",
    rotation: "rotate-[0deg]",
  },
  {
    name: "Autoaide",
    logo: "/autoaide.svg",
    color: "bg-[#612EA7]",
    textColor: "text-[#612EA7]",
    title: "The best automotive experience",
    description:
      "Sellers can list vehicles effortlessly, while buyers receive smart recommendations tailored to their needs. Our intelligent system optimizes listings, enhances visibility, and ensures a seamless experience for both parties—making car transactions faster, smarter, and hassle-free.",
    buttonColor: "bg-[#612EA7]",
    image: "/auto.jpg",
    svg: "/violet.svg",
    rotation: "rotate-[70deg]",
  },
  {
    name: "Fundaide",
    logo: "/fundaide.svg",
    color: "bg-[#40A4D8]",
    textColor: "text-[#40A4D8]",
    title: "The best automotive experience",
    description:
      "Optimizing investments and funding processes with AI-driven smart solutions.",
    buttonColor: "bg-[#40A4D8]",
    image: "/auto.jpg",
    svg: "/violet.svg",
    rotation: "rotate-[120deg]",
  },
  {
    name: "Listaide",
    logo: "/listaide.svg",
    color: "bg-[#07B446]",
    textColor: "text-[#07B446]",
    title: "The best automotive experience",
    description:
      "Enhancing visibility and engagement for your listings with AI-powered optimization.",
    buttonColor: "bg-[#07B446]",
    image: "/auto.jpg",
    svg: "/violet.svg",
    rotation: "rotate-[180deg]",
  },
];

const AidesSection = () => {
  const [selectedAide, setSelectedAide] = useState(aides[1]);

  return (
    <div>
    <section
      className={`hidden relative w-full md:flex flex-col items-center justify-center transition-colors duration-500 md:px-28 px-4 py-24 bg-p1/10 overflow-hidden`}
    >
      <h1 className="text-4xl font-bold text-black">Find your aide</h1>

      <div className="relative flex w-full gap-14 mt-12 items-center flex-col md:flex-row z-40">
        {/* Left Side: Aide Selection */}
        <div className="relative w-[19%] flex flex-col space-y-6 text-2xl font-medium left-16 z-40 cursor-pointer">
          {aides.map((aide, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedAide(aide)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className={`px-8 py-2 rounded-lg flex items-center cursor-pointer w-auto transition-all duration-300 justify-between relatives z-50 ${
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
        </div>

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
            initial={{ opacity: 0.8, x: -60, scale: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0.8, x: 40, scale: 1 }}
            transition={{ duration: 1 }}
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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-2/5 text-left"
          >
            <h2 className={`text-3xl font-bold ${selectedAide.textColor}`}>
              {selectedAide.title}
            </h2>
            <p className="text-lg text-gray-700 mt-4">
              {selectedAide.description}
            </p>
            <motion.button
              className={`mt-6 px-6 py-3 rounded-lg text-white ${selectedAide.buttonColor}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Schedule Demo
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>


    <section className="md:hidden relative w-full flex flex-col items-center justify-center transition-colors duration-500 px-4 md:px-28 py-8 bg-p1/10 overflow-hidden">
      <h1 className="text-3xl font-light text-black">Find your aide</h1>

      {/* Aides List - Horizontal Layout */}
      <div className="relative flex w-full overflow-x-auto mt-4 space-x-4 md:justify-center md:pb-0 z-50">
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
            <Image src={aide.logo} alt={aide.name} width={40} height={40} className="rounded-lg w-full h-10 md:w-auto md:h-12" />
          </motion.button>
        ))}
      </div>

      {/* Aide Details - Below List */}
      <div className="relative w-full flex flex-col items-center mt-8">
        {/* Background SVG */}
        <motion.div
          className={`absolute -top-6 flex items-center justify-center z-0 w-[100%] md:w-[60%] transition-all duration-1000 ${selectedAide.rotation}`}
        >
          <Image src={selectedAide.svg} alt="Background SVG" width={400} height={400} className="opacity-30 w-full" />
        </motion.div>

        <motion.div
          className="relative w-full md:w-[70%]"
          key={selectedAide.name}
          initial={{ opacity: 0.8, y: -40, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0.8, y: 40, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src={selectedAide.image} alt={selectedAide.name} width={600} height={400} className="rounded-lg shadow-lg w-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-3/4 text-center mt-4"
        >
          <h2 className={`text-2xl font-bold ${selectedAide.textColor}`}>{selectedAide.title}</h2>
          <p className="text-m text-gray-700 mt-2">{selectedAide.description}</p>
          <motion.button
            className={`mt-4 px-3 py-2 rounded-lg text-white text-sm ${selectedAide.buttonColor}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Schedule Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default AidesSection;
