'use client';

import { Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function NesaiTypingIndicator() {
  return (
    <div className="flex items-start gap-2.5 my-2">
      <Avatar className="h-7 w-7 rounded-lg border border-blue-100 dark:border-blue-950 bg-blue-600 shadow-2xs">
        <AvatarFallback className="bg-blue-600 text-white rounded-lg">
          <Sparkles className="h-3.5 w-3.5 text-blue-100 animate-pulse" />
        </AvatarFallback>
      </Avatar>

      <div className="flex items-center gap-2 px-3 py-2 bg-slate-100/80 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl rounded-tl-xs">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-bounce" />
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Mencari informasi NESAS...
        </span>
      </div>
    </div>
  );
}
