'use client';

import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NesaiSourceBadgesProps {
  sources: string[];
}

export function NesaiSourceBadges({ sources }: NesaiSourceBadgesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
        <BookOpen className="h-3 w-3 text-slate-400" />
        <span>Sumber Resmi:</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {sources.map((source, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-[10.5px] font-normal py-0.5 px-2 bg-slate-50/80 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded"
          >
            {source}
          </Badge>
        ))}
      </div>
    </div>
  );
}
