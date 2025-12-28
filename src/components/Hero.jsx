'use client';

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const Hero = ({onClickDemo}) => {
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCTA, setShowCTA] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", industry: "", company: "", website: "" });
  const onFormChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const onSubmitTrial = async (e) => {
    e.preventDefault();
    setOpen(false);
    // normalize website: trim, remove spaces, strip protocol
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
          from: "landing page",
        }),
      });
    } catch (err) {
      console.error("contact/add failed", err);
    }
    window.location.href = site ? `/demo?w=${encodeURIComponent(site)}` : "/demo";
  };
  const goToBooking = () => {
    window.location.href = "https://we.replicaide.com/widget/booking/GkFQmiD1udFMUc90XEUE";
  };

  const scrollToFinalCTA = () => {
    const ctaSection = document.getElementById('final-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play();
        setShowCTA(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-orange-100 pt-24 md:pt-12 pb-16 md:pb-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center items-start text-left space-y-6"
          >
            {/* Header */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-klik font-regular text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              <span className="text-p1">Eliminate friction</span> at the front door.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800"
            >
              Our voice agents start the conversation and intelligence flows into your CRM.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-gray-700 leading-relaxed"
            >
              AIDE engages anonymous website visitors with humanlike conversations that<strong> answer questions, qualify intent, connect to live agents, and book appointments</strong> any time of day. ReplicAIDE <strong>enriches your CRM automatically</strong> with transcripts, sentiment, call details, and new or updated contact records.
            </motion.p>

            {/* Highlight Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-orange-50 to-blue-50 p-4 md:p-5 rounded-lg border-l-4 border-p1 w-full"
            >
              <p className="text-sm md:text-lg font-semibold text-gray-800">
                Real conversations in → Real intelligence out
              </p>
              <p className="text-sm md:text-lg font-semibold text-gray-800 mt-2">
                Eliminate Friction | Unlock Growth
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <button
                onClick={scrollToFinalCTA}
                className="bg-p1 text-white border-p1 border hover:bg-orange-500 hover:shadow-lg transition-all duration-300 px-6 py-3 rounded-lg text-base md:text-lg font-semibold"
              >
                Experience ReplicAIDE Now
              </button>
            </motion.div>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                loop
                muted
                className="w-full h-full object-cover"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

              {/* CTA Overlay - Shows when video hasn't been played */}
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-p1 rounded-full p-6 mb-4 shadow-2xl"
                  >
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white text-lg md:text-xl font-semibold text-center px-4"
                  >
                    Watch Our AI Agent in Action
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-white/90 text-sm md:text-base text-center px-4 mt-2"
                  >
                    See how it engages visitors in real-time
                  </motion.p>
                </motion.div>
              )}

              {/* Control Bar - Shows on hover when video is playing */}
              {!showCTA && (
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Progress bar background */}
                  <div className="absolute bottom-12 left-0 right-0 h-1 bg-white/30">
                    <motion.div
                      className="h-full bg-p1"
                      initial={{ width: "0%" }}
                      animate={{ width: isPlaying ? "100%" : "0%" }}
                      transition={{ duration: videoRef.current?.duration || 30, ease: "linear" }}
                    />
                  </div>

                  {/* Control buttons */}
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center justify-between">
                    {/* Left - Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="bg-p1 hover:bg-orange-500 rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      {isPlaying ? (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Right - Volume */}
                    <button
                      onClick={toggleMute}
                      className="bg-p1 hover:bg-orange-500 rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      {isMuted ? (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
      {open && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Start your free trial</h3>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSubmitTrial} className="space-y-4">
          <label className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={onFormChange("name")}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Full name"
            />
          </label>
          <label className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={onFormChange("email")}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="you@example.com"
            />
          </label>
          <label className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700 text-start w-full self-start place-self-start">
              Phone number
            </span>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={onFormChange("phone")}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="+1 555 000 0000"
            />
          </label>
          <label className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">
              Industry
            </span>
            <input
              type="text"
              required
              value={form.industry}
              onChange={onFormChange("industry")}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="e.g., Dental, HVAC, Real Estate"
            />
          </label>
          <label className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">Company</span>
            <input
              type="text"
              required
              value={form.company}
              onChange={onFormChange("company")}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Your company name"
            />
          </label>
          <label className="flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700">
              Website
            </span>
            <input
              type="text"
              required
              value={form.website}
              onChange={onFormChange("website")}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="yourdomain.com"
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-p1 text-white font-semibold hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
    </section>
  );
};

export default Hero;
