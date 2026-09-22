"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Target, Award, ChevronRight } from "lucide-react";
import { NesaiPromoBar } from "@/components/home/NesaiPromoBar";
import { Skeleton } from "@/components/ui/skeleton";
import { publicApiGet } from "@/lib/api/cms-client";
import type { ApiResponse, School } from "@/types/cms";

export default function ProfilPage() {
  const [school, setSchool] = useState<School | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    publicApiGet<ApiResponse<School>>("/school")
      .then((response) => setSchool(response.data))
      .catch(() => setError(true));
  }, []);

  const classroomCount = school?.classroom_count ?? (school?.classroom_count_min != null && school.classroom_count_max != null ? `${school.classroom_count_min}–${school.classroom_count_max}` : null);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4"><Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link><ChevronRight className="h-3 w-3" /><span className="text-cyan-300">Profil Sekolah</span></nav>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4"><Building2 className="h-3.5 w-3.5 text-cyan-400" />Tentang Sekolah</span>
          {school ? <><h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">{school.name}</h1>{school.description && <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">{school.description}</p>}</> : <Skeleton className="h-12 w-96 max-w-full" />}
        </div>
      </section>

      {error ? <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-slate-600">Profil sekolah tidak dapat dimuat.</div></section> : !school ? <section className="py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Skeleton className="h-64 w-full" /></div></section> : <>
        {(school.vision || school.mission) && <section className="py-20 bg-white border-y border-slate-200"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {school.vision && <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-sky-50/50 p-8 sm:p-10 shadow-sm"><div className="flex items-center gap-3 mb-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md"><Target className="h-6 w-6 text-cyan-200" /></div><div><span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Arah & Pandangan</span><h2 className="text-2xl font-extrabold text-slate-900">Visi Sekolah</h2></div></div><p className="text-lg font-semibold text-slate-800 leading-relaxed italic">{school.vision}</p></div>}
          {school.mission && <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm"><div className="flex items-center gap-3 mb-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md"><Award className="h-6 w-6 text-cyan-400" /></div><div><span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Langkah Strategis</span><h2 className="text-2xl font-extrabold text-slate-900">Misi Sekolah</h2></div></div><p className="whitespace-pre-line text-sm sm:text-base text-slate-600">{school.mission}</p></div>}
        </div></div></section>}
        <section className="py-20 bg-white border-t border-slate-200"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"><div className="lg:col-span-7 space-y-6"><h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Identitas Sekolah</h2><div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">{school.founded_year != null && <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><p className="text-xs text-slate-500 font-semibold">Tahun Berdiri</p><p className="text-xl font-black text-blue-600">{school.founded_year}</p></div>}{school.accreditation && <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><p className="text-xs text-slate-500 font-semibold">Akreditasi</p><p className="text-xl font-black text-emerald-600">{school.accreditation}</p></div>}{classroomCount != null && <div className="p-4 rounded-xl bg-slate-50 border border-slate-200"><p className="text-xs text-slate-500 font-semibold">Ruang Kelas</p><p className="text-xl font-black text-blue-600">{classroomCount} ruang kelas</p></div>}</div></div><div className="lg:col-span-5"><div className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-8 shadow-xl"><div className="flex items-center gap-3 mb-6"><Building2 className="h-6 w-6 text-cyan-400" /><h3 className="text-xl font-bold">Identitas Resmi</h3></div><dl className="space-y-4 text-sm divide-y divide-slate-800">{school.npsn && <div className="pt-2 flex justify-between"><dt className="text-slate-400">NPSN</dt><dd className="font-semibold text-slate-100">{school.npsn}</dd></div>}{school.address && <div className="pt-3"><dt className="text-slate-400">Alamat</dt><dd className="font-semibold text-slate-100 mt-1">{school.address}</dd></div>}{school.phone && <div className="pt-3 flex justify-between"><dt className="text-slate-400">Nomor Telepon</dt><dd className="font-semibold text-slate-100">{school.phone}</dd></div>}{school.email && <div className="pt-3 flex justify-between"><dt className="text-slate-400">Email</dt><dd className="font-semibold text-slate-100">{school.email}</dd></div>}</dl></div></div></div></div></section>
      </>}
      <NesaiPromoBar />
    </div>
  );
}
