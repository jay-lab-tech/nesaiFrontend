'use client';

import { Suspense, useEffect, useRef, useState, startTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNesaiChat } from '@/hooks/useNesaiChat';
import { NesaiHeader } from './NesaiHeader';
import { NesaiChatBody } from './NesaiChatBody';
import type { NesaiContext } from '@/types/nesai';
import {
  GraduationCap,
  FileText,
  MapPin,
  Building2,
  RotateCcw,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopicItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  prompt: string;
}

const POPULAR_TOPICS = [
  {
    icon: GraduationCap,
    title: 'Kompetensi & Program Keahlian',
    desc: 'Info kurikulum dan jurusan unggulan',
    prompt: 'Jelaskan jurusan dan kompetensi keahlian yang ada di SMKN 1 Subang',
  },
  {
    icon: FileText,
    title: 'Informasi Pendaftaran PPDB',
    desc: 'Syarat, jalur, dan jadwal seleksi',
    prompt: 'Bagaimana persyaratan dan alur pendaftaran PPDB di SMKN 1 Subang?',
  },
  {
    icon: Building2,
    title: 'Fasilitas & Lab Praktik',
    desc: 'Sarana belajar dan bengkel industri',
    prompt: 'Apa saja sarana dan fasilitas unggulan di SMKN 1 Subang?',
  },
  {
    icon: MapPin,
    title: 'Lokasi & Kontak Sekolah',
    desc: 'Alamat kampus dan saluran resmi',
    prompt: 'Berapa nomor kontak dan di mana alamat lokasi SMKN 1 Subang?',
  },
];

function NesaiFullPageInner() {
  const searchParams = useSearchParams();
  const {
    messages,
    activeContext,
    isLoading,
    sendMessage,
    setActiveContext,
    clearActiveContext,
    clearChat,
  } = useNesaiChat();

  const [prefillPrompt, setPrefillPrompt] = useState<string>('');
  const hasProcessedParams = useRef(false);

  // Parse and apply dynamic URL parameters
  useEffect(() => {
    if (hasProcessedParams.current) return;

    const majorParam = searchParams.get('jurusan') || searchParams.get('major');
    const topicParam = searchParams.get('topic');
    const promptParam = searchParams.get('prompt') || searchParams.get('q');
    const autoSendParam =
      searchParams.get('autoSend') === 'true' || searchParams.get('autoSend') === '1';

    let initialContext: NesaiContext | null = null;
    if (majorParam || topicParam) {
      initialContext = {
        page: 'nesai-fullpage',
        major: majorParam || undefined,
        majorName: majorParam ? majorParam.toUpperCase() : undefined,
        topic: topicParam || (majorParam ? 'jurusan' : undefined),
      };
    }

    startTransition(() => {
      if (initialContext) {
        setActiveContext(initialContext);
      }

      if (promptParam) {
        if (autoSendParam) {
          sendMessage(promptParam, initialContext || undefined);
        } else {
          setPrefillPrompt(promptParam);
        }
      }
    });

    hasProcessedParams.current = true;
  }, [searchParams, setActiveContext, sendMessage]);

  return (
    <div className="w-full h-[calc(100dvh-82px)] max-h-[calc(100dvh-82px)] bg-[#f8faf8] overflow-hidden flex flex-col">
      <div className="mx-auto w-full max-w-7xl h-full flex flex-1 min-h-0 sm:p-4 lg:p-6 sm:gap-6 overflow-hidden">
        {/* Desktop Sidebar: Kontekstual & Navigasi Cepat (Hidden on mobile/tablet) */}
        <aside className="hidden lg:flex w-80 xl:w-96 flex-col bg-white border border-[#dce5e1] rounded-2xl p-5 overflow-y-auto shrink-0 shadow-2xs">
          {/* Header Panel */}
          <div className="pb-4 border-b border-[#edf2ef]">
            <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full w-fit text-[11px] font-semibold mb-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sistem AI Aktif</span>
            </div>
            <h2 className="font-school-heading text-lg font-bold text-[#172b3a] tracking-tight">
              Panduan Percakapan
            </h2>
            <p className="text-xs text-[#5d6a6e] mt-1 leading-relaxed">
              Ajukan pertanyaan seputar akademik, pendaftaran siswa baru, jurusan, serta sarana di SMKN 1 Subang.
            </p>
          </div>

          {/* Topik Populer / Quick Prompts */}
          <div className="py-4 border-b border-[#edf2ef] flex-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#657c7d] block mb-3">
              Topik Populer
            </span>
            <div className="space-y-2">
              {POPULAR_TOPICS.map((topic, idx) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => sendMessage(topic.prompt)}
                    className="w-full text-left p-3 rounded-xl border border-[#dce5e1] bg-[#fcfdfc] hover:bg-[#edf3f0] hover:border-[#b9c7c2] transition group flex items-start gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 rounded-lg bg-white border border-[#dce5e1] text-[#172b3a] group-hover:border-[#e7ae32] group-hover:text-[#09243b] transition-colors shrink-0 mt-0.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#172b3a] group-hover:text-[#09243b] leading-tight flex items-center justify-between">
                        <span>{topic.title}</span>
                        <ArrowUpRight className="h-3 w-3 text-[#9db0aa] group-hover:text-[#e7ae32] transition-colors" />
                      </p>
                      <p className="text-[11px] text-[#657c7d] mt-0.5 leading-snug line-clamp-1">
                        {topic.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info & Action Footer */}
          <div className="pt-4 space-y-3">
            <div className="p-3 rounded-xl bg-[#f8faf8] border border-[#dce5e1] text-xs text-[#5d6a6e] space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#172b3a]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#315e68]" />
                <span>Informasi Terverifikasi</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Jawaban dirangkum otomatis dari basis data resmi SMKN 1 Subang.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="w-full text-xs font-semibold h-9 rounded-xl border-[#dce5e1] text-[#172b3a] hover:bg-[#edf3f0] hover:border-[#b9c7c2] transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5 text-[#5d6a6e]" />
                <span>Reset Percakapan</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Chat Area: Mengisi penuh ruang di mobile & tablet, 1 kartu di desktop */}
        <main className="flex-1 w-full h-full flex flex-col bg-white sm:border sm:border-[#dce5e1] sm:rounded-2xl overflow-hidden shadow-xs">
          <NesaiHeader
            onClear={clearChat}
            variant="fullpage"
            activeContext={activeContext}
            onClearContext={clearActiveContext}
          />

          <NesaiChatBody
            messages={messages}
            isLoading={isLoading}
            sendMessage={sendMessage}
            variant="fullpage"
            activeContext={activeContext}
            prefillValue={prefillPrompt}
          />
        </main>
      </div>
    </div>
  );
}

export function NesaiFullPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[calc(100dvh-82px)] flex items-center justify-center bg-[#f8faf8]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
            <p className="text-xs text-[#5d6a6e] font-medium">Memuat NesAI...</p>
          </div>
        </div>
      }
    >
      <NesaiFullPageInner />
    </Suspense>
  );
}

