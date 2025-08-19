"use client";

import NavBar from "@/components/NavBar";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const number = (v) => {
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? 0 : n;
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default function CalculatorPage() {
  const [missedInputs, setMissedInputs] = useState({
    inboundPerDay: 50,
    missedPerDay: 10,
    aov: 120,
  });

  const [employeeInputs, setEmployeeInputs] = useState({
    employees: 10,
    dollarsPerHour: 20,
    hoursPerWeek: 40,
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    company: "",
    website: "",
  });

  const onMissedSlide = (key) => (e) => {
    const val = Number(e.target.value);
    setMissedInputs((s) => ({ ...s, [key]: val }));
  };

  const onEmployeeSlide = (key) => (e) => {
    const val = Number(e.target.value);
    setEmployeeInputs((s) => ({ ...s, [key]: val }));
  };

  const onFormChange = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));
  const onSubmitTrial = async (e) => {
    e.preventDefault();
    let site = (form.website || "").trim();
    if (!site) return;
    site = site.replace(/\s+/g, "");
    site = site.replace(/^https?:\/\//i, "");
    // fire-and-forget contact creation
    try {
      await fetch("/api/contact/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name || "",
          email: form.email || "",
          phone: form.phone || "",
          industry: form.industry || "",
          company: form.company || "",
          website: site,
          from: "calculator",
        }),
      });
    } catch (err) {
      // ignore network errors for UX; still navigate
      console.error("contact/add failed", err);
    }
    router.push(`/demo?w=${encodeURIComponent(site)}`);
  };

  // Missed calls calculator
  const missed = useMemo(() => {
    const inbound = Math.max(0, number(missedInputs.inboundPerDay));
    const missedCalls = Math.min(Math.max(0, number(missedInputs.missedPerDay)), inbound);
    const aov = Math.max(0, number(missedInputs.aov));

    // Assumed recovery rate from missed calls (35%)
    const RECOVERY = 0.35;

    const dailySaved = missedCalls * aov * RECOVERY;
    const weekly = dailySaved * 7;
    const monthly = dailySaved * 30; // simple approx
    const yearly = dailySaved * 365;

    return { inbound, missedCalls, aov, recovery: RECOVERY, weekly, monthly, yearly };
  }, [missedInputs]);

  // Employees calculator
  const employee = useMemo(() => {
    const employees = Math.max(0, number(employeeInputs.employees));
    const rate = Math.max(0, number(employeeInputs.dollarsPerHour));
    const hours = Math.max(0, number(employeeInputs.hoursPerWeek));

    // Assumed efficiency improvement factor (15%).
    const EFFICIENCY = 0.15;

    const weekly = employees * rate * hours * EFFICIENCY;
    const monthly = weekly * 4; // approx
    const yearly = weekly * 52;

    return { employees, rate, hours, efficiency: EFFICIENCY, weekly, monthly, yearly };
  }, [employeeInputs]);

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="mx-auto max-w-6xl px-4 py-10 pt-32">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Missed Call → Lost Business Calculator
          </h1>
          <p className="text-gray-600 mt-2">
            Quickly estimate how many sales you lose to missed calls—and how
            much a textback/AI agent can recover.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Missed Calls Calculator */}
          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-8">
            <header>
              <h2 className="font-semibold text-lg">Missed Calls Calculator</h2>
              <p className="text-xs text-gray-500">We assume ~{Math.round(missed.recovery * 100)}% of missed calls can be recovered by AIDE.</p>
            </header>

            <SliderRow
              label="Inbound calls per day"
              min={0}
              max={500}
              step={1}
              value={missedInputs.inboundPerDay}
              onChange={onMissedSlide("inboundPerDay")}
              formatValue={(v) => `${v} / day`}
            />

            <SliderRow
              label="Missed calls per day"
              min={0}
              max={500}
              step={1}
              value={missedInputs.missedPerDay}
              onChange={onMissedSlide("missedPerDay")}
              formatValue={(v) => `${v} missed`}
            />

            <SliderRow
              label="Average Order Value (AOV)"
              min={0}
              max={2000}
              step={5}
              value={missedInputs.aov}
              onChange={onMissedSlide("aov")}
              formatValue={(v) => currency.format(v).replace(".00", "")}
            />
          </section>

          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-8">
            <h2 className="font-semibold text-lg">Estimated Savings</h2>
            <BigStat label="Saved per Week" value={currency.format(missed.weekly)} />
            <BigStat label="Saved per Month" value={currency.format(missed.monthly)} />
            <BigStat label="Saved per Year" value={currency.format(missed.yearly)} />

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-lg bg-p1 text-white px-5 py-3 font-semibold hover:opacity-90 transition w-full"
              >
                Get Free Trial
              </button>
              <p className="text-center text-xs text-gray-500 mt-1">No Credit Card required.</p>
            </div>
          </section>
        </div>

        {/* Employees Calculator (like the image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-8">
            <header>
              <h2 className="font-semibold text-lg">Employees Calculator</h2>
              <p className="text-xs text-gray-500">Assumes ~{Math.round(employee.efficiency * 100)}% efficiency improvement with AIDE.</p>
            </header>

            <SliderRow
              label="Number of Employees"
              min={1}
              max={200}
              step={1}
              value={employeeInputs.employees}
              onChange={onEmployeeSlide("employees")}
              formatValue={(v) => `${v} ${v === 1 ? "Employee" : "Employees"}`}
            />

            <SliderRow
              label="Dollars per Hour"
              min={5}
              max={200}
              step={1}
              value={employeeInputs.dollarsPerHour}
              onChange={onEmployeeSlide("dollarsPerHour")}
              formatValue={(v) => `${currency.format(v).replace(".00", "")} / hr`}
            />

            <SliderRow
              label="Hours per Week per Employee"
              min={1}
              max={60}
              step={1}
              value={employeeInputs.hoursPerWeek}
              onChange={onEmployeeSlide("hoursPerWeek")}
              formatValue={(v) => `${v} hrs / wk`}
            />
          </section>

          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-8">
            <h2 className="font-semibold text-lg">Estimated Savings</h2>
            <BigStat label="Saved per Week" value={currency.format(employee.weekly)} />
            <BigStat label="Saved per Month" value={currency.format(employee.monthly)} />
            <BigStat label="Saved per Year" value={currency.format(employee.yearly)} />
          </section>
        </div>

        {/* How it works */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold mb-2">How we calculate</h3>
          <p className="text-sm text-gray-700">Missed Calls: Missed/day × AOV × recovery (≈35%) × time window. Employees: Employees × $/hr × hrs/wk × efficiency (≈15%).</p>
        </section>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Start your free trial</h3>
              <button
                type="button"
                className="rounded-full p-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <form onSubmit={onSubmitTrial} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={onFormChange("name")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Full name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={onFormChange("email")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Phone number
                </span>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={onFormChange("phone")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="+1 555 000 0000"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Industry
                </span>
                <input
                  type="text"
                  required
                  value={form.industry}
                  onChange={onFormChange("industry")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="e.g., Dental, HVAC, Real Estate"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Company</span>
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={onFormChange("company")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Your company name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Website
                </span>
                <input
                  type="text"
                  required
                  value={form.website}
                  onChange={onFormChange("website")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="yourdomain.com"
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-p1 text-white font-semibold hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

function SliderRow({ label, value, onChange, min=0, max=100, step=1, formatValue }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-500">{formatValue ? formatValue(value) : value}</span>
      </div>
      <input
        type="range"
        className="mt-3 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

function BigStat({ label, value }) {
  return (
    <div className="text-center border rounded-xl p-6 bg-gray-50">
      <div className="text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}
