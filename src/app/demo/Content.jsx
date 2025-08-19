'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import AgentButton from './AgentButton'
import DemoPopUp from './DemoPopUp'

const Content = () => {
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

  if (!url) {
    return (
      <div style={{ padding: 16 }}>
        No valid site provided. Pass a URL in the <code>w</code> query param, e.g. <code>?w=joseign.com</code>.
      </div>
    )
  }

  const blockedHosts = ['google.com', 'facebook.com', 'linkedin.com']
  const isBlocked = blockedHosts.some(host => url.includes(host))

  return (
    <>
      {isBlocked ? (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
          <p className="text-xl font-medium mb-4">This site doesn't allow being embedded in a frame.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            Click here to open it in a new tab
          </a>
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
        />
      )}
      <DemoPopUp/>
      <AgentButton/>
    </>
  )
}

export default Content