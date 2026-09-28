'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertCircle } from 'lucide-react';
import { ChatMessage } from '@/types/nesai';
import { NesaiActionChips } from './NesaiActionChips';
import { NesaiSourceBadges } from './NesaiSourceBadges';

interface NesaiMessageItemProps {
  message: ChatMessage;
}

function formatTimestamp(dateInput?: Date | string): string {
  if (!dateInput) return '';
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export function NesaiMessageItem({ message }: NesaiMessageItemProps) {
  const isUser = message.sender === 'user';
  const isError = message.isError;
  const formattedTime = formatTimestamp(message.createdAt);

  return (
    <div
      className={`flex flex-col my-2 transition-all animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ${
        isUser ? 'items-end' : 'items-start'
      }`}
    >
      {/* Sender Label */}
      <span
        className={`font-school-heading text-[11px] font-bold tracking-tight mb-1 px-1 ${
          isUser ? 'text-[#657c7d]' : 'text-[#172b3a]'
        }`}
      >
        {isUser ? 'Anda' : 'NesAI'}
      </span>

      {/* Message Bubble Container */}
      <div className={`max-w-[90%] sm:max-w-[80%] min-w-0 flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-xs sm:text-[13.5px] leading-relaxed break-words shadow-2xs ${
            isUser
              ? 'bg-[#172b3a] text-white rounded-tr-xs'
              : isError
              ? 'bg-red-50 border border-red-200 text-red-900 rounded-tl-xs'
              : 'bg-white border border-[#dce5e1] text-[#172b3a] rounded-tl-xs'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
          ) : (
            <div className="nesai-prose">
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
          <p className="flex items-center gap-1 text-[11px] text-red-600 mt-1 px-1">
            <AlertCircle className="h-3 w-3" />
            <span>Koneksi terganggu. Silakan coba lagi.</span>
          </p>
        )}

        {/* Timestamp */}
        {formattedTime ? (
          <span
            suppressHydrationWarning
            className={`text-[10px] text-[#9db0aa] mt-1 px-1 ${
              isUser ? 'text-right' : 'text-left'
            }`}
          >
            {formattedTime}
          </span>
        ) : null}
      </div>
    </div>
  );
}
