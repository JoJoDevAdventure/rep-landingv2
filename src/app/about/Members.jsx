'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const membersData = [
  {
    id: 1,
    name: "Amin Abdi",
    role: "CEO & Co-Founder",
    description:
      "Cybersecurity expert with 10+ years in financial services, specializing in SaaS, AI, and technology-driven global impact solutions.",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQF7nlPDlL-m1A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723642550263?e=2147483647&v=beta&t=FSr1zEZ67b0V_XrdJixadd5bx2SXOfry_nhU6r774ZY",
  },
  {
    id: 3,
    name: "Hidenori Araki",
    role: "Investor & Business Dev",
    description:
      "15+ years in B2B sales, growth strategies, AI solutions, and entrepreneurial leadership, driving innovation and partnerships.",
    photo:
      "/hide.jpeg",
  },
  {
    id: 4,
    name: "Benoit Brookers III",
    role: "CTO & Head Engineer",
    description:
      "Founder and innovator in AI, alternative data, FinTech, and smart cities, partnering with IBM Watson and LSE.",
    photo:
      "ben.jpeg",
  },
];

const Members = () => {
  // Ref for the section and useInView to check visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false });

  return (
    <div ref={sectionRef} className="container mx-auto px-4 py-16">
      {/* Heading with fade-up effect */}
      <motion.h1
        className="h4 text-s1 text-center max-md:h6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        Our Team
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {membersData.map((member) => (
          <div
            key={member.id}
            className="p-4 shadow-md rounded-lg text-center"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-p1">{member.role}</p>
            <p className="text-sm mt-2">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
