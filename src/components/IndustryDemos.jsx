'use client';

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const IndustryDemos = () => {
  const demos = [

    {
      id: 1,
      industry: "Automotive Dealership",
      title: "Convert Shoppers Into Showroom Visits",
      description: "See our AI agent assist car buyers with vehicle inventory questions, financing options, trade-in estimates, and test drive appointments—turning website visitors into qualified leads.",
      videoSrc: "/demo-1.mp4",
      tag: "Auto Sales"
    },
    {
      id: 2,
      industry: "Real Estate",
      title: "Qualify Leads & Book Tours Instantly",
      description: "Watch how our AI agent engages property seekers, answers questions about listings, qualifies buyer intent, and schedules property viewings—all while capturing valuable lead data.",
      videoSrc: "/demo-2.mp4",
      tag: "Property Management"
    },
    {
      id: 3,
      industry: "Restaurantes",
      title: "Reservas y Pedidos en Español",
      description: "Mira cómo nuestro agente de IA multilingüe ayuda a los clientes con reservas, menús especiales, y pedidos para llevar—todo en español con fluidez natural.",
      videoSrc: "/demo-3.mp4",
      tag: "Hospitalidad"
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See ReplicAIDE in Action Across Industries
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            From real estate to automotive to hospitality, our AI agents deliver personalized conversations in any language—24/7.
          </p>
        </motion.div>

        {/* Demos Grid */}
        <div className="space-y-12 md:space-y-16">
          {demos.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoCard = ({ demo, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play();
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

  // Alternate layout: even indices (0, 2, 4...) have video on left, odd on right
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        !isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Content */}
      <div className={`flex flex-col justify-center ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="mb-4">
          <span className="inline-block bg-p1/10 text-p1 px-4 py-2 rounded-full text-sm font-semibold">
            {demo.tag}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {demo.title}
        </h3>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          {demo.description}
        </p>
      </div>

      {/* Video Player */}
      <div className={`${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            loop
            muted
            className="w-full h-full object-cover"
          >
            <source src={demo.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

          {/* Play button overlay */}
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-p1 rounded-full p-6 shadow-2xl"
              >
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* Control Bar */}
          {isPlaying && (
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
      </div>
    </motion.div>
  );
};

export default IndustryDemos;
