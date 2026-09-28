'use client';

import { RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NesaiHeaderProps {
  onClose?: () => void;
  onClear: () => void;
  variant?: 'floating' | 'fullpage';
}

export function NesaiHeader({ onClose, onClear, variant = 'floating' }: NesaiHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#dce5e1] bg-white text-[#172b3a] shrink-0 select-none ${
        variant === 'fullpage' ? 'w-full' : ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex flex-col leading-none">
          <span className="font-school-heading text-xl sm:text-2xl font-extrabold tracking-[-0.04em] text-[#172b3a]">
            NesAI
          </span>
          <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-[#657c7d] uppercase">
            Asisten SMKN 1 Subang
          </span>
        </div>

        <div className="hidden xs:inline-flex sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-medium text-emerald-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Online</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClear}
          title="Reset percakapan"
          aria-label="Reset percakapan"
          className="h-8 px-2.5 text-xs font-semibold rounded-lg border-[#dce5e1] bg-white text-[#172b3a] hover:bg-[#edf3f0] hover:border-[#b9c7c2] transition flex items-center gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#5d6a6e]" />
          <span className="hidden sm:inline">Reset Chat</span>
        </Button>

        {variant === 'floating' && onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Tutup"
            aria-label="Tutup jendela chat"
            className="h-8 w-8 text-[#5d6a6e] hover:text-[#172b3a] hover:bg-[#edf3f0] rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
