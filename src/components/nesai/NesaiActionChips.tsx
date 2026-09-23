'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NesaiAction } from '@/types/nesai';

interface NesaiActionChipsProps {
  actions: NesaiAction[];
}

export function NesaiActionChips({ actions }: NesaiActionChipsProps) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-[#edf2ef]">
      {actions.map((action, index) => {
        if (action.type === 'navigate') {
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              asChild
              className="h-7 px-3 text-xs font-semibold rounded-full border-[#dce5e1] bg-[#f8faf8] text-[#172b3a] hover:bg-[#edf3f0] hover:text-[#09243b] hover:border-[#b9c7c2] transition-all shadow-none"
            >
              <Link href={action.path} className="inline-flex items-center gap-1.5">
                <span>{action.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#e7ae32]" />
              </Link>
            </Button>
          );
        }

        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-7 px-3 text-xs font-semibold rounded-full border-[#dce5e1] text-[#172b3a] hover:bg-[#edf3f0]"
          >
            {action.title}
          </Button>
        );
      })}
    </div>
  );
}
