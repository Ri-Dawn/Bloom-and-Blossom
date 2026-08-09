'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/lib/types';

export default function ChatWidget({
  sessionId,
  context,
}: {
  sessionId: string;
  context: string;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [sending, setSending] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function loadMessages() {
    try {
      const res = await fetch(`/api/chat?session=${encodeURIComponent(sessionId)}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages ?? []);
      }
    } catch {
      // silent — chat history just won't preload
    }
  }

  useEffect(() => {
    if (open) loadMessages();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function sendMessage(messageType: 'text' | 'voice', content: string) {
    setSending(true);
    const optimistic: ChatMessage = {
      id: 'temp-' + Date.now(),
      session_id: sessionId,
      sender: 'customer',
      message_type: messageType,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, optimistic]);
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          sender: 'customer',
          message_type: messageType,
          content,
          context,
        }),
      });
    } catch {
      // message stays visible locally even if the network call failed
    } finally {
      setSending(false);
    }
  }

  function handleSendText() {
    const val = text.trim();
    if (!val) return;
    setText('');
    sendMessage('text', val);
  }

  async function toggleRecording() {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunksRef.current = [];
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
        recorder.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              sendMessage('voice', reader.result);
            }
          };
          reader.readAsDataURL(blob);
          stream.getTracks().forEach((t) => t.stop());
        };
        recorder.start();
        mediaRecorderRef.current = recorder;
        setRecording(true);
      } catch {
        alert("Microphone access isn't available — you can type your message instead.");
      }
    } else {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 glass-tile-dark text-stone50 rounded-full px-5 py-3 text-[13px] font-semibold flex items-center gap-2 shadow-lg"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16v12H8l-4 4V4Z" />
        </svg>
        Design Studio
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[92vw] max-w-sm max-h-[70vh] glass-tile flex flex-col overflow-hidden">
          <div className="flex items-start justify-between px-4 py-3 border-b border-white/40">
            <div>
              <div className="font-display text-[16px] text-stone900">Design Studio</div>
              <div className="text-[11px] text-stone500">{context}</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-stone500 text-xl leading-none">×</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2 min-h-[140px]">
            {messages.length === 0 && (
              <div className="text-[11.5px] text-stone500">
                Type anything that doesn&apos;t fit a dropdown, or record a voice note — we&apos;ll hear exactly what you mean.
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[12.5px] leading-relaxed ${
                  m.sender === 'customer' ? 'self-end bg-rani text-stone50' : 'self-start bg-white/80 text-stone900 border border-stone100'
                }`}
              >
                {m.message_type === 'voice' ? (
                  <audio controls src={m.content} className="w-48 h-8" />
                ) : (
                  m.content
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-3 border-t border-white/40">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
              placeholder="Message…"
              className="flex-1 rounded-lg border border-stone300 bg-white/70 px-3 py-2 text-[12.5px] outline-none focus:border-rani"
            />
            <button
              onClick={toggleRecording}
              className={`w-10 rounded-lg border text-[14px] ${
                recording ? 'bg-rani text-white border-rani animate-pulse' : 'bg-white/70 border-stone300'
              }`}
              aria-label="Record voice note"
            >
              🎤
            </button>
            <button
              onClick={handleSendText}
              disabled={sending}
              className="w-10 rounded-lg border border-stone300 bg-white/70 text-[14px]"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
