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
    <div className="p-3 sm:p-4 bg-white border-t border-[#dce5e1] shrink-0">
      <div
        className={`flex items-end gap-2 rounded-xl bg-[#f8faf8] border transition-all px-3 sm:px-3.5 py-1.5 ${
          isOverLimit
            ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20'
            : 'border-[#dce5e1] focus-within:border-[#172b3a] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#172b3a]/10'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pertanyaan seputar SMKN 1 Subang, jurusan, PPDB..."
          disabled={disabled}
          rows={1}
          aria-label="Tanya NesAI"
          className="flex-1 min-w-0 max-h-[120px] min-h-[38px] resize-none bg-transparent py-2 text-xs sm:text-sm text-[#172b3a] placeholder:text-[#9db0aa] outline-none leading-relaxed font-sans"
        />

        <Button
          type="button"
          size="icon"
          disabled={!canSend}
          onClick={handleSubmit}
          className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg shrink-0 transition-all ${
            canSend
              ? 'bg-[#172b3a] hover:bg-[#09243b] text-white shadow-xs cursor-pointer'
              : 'bg-[#edf2ef] text-[#9db0aa] cursor-not-allowed'
          }`}
          aria-label="Kirim pertanyaan"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>

      {isOverLimit && (
        <p className="text-[11px] text-red-600 mt-1.5 px-1 font-medium">
          Batas {MAX_MESSAGE_LENGTH} karakter terlampaui ({input.length}/{MAX_MESSAGE_LENGTH})
        </p>
      )}
    </div>
  );
}
