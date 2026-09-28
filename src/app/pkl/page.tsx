'use client';

import Link from 'next/link';
import { ArrowUpRight, Building2, Briefcase, Users, Handshake } from 'lucide-react';
import { Breadcrumb } from '@/components/site/Breadcrumb';

const TABS = [
  { id: 'lowongan', label: 'Lowongan PKL', icon: Briefcase },
  { id: 'mitra', label: 'Mitra Industri', icon: Handshake },
] as const;

const PARTNERS = [
  { name: 'PT Telkom Indonesia', industry: 'Telekomunikasi', majors: ['TKJ', 'RPL'] },
  { name: 'PT Astra International', industry: 'Otomotif & Teknologi', majors: ['TOI', 'TKJ'] },
  { name: 'Google Cloud Indonesia', industry: 'Cloud Computing', majors: ['RPL', 'TKJ'] },
  { name: 'Tokopedia (GoTo)', industry: 'E-Commerce & Fintech', majors: ['RPL', 'BDP'] },
  { name: 'Bank BRI', industry: 'Perbankan', majors: ['AKL'] },
  { name: 'PT Indosat Ooredoo', industry: 'Telekomunikasi', majors: ['TKJ'] },
  { name: 'Studio Antelope', industry: 'Animasi & Media', majors: ['DKV'] },
  { name: 'Ruangguru', industry: 'Edtech', majors: ['RPL', 'DKV'] },
];

const STATS = [
  { value: '50+', label: 'Mitra Industri', icon: Building2 },
  { value: '300+', label: 'Siswa Magang/Tahun', icon: Users },
  { value: '85%', label: 'Tingkat Penyerapan', icon: Briefcase },
];

export default function PklPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 pt-8 pb-10 sm:px-8">
          <Breadcrumb items={[{ label: 'PKL Career Center' }]} />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3 py-0.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
                Career Center
              </span>
              <h1 className="font-school-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f1e36] tracking-tight">
                PKL Career Center
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600 leading-relaxed">
                Pusat informasi Praktik Kerja Lapangan (PKL) — temukan lowongan magang,
                jelajahi mitra industri, dan bangun karir sejak di bangku sekolah.
              </p>
            </div>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0f1e36] px-5 py-3 text-sm font-bold text-white hover:bg-[#1e355b] transition shrink-0"
            >
              Ajukan Kerjasama
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-3 divide-x divide-slate-200 px-5 sm:px-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center justify-center gap-3 py-6">
              <Icon className="h-5 w-5 text-amber-600 hidden sm:block" />
              <div className="text-center sm:text-left">
                <p className="font-school-heading text-2xl font-bold text-[#0f1e36]">{value}</p>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-8">
        <div className="flex gap-1 border-b border-slate-200">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition text-[#0f1e36] border-amber-400"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <section className="pb-20 pt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#0f1e36]">{partner.name}</p>
                    <p className="text-xs text-slate-500">{partner.industry}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {partner.majors.map((m) => (
                    <span
                      key={m}
                      className="rounded-md bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
