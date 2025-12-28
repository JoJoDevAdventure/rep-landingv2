'use client';

import { motion } from "framer-motion";

const caseStudies = [
  {
    industry: "Retail",
    title: "From Static Forms to Active Loyalty",
    friction: "Customer loyalty programs often fail because static sign-up forms feel like homework.",
    shift: "Replace friction with conversation.",
    result: "ReplicAIDE drives higher enrollment by engaging shoppers in natural dialogue → Turning a \"form-fill\" into a relationship starter.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    industry: "Luxury",
    title: "Zero Latency for High-Value Leads",
    friction: "In luxury markets, a delayed response is a lost client. High-value leads expect immediate, elite-level attention.",
    shift: "Eliminate wait times entirely.",
    result: "Prospective buyers receive instant, personalized engagement the moment they express interest → Ensuring your brand is the first to the table.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    industry: "Financial Services",
    title: "Bulletproof Compliance",
    friction: "Manual call logging is prone to human error, creating massive administrative overhead and audit risks.",
    shift: "Automate the record-keeping process.",
    result: "Every interaction is logged with absolute accuracy and full compliance → Maintaining a perfect audit trail without the administrative burnout.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    industry: "Real Estate",
    title: "Reclaiming the Agent's Day",
    friction: "Agents spend hours fighting their CRM, manually updating lead statuses and correcting data entries.",
    shift: "Let the CRM update itself.",
    result: "ReplicAIDE handles the data entry autonomously → Keeping pipelines perfectly accurate while agents focus on closing.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    industry: "Public Sector",
    title: "Modernizing Constituent Services",
    friction: "Agencies face massive backlogs and manual intake bottlenecks that frustrate residents and overwhelm IT infrastructure.",
    shift: "Move from paper-heavy processes to secure, instant digital dialogue.",
    result: "CIOs eliminate the data entry lag in departments like the DMV or Licensing → Faster processing times and higher service satisfaction for the public.",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    industry: "eCommerce",
    title: "Turning Support into Sales",
    friction: "Unanswered questions about shipping, returns, or product specs lead to abandoned carts and lost revenue.",
    shift: "Replace the \"support ticket\" wait with real-time shopping assistance.",
    result: "AIDE handles the repetitive inquiries while updating the cart in real-time → Reducing support overhead and increasing checkout completion.",
    gradient: "from-pink-500 to-rose-500"
  }
];

const SocialProof = () => {
  return (
    <section className="relative w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Scale Your Impact Without Increasing Your Effort
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            How ReplicAIDE transforms customer engagement across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-6 md:px-0">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${study.gradient}`}></div>

              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${study.gradient} text-white`}>
                    {study.industry}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {study.title}
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">The Friction:</p>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {study.friction}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">The Shift:</p>
                    <p className="text-base text-gray-700 leading-relaxed">
                      {study.shift}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-500 mb-1">The Result:</p>
                    <p className="text-base text-gray-800 leading-relaxed font-medium">
                      {study.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
