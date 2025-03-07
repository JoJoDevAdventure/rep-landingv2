import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { motion } from "framer-motion";

import { fadeUpVariants } from "@/Components/Animations";
// Sample data
const originalData = [
  {
    region: "Chinese/Japanese/Korean",
    speechmaticsWER: 7,
    competitorWER: [9, 12, 17, 20],
  },
  {
    region: "Western Europe",
    speechmaticsWER: 9,
    competitorWER: [24, 20, 14, 11],
  },
  {
    region: "Eastern Europe",
    speechmaticsWER: 8,
    competitorWER: [31, 20, 11, 15],
  },
  {
    region: "South-East Asia",
    speechmaticsWER: 10,
    competitorWER: [12, 24, 38, 52],
  },
  {
    region: "Middle-East/North-Africa",
    speechmaticsWER: 15,
    competitorWER: [17, 22, 24, 21],
  },
  {
    region: "South-Asia",
    speechmaticsWER: 24,
    competitorWER: [21, 24, 59, 70],
  },
];

// Transform data for scatters
const speechmaticsData = originalData.map((d) => ({
  region: d.region,
  wer: d.speechmaticsWER,
}));

// Flatten competitor data into one array for single "Competitor" legend
const competitorData = originalData.flatMap((d) =>
  d.competitorWER.map((wer) => ({ region: d.region, wer }))
);

// Custom legend to show only "Replicaide" & "Competitor"
const renderCustomLegend = () => {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <div className="flex items-center gap-2">
        <span
          style={{
            backgroundColor: "#f8931f",
            width: 12,
            height: 12,
            display: "inline-block",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />
        <span className="text-gray-800 font-medium">Replicaide</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          style={{
            backgroundColor: "#fff500",
            width: 10,
            height: 10,
            display: "inline-block",
            borderRadius: "50%",
          }}
        />
        <span className="text-gray-800 font-medium">Competitor</span>
      </div>
    </div>
  );
};

const WordErrorRateChart = () => {
  return (
    <div className="w-full h-[700px] bg-white p-4 rounded-lg container py-12">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.7 }}
        variants={fadeUpVariants}
        className="text-gray-600 text-center mt-2"
      >
        Word Error Rate by Region
      </motion.p>
      {/* Title & Subtitle */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.7 }}
        variants={fadeUpVariants}
        className="text-3xl md:text-4xl font-light text-black font-klik text-center"
      >
        Consistent, Reliable, Unmatched.
      </motion.h2>
      <ResponsiveContainer width="100%" height="80%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 50, // Increased for rotated labels
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="region"
            type="category"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fontSize: 12 }}
            allowDuplicatedCategory={false} // Prevents duplicate labels
          />
          <YAxis
            type="number"
            name="Word Error Rate"
            domain={[0, 100]}
            allowDataOverflow={true}
            tickCount={11}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend content={renderCustomLegend} />

          {/* Competitor (aggregated under one legend) */}
          <Scatter
            name="Competitors"
            data={competitorData}
            dataKey="wer"
            fill="#fff500"
            shape="circle"
          />

          {/* Speechmatics / Replicaide */}
          <Scatter
            name="Replicaide"
            data={speechmaticsData}
            dataKey="wer"
            fill="#f8931f"
            shape="diamond"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WordErrorRateChart;
