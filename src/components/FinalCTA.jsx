'use client';

import { Conversation } from "@11labs/client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const FinalCTA = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    company: "",
    website: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const conversationRef = useRef(null);

  const onFormChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

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

  const isFormComplete = (d) => {
    const req = ["name", "email", "phone", "industry", "company", "website"];
    return req.every((k) => (d?.[k] || "").toString().trim().length > 0);
  };

  const activateAgent = async () => {
    try {
      const agentId = "agent_2801k4jv50ewezk9yfnsfngp56mk";
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
            if (isFormComplete(form) && !isSubmitting && !isSubmitted) {
              console.log("All fields present after call — auto-submitting form.");
              onSubmit({ preventDefault: () => {} });
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
                setForm((prev) => ({ ...prev, ...next }));
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

  const onSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // End the AI call if one is active before submitting
    await endConversationIfActive();

    setIsSubmitting(true);

    // Normalize website: trim, remove spaces, strip protocol
    let site = (form.website || "").trim().replace(/\s+/g, "").replace(/^https?:\/\//i, "");

    try {
      await fetch("/api/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || "",
          email: form.email || "",
          phone: form.phone || "",
          industry: form.industry || "",
          company: form.company || "",
          website: site,
          from: "final cta form",
        }),
      });

      setIsSubmitted(true);

      // Redirect to demo page with website and name parameters
      setTimeout(() => {
        const params = new URLSearchParams();
        if (site) params.append('w', site);
        if (form.name) params.append('n', form.name);
        window.location.href = params.toString() ? `/demo?${params.toString()}` : "/demo";
      }, 2000);
    } catch (err) {
      console.error("contact/add failed", err);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="final-cta" className="relative w-full py-16 md:py-24 bg-gradient-to-br from-p1 via-orange-500 to-yellow-500">
      <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            See ReplicAIDE live on your own website.
          </h2>
          <p className="text-lg md:text-xl text-white/95">
            No setup required. Experience how our AI greets your visitors by name.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-6 md:p-10"
        >
          {isSubmitted ? (
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
              <p className="text-lg text-gray-700 mb-2">
                We're texting you a private link to your personalized ReplicAIDE demo.
              </p>
              <p className="text-base text-gray-600">
                Redirecting you now...
              </p>
            </div>
          ) : (
            <>
              <div className="text-left mb-8 space-y-4">
                <ul className="space-y-3 text-base md:text-lg text-gray-800">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-bold">Enter your URL & Name</span> → We'll generate a custom preview on your site.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-bold">Check your phone</span> → Receive a text with your personalized demo link.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <div>
                      <span className="font-bold">Start the conversation</span> → Talk to a Voice Agent that knows exactly who you are.
                    </div>
                  </li>
                </ul>
                <p className="text-base md:text-lg text-gray-800 font-semibold pt-2">
                  → <span className="font-bold">Experience your site, amplified.</span>
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={onFormChange("name")}
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
                      required
                      value={form.email}
                      onChange={onFormChange("email")}
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
                      required
                      value={form.phone}
                      onChange={onFormChange("phone")}
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
                      required
                      value={form.industry}
                      onChange={onFormChange("industry")}
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
                      required
                      value={form.company}
                      onChange={onFormChange("company")}
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
                      required
                      value={form.website}
                      onChange={onFormChange("website")}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-p1 focus:border-transparent transition"
                      placeholder="yourdomain.com"
                    />
                  </label>
                </div>

                <div className="flex flex-col items-center justify-center pt-4 space-y-4">
                  {!isFormComplete(form) && (
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
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-gradient-to-r from-p1 to-orange-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "Submitting..." : "Submit for Custom Demo"}
                  </button>
                  <p className="text-sm md:text-base text-gray-600 italic text-center max-w-2xl">
                    No system replacement. No workflow disruption. Only better performance from the tools you already use.
                  </p>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
