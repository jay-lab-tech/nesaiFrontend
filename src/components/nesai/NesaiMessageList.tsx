'use client';

import { useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/nesai';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NesaiMessageItem } from './NesaiMessageItem';
import { NesaiTypingIndicator } from './NesaiTypingIndicator';

interface NesaiMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function NesaiMessageList({ messages, isLoading }: NesaiMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 min-h-0 relative w-full overflow-hidden">
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col gap-3 px-3.5 sm:px-5 py-3.5 sm:py-4 min-w-0">
          {messages.map((message) => (
            <NesaiMessageItem key={message.id} message={message} />
          ))}
          {isLoading && <NesaiTypingIndicator />}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </ScrollArea>
    </div>
  );
}
