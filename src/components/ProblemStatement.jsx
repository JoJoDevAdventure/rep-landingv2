'use client';

import { motion } from "framer-motion";

const ProblemStatement = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your front door has <span className="text-p1">friction</span>.
            <br className="hidden md:block" />
            Your CRM has <span className="text-p1">blind spots</span>.
            <br className="hidden md:block" />
            Both cost you revenue.
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
          >
            Forms slow customers down. Agents lose hours to manual data entry.
            Conversations that drive deals forward never make it into the CRM.
            This is why conversion, accuracy, and insight fall apart at scale.
            ReplicAIDE removes the friction at the start and the blind spots at the end.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
