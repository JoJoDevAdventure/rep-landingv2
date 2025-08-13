'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import AgentButton from './AgentButton'

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

  return (
    <>
    <iframe
      src={url}
      style={{ width: '100vw', height: '100vh', border: '0' }}
      allow="autoplay; clipboard-write; microphone; camera; fullscreen; display-capture"
      referrerPolicy="no-referrer"
      allowFullScreen
      loading="eager"
      title="Website Preview"
    />
    <AgentButton/>
    </>
  )
}

export default Content