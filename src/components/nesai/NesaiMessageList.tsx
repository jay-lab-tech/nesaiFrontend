'use client';

import { useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/nesai';
import { NesaiMessageItem } from './NesaiMessageItem';
import { NesaiTypingIndicator } from './NesaiTypingIndicator';

interface NesaiMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function NesaiMessageList({ messages, isLoading }: NesaiMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div ref={containerRef} className="nesai-message-list">
      {messages.map((message) => (
        <NesaiMessageItem key={message.id} message={message} />
      ))}
      {isLoading && <NesaiTypingIndicator />}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
