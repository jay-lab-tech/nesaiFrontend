'use client';

import { RotateCcw, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NesaiHeaderProps {
  onClose: () => void;
  onClear: () => void;
}

export function NesaiHeader({ onClose, onClear }: NesaiHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-900 text-slate-50 shrink-0 select-none">
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8 rounded-lg bg-blue-600 border border-blue-400/30">
          <AvatarFallback className="bg-blue-600 text-white rounded-lg">
            <Sparkles className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold tracking-tight text-white leading-none">
              NESAI
            </h3>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-500/20 text-blue-300 border border-blue-400/20">
              Navigator
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5 leading-none">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Asisten SMKN 1 Subang
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClear}
          title="Reset percakapan"
          aria-label="Reset percakapan"
          className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          title="Tutup"
          aria-label="Tutup jendela chat"
          className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
