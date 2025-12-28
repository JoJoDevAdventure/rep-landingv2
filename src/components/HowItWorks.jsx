'use client';

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Website and phone calls become instant conversations",
    description: "AIDE greets anonymous website visitors, answers questions, qualifies intent, and books appointments with a natural voice experience.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    number: "02",
    title: "Real-time intelligence extraction",
    description: "Every conversation is analyzed for sentiment, intent, call duration, and contextual meaning.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    title: "CRM enrichment without human input",
    description: "We update or create contact records automatically. Your CRM gets smarter with each interaction.",
    gradient: "from-pink-500 to-orange-500"
  },
  {
    number: "04",
    title: "Better decisions and better outcomes",
    description: "Marketing sees intent. Sales sees context. Operations see efficiency. Your teams act with clarity and confidence.",
    gradient: "from-orange-500 to-yellow-500"
  }
];

const HowItWorks = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How <span className="text-p1">ReplicAIDE</span> Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg md:text-xl">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
