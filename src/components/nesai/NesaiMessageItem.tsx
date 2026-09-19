'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '@/types/nesai';
import { NesaiActionChips } from './NesaiActionChips';
import { NesaiSourceBadges } from './NesaiSourceBadges';

interface NesaiMessageItemProps {
  message: ChatMessage;
}

export function NesaiMessageItem({ message }: NesaiMessageItemProps) {
  const isUser = message.sender === 'user';
  const isError = message.isError;

  return (
    <div className={`nesai-message ${isUser ? 'nesai-message-user' : 'nesai-message-bot'}`}>
      {!isUser && (
        <div className="nesai-avatar-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
      )}
      <div className={`nesai-bubble-container ${isUser ? 'nesai-bubble-container-user' : ''}`}>
        <div
          className={`nesai-bubble ${
            isUser
              ? 'nesai-bubble-user'
              : isError
                ? 'nesai-bubble-error'
                : 'nesai-bubble-bot'
          }`}
        >
          {isUser ? (
            <p className="nesai-user-text">{message.text}</p>
          ) : (
            <div className="nesai-markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Action chips for navigation */}
        {!isUser && message.actions && message.actions.length > 0 && (
          <NesaiActionChips actions={message.actions} />
        )}

        {/* Source badges */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <NesaiSourceBadges sources={message.sources} />
        )}

        {/* Error retry hint */}
        {isError && (
          <p className="nesai-error-hint">
            ⚠️ Coba kirim ulang pertanyaan Anda.
          </p>
        )}

        {/* Timestamp */}
        <span className={`nesai-timestamp ${isUser ? 'nesai-timestamp-user' : ''}`}>
          {new Date(message.createdAt).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
