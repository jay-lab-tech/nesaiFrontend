'use client';

import Link from 'next/link';
import { NesaiAction } from '@/types/nesai';

interface NesaiActionChipsProps {
  actions: NesaiAction[];
}

export function NesaiActionChips({ actions }: NesaiActionChipsProps) {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="nesai-actions">
      {actions.map((action, index) => {
        if (action.type === 'navigate') {
          return (
            <Link
              key={index}
              href={action.path}
              className="nesai-action-chip"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              {action.title}
            </Link>
          );
        }

        return (
          <button key={index} className="nesai-action-chip" type="button">
            {action.title}
          </button>
        );
      })}
    </div>
  );
}
