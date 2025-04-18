"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-orange-100 py-12 px-6 md:px-32"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >

      {/* Separator */}
      <div className="border-t border-gray-400 my-8"></div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
        <img className="w-32 mb-4 md:w-32" src="rep-logo.svg" />
        <p>© 2025 ReplicAIDE. All rights reserved</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://www.linkedin.com/company/replicaide/" className="hover:text-black">
            <FaLinkedin size={20} />
          </a>
          <a href="https://x.com/replicaide">
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
