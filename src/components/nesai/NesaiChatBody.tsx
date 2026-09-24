'use client';

import { useCallback } from 'react';
import { ChatMessage, NesaiContext } from '@/types/nesai';
import { NesaiMessageList } from './NesaiMessageList';
import { NesaiQuickReplies } from './NesaiQuickReplies';
import { NesaiChatInput } from './NesaiChatInput';

interface NesaiChatBodyProps {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => void;
  variant?: 'floating' | 'fullpage';
  activeContext?: NesaiContext | null;
  prefillValue?: string;
}

export function NesaiChatBody({
  messages,
  isLoading,
  sendMessage,
  variant = 'floating',
  activeContext,
  prefillValue,
}: NesaiChatBodyProps) {
  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  // Show quick replies when conversation is at starting state
  const showQuickReplies = messages.length <= 1 && messages[0]?.sender === 'nesai';

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#f8faf8] overflow-hidden w-full">
      <NesaiMessageList messages={messages} isLoading={isLoading} />

      {showQuickReplies && (
        <NesaiQuickReplies
          onSelect={handleSend}
          disabled={isLoading}
        />
      )}

      <NesaiChatInput onSend={handleSend} disabled={isLoading} prefillValue={prefillValue} />
    </div>
  );
}
