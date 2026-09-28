'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string; // undefined = current page (rendered as text, not link)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Reusable breadcrumb navigation for non-landing pages (L1 & L2).
 * Semantic `<nav aria-label="Breadcrumb">` with `aria-current="page"` on the last item.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        <li>
          <Link
            href="/"
            className="font-medium text-slate-500 hover:text-[#0f1e36] transition-colors"
          >
            Beranda
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-slate-400" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="font-semibold text-[#0f1e36] truncate max-w-[240px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="font-medium text-slate-500 hover:text-[#0f1e36] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
