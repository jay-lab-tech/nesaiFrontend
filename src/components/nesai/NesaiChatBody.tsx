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
}

export function NesaiChatBody({
  messages,
  isLoading,
  sendMessage,
  variant = 'floating',
}: NesaiChatBodyProps) {
  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  // Show quick replies only when there's just the welcome message
  const showQuickReplies = messages.length <= 1 && messages[0]?.sender === 'nesai';

  return (
    <>
      <div className={`flex-1 min-h-0 flex flex-col bg-slate-50/40 dark:bg-slate-900/20 overflow-hidden ${variant === 'fullpage' ? 'min-h-[300px]' : ''}`}>
        <NesaiMessageList messages={messages} isLoading={isLoading} />

        {showQuickReplies && (
          <NesaiQuickReplies onSelect={handleSend} disabled={isLoading} />
        )}
      </div>

      <NesaiChatInput onSend={handleSend} disabled={isLoading} />
    </>
  );
}
