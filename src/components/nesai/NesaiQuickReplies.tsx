'use client';

import { Compass, GraduationCap, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NesaiQuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const QUICK_QUESTIONS = [
  {
    icon: Compass,
    text: 'Jurusan apa yang cocok buat minat saya?',
  },
  {
    icon: GraduationCap,
    text: 'Apa saja kompetensi keahlian di SMKN 1 Subang?',
  },
  {
    icon: FileText,
    text: 'Bagaimana jalur dan syarat pendaftaran PPDB?',
  },
  {
    icon: MapPin,
    text: 'Di mana lokasi dan kontak resmi sekolah?',
  },
];

export function NesaiQuickReplies({ onSelect, disabled }: NesaiQuickRepliesProps) {
  return (
    <div className="px-3.5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
        Coba tanyakan:
      </p>
      <div className="flex flex-col gap-1.5">
        {QUICK_QUESTIONS.map((q, index) => {
          const Icon = q.icon;
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => onSelect(q.text)}
              className="h-auto py-2 px-2.5 justify-start text-left font-normal bg-white dark:bg-slate-950 border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-200 hover:text-blue-900 text-slate-700 dark:text-slate-200 dark:hover:text-blue-300 rounded-lg shadow-2xs group transition-all"
            >
              <Icon className="h-3.5 w-3.5 mr-2 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
              <span className="text-xs leading-snug">{q.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
