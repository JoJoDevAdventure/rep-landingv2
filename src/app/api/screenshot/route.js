// For App Router users (Next.js 13+)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const widthParam = searchParams.get("width");
  const heightParam = searchParams.get("height");
  const width = Math.min(Math.max(parseInt(widthParam || "1440", 10) || 1440, 320), 3840);
  const height = Math.min(Math.max(parseInt(heightParam || "900", 10) || 900, 480), 2160);

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing url param' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const apiKey = process.env.URLBOX_API_KEY;
  const apiSecret = process.env.URLBOX_API_SECRET;

  const apiUrl = `https://api.urlbox.com/v1/${apiKey}/png?width=${width}&height=${height}&url=${encodeURIComponent(url)}&delay=1000&wait_until=requestsfinished&click_accept=true`;
  const signedUrl = `${apiUrl}&user=${apiKey}&token=${apiSecret}`;

  try {
    const imageRes = await fetch(signedUrl);
    if (!imageRes.ok) {
      const text = await imageRes.text().catch(() => '');
      return new Response(JSON.stringify({ error: 'Upstream error', status: imageRes.status, body: text.slice(0, 300) }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }
    const imageBuffer = await imageRes.arrayBuffer();
    return new Response(Buffer.from(imageBuffer), {
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Fetch failed', message: String(e && e.message || e) }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
}