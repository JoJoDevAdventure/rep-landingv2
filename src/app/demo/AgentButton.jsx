'use client'

import { Conversation } from "@elevenlabs/client";
import { useEffect, useRef, useState } from 'react';
import Orb from './Orb';

const DEFAULT_LEFT = 20;

const setCookie = (name, value, days = 30) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
};

const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

const clearCookie = (name) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

const AgentButton = ({ onTrialEnded, onIntrestShown }) => {
  const [isOnCall, setIsOnCall] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [remainingSecs, setRemainingSecs] = useState(60);
  const messageBoxRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [leftPx, setLeftPx] = useState(DEFAULT_LEFT);
  const dragStartRef = useRef({ startX: 0, startLeft: DEFAULT_LEFT, moved: false });

  const TRIAL_COOKIE = 'ai_trial_expired';

  useEffect(() => {
    try {
      const saved = localStorage.getItem('agent_btn_left');
      if (saved !== null) setLeftPx(parseInt(saved, 10));
    } catch {}
  }, []);

  const getMaxLeft = () => {
    if (!containerRef.current) return (typeof window !== 'undefined' ? window.innerWidth : 0) - 220; // fallback
    const width = containerRef.current.offsetWidth || 200;
    return Math.max(0, (window.innerWidth || 0) - width - 20);
  };

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const saveLeft = (v) => {
    try { localStorage.setItem('agent_btn_left', String(v)); } catch {}
  };

  const onPointerDown = (e) => {
    // Allow dragging from anywhere on the widget background
    if (e.target.closest('button')) return; // don't start drag from buttons
    setDragging(true);
    dragStartRef.current = { startX: e.clientX ?? (e.touches?.[0]?.clientX || 0), startLeft: leftPx, moved: false };
    try { containerRef.current.setPointerCapture?.(e.pointerId); } catch {}
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? (e.touches?.[0]?.clientX || 0);
    const dx = x - dragStartRef.current.startX;
    if (Math.abs(dx) > 2) dragStartRef.current.moved = true;
    const next = clamp(dragStartRef.current.startLeft + dx, 0, getMaxLeft());
    setLeftPx(next);
  };
  
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    saveLeft(clamp(leftPx, 0, getMaxLeft()));
  };

  useEffect(() => {
    const expired = getCookie(TRIAL_COOKIE) === '1';
    if (expired) {
      console.log('[trial] cookie expired detected');
      setRemainingSecs(0);
    }
  }, []);

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

  useEffect(() => {
    if (!isOnCall) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    if (getCookie(TRIAL_COOKIE) === '1' || remainingSecs <= 0) {
      return;
    }
    // Start 1-minute countdown
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setRemainingSecs((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setCookie(TRIAL_COOKIE, '1');
            // auto end the call and notify parent
            endCall();
            if (typeof onTrialEnded === 'function') {
              try { onTrialEnded(); } catch (e) { console.error('onTrialEnded error', e); }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOnCall]);

  const handleIntrest = () => {
    if (conversation) {
      conversation.endSession();
      setConversation(null);
    }
    if (typeof onIntrestShown === 'function') {
      try { onIntrestShown(); } catch (e) { console.error('onIntrestShown error', e); }
    }
  };

  const startCall = async () => {
    if (isOnCall) return;

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    // Parse name from URL (?name=...) and build greeting
    let userName = '';
    try {
      const sp = new URLSearchParams(window.location.search);
      userName = (sp.get('name') || '').trim();
    } catch {}
    const greeting = `Hello${userName ? ` ${userName}` : ''} I am AIDE, Would you like to know how I can help convert your website's visitors to engaged leads?`;

    try {
      const agentId = 'agent_0401k3vf742fevr9vsappzkmdtw9';
      const conv = await Conversation.startSession({
        agentId,
        overrides: {
          agent: {
            firstMessage: greeting,
          }
        },
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
        onUnhandledClientToolCall: (toolCall) => {
          console.log('onUnhandledClientToolCall', toolCall);
          if (toolCall?.tool_name === "user_shows_intrest") {
            handleIntrest();
          }
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
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (conversation) {
      conversation.endSession();
      setConversation(null);
    }
    setIsOnCall(false);
    setMessages([]);
  };

  const fmt = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${m}:${ss}`;
  };

  return (
    <div
      ref={containerRef}
      className={[
        'fixed z-50 bg-white rounded-2xl shadow-xl overflow-hidden',
        'transition-all duration-500 ease-out',
        isOnCall ? 'w-[300px] h-[500px]' : 'h-[64px] w-[200px]',
        'cursor-pointer',
      ].join(' ')}
      style={{ left: leftPx, bottom: 20 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      onClick={() => {
        if (dragging || dragStartRef.current.moved) { dragStartRef.current.moved = false; return; }
        if (!isOnCall) {
          if (remainingSecs <= 0 || getCookie(TRIAL_COOKIE) === '1') {
            if (typeof onTrialEnded === 'function') {
              try { onTrialEnded(); } catch (e) { console.error('onTrialEnded error', e); }
            }
            return;
          }
          startCall();
        }
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
        <div className="flex  flex-row items-end gap-3">

        <span className="font-extrabold text-base md:text-lg whitespace-nowrap select-none">
          {isOnCall ? 'AI Agent' : 'Call'}
        </span>
        <img className="mb-2 h-8" src="/aide.png"/>
        </div>
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

        <div className="absolute -bottom-6 left-3">
          {isOnCall && (
            <div className="rounded-full px-3 py-1 text-xs font-semibold bg-gray-800 text-white shadow-md select-none">
              {fmt(remainingSecs || 0)}
            </div>
          )}
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