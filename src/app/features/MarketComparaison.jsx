import { motion } from 'framer-motion';

// Comparison data for the right panel
const comparisonData = [
  { value: '+17.9%', competitor: 'Amazon', logo: '/amazon.svg' },
  { value: '+75.7%', competitor: 'Assembly AI', logo: '/assembly.svg' },
  { value: '+45.9%', competitor: 'Deepgram', logo: '/deepgram.svg' },
  { value: '+53.2%', competitor: 'Google', logo: '/google.svg' },
  { value: '+38.0%', competitor: 'Microsoft', logo: '/miscrosoft2.svg' },
  { value: '+42.4%', competitor: 'OpenAI', logo: '/openai.svg' },
];

const MarketComparison = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Left Panel - Text Content */}
        <motion.div 
          className="md:w-1/2 w-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Market Comparison</h2>
          <p className="text-s2 text-lg mb-4">
            Our enhanced model has already been benchmarked as the leader in our market. Ursa 2 improves on these benchmarks across all of our 50+ supported languages.
          </p>
          <p className="mb-4">
            Some highlights:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Our Spanish WER is just 3.3 (that’s 96.7% accuracy), the best on the market.</li>
            <li>Our Polish WER is just 4.4 (that’s 95.4% accuracy), the best on the market.</li>
          </ul>
          <p>
            In cases where we have the lowest WER, often our lead is significant...
          </p>
        </motion.div>

        {/* Right Panel - Comparison Cards */}
        <motion.div 
          className="md:w-1/2 w-full grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {comparisonData.map((item, index) => (
            <motion.div
              key={index}
              className="border-l-2 border-p1 p-4 rounded-lg flex flex-col items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p className="text-green-600 text-5xl font-klik font-medium mb-2">{item.value}</p>
              <div className='flex justify-center items-center gap-4'>

              <img src={item.logo} alt={`${item.competitor} logo`} className="w-8 h-8 mb-2" />
              <p className="text-sm">vs {item.competitor}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarketComparison;