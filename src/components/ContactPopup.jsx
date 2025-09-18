import { Conversation } from "@11labs/client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const industries = ["Technology", "Finance", "Healthcare", "Retail", "Education", "Other"];

export default function ContactPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    company: "",
    website: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const conversationRef = useRef(null);

  const endConversationIfActive = async () => {
    try {
      const conv = conversationRef.current;
      if (conv && typeof conv.endSession === "function") {
        await conv.endSession();
        setIsOnCall(false);
        console.log("[AI] Session ended via endSession().");
      }
    } catch (e) {
      console.warn("[AI] Failed to end session:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Reset form and hide messages whenever popup opens
      setFormData({
        name: "",
        email: "",
        phone: "",
        industry: "",
        company: "",
        website: "",
      });
      setStatus(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // End the AI call if one is active before submitting
    await endConversationIfActive();

    setLoading(true);
    setStatus(null);

    if (loading) return;

    console.log("Form Data:", formData);

    try {
      const response = await fetch("/api/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          industry: formData.industry,
          company: formData.company,
          website: formData.website,
          from: "landing page",
        }),
      });

      const data = await response.json();

      console.log("Mailchimp Response:", data);

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", industry: "", company: "", website: "" });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus(`Error: ${data.title || "Unexpected error."}`);
      }
    } catch (error) {
      setStatus("Error: Network error or invalid request. Please check your connection and try again.");
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormComplete = (d) => {
    const req = ["name", "email", "phone", "industry", "company", "website"];
    return req.every((k) => (d?.[k] || "").toString().trim().length > 0);
  };

  const activateAgent = async () => {
    try {
      const agentId = "agent_2801k4jv50ewezk9yfnsfngp56mk"; // Provided agent ID
      const conv = await Conversation.startSession({
        agentId,
        onConnect: ({ conversationId }) => {
          console.log("Connected to conversation:", conversationId);
          setIsOnCall(true);
        },
        onDebug: (props) => {
          console.debug("[Agent Debug]", props);
          try {
            const isToolResponse =
              props &&
              (props.type === "agent_tool_response" || props?.data?.type === "agent_tool_response");
            if (isToolResponse) {
              console.log("[TOOL]", props);
            }
          } catch (e) {
            // ignore
          }
        },
        onDisconnect: () => {
          console.log("Disconnected from conversation");
          setIsOnCall(false);
          try {
            if (isFormComplete(formData) && !loading && status !== "success") {
              console.log("All fields present after call — auto-submitting form.");
              // Call submit without a real event
              handleSubmit({ preventDefault: () => {} });
            } else {
              console.log("Form not complete or already submitted; skipping auto-submit.");
            }
          } catch (e) {
            console.warn("Auto-submit failed:", e);
          }
        },
        onError: (message, context) => {
          console.error("Agent Error:", message, context);
        },
        onMessage: (props) => {
          // Intentionally not rendering transcripts; only log minimal event for debugging
          console.log("Message Received (not rendered):", {
            source: props?.source,
            length: props?.message?.length,
          });
        },
        onAudio: (base64Audio) => {
          console.log("Audio chunk received, length:", base64Audio?.length || 0);
        },
        onModeChange: ({ mode }) => {
          console.log("Mode changed:", mode);
        },
        onStatusChange: ({ status }) => {
          console.log("Status changed:", status);
        },
        onCanSendFeedbackChange: ({ canSendFeedback }) => {
          console.log("CanSendFeedback changed:", canSendFeedback);
        },
        onUnhandledClientToolCall: (params) => {
          try {
            console.log("Unhandled client tool call:", params);
            const tool = params?.tool_name || params?.name;
            const p = params?.parameters || params?.args || {};

            if (tool === "fill_form") {
              const next = {};
              if (typeof p.full_name === "string" && p.full_name.trim()) next.name = p.full_name;
              if (typeof p.email === "string" && p.email.trim()) next.email = p.email;
              if (typeof p.phone === "string" && p.phone.trim()) next.phone = p.phone;
              if (typeof p.industry === "string" && p.industry.trim()) next.industry = p.industry;
              if (typeof p.company === "string" && p.company.trim()) next.company = p.company;
              if (typeof p.website === "string" && p.website.trim()) next.website = p.website;

              if (Object.keys(next).length > 0) {
                setFormData((prev) => ({ ...prev, ...next }));
                console.log("[Fill Form] Applied parameters to form:", next);
              }
            }
          } catch (err) {
            console.warn("Failed to process client tool call:", err);
          }
        },
      });
      conversationRef.current = conv;
    } catch (err) {
      console.error("Failed to activate agent:", err);
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
              {(!isOnCall || (formData.name || "").trim()) && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.name}
                />
              )}
              {(!isOnCall || (formData.email || "").trim()) && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.email}
                />
              )}
              {(!isOnCall || (formData.phone || "").trim()) && (
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.phone}
                />
              )}
              {(!isOnCall || (formData.industry || "").trim()) && (
                <input
                  type="text"
                  name="industry"
                  placeholder="Industry"
                  required
                  className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.industry}
                />
              )}
              {(!isOnCall || (formData.company || "").trim()) && (
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  required
                  className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.company}
                />
              )}
              {(!isOnCall || (formData.website || "").trim()) && (
                <input
                  type="text"
                  name="website"
                  placeholder="Website"
                  required
                  className="w-full p-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400"
                  onChange={handleChange}
                  value={formData.website}
                />
              )}
              <button
                type="button"
                className={`w-full p-3 rounded-lg font-semibold transition duration-200 ${
                  isOnCall
                    ? "bg-white text-primary border border-primary"
                    : "text-white animate-orange-gradient"
                }`}
                onClick={async () => {
                  if (isOnCall) {
                    await endConversationIfActive();
                  } else {
                    await activateAgent();
                  }
                }}
              >
                {isOnCall ? "Fill manually" : "Fill with AI"}
              </button>
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
          <button onClick={async () => {
            await endConversationIfActive();
            onClose();
          }} className="absolute top-4 right-4 text-gray-600 text-lg">
            ✕
          </button>
        </motion.div>
      </div>
    )
  );
}