"use client";

import ContactPopup from "@/components/ContactPopup";
import NavBar from "@/components/NavBar";
import { useMemo, useState } from "react";

// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────
const toNumber = (v) => {
  if (typeof v === "number") return v;
  const s = String(v).trim();
  const cleaned = s.endsWith("%") ? s.slice(0, -1) : s;
  const n = parseFloat(cleaned.replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? 0 : n;
};

const fmtCurrency0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const fmtDec2 = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fmtInt = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

// ────────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  // Store all percentages as DECIMALS internally (e.g. 0.25 for 25%)
  const [inputs, setInputs] = useState({
    v: 1000,  // Website Visitors / month
    e: 0.10,  // fixed 10%
    c: 0.20,  // fixed 20%
    m: 0.30,
    s: 0.25,  // fixed 25%
    aov: 500,
    as: 0.30, // fixed 30%
  });

  const [isPopupOpen, setPopupOpen] = useState(false);

  const set = (key) => (val) => setInputs((p) => ({ ...p, [key]: val }));

  const calc = useMemo(() => {
    const V = Math.max(0, toNumber(inputs.v));
    const E = Math.max(0, toNumber(inputs.e));
    const C = Math.max(0, toNumber(inputs.c));
    const M = Math.max(0, toNumber(inputs.m));
    const S = Math.max(0, toNumber(inputs.s));
    const AOV = Math.max(0, toNumber(inputs.aov));
    const AS = Math.max(0, toNumber(inputs.as));

    // Funnel
    const engaged = V * E; // visitors * engage%
    const callReq = engaged * C; // engaged * call%

    // Baseline (with missed calls)
    const missedBase = callReq * M;
    const answeredBase = Math.max(0, callReq - missedBase);
    const apptsBase = answeredBase * AS;
    const closedBase = apptsBase * S;
    const revenueBase = closedBase * AOV;

    // With ReplicAIDE (0% missed)
    const missedWith = 0;
    const answeredWith = callReq;
    const apptsWith = answeredWith * AS;
    const closedWith = apptsWith * S;
    const revenueWith = closedWith * AOV;

    const incrClosed = closedWith - closedBase;
    const incrMonthly = revenueWith - revenueBase;
    const incrYearly = incrMonthly * 12;

    return {
      engaged,
      callReq,
      baseline: { missed: missedBase, appts: apptsBase, revenue: revenueBase },
      withRep: { missed: missedWith, appts: apptsWith, revenue: revenueWith },
      roi: { incrClosed, incrMonthly, incrYearly },
    };
  }, [inputs]);

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="mx-auto max-w-6xl px-4 py-10 pt-28">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">ReplicAIDE — Zero Missed Calls ROI Calculator</h1>
        </header>

        {/* Top split: sliders (left) and big numbers (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Sliders */}
          <section className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4">Inputs</h2>
            <div className="space-y-5">
              <SliderRow
                label="Website Visitors per Month (V)"
                min={0}
                max={100000}
                step={100}
                value={inputs.v}
                onChange={(n) => set("v")(n)}
                valueRender={(n) => fmtInt.format(n)}
              />
              <SliderRow
                label="Calls (M%) — Missed Call Rate"
                min={0}
                max={100}
                step={1}
                value={inputs.m * 100}
                onChange={(n) => set("m")(n / 100)}
                valueRender={(n) => `${fmtInt.format(n)}%`}
                yellow
              />
              <SliderRow
                label="Average Deal Size (AOV)"
                min={0}
                max={5000}
                step={25}
                value={inputs.aov}
                onChange={(n) => set("aov")(n)}
                valueRender={(n) => fmtCurrency0.format(n)}
                prefix="$"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Fixed Assumptions</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 bg-gray-100 rounded-full">Engage with Widget: 10%</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Call: 20%</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Call-to-Sale: 25%</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full">Answered → Appointment: 30%</span>
              </div>
            </div>
          </section>

          {/* RIGHT: Big Numbers */}
          <section className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4">With vs Without ReplicAIDE</h2>
            <div className="grid grid-cols-2 gap-6">
              <BigNumberCard
                title="Missed Calls"
                leftLabel="Baseline"
                rightLabel="ReplicAIDE"
                leftValue={fmtInt.format(Math.round(calc.baseline.missed))}
                rightValue={fmtInt.format(Math.round(calc.withRep.missed))}
              />
              <BigNumberCard
                title="Booked Appointments"
                leftLabel="Baseline"
                rightLabel="ReplicAIDE"
                leftValue={fmtInt.format(Math.round(calc.baseline.appts))}
                rightValue={fmtInt.format(Math.round(calc.withRep.appts))}
              />
              <BigNumberCard
                title="Monthly Revenue"
                full
                leftLabel="Baseline"
                rightLabel="ReplicAIDE"
                leftValue={fmtCurrency0.format(calc.baseline.revenue)}
                rightValue={fmtCurrency0.format(calc.withRep.revenue)}
              />
            </div>
                      <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="items-center rounded-lg bg-p1 px-5 py-3 text-white font-semibold hover:bg-p1/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black w-full text-center mt-4"
          >
            Start Free Trial
          </button>
          </section>
        </div>

        {/* Below: Funnel, ROI, Notes */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-1">
            <h3 className="font-semibold text-lg mb-3">Funnel Calculations</h3>
            <KV label="Engaged Visitors" value={fmtInt.format(Math.round(calc.engaged))} />
            <KV label="Call Requests" value={fmtInt.format(Math.round(calc.callReq))} />
          </section>

          <section className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
            <h3 className="font-semibold text-lg mb-3">ROI Summary</h3>
            <KV label="Incremental Closed Deals (per month)" value={fmtDec2.format(calc.roi.incrClosed)} />
            <KV label="Incremental Revenue (per month)" value={fmtCurrency0.format(calc.roi.incrMonthly)} />
            <KV label="Incremental Revenue (per year)" value={fmtCurrency0.format(calc.roi.incrYearly)} />
          </section>
        </div>

        {/* CTA: Free Trial */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="inline-flex items-center rounded-lg bg-black px-5 py-3 text-white font-semibold hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Start Free Trial
          </button>
        </div>

        {/* Popup */}
        <ContactPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />

        <section className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h4 className="font-semibold mb-2">NOTES</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Paradigm: Website → Engage → Call Requests → (Zero Missed Calls with ReplicAIDE) → Booked Appointments → Closed Deals → Revenue.</li>
            <li>Edit only yellow cells. Percent inputs can be decimals (e.g., 10% = 0.10) or suffixed with %.</li>
            <li>Baseline uses the provided missed-call percentage. ReplicAIDE assumes 0% missed calls via AI routing.</li>
            <li>ROI is calculated from closed deals using Appointment-to-Sale Conversion.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// UI Bits
// ────────────────────────────────────────────────────────────────────────────────
function SliderRow({ label, value, onChange, min = 0, max = 100, step = 1, valueRender, yellow = false, prefix }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{valueRender ? valueRender(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`mt-2 w-full h-2 rounded-lg appearance-none cursor-pointer ${yellow ? "accent-amber-500" : "accent-"}`}
      />
    </div>
  );
}

function BigNumberCard({ title, leftLabel, rightLabel, leftValue, rightValue, full = false }) {
  return (
    <div className={`border rounded-lg p-5 flex flex-col justify-between ${full ? "col-span-2" : ""}`}>
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <div className="text-xs text-gray-500 mb-1">{leftLabel}</div>
          <div className="text-3xl font-bold tracking-tight text-red-800">{leftValue}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">{rightLabel}</div>
          <div className="text-3xl font-bold tracking-tight text-emerald-600">{rightValue}</div>
        </div>
      </div>
    </div>
  );
}

function KV({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <span className="text-sm text-gray-700">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}