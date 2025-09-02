import { useEffect } from 'react';

export default function DemoPopUp({ onClose, ranOutOfMinutes }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Supademo) {
      // Parse name from URL search params or fallback to pathname
      const searchParams = new URLSearchParams(window.location.search);
      let nameFromUrl = searchParams.get('name') || '';
      if (!nameFromUrl) {
        try {
          const pathParts = window.location.pathname.split('/').filter(Boolean);
          const idx = pathParts.indexOf('isepathname');
          if (idx > -1 && pathParts[idx + 1]) {
            nameFromUrl = decodeURIComponent(pathParts[idx + 1]);
          }
        } catch (e) {
          console.warn('[Supademo] Failed to parse name from pathname', e);
        }
      }
      window.Supademo("8c3cfedef323b3e24ac101ea78ca4bb31989e0cac2ca2444e36de1c46b565d3f", {
        variables: {
          email: "",
          name: nameFromUrl
        }
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {ranOutOfMinutes
              ? "You’ve Reached Your Trial Limit — Unlock What’s Next"
              : "See AIDE in action on your website."}
          </h3>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Sign up for your free trial to unlock the full potential of AIDE, our conversational AI agents.
        </p>
        <div className="space-y-3">
          <button
            className="w-full px-4 py-2 rounded-lg bg-p1 text-white font-semibold hover:opacity-90"
            data-supademo-demo="cmehfrke000rsx80innvbugwu"
          >
            👉 Show Me How It Works
          </button>
          <button
            className="w-full px-4 py-2 rounded-lg border border-p1 text-p1 font-semibold hover:bg-p1 hover:text-white transition"
            onClick={() => window.location.href = "https://agents."}
          >
            🚀 Unlock AIDE with Your Free Trial
          </button>
          <button
            className="w-full px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50"
            onClick={() => window.location.href = "https://we.replicaide.com/widget/booking/s76WHydPGOptB9Yw5RS0"}
          >
            📅 Schedule a Call with Our Team
          </button>
        </div>
      </div>
    </div>
  );
}