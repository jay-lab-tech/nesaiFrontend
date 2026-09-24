'use client';

import { RotateCcw, X, Target, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { NesaiContext } from '@/types/nesai';

interface NesaiHeaderProps {
  onClose?: () => void;
  onClear: () => void;
  variant?: 'floating' | 'fullpage';
  activeContext?: NesaiContext | null;
  onClearContext?: () => void;
}

export function NesaiHeader({
  onClose,
  onClear,
  variant = 'floating',
  activeContext,
  onClearContext,
}: NesaiHeaderProps) {
  const contextLabel =
    activeContext?.majorName ||
    (activeContext?.major ? `Jurusan ${activeContext.major.toUpperCase()}` : '') ||
    (activeContext?.topic ? `Topik ${activeContext.topic.toUpperCase()}` : '');

  return (
    <div className="flex flex-col border-b border-[#dce5e1] bg-white shrink-0 select-none">
      {/* Main Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 text-[#172b3a]">
        {/* Left: Brand Identity & Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#172b3a] to-[#09243b] text-white shadow-xs">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-[#e7ae32]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white" />
            </span>
          </div>

          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-school-heading text-base sm:text-lg font-bold tracking-tight text-[#172b3a]">
                NesAI
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-medium text-emerald-800 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Online</span>
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#657c7d] truncate">
              Asisten SMKN 1 Subang
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            title="Reset percakapan"
            aria-label="Reset percakapan"
            className="h-8 px-2 text-xs font-semibold rounded-lg text-[#5d6a6e] hover:text-[#172b3a] hover:bg-[#edf3f0] transition flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>

          {variant === 'floating' && onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              title="Tutup jendela chat"
              aria-label="Tutup jendela chat"
              className="h-8 w-8 text-[#5d6a6e] hover:text-[#172b3a] hover:bg-[#edf3f0] rounded-lg cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Context Banner: Cleanly placed in its own strip to guarantee zero layout overlapping */}
      {contextLabel && (
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-1.5 bg-[#f0f7f5] border-t border-[#e2ece7] text-xs">
          <div className="flex items-center gap-1.5 min-w-0 pr-2">
            <Target className="h-3.5 w-3.5 text-cyan-700 shrink-0" />
            <span className="text-[11px] font-medium text-slate-700 truncate">
              Fokus: <strong className="text-cyan-900 font-semibold">{contextLabel}</strong>
            </span>
          </div>
          {onClearContext && (
            <button
              type="button"
              onClick={onClearContext}
              title="Hapus fokus konteks"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-800 hover:text-cyan-950 bg-white/90 hover:bg-white border border-cyan-200/80 px-2 py-0.5 rounded-md transition shrink-0 cursor-pointer shadow-2xs"
            >
              <span>Semua</span>
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
