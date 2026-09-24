'use client';

import { BookOpen, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NesaiSourceBadgesProps {
  sources: string[];
}

export function NesaiSourceBadges({ sources }: NesaiSourceBadgesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-2 flex flex-col gap-1 w-full">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#657c7d]">
        <BookOpen className="h-3 w-3 text-[#5d6a6e]" />
        <span>Sumber Referensi:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => {
          const isDatabase = source.toLowerCase().includes('database') || source.toLowerCase().includes('basis data');
          return (
            <Badge
              key={index}
              variant="outline"
              className={`text-[10.5px] font-medium py-0.5 px-2 rounded-md inline-flex items-center gap-1 ${
                isDatabase
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                  : 'bg-[#f8faf8] border-[#dce5e1] text-[#172b3a]'
              }`}
            >
              {isDatabase && <Database className="h-2.5 w-2.5 text-emerald-600" />}
              <span>{source}</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
