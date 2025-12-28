'use client';

import { motion } from "framer-motion";
import { useState } from "react";

const industries = [
  {
    id: "retail",
    tab: "Retail Volume & Loyalty",
    title: "Create instant conversations that convert and feed loyalty insights",
    description: "AIDE eliminates form abandonment and replaces it with real-time conversations that capture intent and sentiment. ReplicAIDE enriches the CRM with every detail so loyalty, retention, and customer experience strategies are based on real human signals.",
    cooMessage: "Do not ditch your CRM. Ditch the data entry. Every post-call update is automated. You save hours of labor while keeping records complete and accurate.",
    cmoMessage: "Turn your CRM into a self-updating engine. Every call becomes sentiment data that enables targeted loyalty growth.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "luxury",
    tab: "Luxury Assets & Leasing",
    title: "Match luxury experiences with luxury-level intelligence and responsiveness",
    description: "High-value prospects expect immediate attention. AIDE delivers it with no wait times. ReplicAIDE captures full context so executives can focus on relationships instead of administration.",
    cooMessage: "Achieve zero-touch data hygiene at scale. Executives stay focused on selling, not typing.",
    ceoMessage: "The context your CRM is missing, delivered automatically. No missed details, no admin burden, no friction in your luxury customer journey.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "financial",
    tab: "Financial Services",
    title: "Accuracy, consistency, and compliance built into every interaction",
    description: "Every call is logged identically and accurately. ReplicAIDE ensures perfect, auditable records for compliance and risk management.",
    cioMessage: "Achieve zero-touch data hygiene at scale. Removes human error and ensures compliant, secure data.",
    eaMessage: "Turn your CRM into a self-updating engine. Conversations become structured data aligned with enterprise architecture.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "realestate",
    tab: "Real Estate",
    title: "Capture every lead. Preserve every detail. Strengthen every relationship",
    description: "Real estate teams lose hours manually updating pipelines. ReplicAIDE updates contact records automatically and captures hyper-local intent.",
    cooMessage: "Do not ditch your CRM. Ditch the data entry. Agents save hours weekly and pipelines stay clean.",
    cmoMessage: "The context your CRM is missing, delivered automatically. Conversations reveal hyper-local buyer intent and demand.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: "publicsector",
    tab: "Public Sector & Government",
    title: "Efficiency, Data Integrity, and Constituent Satisfaction",
    description: "Modernize Public Service Without the Infrastructure Bloat. AIDE replaces long wait times and fragmented intake with instant, secure dialogue. It bridges the gap between legacy systems and modern expectations, ensuring every resident interaction is captured with absolute accuracy.",
    cooMessage: "Ditch the manual intake. Stop the data entry bottleneck. AIDE captures constituent details and licensing inquiries in real-time, automating updates to your system of record without human intervention.",
    cioMessage: "Scale your agency's reach. Turn public feedback into actionable service improvements. Every interaction provides sentiment data that helps IT leaders identify bottlenecks and streamline public-facing operations.",
    gradient: "from-indigo-500 to-blue-600"
  },
  {
    id: "ecommerce",
    tab: "High-Growth eCommerce",
    title: "Cart Recovery, Support Automation, and Customer Retention",
    description: "Turn Support Queries into Completed Checkouts. AIDE eliminates the 'support ticket' wait and replaces it with real-time shopping assistance. Whether it's a question about a product or a return request, ReplicAIDE engages customers instantly to prevent cart abandonment and build brand trust.",
    cooMessage: "Automate the 'Support Grind.' From tracking orders to processing returns, AIDE handles the repetitive inquiries that drain your team's time. You save on overhead while providing 24/7 elite-level service.",
    cmoMessage: "Recover every abandoned cart. Don't let a simple question stop a sale. AIDE identifies shopper friction and provides instant answers, feeding intent data back into your CRM to fuel personalized re-engagement and loyalty.",
    gradient: "from-pink-500 to-rose-500"
  }
];

const IndustryTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built for Your Industry
          </h2>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-12">
          {industries.map((industry, index) => (
            <button
              key={industry.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
                activeTab === index
                  ? `bg-gradient-to-r ${industry.gradient} text-white shadow-lg scale-105`
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {industry.tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200"
        >
          <div className={`inline-block bg-gradient-to-r ${industries[activeTab].gradient} bg-clip-text text-transparent mb-4`}>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {industries[activeTab].title}
            </h3>
          </div>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            {industries[activeTab].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {industries[activeTab].eaMessage && (
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-l-4 border-teal-500">
                <p className="text-base text-gray-700 leading-relaxed">
                  {industries[activeTab].eaMessage}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryTabs;
