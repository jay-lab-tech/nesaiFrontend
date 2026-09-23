'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage } from '@/types/nesai';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
      className={`flex gap-2.5 my-1.5 transition-all animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ${
        isUser ? 'flex-row-reverse' : 'flex-row items-start'
      }`}
    >
      {!isUser && (
        <Avatar className="h-7 w-7 rounded-lg bg-blue-600 border border-blue-400/30 shrink-0 mt-0.5 shadow-2xs">
          <AvatarFallback className="bg-blue-600 text-white rounded-lg">
            <Sparkles className="h-3.5 w-3.5" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`max-w-[85%] min-w-0 flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed break-words shadow-2xs ${
            isUser
              ? 'bg-slate-900 text-white dark:bg-blue-600 rounded-tr-xs'
              : isError
              ? 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-200 rounded-tl-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs'
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
          <p className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 mt-1 px-1">
            <AlertCircle className="h-3 w-3" />
            <span>Koneksi terganggu. Silakan coba lagi.</span>
          </p>
        )}

        {/* Timestamp */}
        {formattedTime ? (
          <span
            suppressHydrationWarning
            className={`text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1 ${
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
