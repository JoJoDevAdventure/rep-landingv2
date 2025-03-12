"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const perfectFitData = [
  {
    title: "Entreprise",
    description:
      "Streamline complex processes with scalable automation that elevates operational efficiency.",
    image: "/r1.png",
    bgColor: "bg-rose-200",
    borderColor: "border-rose-400",
  },
  {
    title: "Growing Businesses",
    description:
      "Boost scalability by optimizing workflows and driving expansion through smart automation.",
      image: "/r2.png",
      bgColor: "bg-rose-300",
    borderColor: "border-rose-500",
  },
  {
    title: "Startups",
    description:
      "Accelerate innovation with agile AI solutions that streamline operations and fuel rapid growth.",
      image: "/r3.png",
      bgColor: "bg-yellow-200",
    borderColor: "border-yellow-400",
  },
  {
    title: "Self-Employed",
    description:
      "Simplify daily tasks with tailored AI tools designed to enhance productivity and ease task management.",
      image: "/r4.png",
      bgColor: "bg-amber-300",
    borderColor: "border-amber-500",
  },
  {
    title: "Consumers",
    description:
      "Enhance your experience with AI-driven interactions that make services more accessible.",
      image: "/r5.png",
      bgColor: "bg-indigo-200",
    borderColor: "border-indigo-400",
  },
];

const PerfectFit = () => {
  return (
    <section className="w-full py-4 md:py-22 flex flex-col items-center px-6 md:px-16 overflow-hidden">
      {/* Header */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Powering Prosperity for Everyone
      </motion.h2>
      <motion.p
        className="text-gray-600 text-center mt-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Support every stage of your journey with Replicaide
      </motion.p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {perfectFitData.map((item, index) => (
          <motion.div
            key={index}
            className={`relative w-full sm:w-[300px] md:w-[240px] lg:w-[260px] p-6 rounded-md shadow-lg transition-all duration-500 ${item.bgColor}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="w-full h-36 rounded-lg overflow-hidden shadow-md">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Description */}
            <h3 className="text-lg font-bold mt-4">{item.title}</h3>
            <p className="text-gray-700 text-sm mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PerfectFit;