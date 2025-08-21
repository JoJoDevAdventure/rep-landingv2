// For App Router users (Next.js 13+)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  const apiKey = process.env.URLBOX_API_KEY;
  const apiSecret = process.env.URLBOX_API_SECRET;

  const apiUrl = `https://api.urlbox.io/v1/${apiKey}/png?url=${encodeURIComponent(
    url
  )}&thumb_width=1440&full_page=false`;

  const signedUrl = `${apiUrl}&user=${apiKey}&token=${apiSecret}`;

  const imageRes = await fetch(signedUrl);
  const imageBuffer = await imageRes.arrayBuffer();

  return new Response(Buffer.from(imageBuffer), {
    headers: { "Content-Type": "image/png" },
  });
}