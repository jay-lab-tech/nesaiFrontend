import type { Metadata } from 'next';
import { NesaiFullPage } from '@/components/nesai/NesaiFullPage';

export const metadata: Metadata = {
  title: 'NesAI — Asisten Virtual SMKN 1 Subang',
  description:
    'Konsultasi langsung dengan NesAI, asisten virtual cerdas SMKN 1 Subang. Tanyakan tentang jurusan, PPDB, fasilitas, dan informasi sekolah lainnya.',
};

export default function NesaiRoutePage() {
  return <NesaiFullPage />;
}
