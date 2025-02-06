'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  { src: '/att.png', alt: 'AT&T' },
  { src: '/verizon.png', alt: 'Verizon' },
  { src: '/comcast.png', alt: 'Comcast' },
  { src: '/att.png', alt: 'AT&T' },
  { src: '/verizon.png', alt: 'Verizon' },
];

const Partners = () => {
  return (
    <section className="w-full py-10 bg-white text-center overflow-hidden">
      <h2 className="font-klik text-2xl mb-16">Trusted by the biggest companies in the world</h2>
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-20 justify-end align-middle items-center"
          animate={{ x: ['20%', '0%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <Image
              key={index}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={50}
              className="opacity-70 object-contain"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
