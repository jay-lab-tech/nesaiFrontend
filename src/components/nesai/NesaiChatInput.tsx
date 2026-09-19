'use client';

import { useState, useRef, useEffect } from 'react';

interface NesaiChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const MAX_MESSAGE_LENGTH = 2000;

export function NesaiChatInput({ onSend, disabled }: NesaiChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Focus on mount and when re-enabled
  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isOverLimit = input.length > MAX_MESSAGE_LENGTH;
  const canSend = input.trim().length > 0 && !disabled && !isOverLimit;

  return (
    <div className="nesai-input-container">
      <div className={`nesai-input-wrapper ${isOverLimit ? 'nesai-input-error' : ''}`}>
        <textarea
          ref={textareaRef}
          className="nesai-input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pertanyaan Anda..."
          disabled={disabled}
          rows={1}
          aria-label="Pesan untuk NESAI"
        />
        <button
          type="button"
          className={`nesai-send-btn ${canSend ? 'nesai-send-btn-active' : ''}`}
          onClick={handleSubmit}
          disabled={!canSend}
          aria-label="Kirim pesan"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
            <path d="m21.854 2.147-10.94 10.939" />
          </svg>
        </button>
      </div>
      {isOverLimit && (
        <p className="nesai-char-warning">
          Batas {MAX_MESSAGE_LENGTH} karakter terlampaui ({input.length}/{MAX_MESSAGE_LENGTH})
        </p>
      )}
    </div>
  );
}
