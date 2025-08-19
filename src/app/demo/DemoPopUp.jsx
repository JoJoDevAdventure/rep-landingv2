

import { useState } from "react";

export default function DemoPopUp() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Oh no, you reached your Agent Limit
          </h3>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Want to see the agent in action on your website?
        </p>
        <div className="space-y-3">
          <button
            className="w-full px-4 py-2 rounded-lg bg-p1 text-white font-semibold hover:opacity-90"
            onClick={() => window.location.href = "https://agents.replicaide.com"}
          >
            Sign up for demo
          </button>
          <button
            className="w-full px-4 py-2 rounded-lg border border-p1 text-p1 font-semibold hover:bg-p1 hover:text-white transition"
            onClick={() => alert("Supademo integration")}
          >
            Deeper Demo
          </button>
          <button
            className="w-full px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            onClick={() => window.location.href = "https://we.replicaide.com/widget/booking/s76WHydPGOptB9Yw5RS0"}
          >
            Schedule a call
          </button>
        </div>
      </div>
    </div>
  );
}