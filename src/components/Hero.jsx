'use client';

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  { src: "/stat1.gif", width: 1400, height: 800 },
  { src: "/image2.gif", width: 400, height: 400 },
  { src: "/stat2.gif", width: 1000, height: 350 },
  { src: "/image4.gif", width: 800, height: 664 },
];

const Hero = ({onClickDemo}) => {
  const [open, setOpen] = useState(false);
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
    window.location.href = "https://we.replicaide.com/widget/booking/s76WHydPGOptB9Yw5RS0";
  };

  const controls = useAnimation();
  const scrollRef = useRef(null);

  const startScrolling = (direction) => {
    controls.start({ x: direction === "left" ? "-100%" : "100%" });
  };

  const stopScrolling = () => {
    controls.stop();
  };

  useEffect(() => {
    startScrolling("left");
  });

  return (
    <section className="relative w-full md:h-[95vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-100 to-orange-100 pt-22 md:pt-12">
      <div className="w-full flex flex-col md:flex-row justify-between align-top px-6 md:px-16 lg:px-40">
        <motion.div 
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-[65%]"
        >
          <h1 className="md:h1 font-klik font-regular text-left text-3xl md:text-5xl lg:text-6xl leading-normal">
          Captivating relationships<br /> <span className="mt-4"> through meaningful</span> <br />
            <motion.span
              className="text-p1 text-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {["A", "I", " ", "c", "o", "n", "v", "e", "r", "s", "a", "t", "i", "o", "n", "s"].map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05, delay: 1 + index * 0.1 }}
                  className="inline-block"
                >
                  {letter === " " ? <span>&nbsp;</span> : letter}
                </motion.span>
              ))}
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="flex flex-col text-left justify-start gap-4 mt-2 md:mt-8 w-full md:w-auto align-top"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 text-sm md:text-xl text-gray-700"
          >
            Fewer hours spent tedious tasks, <br />
            Same
            <span className="text-p1"> humanity</span> in the
            process.
          </motion.p>
          <div className="flex flex-row gap-4 w-full m-0">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              onClick={goToBooking}
              className="bg-p1 text-white border-p1 border hover:bg-orange-500 transition-all duration-300 px-2 md:px-6 py-3 rounded-lg w-full md:w-auto text-[12px] md:text-[18px]"
            >
              Schedule Demo
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              onClick={() => setOpen(true)}
              className="bg-transparent text-s1 px-2 md:px-6 py-3 rounded-lg w-full border hover:bg-p1/20 border-p1 transition-all duration-300 md:w-auto text-[12px] md:text-[18px]"
            >
              Learn more
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Images */}
      <motion.div
        className="relative mt-4 md:mt-20 w-full overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <motion.div
          className="hidden space-x-4 align-center h-auto flex-row items-center justify-center md:flex"
          animate={{ x: ['-20%', '30%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>

          {images.concat(images).map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt="AI Conversation"
              width={img.width}
              height={img.height}
              className="rounded-lg h-auto w-auto max-w-full md:max-w-none"
            />
          ))}
        </motion.div>
        <motion.div
          className="flex space-x-4 align-center h-auto flex-row items-center justify-end md:hidden"
          animate={{ x: ['20%', '400%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}>

          {images.concat(images).map((img, index) => (
            <Image
              key={index}
              src={img.src}
              alt="AI Conversation"
              width={img.width}
              height={img.height}
              className={`rounded-lg w-full h-full `}
              priority
              unoptimized
            />
          ))}
        </motion.div>
      </motion.div>
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
