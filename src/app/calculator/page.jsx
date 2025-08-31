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
  // jess
  // Store all percentages as DECIMALS internally (e.g. 0.25 for 25%)
  const [inputs, setInputs] = useState({
    v: 1000, // Website Visitors / month
    e: 0.25, // fixed 25%
    c: 0.2, // fixed 20%
    m: 0.3,
    s: 0.25, // fixed 25%
    aov: 500,
    as: 0.3, // fixed 30%
  });

  const [isPopupOpen, setPopupOpen] = useState(false);

  const [isEditingAssumptions, setIsEditingAssumptions] = useState(false);
  const [assumptionEdits, setAssumptionEdits] = useState({
    e: inputs.e * 100,
    c: inputs.c * 100,
    s: inputs.s * 100,
    as: inputs.as * 100,
  });

  const [activeTab, setActiveTab] = useState("engagement");

  // Staffing calculator state and calculation
  const [staff, setStaff] = useState({
    employees: 10,
    dollarsPerHour: 20,
    hoursPerWeek: 40,
  });

  const staffCalc = useMemo(() => {
    const emp = Math.max(0, toNumber(staff.employees));
    const dph = Math.max(0, toNumber(staff.dollarsPerHour));
    const hpw = Math.max(0, toNumber(staff.hoursPerWeek));
    const weeklyLabor = emp * dph * hpw; // $/week

    const weeklyPlanCost = 0; // Start Plan: $1/min — not applied here without minutes input
    const savedPerWeek = Math.max(0, weeklyLabor - weeklyPlanCost);
    const savedPerMonth = savedPerWeek * 4; // 4-week month, per reference
    const savedPerYear = savedPerWeek * 52; // 52 weeks

    return { weeklyLabor, weeklyPlanCost, savedPerWeek, savedPerMonth, savedPerYear };
  }, [staff]);

  const startEditAssumptions = () => {
    setAssumptionEdits({
      e: inputs.e * 100,
      c: inputs.c * 100,
      s: inputs.s * 100,
      as: inputs.as * 100,
    });
    setIsEditingAssumptions(true);
  };

  const saveAssumptions = () => {
    setInputs((p) => ({
      ...p,
      e: Math.max(0, Math.min(100, toNumber(assumptionEdits.e))) / 100,
      c: Math.max(0, Math.min(100, toNumber(assumptionEdits.c))) / 100,
      s: Math.max(0, Math.min(100, toNumber(assumptionEdits.s))) / 100,
      as: Math.max(0, Math.min(100, toNumber(assumptionEdits.as))) / 100,
    }));
    setIsEditingAssumptions(false);
  };

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
          <h1 className="text-3xl font-bold tracking-tight">
            ReplicAIDE Agent ROI Calculator
          </h1>
        </header>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b">
          <button
            type="button"
            onClick={() => setActiveTab("engagement")}
            className={`px-4 py-2 text-sm font-semibold -mb-px border-b-2 ${
              activeTab === "engagement"
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            Engagement
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("staff")}
            className={`px-4 py-2 text-sm font-semibold -mb-px border-b-2 ${
              activeTab === "staff"
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            Staffing Cost
          </button>
        </div>

        {activeTab === "engagement" && (
          <>
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
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Fixed Assumptions
                    </h3>
                    {!isEditingAssumptions ? (
                      <button
                        type="button"
                        onClick={startEditAssumptions}
                        className="text-xs font-semibold text-gray-700 hover:text-black"
                      >
                        Edit
                      </button>
                    ) : null}
                  </div>

                  {!isEditingAssumptions ? (
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        Engage with Widget: {fmtInt.format(inputs.e * 100)}%
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        Call: {fmtInt.format(inputs.c * 100)}%
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        Call-to-Sale: {fmtInt.format(inputs.s * 100)}%
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        Answered → Appointment: {fmtInt.format(inputs.as * 100)}
                        %
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <EditRow
                        label="Engage with Widget (%)"
                        value={assumptionEdits.e}
                        onChange={(v) =>
                          setAssumptionEdits((p) => ({ ...p, e: v }))
                        }
                      />
                      <EditRow
                        label="Call (%)"
                        value={assumptionEdits.c}
                        onChange={(v) =>
                          setAssumptionEdits((p) => ({ ...p, c: v }))
                        }
                      />
                      <EditRow
                        label="Call-to-Sale (%)"
                        value={assumptionEdits.s}
                        onChange={(v) =>
                          setAssumptionEdits((p) => ({ ...p, s: v }))
                        }
                      />
                      <EditRow
                        label="Answered → Appointment (%)"
                        value={assumptionEdits.as}
                        onChange={(v) =>
                          setAssumptionEdits((p) => ({ ...p, as: v }))
                        }
                      />
                      <div className="flex gap-3 pt-1">
                        <button
                          type="button"
                          onClick={saveAssumptions}
                          className="rounded-md bg-black text-white text-xs font-semibold px-3 py-2"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingAssumptions(false)}
                          className="rounded-md border text-xs font-semibold px-3 py-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* RIGHT: Big Numbers */}
              <section className="bg-white rounded-xl shadow-sm border p-6">
                <div className="mb-6 text-center border rounded-lg p-5 flex flex-col justify-between ">
                  <div className="text-sm font-semibold text-gray-600 mb-1">
                    Your ROI with ReplicAIDE
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-600">
                    {fmtCurrency0.format(calc.withRep.revenue * 12)}
                  </div>
                </div>
                <h2 className="font-semibold text-lg mb-4 text-center">
                  With vs Without ReplicAIDE
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <BigNumberCard
                    title="Yearly Missed Calls"
                    leftLabel="Baseline"
                    rightLabel="ReplicAIDE"
                    leftValue={fmtInt.format(
                      Math.round(calc.baseline.missed * 12)
                    )}
                    rightValue={fmtInt.format(
                      Math.round(calc.withRep.missed * 12)
                    )}
                  />
                  <BigNumberCard
                    title="Yearly Booked Appointments"
                    leftLabel="Baseline"
                    rightLabel="ReplicAIDE"
                    leftValue={fmtInt.format(
                      Math.round(calc.baseline.appts * 12)
                    )}
                    rightValue={fmtInt.format(
                      Math.round(calc.withRep.appts * 12)
                    )}
                  />
                  <BigNumberCard
                    title="Yearly Revenue"
                    full
                    leftLabel="Baseline"
                    rightLabel="ReplicAIDE"
                    leftValue={fmtCurrency0.format(calc.baseline.revenue * 12)}
                    rightValue={fmtCurrency0.format(calc.withRep.revenue * 12)}
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
                <h3 className="font-semibold text-lg mb-3">
                  Funnel Calculations
                </h3>
                <KV
                  label="Engaged Visitors"
                  value={fmtInt.format(Math.round(calc.engaged))}
                />
                <KV
                  label="Call Requests"
                  value={fmtInt.format(Math.round(calc.callReq))}
                />
              </section>

              <section className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
                <h3 className="font-semibold text-lg mb-3">ROI Summary</h3>
                <KV
                  label="Incremental Closed Deals (per month)"
                  value={fmtDec2.format(calc.roi.incrClosed)}
                />
                <KV
                  label="Incremental Revenue (per month)"
                  value={fmtCurrency0.format(calc.roi.incrMonthly)}
                />
                <KV
                  label="Incremental Revenue (per year)"
                  value={fmtCurrency0.format(calc.roi.incrYearly)}
                />
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
            <ContactPopup
              isOpen={isPopupOpen}
              onClose={() => setPopupOpen(false)}
            />

            <section className="mt-8 bg-white rounded-xl shadow-sm border p-6">
              <h4 className="font-semibold mb-2">NOTES</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>
                  Paradigm: Website → Engage → Call Requests → (Zero Missed
                  Calls with ReplicAIDE) → Booked Appointments → Closed Deals →
                  Revenue.
                </li>
                <li>
                  Baseline uses the provided missed-call percentage. ReplicAIDE
                  assumes 0% missed calls via AI routing.
                </li>
                <li>
                  ROI is calculated from closed deals using Appointment-to-Sale
                  Conversion.
                </li>
              </ul>
            </section>
          </>
        )}

        {activeTab === "staff" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LEFT: Sliders & plan */}
            <section className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="font-semibold text-lg mb-6">Explore AIDE’s Impact</h2>

              <div className="space-y-8">
                <SliderRow
                  label="Number of Employees"
                  min={0}
                  max={500}
                  step={1}
                  value={staff.employees}
                  onChange={(n) => setStaff((p) => ({ ...p, employees: n }))}
                  valueRender={(n) => `${fmtInt.format(n)} Employees`}
                />

                <SliderRow
                  label="Dollars per Hour"
                  min={0}
                  max={200}
                  step={1}
                  value={staff.dollarsPerHour}
                  onChange={(n) => setStaff((p) => ({ ...p, dollarsPerHour: n }))}
                  valueRender={(n) => fmtCurrency0.format(n) + " per Hour"}
                />

                <SliderRow
                  label="Hours per Week per Employee"
                  min={0}
                  max={80}
                  step={1}
                  value={staff.hoursPerWeek}
                  onChange={(n) => setStaff((p) => ({ ...p, hoursPerWeek: n }))}
                  valueRender={(n) => `${fmtInt.format(n)} Hours/Week`}
                />
              </div>
            </section>

            {/* RIGHT: Savings */}
            <section className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-center">
              <div className="mx-auto w-full max-w-md border rounded-xl p-8 text-center">
                <div className="mb-8">
                  <div className="text-4xl font-extrabold">{fmtCurrency0.format(staffCalc.savedPerWeek)}</div>
                  <div className="mt-1 text-sm text-gray-600">Saved per Week</div>
                </div>
                <div className="mb-8">
                  <div className="text-4xl font-extrabold">{fmtCurrency0.format(staffCalc.savedPerMonth)}</div>
                  <div className="mt-1 text-sm text-gray-600">Saved per Month</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold">{fmtCurrency0.format(staffCalc.savedPerYear)}</div>
                  <div className="mt-1 text-sm text-gray-600">Saved per Year</div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// UI Bits
// ────────────────────────────────────────────────────────────────────────────────
function SliderRow({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  valueRender,
  yellow = false,
  prefix,
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {valueRender ? valueRender(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`mt-2 w-full h-2 rounded-lg appearance-none cursor-pointer ${
          yellow ? "accent-amber-500" : "accent-gray-900"
        }`}
      />
    </div>
  );
}

function EditRow({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-600">{label}</span>
      <input
        type="number"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
      />
    </label>
  );
}

function BigNumberCard({
  title,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  full = false,
}) {
  return (
    <div
      className={`border rounded-lg p-5 flex flex-col justify-between ${
        full ? "col-span-2" : ""
      }`}
    >
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <div className="text-xs text-gray-500 mb-1">{leftLabel}</div>
          <div className="text-3xl font-bold tracking-tight text-red-800">
            {leftValue}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 mb-1">{rightLabel}</div>
          <div className="text-3xl font-bold tracking-tight text-emerald-600">
            {rightValue}
          </div>
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
