'use client'

import { Conversation } from "@elevenlabs/client";
import { useEffect, useRef, useState } from 'react';
import Orb from './Orb';

const AgentButton = () => {
  const [isOnCall, setIsOnCall] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageBoxRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!isOnCall && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isOnCall]);

  const startCall = async () => {
    if (isOnCall) return;

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    try {
      const agentId = 'agent_01k054mh33f6eb0zkgp0889aq0';
      const conv = await Conversation.startSession({
        agentId,
        onConnect: (...args) => {
          console.log('onConnect', ...args);
        },
        onDebug: (...args) => {
          console.log('onDebug', ...args);
        },
        onDisconnect: (...args) => {
          console.log('onDisconnect', ...args);
          endCall();
        },
        onError: (...args) => {
          console.log('onError', ...args);
          endCall();
        },
        onMessage: ({ source, message }) => {
          console.log('onMessage', { source, message });
          setMessages((prev) => [
            ...prev,
            {
              type: source === "ai" ? "agent" : "transcript",
              text: message,
            },
          ]);
        },
        onAudio: (...args) => {
          console.log('onAudio', ...args);
        },
        onModeChange: (...args) => {
          console.log('onModeChange', ...args);
        },
        onStatusChange: (...args) => {
          console.log('onStatusChange', ...args);
        },
        onCanSendFeedbackChange: (...args) => {
          console.log('onCanSendFeedbackChange', ...args);
        },
        onUnhandledClientToolCall: (...args) => {
          console.log('onUnhandledClientToolCall', ...args);
        },
        onVadScore: (...args) => {
          console.log('onVadScore', ...args);
        }
      });
      setConversation(conv);
      setIsOnCall(true);
    } catch {
      endCall();
    }
  };

  const endCall = () => {
    if (conversation) {
      conversation.endSession();
      setConversation(null);
    }
    setIsOnCall(false);
    setMessages([]);
  };

  return (
    <div
      className={[
        'absolute bottom-5 left-5 z-50 bg-white rounded-2xl shadow-xl overflow-hidden',
        'transition-all duration-500 ease-out',
        isOnCall ? 'w-[300px] h-[500px]' : 'h-[64px] w-[200px]',
        'cursor-pointer'
      ].join(' ')}
      onClick={() => {
        if (!isOnCall) startCall();
      }}
      aria-expanded={isOnCall}
    >
      {/* Header: label */}
      <div className={['flex items-center gap-3 px-4', isOnCall ? 'pt-4 pb-3' : 'py-3'].join(' ')}>
        <div className={isOnCall ? 'h-[40px] w-[40px] flex items-center' : 'h-[40px] w-[40px] flex items-center'}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={248}
            forceHoverState={false}
          />
        </div>
        <span className="font-extrabold text-base md:text-lg whitespace-nowrap select-none">
          {isOnCall ? 'AI Agent' : 'Call AI Agent'}
        </span>
      </div>

      {/* Body: only visible when on call */}
      <div
        className={[
          'transition-opacity duration-300 ease-out relative',
          isOnCall ? 'opacity-100' : 'opacity-0 pointer-events-none'
        ].join(' ')}
      >
        {/* Messages area */}
        <div
          ref={messageBoxRef}
          className="px-4 pb-16 pt-4 h-[calc(500px-64px-48px)] overflow-y-auto relative"
          style={{background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))'}}
        >
          <div className="space-y-3 text-sm">
            {messages.map((msg, i) => {
              const baseClass =
                msg.type === 'agent'
                  ? 'max-w-[85%] rounded-2xl px-4 py-2 bg-black text-white mr-auto'
                  : msg.type === 'transcript'
                  ? 'max-w-[85%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-900 ml-auto'
                  : 'max-w-[85%] rounded-2xl px-4 py-2 bg-blue-100 text-blue-900 italic';

              return (
                <div key={i} className={baseClass}>
                  {msg.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer actions */}
        <div className="absolute -bottom-6 right-3">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-semibold bg-red-500 text-white shadow-md hover:bg-red-600 active:scale-[0.98] transition"
            onClick={(e) => {
              e.stopPropagation();
              endCall();
            }}
          >
            End call
          </button>
        </div>
      </div>

      <audio ref={audioRef} src="/ringtone.mp3" loop />
    </div>
  );
};

export default AgentButton;