"use client";

import { useState } from "react";
import { FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";

const LiveTranscription = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full py-16 flex flex-col items-center px-6 md:px-16 mt-24" >
      {/* Title & Subtitle */}
      <h2 className="text-3xl md:text-4xl font-light text-black font-klik text-center">
        The proof is in the pudding. Or budino. Or मिठाई.
      </h2>
      <p className="text-gray-600 text-center mt-2">
        Live transcription and translation both shown, in{" "}
        <span className="text-p1 font-semibold">real-time</span>.
      </p>

      {/* Transcription Container */}
      <div className="mt-10 w-full max-w-5xl bg-p1/10 rounded-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Live Input */}
          <div className="flex flex-col items-left p-4">
            <span className="text-sm text-gray-500">01</span>
            <h3 className="text-lg font-semibold text-p1">Live input</h3>
            <div    className="w-24 h-24 my-6 bg-gray-300 rounded-full flex items-center justify-center">
              {/* Placeholder for input waveform */}
              <div className="w-16 h-16 border-2 border-gray-600 rounded-full animate-pulse"></div>
            </div>

            {/* Audio Player */}
            <div className="w-full flex flex-col items-center mt-4">
              <select className="border px-4 py-2 text-sm rounded-lg bg-white w-full">
                <option>English to French (Friend TV Show)</option>
              </select>
              <div className="mt-4 flex items-center gap-3 w-full">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 px-4 bg-p1/40 rounded-full flex items-center justify-center"
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <FaVolumeUp className="text-gray-600 text-lg" />
                <input type="range" className="w-32 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Live Transcription */}
          <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md">
            <span className="text-sm text-gray-500">02</span>
            <h3 className="text-lg font-semibold text-gray-800">
              Live transcription
            </h3>
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              That’s so root causes of the conflict in Putin’s head is
              existence of Ukraine as an independent, sovereign nation with a
              powerful military backed by the West and having strong aspirations
              to join NATO.
            </p>
          </div>

          {/* Live Translation */}
          <div className="flex flex-col items-start p-4 bg-white rounded-lg shadow-md">
            <span className="text-sm text-gray-500">03</span>
            <h3 className="text-lg font-semibold text-gray-800">
              Live translation
            </h3>
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              Voilà les causes profondes du conflit dans la tête de Poutine :
              l'existence de l'Ukraine en tant qu'indépendante, une nation
              souveraine dotée d'une puissante armée soutenue par l'Occident et
              ayant de fortes aspirations à rejoindre l'Union et l'OTAN.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-sm text-gray-500 mt-6">
        We offer real-time transcription, translation, summarization, support
        for 50 languages and more.{" "}
        <a href="#" className="text-p1 font-semibold">
          Learn more.
        </a>
      </p>
    </section>
  );
};

export default LiveTranscription;