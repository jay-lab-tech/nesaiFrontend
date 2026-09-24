'use client';

import { Bot, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';

const QUICK_PROMPTS = [
  'Apa saja syarat pendaftaran PPDB 2026?',
  'Jelaskan keunggulan jurusan RPL di sini',
  'Berapa kuota penerimaan tiap jurusan?',
  'Apakah ada beasiswa di SMKN 1 Subang?',
];

export function NesaiPromoBar() {
  return (
    <section className="py-10 bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-200 bg-gradient-to-r from-cyan-50/90 via-sky-50/70 to-blue-50/90 p-6 sm:p-8 shadow-sm">
          {/* Subtle Ambient Glow */}
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Bot Identity & Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-md shadow-cyan-600/30">
                <Bot className="h-7 w-7 text-cyan-200" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-slate-900">
                    Tanya NESAI — Asisten AI Sekolah Kami
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-100 border border-cyan-200 px-2 py-0.5 text-[10px] font-bold text-cyan-800">
                    <Sparkles className="h-2.5 w-2.5" />
                    Online 24/7
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Butuh info cepat seputar jurusan, PPDB, ekstrakurikuler, atau kurikulum? Chat langsung dengan asisten virtual resmi kami.
                </p>
              </div>
            </div>

            {/* Right: Quick Prompts & Open Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="hidden xl:flex items-center gap-2">
                {QUICK_PROMPTS.slice(0, 2).map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      openNesaiChat({
                        prompt,
                        context: { page: 'promobar', topic: 'general' },
                        autoSend: true,
                      })
                    }
                    className="rounded-full bg-white border border-cyan-300/80 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-cyan-500 hover:text-cyan-800 hover:bg-cyan-50 shadow-2xs transition-all truncate max-w-xs text-left cursor-pointer"
                  >
                    💬 {prompt}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openNesaiChat()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all shrink-0"
              >
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                <span>Mulai Chat Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
