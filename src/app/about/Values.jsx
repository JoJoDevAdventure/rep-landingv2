'use client'

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const coreValues = [
  {
    title: "Adaptable",
    description:
      "Embrace change and learn from it, reflecting our human capacity to evolve.",
  },
  {
    title: "Beacon",
    description:
      "Illuminate the way forward, serving as a powerful source of impact.",
  },
  {
    title: "Commitment",
    description:
      "Persistently pursue our goals, demonstrating unwavering persistence.",
  },
  {
    title: "Diverse",
    description:
      "Champion equity, celebrating our differences by fostering inclusivity.",
  },
  {
    title: "Elevate",
    description:
      "Inspire greatness, lifting ourselves and others to new heights.",
  },
  {
    title: "Faith",
    description:
      "Believe in our purpose, each other, and the positive impact we create.",
  },
  {
    title: "Governance",
    description: "Maintain order & structure, ensuring effective operation.",
  },
  {
    title: "Heal",
    description:
      "Cultivate positivity, well-being, and healing within our communities.",
  },
  {
    title: "Integrity",
    description: "Our word is our bond; honesty and ethics guide our actions.",
  },
  {
    title: "Just",
    description: "Stand up for what’s right, even when faced with challenges.",
  },
  {
    title: "Kind",
    description: "Show care, consideration, and empathy in all interactions.",
  },
  {
    title: "Leader",
    description:
      "Be an idealist, servant & innovator putting others before yourself.",
  },
  {
    title: "Mission",
    description: "Focus on our purpose, leaving a lasting presence.",
  },
  {
    title: "Nurture",
    description: "Provide growth guidance, fostering development.",
  },
  {
    title: "Originality",
    description: "Cultivate ingenuity, paving our own path with fresh ideas.",
  },
  {
    title: "Pristine",
    description: "Uphold exceptional standards in all endeavors.",
  },
  {
    title: "Quality",
    description: "Strive for the pinnacle of excellence in all we do.",
  },
  {
    title: "Reliable",
    description: "Build strong relationships through consistent reliability.",
  },
  {
    title: "Share",
    description: "Collaborate & contribute for the betterment of all.",
  },
  {
    title: "Trailblazer",
    description: "Be icons of progress, forging new trails.",
  },
  {
    title: "Unified",
    description: "Together, we achieve more than as individuals.",
  },
  {
    title: "Value",
    description: "Prioritize the betterment of everyone involved.",
  },
  {
    title: "Wisdom",
    description: "Learn from experience, making informed decisions.",
  },
  {
    title: "Xceed",
    description: "Going the eXtra mile above & beyond, eXceeding expectations.",
  },
  {
    title: "Youthful",
    description: "Embrace a future-focused mindset, nurturing growth.",
  },
  {
    title: "Zeal",
    description: "Approach challenges with enthusiasm & unwavering passion.",
  },
];

const Values = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Infinite scrolling animation
    controls.start({
      x: ["0%", "-100%"], // Move from 0% to -100% (off-screen left)
      transition: {
        x: {
          repeat: Infinity, // Loop indefinitely
          repeatType: "loop",
          duration: 200, // Duration of each loop, adjust to control speed
          ease: "linear", // Smooth and constant speed
        },
      },
    });
  }, [controls]);

  // Ref for the section and useInView to check visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <section ref={sectionRef} className="relative py-0 overflow-visible">
      {/* Caption and Heading */}
      <div className="text-center mb-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="text-p1"
        >
          Core Values
        </motion.p>
        <motion.h1
          className="h3 mb-0 text-s1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          Our ABC's
        </motion.h1>
      </div>

      {/* Infinite Auto-Scrolling Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="overflow-hidden"
      >
        <motion.div
          className="flex space-x-4"
          style={{ display: "inline-flex" }}
          animate={controls}
        >
          {/* Duplicate the items to create a seamless looping effect */}
          {[...coreValues, ...coreValues].map((value, index) => (
            <motion.div
              key={index}
              className="relative min-w-[300px] md:min-w-[350px] py-10 border-2 border-p1 rounded-3xl bg-p1/20 flex flex-col align-center justify-center group"
            >
              {/* Title and Description */}
              <h2 className="h4 mb-2 text-center relative z-10">
                {value.title}
              </h2>
              <p className="body-2 text-center relative z-10">
                {value.description}
              </p>

              {/* Glow Effects */}
              <span className="val_glow-before absolute -inset-px rounded-3xl pointer-events-none" />
              <span className="val_glow-after absolute -inset-px rounded-3xl pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Values;
