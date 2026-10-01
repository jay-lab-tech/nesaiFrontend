/**
 * Pemetaan slug jurusan → logo (WebP) yang tersedia di `public/images/webp/`.
 *
 * File WebP dibuat dari `public/images/logo-asli/` (lihat riwayat konversi).
 * Setiap logo dibuat dua ukuran:
 * - `<nama>.webp`       → ukuran asli (fallback / kualitas tinggi)
 * - `<nama>-512.webp`   → 512px, dipakai untuk tampilan web
 *
 * Dipakai agar kartu jurusan menampilkan LOGO ASLI, bukan ikon generik.
 * Jika slug tidak punya pemetaan, pemanggil sebaiknya fallback ke ikon.
 */
export const JURUSAN_LOGO: Record<string, string> = {
  akl: 'logo-akl',
  pemasaran: 'logo-ps',
  mplb: 'logo-mp',
  pplg: 'logo-rpl',
  tjkt: 'logotkj',
  'teknik-mesin': 'logotpm',
  'teknik-otomotif': 'logoto',
  'teknik-logistik': 'logotl',
  kuliner: 'logo-kl',
  dkv: 'logo-dkv',
};

/** Nama file logo (tanpa ekstensi) untuk sebuah slug, atau null bila tidak ada. */
export function getJurusanLogoName(slug?: string | null): string | null {
  if (!slug) return null;
  return JURUSAN_LOGO[slug] ?? null;
}

/** Path logo ukuran 512px (untuk web). */
export function getJurusanLogo512(slug?: string | null): string | null {
  const name = getJurusanLogoName(slug);
  return name ? `/images/webp/${name}-512.webp` : null;
}

/** Path logo ukuran penuh. */
export function getJurusanLogoFull(slug?: string | null): string | null {
  const name = getJurusanLogoName(slug);
  return name ? `/images/webp/${name}.webp` : null;
}
