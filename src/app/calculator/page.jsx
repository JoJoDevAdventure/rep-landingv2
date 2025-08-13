'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

const number = (v) => {
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g, ''))
  return isNaN(n) ? 0 : n
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export default function CalculatorPage() {
  const [inputs, setInputs] = useState({
    inboundCallsPerMonth: 400, // total calls
    missedRatePct: 25,        // % of calls missed
    closeRatePct: 20,         // % of leads that become paying customers
    recoveredPct: 35,         // % of missed calls recovered by textback/agent
    avgOrderValue: 120,       // $ initial sale value
    repeatPurchasesPerYear: 2,// how many times that customer buys again per year (optional LTV proxy)
  })

  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ email: '', phone: '', industry: '', website: '' })

  const onChange = (key) => (e) => {
    const val = e.target.value
    setInputs((s) => ({ ...s, [key]: val }))
  }

  const onFormChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }))
  const onSubmitTrial = (e) => {
    e.preventDefault()
    // basic website normalization
    let site = (form.website || '').trim()
    if (!site) return
    // remove whitespace
    site = site.replace(/\s+/g, '')
    // strip protocol if present; we only pass domain/path to `w`
    site = site.replace(/^https?:\/\//i, '')
    router.push(`/demo?w=${encodeURIComponent(site)}`)
  }

  const derived = useMemo(() => {
    const inbound = number(inputs.inboundCallsPerMonth)
    const missRate = clamp(number(inputs.missedRatePct), 0, 100) / 100
    const closeRate = clamp(number(inputs.closeRatePct), 0, 100) / 100
    const recovered = clamp(number(inputs.recoveredPct), 0, 100) / 100
    const aov = Math.max(0, number(inputs.avgOrderValue))
    const repeats = Math.max(0, number(inputs.repeatPurchasesPerYear))

    const missedCalls = Math.round(inbound * missRate)
    const missedLeads = Math.round(missedCalls * closeRate)

    // Simple LTV proxy = initial order + repeat purchases per year * AOV
    const ltv = aov * (1 + repeats)

    const lostRevenue = missedLeads * ltv

    const recoveredCalls = Math.round(missedCalls * recovered)
    const recoveredLeads = Math.round(recoveredCalls * closeRate)
    const recoveredRevenue = recoveredLeads * ltv

    // very rough ROI vs $/month plan, assume $500 default (can be adjusted)
    const planCost = 500
    const netROI = recoveredRevenue - planCost

    return {
      inbound,
      missRate,
      closeRate,
      recovered,
      aov,
      repeats,
      ltv,
      missedCalls,
      missedLeads,
      lostRevenue,
      recoveredCalls,
      recoveredLeads,
      recoveredRevenue,
      planCost,
      netROI,
    }
  }, [inputs])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Missed Call → Lost Business Calculator</h1>
          <p className="text-gray-600 mt-2">Quickly estimate how many sales you lose to missed calls—and how much a textback/AI agent can recover.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-5">
            <h2 className="font-semibold text-lg">Your Numbers</h2>

            <Field
              label="Inbound calls per month"
              suffix="calls"
              value={inputs.inboundCallsPerMonth}
              onChange={onChange('inboundCallsPerMonth')}
              min={0}
            />

            <Field
              label="Missed call rate"
              suffix="%"
              value={inputs.missedRatePct}
              onChange={onChange('missedRatePct')}
              min={0}
              max={100}
            />

            <Field
              label="Lead → Sale close rate"
              suffix="%"
              value={inputs.closeRatePct}
              onChange={onChange('closeRatePct')}
              min={0}
              max={100}
            />

            <Field
              label="Textback/Agent recovery rate"
              suffix="%"
              value={inputs.recoveredPct}
              onChange={onChange('recoveredPct')}
              min={0}
              max={100}
              hint="Share of missed callers you win back via SMS + AI follow-up"
            />

            <Field
              label="Average order value (AOV)"
              prefix="$"
              value={inputs.avgOrderValue}
              onChange={onChange('avgOrderValue')}
              min={0}
            />

            <Field
              label="Repeat purchases per year (optional LTV)"
              value={inputs.repeatPurchasesPerYear}
              onChange={onChange('repeatPurchasesPerYear')}
              min={0}
            />

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-lg bg-p1 text-white px-5 py-3 font-semibold hover:opacity-90 transition"
              >
                Get Free Trial
              </button>
            </div>
          </section>

          {/* Results */}
          <section className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <h2 className="font-semibold text-lg">Estimated Impact</h2>

            <Stat label="Missed calls / mo" value={derived.missedCalls.toLocaleString()} />
            <Stat label="Missed sales / mo (after close rate)" value={derived.missedLeads.toLocaleString()} />
            <Divider />
            <Stat label="Estimated revenue lost / mo" value={currency.format(derived.lostRevenue)} emphasis />
            <Divider />
            <Stat label="Recovered calls / mo" value={derived.recoveredCalls.toLocaleString()} />
            <Stat label="Recovered sales / mo" value={derived.recoveredLeads.toLocaleString()} />
            <Stat label="Recovered revenue / mo" value={currency.format(derived.recoveredRevenue)} emphasis />
            <Divider />
            <Stat label="Plan cost (example)" value={currency.format(derived.planCost)} />
            <Stat label="Net ROI / mo" value={currency.format(derived.netROI)} emphasis />

            <p className="text-xs text-gray-500 pt-2">This is an estimate. Actual results vary by industry, lead quality, and response time.</p>
          </section>
        </div>

        {/* How it works */}
        <section className="mt-10 bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-semibold mb-2">How we calculate</h3>
          <ol className="list-decimal text-sm text-gray-700 space-y-1 pl-5">
            <li>Missed calls = Inbound calls × Missed call rate</li>
            <li>Missed sales = Missed calls × Close rate</li>
            <li>Approx. LTV = AOV × (1 + Repeat purchases per year)</li>
            <li>Lost revenue = Missed sales × Approx. LTV</li>
            <li>Recovered calls = Missed calls × Recovery rate</li>
            <li>Recovered sales = Recovered calls × Close rate</li>
            <li>Recovered revenue = Recovered sales × Approx. LTV</li>
          </ol>
        </section>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
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
                <span className="text-sm font-medium text-gray-700">Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={onFormChange('email')}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Phone number</span>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={onFormChange('phone')}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="+1 555 000 0000"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Industry</span>
                <input
                  type="text"
                  required
                  value={form.industry}
                  onChange={onFormChange('industry')}
                  className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="e.g., Dental, HVAC, Real Estate"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Website</span>
                <input
                  type="text"
                  required
                  value={form.website}
                  onChange={onFormChange('website')}
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
  )
}

function Field({ label, hint, prefix, suffix, value, onChange, min, max }) {
  return (
    <label className="block">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        {hint && <span className="text-xs text-gray-500">({hint})</span>}
      </div>
      <div className="mt-1 flex items-center rounded-lg border bg-white focus-within:ring-2 focus-within:ring-black/10">
        {prefix && <span className="px-3 text-gray-500">{prefix}</span>}
        <input
          type="number"
          className="w-full px-3 py-2 rounded-lg outline-none appearance-none"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
        {suffix && <span className="px-3 text-gray-500">{suffix}</span>}
      </div>
    </label>
  )
}

function Stat({ label, value, emphasis = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={emphasis ? 'text-lg font-semibold' : 'text-base font-medium'}>{value}</span>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-gray-200 my-1" />
}
