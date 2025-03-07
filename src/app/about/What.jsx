'use client'

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const What = () => {
  const { scrollY } = useScroll();

  const background1Y = useTransform(scrollY, [0, 2500], [0, -700]);
  const background2Y = useTransform(scrollY, [0, 2500], [0, -700]);
  const content1Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const content2Y = useTransform(scrollY, [0, 1000], [0, -100]);

   // Ref for the section and useInView to check visibility
   const sectionRef = useRef(null);
   const isInView = useInView(sectionRef, { once: false });

  return (
    <div ref={sectionRef} className="flex flex-col gap-12 items-center">
      {/* Heading with fade-up effect */}
      <motion.h1
        className="h3 mb-0 text-s1 text-center max-md:h5"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        What's an AIDE? 🤖💼
      </motion.h1>
      <motion.p
        className="mb-11 body-1 max-md:mb-8 max-md:body-3 text-center max-w-[800px]"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        Think of our AI as your digital superhero. 🦸‍♂️ It's not just another AI
        assistant; it's your secret weapon for business success. Here's why:
      </motion.p>

      <div className="flex flex-wrap gap-4 items-stretch max-md:flex-col justify-between max-md:mt-42 mt-24">
        {/* Parallax Div 1 */}
        <motion.div
          className="relative w-full md:w-[40%] h-64 flex flex-col items-center justify-center text-black p-6 rounded-lg min-h-[500px]"
          >
          {/* Parallax background image */}
          <motion.img
            src="/brain.png"
            alt="Money illustration"
            className="absolute inset-0 max-md:w-[100%] w-full h-auto object-cover opacity-80 z-0 max-md:mt-32 max-sm:mt-72"
            style={{ y: background1Y }}
          />
          <motion.h2
            className="h4 mb-2 text-center z-10"
            style={{ y: content1Y }}
          >
            Learn & Evolve
          </motion.h2>
          <motion.p
            className="body-1 text-center z-10"
            style={{ y: content1Y }}
          >
            Our AIDE doesn't just perform tasks; it learns from every
            interaction. It's like having a super-smart sidekick who adapts and
            grows with your business.
          </motion.p>
        </motion.div>

        {/* Parallax Div 2 */}
        <motion.div
          className="relative w-full md:w-[40%] h-64 flex flex-col items-center justify-center text-black p-6 rounded-lg min-h-[500px]"
        >
          {/* Parallax background image */}
          <motion.img
            src="/money.png"
            alt="Cost illustration"
            className="absolute inset-0 max-md:w-[100%] w-full h-auto object-cover opacity-80 z-0 max-md:mt-32 max-sm:mt-80"
            style={{ y: background2Y }}
          />
          <motion.h2
            className="h4 mb-2 text-center z-10"
            style={{ y: content2Y }}
          >
            Cost-Effective Brilliance
          </motion.h2>
          <motion.p
            className="body-1 text-center z-10"
            style={{ y: content2Y }}
          >
            Businesses partnering with us achieve more with 95% less cost than
            traditional channels. It's like getting a Tesla for the price of a
            bicycle!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default What;