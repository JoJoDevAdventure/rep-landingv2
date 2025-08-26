'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const competitors = [
  { name: "Microsoft", accuracy: 85 },
  { name: "Google", accuracy: 80 },
  { name: "Assembly", accuracy: 75 },
  { name: "Deepgram", accuracy: 73 },
];

const ComparisonChart = () => {
  const [selected, setSelected] = useState(competitors[0]);

  // Corrected data format for BarChart
  const chartData = [
    {
      name: "Replicaide vs " + selected.name,
      Replicaide: 97,
      [selected.name]: selected.accuracy,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 py-8 md:py-24 container">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <span className="px-3 py-1 text-sm font-semibold bg-yellow-200 text-yellow-800 rounded-md">
          Low-latency
        </span>
        <h2 className="text-3xl font-bold mt-4">
          Outperforming competition, even at low-latency
        </h2>
        <p className="mt-3 text-gray-600">
          Receive transcripts in a few hundred milliseconds.
        </p>
        <p className="mt-4 text-gray-700">
          Our real-time transcription produces <strong>25% fewer errors</strong> than Microsoft, <strong>50% fewer</strong> than Assembly AI, and <strong>70% fewer</strong> than Deepgram.
        </p>
        <button className="mt-5 px-4 py-2 bg-gray-900 text-white rounded-md">
          Hitting the mark with pinpoint accuracy
        </button>
      </div>

      {/* Right Section - Chart */}
      <div className="md:w-1/2 flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">
          Real-time accuracy at &lt;1 second latency
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ left: 40 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis type="number" domain={[60, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Replicaide" fill="#f8931f" name="Replicaide" barSize={100} />
            <Bar dataKey={selected.name} fill="#4f1200" name={selected.name} barSize={100} />
          </BarChart>
        </ResponsiveContainer>

        {/* Explore Buttons */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
          {competitors.map((comp) => (
            <motion.button
              key={comp.name}
              onClick={() => setSelected(comp)}
              className={`px-4 py-2 border rounded-md ${
                selected.name === comp.name
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900 border-gray-400"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              vs {comp.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;