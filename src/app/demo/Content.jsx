'use client'

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import AgentButton from './AgentButton';
import DemoPopUp from './DemoPopUp';

const Content = () => {
  const [trialEnded, setTrialEnded] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [frameLoaded, setFrameLoaded] = useState(false);
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
    // Point the <img> directly at the API so the browser streams/decodes it natively.
    // Add a cache buster to avoid stale images.
    const apiSrc = `/api/screenshot?url=${encodeURIComponent(u)}&t=${Date.now()}`;
    setScreenshotUrl(apiSrc);
  };

  useEffect(() => {
    setFrameLoaded(false);
    setScreenshotUrl('');
    if (!url) return;
    const t = setTimeout(() => {
      if (!frameLoaded) fetchScreenshot(url);
    }, 2000);
    return () => clearTimeout(t);
  }, [url]);

  const blockedHosts = ['google.com', 'facebook.com', 'linkedin.com', '3mountainsplumbing.com']
  const isBlocked = blockedHosts.some(host => url.includes(host))

  useEffect(() => {
    if (isBlocked && url) fetchScreenshot(url);
  }, [isBlocked, url]);

  if (!url) {
    return (
      <div style={{ padding: 16 }}>
        No valid site provided. Pass a URL in the <code>w</code> query param, e.g. <code>?w=joseign.com</code>.
      </div>
    )
  }

  return (
    <>
      {isBlocked || screenshotUrl ? (
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
                  console.warn('[screenshot-img] failed to load, clearing url');
                  try { URL.revokeObjectURL(screenshotUrl); } catch {}
                  setScreenshotUrl('');
                }}
                draggable={false}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-black">Generating preview…</div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 text-center">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">
              Open live site in a new tab
            </a>
          </div>
        </div>
      ) : (
        <iframe
          src={url}
          style={{ width: '100vw', height: '100vh', border: '0' }}
          allow="autoplay; clipboard-write; microphone; camera; fullscreen; display-capture"
          referrerPolicy="no-referrer"
          allowFullScreen
          loading="eager"
          title="Website Preview"
          onLoad={() => setFrameLoaded(true)}
        />
      )}
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