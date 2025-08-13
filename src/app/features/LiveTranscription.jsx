"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";
import { fadeUpVariants } from "../../components/Animations";

// Sample data structure for sentences with timestamps
const sampleSentences = [
  { text: "That’s so root causes of the conflict", timestamp: 0.0, translation: "Voilà les causes profondes du conflit" },
  { text: "in Putin’s head is existence of Ukraine", timestamp: 2.5, translation: "dans la tête de Poutine : l'existence de l'Ukraine" },
  { text: "as an independent, sovereign nation", timestamp: 5.0, translation: "en tant qu'indépendante, une nation souveraine" },
  { text: "with a powerful military backed by the West", timestamp: 7.5, translation: "dotée d'une puissante armée soutenue par l'Occident" },
  { text: "and having strong aspirations to join NATO.", timestamp: 10.0, translation: "et ayant de fortes aspirations à rejoindre l'OTAN." },
];

const LiveTranscription = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [displayedTranscription, setDisplayedTranscription] = useState("");
  const [displayedTranslation, setDisplayedTranslation] = useState("");
  const [sentences] = useState(sampleSentences);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 0.1);
      }, 100); // Update every 100ms
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Update displayed text based on current time
  useEffect(() => {
    const currentSentences = sentences.filter(
      (sentence) => sentence.timestamp <= currentTime
    );
    
    if (currentSentences.length > 0) {
      // Join all sentences up to current time
      const transcriptionText = currentSentences
        .map(sentence => sentence.text)
        .join(" ");
      const translationText = currentSentences
        .map(sentence => sentence.translation)
        .join(" ");
      
      setDisplayedTranscription(transcriptionText);
      setDisplayedTranslation(translationText);
    }
    
    // Reset when all sentences are displayed and timer exceeds last timestamp
    const lastTimestamp = sentences[sentences.length - 1].timestamp;
    if (currentTime > lastTimestamp + 1) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentTime, sentences]);

  const handlePlayPause = () => {
    if (!isPlaying && currentTime >= sentences[sentences.length - 1].timestamp) {
      setCurrentTime(0); // Reset to start if finished
      setDisplayedTranscription("");
      setDisplayedTranslation("");
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="w-full py-16 flex flex-col items-center px-6 md:px-16 mt-24">
      {/* Title & Subtitle */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.7 }}
        variants={fadeUpVariants}
        className="text-3xl md:text-4xl font-light text-black font-klik text-center"
      >
        The proof is in the pudding. Or budino. Or मिठाई.
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.7 }}
        variants={fadeUpVariants}
        className="text-gray-600 text-center mt-2"
      >
        Live transcription and translation both shown, in{" "}
        <span className="text-p1 font-semibold">real-time</span>.
      </motion.p>

      {/* Transcription Container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeUpVariants}
        className="mt-10 w-full max-w-5xl bg-p1/10 rounded-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Live Input */}
          <div className="flex flex-col items-left p-4">
            <span className="text-sm text-gray-500">01</span>
            <h3 className="text-lg font-semibold text-p1">Live input</h3>
            <div className="w-24 h-24 my-6 bg-gray-300 rounded-full flex items-center justify-center">
              <div className={`w-16 h-16 border-2 border-gray-600 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
            </div>

            {/* Audio Player */}
            <div className="w-full flex flex-col items-center mt-4">
              <select className="border px-4 py-2 text-sm rounded-lg bg-white w-full">
                <option>English to French (Friend TV Show)</option>
              </select>
              <div className="mt-4 flex items-center gap-3 w-full">
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 px-4 bg-p1/40 rounded-full flex items-center justify-center"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <FaVolumeUp className="text-gray-600 text-lg" />
                <input type="range" className="w-32 cursor-pointer" />
                <span className="text-sm text-gray-600">
                  {currentTime.toFixed(1)}s
                </span>
              </div>
            </div>
          </div>

          {/* Live Transcription */}
          <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md">
            <span className="text-sm text-gray-500">02</span>
            <h3 className="text-lg font-semibold text-p1">Live transcription</h3>
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              {displayedTranscription || "Waiting for input..."}
            </p>
          </div>

          {/* Live Translation */}
          <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md">
            <span className="text-sm text-gray-500">03</span>
            <h3 className="text-lg font-semibold text-p1">Live translation</h3>
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              {displayedTranslation || "En attente de l'entrée..."}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.7 }}
        variants={fadeUpVariants}
        className="text-sm text-gray-500 mt-6"
      >
        We offer real-time transcription, translation, summarization, support
        for 50 languages and more.{" "}
        <a href="#" className="text-p1 font-semibold">
          Learn more.
        </a>
      </motion.p>
    </section>
  );
};

export default LiveTranscription;