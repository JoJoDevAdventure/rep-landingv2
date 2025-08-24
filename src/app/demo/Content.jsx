'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import AgentButton from './AgentButton';
import DemoPopUp from './DemoPopUp';

const Content = () => {
  const [trialEnded, setTrialEnded] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams()
  const raw = searchParams.get('w') || ''

  const decoded = useMemo(() => {
    if (!raw) return ''
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }, [raw])

  const url = useMemo(() => {
    if (!decoded) return ''
    let u = decoded.trim().replace(/\s+/g, '')

    // Fix common cases where protocol is missing or stray characters are present
    if (!/^https?:\/\//i.test(u)) {
      u = 'https://' + u.replace(/^\/+/, '')
    }

    try {
      const parsed = new URL(u)
      return parsed.href
    } catch {
      return ''
    }
  }, [decoded])

  const resetTrial = () => {
    document.cookie = 'trial_expired=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setTrialEnded(false)
  }

  const fetchScreenshot = async (u) => {
    setLoading(true);
    setError('');
    try {
      // Cache buster to avoid stale images
      const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const height = typeof window !== 'undefined' ? window.innerHeight : 900;
      const apiSrc = `/api/screenshot?url=${encodeURIComponent(u)}&width=${width}&height=${height}&t=${Date.now()}`;
      console.log('[screenshot] fetching', apiSrc);
      const res = await fetch(apiSrc, { method: 'GET' });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('[screenshot] non-OK status', res.status, text.slice(0, 200));
        setError(`Preview failed with status ${res.status}`);
        setLoading(false);
        return;
      }
      const blob = await res.blob();
      console.log('[screenshot] blob type:', blob.type, 'size:', blob.size);
      if (!blob || blob.size === 0) {
        setError('Preview returned empty image');
        setLoading(false);
        return;
      }
      const objectUrl = URL.createObjectURL(blob);
      // Revoke any previous object URL to avoid memory leaks
      if (screenshotUrl && screenshotUrl.startsWith('blob:')) {
        try { URL.revokeObjectURL(screenshotUrl); } catch {}
      }
      setScreenshotUrl(objectUrl);
    } catch (e) {
      console.error('[screenshot] fetch error', e);
      setError('Could not load preview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // cleanup previous blob URL if any
    if (screenshotUrl && screenshotUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(screenshotUrl); } catch {}
    }
    setScreenshotUrl('');
    setError('');
    if (!url) return;
    fetchScreenshot(url);
  }, [url]);

  // Cleanup blob URL on unmount (must be inside the component)
  useEffect(() => {
    return () => {
      if (screenshotUrl && screenshotUrl.startsWith('blob:')) {
        try { URL.revokeObjectURL(screenshotUrl); } catch {}
      }
    };
  }, [screenshotUrl]);

  if (!url) {
    return (
      <div style={{ padding: 16 }}>
        No valid site provided. Pass a URL in the <code>w</code> query param, e.g. <code>?w=joseign.com</code>.
      </div>
    )
  }

  return (
    <>
      <div className="w-full h-screen relative" style={{ backgroundColor: '#ffffff' }}>
        {screenshotUrl ? (
          <div className="absolute inset-0">
            <img
              src={screenshotUrl}
              alt="Website preview screenshot"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onLoad={() => console.log('[screenshot-img] loaded')}
              onError={(e) => {
                console.warn('[screenshot-img] decode error');
                setError('Image failed to decode');
              }}
              draggable={false}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black">
            {loading ? 'Generating preview…' : (error || 'Preview unavailable')}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 text-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">
            Open live site in a new tab
          </a>
        </div>
      </div>
      {trialEnded && <DemoPopUp onClose={() => setTrialEnded(false)} />}
      <AgentButton onTrialEnded={() => setTrialEnded(true)} />
      <div
        onClick={resetTrial}
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: 'black',
          cursor: 'pointer',
        }}
      />
    </>
  )
}

export default Content