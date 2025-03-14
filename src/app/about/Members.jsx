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
    id: 2,
    name: "Tony Benton",
    role: "CIO & Co-Founder",
    description:
      "Inventor, entrepreneur, and licensed realtor, specializing in CRP, AI solutions, branding, and social impact through tech-driven innovation.",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQFvezkaK5Verw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1729792280427?e=1747267200&v=beta&t=5S0M7UPB5PilWn49W5jRQtxB-Xm_hz3lzn1iVm5W_os",
  },
  {
    id: 3,
    name: "Hidenori Araki",
    role: "Investor & Business Dev",
    description:
      "15+ years in B2B sales, growth strategies, AI solutions, and entrepreneurial leadership, driving innovation and partnerships.",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQGZXDOLhNDvLg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730205484195?e=1747267200&v=beta&t=fOvPUBC15rX_fP6iHoBqKqhVWcArWA-Vh1ddIFEGdJg",
  },
  {
    id: 4,
    name: "Benoit Brookers III",
    role: "CTO & Head Engineer",
    description:
      "Founder and innovator in AI, alternative data, FinTech, and smart cities, partnering with IBM Watson and LSE.",
    photo:
      "https://media.licdn.com/dms/image/v2/C4D03AQF0pwMPnh-MGw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1635711063617?e=1747267200&v=beta&t=au-Q9yI4bMkgWqNel6NzBlzXhScPnDObP186hktp9IU",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
