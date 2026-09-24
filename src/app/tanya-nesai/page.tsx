import type { Metadata } from 'next';
import { NesaiFullPage } from '@/components/nesai/NesaiFullPage';

export const metadata: Metadata = {
  title: 'Tanya NESAI — Asisten Virtual SMKN 1 Subang',
  description:
    'Konsultasi langsung dengan NESAI, asisten virtual cerdas SMKN 1 Subang. Tanyakan tentang jurusan, PPDB, fasilitas, dan informasi sekolah lainnya.',
};

export default function TanyaNesaiPage() {
  return <NesaiFullPage />;
}
