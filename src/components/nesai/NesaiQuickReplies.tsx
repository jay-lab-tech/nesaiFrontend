'use client';

import { Compass, GraduationCap, FileText, MapPin, Sparkles } from 'lucide-react';

interface NesaiQuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const QUICK_QUESTIONS = [
  {
    icon: Compass,
    label: 'Rekomendasi Jurusan',
    text: 'Jurusan apa yang cocok buat minat saya?',
  },
  {
    icon: GraduationCap,
    label: 'Kompetensi PPLG',
    text: 'Apa saja kompetensi keahlian dan mapel di PPLG?',
  },
  {
    icon: FileText,
    label: 'Syarat & Alur PPDB',
    text: 'Bagaimana jalur dan syarat pendaftaran PPDB?',
  },
  {
    icon: MapPin,
    label: 'Profil Sekolah',
    text: 'Siapa kepala sekolah dan bagaimana profil SMKN 1 Subang?',
  },
];

export function NesaiQuickReplies({ onSelect, disabled }: NesaiQuickRepliesProps) {
  return (
    <div className="px-3 sm:px-4 py-2 bg-[#fcfdfc] border-t border-[#edf2ef] shrink-0">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#657c7d] shrink-0 mr-1 flex items-center gap-1 select-none">
          <Sparkles className="h-3 w-3 text-[#e7ae32]" />
          Saran:
        </span>
        {QUICK_QUESTIONS.map((q, index) => {
          const Icon = q.icon;
          return (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(q.text)}
              title={q.text}
              className="inline-flex items-center gap-1.5 h-7 px-3 text-xs font-medium rounded-full bg-white border border-[#dce5e1] hover:bg-[#edf3f0] hover:border-[#b9c7c2] hover:text-[#09243b] text-[#172b3a] transition shadow-2xs shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-95"
            >
              <Icon className="h-3 w-3 text-[#5d6a6e] shrink-0" />
              <span>{q.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
