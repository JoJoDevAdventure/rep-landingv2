export const runtime = "edge";

const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/HNAsnPF6KycYLXrcFjjR/webhook-trigger/IzQcTVfDXVXZ2TEa3pDp";

function pickContactFields(src = {}) {
  // Build custom demo link
  const params = new URLSearchParams();
  const site = (src.website || "").trim().replace(/\s+/g, "").replace(/^https?:\/\//i, "");
  if (site) params.append('w', site);
  if (src.name) params.append('n', src.name);
  const customDemoLink = params.toString() ? `https://replicaide.com/demo?${params.toString()}` : "";

  return {
    name: src.name ?? "",
    email: src.email ?? "",
    phone: src.phone ?? "",
    industry: src.industry ?? "",
    company: src.company ?? "",
    website: src.website ?? "",
    source: src.from ?? "",
    "custom_demo_link": customDemoLink,
  };
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const payload = pickContactFields(body);

    if (!payload.name || !payload.email) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields: name and email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      return new Response(
        JSON.stringify({ ok: false, error: "Upstream webhook error", status: res.status, body: text }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ ok: true, forwarded: payload, upstream: text ?? null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}