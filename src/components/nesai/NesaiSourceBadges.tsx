'use client';

import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NesaiSourceBadgesProps {
  sources: string[];
}

export function NesaiSourceBadges({ sources }: NesaiSourceBadgesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-2.5 pt-2 border-t border-[#edf2ef] flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#657c7d]">
        <BookOpen className="h-3 w-3 text-[#5d6a6e]" />
        <span>Sumber Referensi:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-[10.5px] font-medium py-0.5 px-2 bg-[#f8faf8] border-[#dce5e1] text-[#172b3a] rounded-md"
          >
            {source}
          </Badge>
        ))}
      </div>
    </div>
  );
}
