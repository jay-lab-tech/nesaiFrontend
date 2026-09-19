'use client';

import { useState, useCallback } from 'react';
import { useNesaiChat } from '@/hooks/useNesaiChat';
import { NesaiHeader } from './NesaiHeader';
import { NesaiMessageList } from './NesaiMessageList';
import { NesaiQuickReplies } from './NesaiQuickReplies';
import { NesaiChatInput } from './NesaiChatInput';

export function NesaiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useNesaiChat();

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

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
      {/* Chat Window */}
      <div className={`nesai-chat-window ${isOpen ? 'nesai-chat-open' : 'nesai-chat-closed'}`}>
        <NesaiHeader onClose={handleClose} onClear={clearChat} />

        <div className="nesai-chat-body">
          <NesaiMessageList messages={messages} isLoading={isLoading} />

          {showQuickReplies && (
            <NesaiQuickReplies onSelect={handleSend} disabled={isLoading} />
          )}
        </div>

        <NesaiChatInput onSend={handleSend} disabled={isLoading} />
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        className={`nesai-fab ${isOpen ? 'nesai-fab-active' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Tutup chat NESAI' : 'Buka chat NESAI'}
        aria-expanded={isOpen}
      >
        <span className={`nesai-fab-icon ${isOpen ? 'nesai-fab-icon-hide' : 'nesai-fab-icon-show'}`}>
          {/* Chat icon */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M8 12h.01" />
            <path d="M12 12h.01" />
            <path d="M16 12h.01" />
          </svg>
        </span>
        <span className={`nesai-fab-icon ${isOpen ? 'nesai-fab-icon-show' : 'nesai-fab-icon-hide'}`}>
          {/* Close icon */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </span>
        {/* Notification pulse */}
        {!isOpen && <span className="nesai-fab-pulse" />}
      </button>
    </>
  );
}
