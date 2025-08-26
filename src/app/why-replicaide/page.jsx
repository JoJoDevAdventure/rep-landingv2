"use client";
import ContactPopup from "@/components/ContactPopup";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useState } from "react";

// Dynamically import components with `ssr: false` to disable server-side rendering
const LiveTranscription = dynamic(() => import("./LiveTranscription"), {
  ssr: false,
});
const ComparisonChart = dynamic(() => import("./Comparison"), { ssr: false });
const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });

const page = () => {
  const [visitors, setVisitors] = useState(2000);
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Fixed assumptions (match your main calculator)
  const E = 0.25; // 25% engage
  const C = 0.20; // 20% request call
  const M = 0.30; // 30% missed calls baseline
  const AS = 0.30; // 30% answered -> appointment
  const S = 0.25; // 25% appointment -> sale
  const AOV = 500; // $500 average deal size

  const engaged = visitors * E;
  const callReq = engaged * C;

  // Baseline (with missed calls)
  const missedBase = callReq * M;
  const answeredBase = callReq - missedBase;
  const apptsBase = answeredBase * AS;
  const closedBase = apptsBase * S;
  const revenueBaseMonthly = closedBase * AOV;

  // With ReplicAIDE (0% missed)
  const answeredWith = callReq;
  const apptsWith = answeredWith * AS;
  const closedWith = apptsWith * S;
  const revenueWithMonthly = closedWith * AOV;

  const incrMonthly = Math.max(0, revenueWithMonthly - revenueBaseMonthly);
  const incrYearly = incrMonthly * 12;

  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const fmtInt = new Intl.NumberFormat("en-US");

  return (
    <main>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Replicaide",
            url: "https://replicaide.com",
            logo: "https://replicaide.com/logo.png",
            sameAs: [
              "https://twitter.com/ReplicaideAI",
              "https://linkedin.com/company/replicaide",
              "https://facebook.com/Replicaide",
            ],
          }),
        }}
      />
      <NavBar />

      {/* 1) Hero Hook */}
      <section className="px-6 md:px-10 pt-28 pb-16 max-w-6xl mx-auto text-center">
        <p className="text-xs tracking-widest text-gray-500 mb-3">WITH OUR QUICK ROI CALCULATOR</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Never Miss a Call Again</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Turn cold website traffic into booked appointments and closed deals with ReplicAIDE.
        </p>
        <a
          href="/calculator"
          className="inline-flex items-center justify-center rounded-xl border border-black px-5 py-3 font-semibold hover:bg-black hover:text-white transition"
        >
          Calculate My ROI →
        </a>
      </section>

      {/* 2) Problem → Solution Context */}
      <section className="px-6 md:px-10 py-12 max-w-6xl mx-auto border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-p1">Problem</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Most businesses miss <span className="font-semibold">20–40% of inbound calls</span>.</li>
              <li>Every missed call = lost revenue and unhappy customers.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-p1">Solution</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Remove your public website phone number.</li>
              <li>Every request is intercepted and routed: forwarded only when a human is available, or automatically booked as a callback/meeting.</li>
              <li>Result: <span className="font-semibold">Zero missed calls</span>, more deals closed, lower staffing cost.</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          See your numbers below — then run the calculator to quantify your exact impact.
        </p>
      </section>

      {/* 3) Calculator (Engagement) — teaser with quick visual and CTA to full calculator */}
      <section className="px-6 md:px-10 py-12 max-w-6xl mx-auto border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Inputs teaser */}
          <div className="rounded-xl border border-p1/50 p-6">
            <h4 className="font-semibold mb-4 text-p1">Your Inputs</h4>
            <label className="block text-sm mb-4">
              <span className="text-gray-700">Website Visitors</span>
              <input
                type="range"
                min={0}
                max={100000}
                step={100}
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="mt-2 w-full h-2 rounded-lg accent-p1"
              />
              <span className="text-xs text-gray-500">{fmtInt.format(visitors)} / year</span>
            </label>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span>% Engage</span><span className="font-semibold">25%</span></div>
              <div className="flex items-center justify-between"><span>% Request Call</span><span className="font-semibold">20%</span></div>
              <div className="flex items-center justify-between"><span>Appointment→Sale</span><span className="font-semibold">25%</span></div>
              <div className="flex items-center justify-between"><span>Average Deal Size</span><span className="font-semibold">$500</span></div>
            </div>
            <a href="/calculator?tab=engagement" className="mt-6 inline-block text-sm font-semibold underline">Open full calculator →</a>
          </div>

          {/* Outputs teaser */}
          <div className="rounded-xl border border-p1/50 p-6">
            <h4 className="font-semibold mb-4 text-p1">Projected Results</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg border p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">Baseline</div>
                <div className="text-2xl font-bold">{fmt.format(revenueBaseMonthly * 12)}</div>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">ReplicAIDE</div>
                <div className="text-2xl font-bold text-green-600">{fmt.format(revenueWithMonthly * 12)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) ROI & Social Proof */}
      <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto text-center border-t">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{fmt.format(incrYearly)} More Revenue per Year</h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">“Clients using ReplicAIDE increased booked calls by 40%.”</p>
        <button
          onClick={(e) => { e.preventDefault(); setPopupOpen(true); }}
          className="inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-3 font-semibold hover:bg-black/90"
        >
          Talk to Us About Implementation →
        </button>
      </section>

      <ContactPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />

      <Footer />
    </main>
  );
};

export default page;
