// app/api/subscribe/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email_address, name, phone, industry } = await req.json();

    // Call Mailchimp API with a direct POST request
    const response = await fetch(
      'https://us11.api.mailchimp.com/3.0/lists/7edae1fc6c/members/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Use a server-side environment variable for security
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address,
          status: 'subscribed',
          merge_fields: {
            FNAME: name,
            PHONE: phone,
            INDUSTRY: industry,
          },
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Mailchimp API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}