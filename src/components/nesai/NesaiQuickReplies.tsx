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
    <div className="px-4 py-3.5 border-t border-[#edf2ef] bg-[#fcfdfc]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#657c7d] mb-2.5 px-0.5">
        Rekomendasi Pertanyaan:
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
              className="h-auto py-2.5 px-3 justify-start text-left font-medium bg-white border-[#dce5e1] hover:bg-[#edf3f0] hover:border-[#b9c7c2] text-[#172b3a] rounded-xl shadow-2xs group transition-all"
            >
              <Icon className="h-3.5 w-3.5 mr-2 text-[#5d6a6e] group-hover:text-[#e7ae32] transition-colors shrink-0" />
              <span className="text-xs leading-snug">{q.text}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
