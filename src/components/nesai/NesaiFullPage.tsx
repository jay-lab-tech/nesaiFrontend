'use client';

import { useNesaiChat } from '@/hooks/useNesaiChat';
import { NesaiHeader } from './NesaiHeader';
import { NesaiChatBody } from './NesaiChatBody';

export function NesaiFullPage() {
  const { messages, isLoading, sendMessage, clearChat } = useNesaiChat();

  return (
    <section className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-start justify-center px-3 sm:px-6 py-6 sm:py-10">
      <div className="w-full max-w-3xl flex flex-col h-[calc(100vh-5rem-3rem)] sm:h-[calc(100vh-5rem-5rem)] rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-xl overflow-hidden">
        <NesaiHeader onClear={clearChat} variant="fullpage" />

        <NesaiChatBody
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
          variant="fullpage"
        />
      </div>
    </section>
  );
}
