'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0">
      <div
        className={`flex items-end gap-2 rounded-xl bg-slate-50/80 dark:bg-slate-900 border transition-all px-3 py-1.5 ${
          isOverLimit
            ? 'border-red-400 ring-2 ring-red-100 dark:ring-red-950'
            : 'border-slate-200/90 dark:border-slate-800 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-950/60'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tanya NESAI tentang jurusan, PPDB..."
          disabled={disabled}
          rows={1}
          aria-label="Tanya NESAI"
          className="flex-1 min-w-0 max-h-[120px] min-h-[40px] resize-none bg-transparent py-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none leading-relaxed"
        />

        <Button
          type="button"
          size="icon"
          disabled={!canSend}
          onClick={handleSubmit}
          className={`h-8 w-8 rounded-lg shrink-0 transition-all ${
            canSend
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
          aria-label="Kirim pertanyaan"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>

      {isOverLimit && (
        <p className="text-[11px] text-red-500 mt-1.5 px-1">
          Batas {MAX_MESSAGE_LENGTH} karakter terlampaui ({input.length}/{MAX_MESSAGE_LENGTH})
        </p>
      )}
    </div>
  );
}
