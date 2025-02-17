import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const industries = ["Technology", "Finance", "Healthcare", "Retail", "Education", "Other"];

export default function ContactPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "Technology",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const API_KEY = "YOUR_API_KEY";
    const AUDIENCE_ID = "YOUR_AUDIENCE_ID";
    const DATA_CENTER = "usX"; // Replace with your Mailchimp data center
    const url = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const data = {
      email_address: formData.email,
      status: "subscribed",
      merge_fields: {
        FNAME: formData.name,
        PHONE: formData.phone,
        INDUSTRY: formData.industry,
      },
    };

    try {
      await axios.post(url, data, {
        auth: {
          username: "anystring",
          password: API_KEY,
        },
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white p-8 py-12 rounded-lg shadow-xl max-w-3xl w-full flex flex-col md:flex-row items-center md:items-center gap-8 relative"
        >
          {/* Form Section */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold font-klik text-gray-900 mb-6">Join Our Network</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              />
              <select
                name="industry"
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full p-3 bg-p1 text-white rounded-lg font-semibold hover:bg-p1/70 transition duration-200"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {status === "success" && (
              <p className="text-green-600 mt-3 text-center">Success! You've been added.</p>
            )}
            {status === "error" && (
              <p className="text-red-600 mt-3 text-center">Error! Please try again.</p>
            )}
          </div>

          {/* Image Section (Only visible on mobile) */}
          <div className="hidden md:flex md:w-1/2">
            <Image src={'/listaide.svg'} width={340} height={400} alt="Contact" className="w-full h-auto object-cover rounded-lg" />
          </div>

          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 text-lg">
            ✕
          </button>
        </motion.div>
      </div>
    )
  );
}