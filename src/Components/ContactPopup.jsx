import mailchimp from "@mailchimp/mailchimp_marketing"; // Import the Mailchimp SDK
import { motion } from "framer-motion";
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

  // Configure Mailchimp SDK
  mailchimp.setConfig({
    apiKey: "928632585111ef7e11d5b2cf570bdd23-us11", // Your API key
    server: "us11", // Server prefix (data center from API key: -us11)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    console.log("Form Data:", formData);

    try {
      const response = await mailchimp.lists.addListMember("7edae1fc6c", { // Audience ID
        email_address: formData.email,
        status: "subscribed", // Use "pending" for double opt-in if needed
        merge_fields: {
          FNAME: formData.name,
          PHONE: formData.phone,
          INDUSTRY: formData.industry,
        },
      });

      console.log("Mailchimp Response:", response);

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", industry: "Technology" });
        setTimeout(() => {
          onClose();
        }, 2000); // Close popup after 2 seconds
      } else {
        setStatus(`Error! Unexpected response from Mailchimp (Status: ${response.status}).`);
      }
    } catch (error) {
      if (error.response && error.response.body) {
        const mailchimpError = error.response.body;
        if (mailchimpError.title === "Member Exists") {
          setStatus("You are already subscribed.");
        } else {
          setStatus(`Error: ${mailchimpError.title} - ${mailchimpError.detail || error.message}`);
        }
      } else {
        setStatus("Error: Network error or invalid request. Please check your connection and try again.");
      }
      console.error("Mailchimp SDK Error:", error.response?.body || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white p-8 py-12 rounded-lg shadow-xl max-w-xl w-full flex flex-col md:flex-row items-center md:items-center gap-8 relative"
        >
          {/* Form Section */}
          <div className="w-full">
            <h2 className="text-2xl font-semibold font-klik text-gray-900 mb-6">Join Our Network</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={formData.name}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={formData.email}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={formData.phone}
              />
              <select
                name="industry"
                className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                value={formData.industry}
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
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>

            {status === "success" && (
              <p className="text-green-600 mt-3 text-center">Success! You've been added.</p>
            )}
            {status && status !== "success" && (
              <p className="text-red-600 mt-3 text-center">{status}</p>
            )}
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