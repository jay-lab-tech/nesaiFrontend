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
    <ScrollArea className="flex-1 px-3.5 py-3">
      <div className="flex flex-col gap-1.5">
        {messages.map((message) => (
          <NesaiMessageItem key={message.id} message={message} />
        ))}
        {isLoading && <NesaiTypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </ScrollArea>
  );
}
