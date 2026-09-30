'use client';

import { useCallback } from 'react';
import { ChatMessage } from '@/types/nesai';
import { NesaiMessageList } from './NesaiMessageList';
import { NesaiQuickReplies } from './NesaiQuickReplies';
import { NesaiChatInput } from './NesaiChatInput';

interface NesaiChatBodyProps {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => void;
  variant?: 'floating' | 'fullpage';
  /** True saat cooldown 429 aktif — tombol kirim wajib disabled. */
  isCooldown?: boolean;
  /** Sisa detik cooldown (untuk ditampilkan ke pengguna). */
  cooldownRemaining?: number;
}

export function NesaiChatBody({
  messages,
  isLoading,
  sendMessage,
  variant = 'floating',
  isCooldown = false,
  cooldownRemaining = 0,
}: NesaiChatBodyProps) {
  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  // Blokir input selama request berjalan ATAU selama cooldown 429.
  const isInputDisabled = isLoading || isCooldown;

  // Show quick replies only when there's just the welcome message
  const showQuickReplies = messages.length <= 1 && messages[0]?.sender === 'nesai';

  return (
    <>
      <div className={`flex-1 min-h-0 flex flex-col bg-[#f8faf8] overflow-hidden ${variant === 'fullpage' ? 'min-h-0' : ''}`}>
        <NesaiMessageList messages={messages} isLoading={isLoading} />

        {/* Banner cooldown 429 — pesan ramah, tanpa auto-retry */}
        {isCooldown && (
          <div className="mx-3.5 mb-2 px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 text-[11px] text-amber-800 font-medium text-center">
            Terlalu banyak permintaan. Tunggu {cooldownRemaining}s sebelum mengirim lagi.
          </div>
        )}

        {showQuickReplies && (
          <NesaiQuickReplies onSelect={handleSend} disabled={isInputDisabled} />
        )}
      </div>

      <NesaiChatInput
        onSend={handleSend}
        disabled={isInputDisabled}
        cooldownRemaining={cooldownRemaining}
      />
    </>
  );
}
