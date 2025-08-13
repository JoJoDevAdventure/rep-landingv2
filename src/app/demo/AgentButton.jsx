'use client'

import { useState } from 'react'
import Orb from './Orb'

const AgentButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={[
        'absolute bottom-5 left-5 z-50 bg-white rounded-2xl shadow-xl overflow-hidden',
        'transition-all duration-500 ease-out',
        isOpen ? 'w-[300px] h-[500px]' : 'h-[64px] w-[200px]',
        'cursor-pointer'
      ].join(' ')}
      onClick={() => {
        if (!isOpen) setIsOpen(true)
      }}
      aria-expanded={isOpen}
    >
      {/* Header: Orb + label */}
      <div
        className={[
          'flex items-center gap-3 px-4',
          isOpen ? 'pt-4 pb-3' : 'py-3'
        ].join(' ')}
      >
        <div className={isOpen ? 'h-[80px] w-[80px] flex items-center' : 'h-[40px] w-[40px] flex items-center'}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={248}
            forceHoverState={false}
          />
        </div>
        <span className="font-extrabold text-base md:text-lg whitespace-nowrap select-none">
          Call AI Agent
        </span>
      </div>

      {/* Body: only visible when open */}
      <div
        className={[
          'transition-opacity duration-300 ease-out',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        ].join(' ')}
      >
        {/* Conversation area */}
        <div className="px-4 pb-16 pt-1 h-[calc(500px-80px-48px)] overflow-y-auto">
          <div className="space-y-3 text-sm">
            <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-900">
              Hi! I’m your AI agent. How can I help today?
            </div>
            <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-black text-white ml-auto">
              Book me a demo for next Tuesday at 3pm.
            </div>
            <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-900">
              Got it. I’ll check availability and send a calendar invite.
            </div>
            <div className="max-w-[85%] rounded-2xl px-4 py-2 bg-black text-white ml-auto">
              Perfect, thanks!
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="absolute bottom-3 right-3">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-semibold bg-red-500 text-white shadow-md hover:bg-red-600 active:scale-[0.98] transition"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          >
            End call
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgentButton