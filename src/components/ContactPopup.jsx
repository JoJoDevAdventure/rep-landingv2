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

        // Redirect to demo page with website and name parameters
        setTimeout(() => {
          const site = (formData.website || "").trim().replace(/\s+/g, "").replace(/^https?:\/\//i, "");
          const params = new URLSearchParams();
          if (site) params.append('w', site);
          if (formData.name) params.append('n', formData.name);
          window.location.href = params.toString() ? `/demo?${params.toString()}` : "/demo";
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
      const agentId = "agent_1901kf0mh5rpewyrfa9gc0cahwwe"; // Provided agent ID
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 px-4 py-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full relative p-6 md:p-10 my-auto max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={async () => {
              await endConversationIfActive();
              onClose();
            }}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold transition-colors"
          >
            ✕
          </button>

          {status === "success" ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Thank You!
              </h3>
              <p className="text-lg text-gray-700">
                You've been added to our network.
              </p>
            </div>
          ) : (
            <>
              <div className="text-left mb-8 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  See ReplicAIDE live on your own website.
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="Full name"
                    />
                  </label>

                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="+1 555 000 0000"
                    />
                  </label>

                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Industry <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="industry"
                      required
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="e.g., Dental, HVAC, Real Estate"
                    />
                  </label>

                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Company <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="Your company name"
                    />
                  </label>

                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Website URL <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      name="website"
                      required
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="yourdomain.com"
                    />
                  </label>
                </div>

                <div className="flex flex-col items-center justify-center pt-4 space-y-4">
                  {!isFormComplete(formData) && (
                    <button
                      type="button"
                      className={`w-full md:w-auto px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 ${
                        isOnCall
                          ? "bg-white text-p1 border-2 border-p1 hover:bg-p1/10"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white animate-pulse"
                      }`}
                      onClick={async () => {
                        if (isOnCall) {
                          await endConversationIfActive();
                        } else {
                          await activateAgent();
                        }
                      }}
                    >
                      {isOnCall ? "Fill Manually" : "Fill with AI Voice"}
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-gradient-to-r from-p1 to-orange-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? "Submitting..." : "Submit for Custom Demo"}
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    )
  );
}