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
    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-1">
      {actions.map((action, index) => {
        if (action.type === 'navigate') {
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              asChild
              className="h-7 px-3 text-xs font-medium rounded-full border-blue-200/80 bg-blue-50/50 text-blue-900 hover:bg-blue-100/60 hover:text-blue-950 hover:border-blue-300 transition-all shadow-none"
            >
              <Link href={action.path} className="inline-flex items-center gap-1">
                <span>{action.title}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-blue-600" />
              </Link>
            </Button>
          );
        }

        return (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-7 px-3 text-xs font-medium rounded-full border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {action.title}
          </Button>
        );
      })}
    </div>
  );
}
