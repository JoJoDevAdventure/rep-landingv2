"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-orange-100 py-12 px-6 md:px-32"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-lg font-semibold">Product</h3>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Help desk</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold">Services</h3>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li><a href="#">Generate</a></li>
            <li><a href="#">Editor</a></li>
            <li><a href="#">Filter</a></li>
            <li><a href="#">Research</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-400 my-8"></div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
        <img src="rep-logo.svg" />
        <p>© ReplicAIDE. All rights reserved</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-black">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="hover:text-black">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-black">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;