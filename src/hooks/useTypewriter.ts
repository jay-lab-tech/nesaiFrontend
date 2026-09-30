'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseTypewriterOptions {
  /**
   * Total durasi target reveal (ms) untuk teks berukuran "normal".
   * Kecepatan per-tick dihitung adaptif dari panjang teks sehingga teks
   * pendek selesai cepat dan teks panjang tidak membuang waktu user.
   */
  targetDurationMs?: number;
  /** Durasi minimum (ms) — teks sangat pendek tetap terasa "mengetik". */
  minDurationMs?: number;
  /** Durasi maksimum (ms) — batas atas agar jawaban sangat panjang tak berlarut. */
  maxDurationMs?: number;
  /** Interval satu "tick" render (ms). ~30fps cukup halus & hemat CPU. */
  tickMs?: number;
}

export interface UseTypewriterResult {
  /** Teks yang sudah ter-reveal (substring aman dari `fullText`). */
  visibleText: string;
  /** True selama reveal masih berjalan. */
  isTyping: boolean;
  /** Loncat langsung ke teks penuh (mis. user klik untuk melewati). */
  skipToEnd: () => void;
}

const DEFAULT_OPTIONS: Required<UseTypewriterOptions> = {
  targetDurationMs: 1300,
  minDurationMs: 800,
  maxDurationMs: 1800,
  tickMs: 33,
};

/**
 * Deteksi apakah user meminta pengurangan gerakan (aksesibilitas).
 * Bila ya, teks ditampilkan utuh tanpa animasi.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Geser indeks potong maju satu posisi dengan aman terhadap pasangan
 * surrogate UTF-16 (emoji) sehingga karakter tidak pernah terbelah
 * menjadi dua code unit yang tidak valid.
 */
function advanceIndex(text: string, index: number): number {
  const next = index + 1;
  if (next >= text.length) return text.length;
  // Jika karakter pada posisi `index` adalah high surrogate, ikutkan
  // low surrogate pasangannya agar emoji utuh.
  const code = text.charCodeAt(index);
  if (code >= 0xd800 && code <= 0xdbff) {
    const low = text.charCodeAt(next);
    if (low >= 0xdc00 && low <= 0xdfff) return next + 1;
  }
  return next;
}

/**
 * Progressive reveal (typewriter) untuk teks jawaban asisten.
 *
 * - `enabled = false` → langsung tampilkan `fullText` (mis. pesan historis
 *   dari storage atau pesan non-bot), tanpa animasi.
 * - `enabled = true` → reveal `fullText` bertahap dari kosong, adaptif
 *   terhadap panjang teks, dan menghormati `prefers-reduced-motion`.
 *
 * Hook ini murni presentasional dan tidak pernah mengubah data sumber.
 */
export function useTypewriter(
  fullText: string,
  enabled: boolean,
  options?: UseTypewriterOptions
): UseTypewriterResult {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Reduced-motion & disabled → instan. Dihitung per-render (matchMedia
  // murah) sehingga tidak menimbulkan cascading render.
  const instant = !enabled || prefersReducedMotion();

  // Posisi karakter yang sudah ter-reveal untuk mode animasi.
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(!instant);

  // Pola "reset state saat render": ketika teks/mode berganti, setel ulang
  // posisi reveal selama fase render (bukan di dalam effect), sesuai panduan
  // React agar tidak memicu cascading render.
  const [prevKey, setPrevKey] = useState<string>('');
  const currentKey = `${instant ? 'i' : 'a'}:${fullText}`;
  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    if (instant) {
      setRevealedCount(fullText.length);
      setIsTyping(false);
    } else {
      setRevealedCount(0);
      setIsTyping(true);
    }
  }

  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const skipToEnd = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    rafRef.current = null;
    timerRef.current = null;
    setRevealedCount(fullText.length);
    setIsTyping(false);
  };

  useEffect(() => {
    // Kasus instan / kosong: batalkan animasi yang mungkin masih berjalan.
    // Sinkronisasi state instan sudah ditangani pola reset-saat-render di atas.
    if (instant || !fullText) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      rafRef.current = null;
      timerRef.current = null;
      return;
    }

    // Hitung kecepatan adaptif: total durasi di-clamp ke rentang
    // [minDurationMs, maxDurationMs], lalu dikonversi ke karakter-per-tick.
    const total = fullText.length;
    const duration = Math.min(
      opts.maxDurationMs,
      Math.max(opts.minDurationMs, opts.targetDurationMs)
    );
    const totalTicks = Math.max(1, Math.round(duration / opts.tickMs));
    const charsPerTick = Math.max(1, Math.ceil(total / totalTicks));

    let idx = 0;

    const tick = () => {
      let step = 0;
      while (step < charsPerTick && idx < total) {
        idx = advanceIndex(fullText, idx);
        step++;
      }
      setRevealedCount(idx);

      if (idx >= total) {
        setIsTyping(false);
        rafRef.current = null;
        timerRef.current = null;
        return;
      }
      // Yield render lalu lanjut tick berikutnya.
      rafRef.current = requestAnimationFrame(() => {
        timerRef.current = setTimeout(tick, opts.tickMs);
      });
    };

    timerRef.current = setTimeout(tick, opts.tickMs);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      rafRef.current = null;
      timerRef.current = null;
    };
    // Re-run hanya saat teks/mode/opsi inti berubah.
  }, [fullText, instant, opts.tickMs, opts.minDurationMs, opts.maxDurationMs, opts.targetDurationMs]);

  // Nilai turunan: dalam mode instan selalu tampilkan teks penuh; dalam mode
  // animasi tampilkan sebanyak `revealedCount`. Ini menghilangkan kebutuhan
  // setState sinkron di dalam effect untuk kasus instan/teks berubah.
  const visibleText = instant ? fullText : fullText.slice(0, revealedCount);
  const typing = !instant && isTyping;

  return { visibleText, isTyping: typing, skipToEnd };
}
