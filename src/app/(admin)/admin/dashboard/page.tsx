"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  Lightbulb,
  Newspaper,
  Building2,
  Trophy,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { dashboardService } from "@/lib/api/cms-endpoints";
import type { DashboardMetrics } from "@/types/cms";

const DEFAULT_METRICS = [
  { label: "Program Keahlian", value: 8, icon: <GraduationCap size={22} />, color: "var(--admin-info)", bgColor: "var(--admin-info-bg)" },
  { label: "Pendaftar PPDB 2026", value: 1247, icon: <BarChart3 size={22} />, color: "var(--admin-success)", bgColor: "var(--admin-success-bg)" },
  { label: "Keterserapan Alumni", value: "84.5%", icon: <TrendingUp size={22} />, color: "var(--admin-accent)", bgColor: "var(--admin-warning-bg)" },
  { label: "Karya Inovasi", value: 23, icon: <Lightbulb size={22} />, color: "var(--admin-warning)", bgColor: "var(--admin-warning-bg)" },
  { label: "Berita Terbit", value: 42, icon: <Newspaper size={22} />, color: "var(--admin-primary)", bgColor: "var(--admin-primary-light)" },
  { label: "Fasilitas", value: 35, icon: <Building2 size={22} />, color: "var(--admin-fg-muted)", bgColor: "var(--admin-bg-secondary)" },
  { label: "Ekstrakurikuler", value: 18, icon: <Trophy size={22} />, color: "#8b5cf6", bgColor: "var(--admin-badge-purple-bg)" },
  { label: "Alumni Terdaftar", value: 156, icon: <Users size={22} />, color: "var(--admin-info)", bgColor: "var(--admin-info-bg)" },
];

const RECENT_ACTIVITIES = [
  { action: "Berita baru dipublikasikan", detail: "Juara 1 Lomba Kompetensi Siswa Tingkat Nasional", time: "2 jam lalu" },
  { action: "Data PPDB diperbarui", detail: "Periode PPDB 2026/2027 diaktifkan", time: "5 jam lalu" },
  { action: "Jurusan baru ditambahkan", detail: "Desain Komunikasi Visual (DKV)", time: "1 hari lalu" },
  { action: "Profil sekolah diperbarui", detail: "Statistik siswa dan guru semester genap", time: "2 hari lalu" },
  { action: "FAQ baru ditambahkan", detail: "Persyaratan khusus jalur prestasi PPDB", time: "3 hari lalu" },
];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    dashboardService.getMetrics()
      .then((res) => {
        if (res.data) setMetrics(res.data);
      })
      .catch(() => {});
  }, []);

  const displayCards = [
    { label: "Program Keahlian", value: metrics?.total_majors ?? 8, icon: <GraduationCap size={22} />, color: "var(--admin-info)", bgColor: "var(--admin-info-bg)" },
    { label: "Total Siswa Aktif", value: metrics?.total_students ?? 2589, icon: <BarChart3 size={22} />, color: "var(--admin-success)", bgColor: "var(--admin-success-bg)" },
    { label: "Tenaga Pendidik", value: metrics?.total_staff ?? 159, icon: <TrendingUp size={22} />, color: "var(--admin-accent)", bgColor: "var(--admin-warning-bg)" },
    { label: "Karya Inovasi", value: metrics?.total_innovations ?? 23, icon: <Lightbulb size={22} />, color: "var(--admin-warning)", bgColor: "var(--admin-warning-bg)" },
    { label: "Berita Terbit", value: metrics?.total_news ?? 42, icon: <Newspaper size={22} />, color: "var(--admin-primary)", bgColor: "var(--admin-primary-light)" },
    { label: "Fasilitas", value: metrics?.total_facilities ?? 35, icon: <Building2 size={22} />, color: "var(--admin-fg-muted)", bgColor: "var(--admin-bg-secondary)" },
    { label: "Ekstrakurikuler", value: metrics?.total_extracurriculars ?? 18, icon: <Trophy size={22} />, color: "#8b5cf6", bgColor: "var(--admin-badge-purple-bg)" },
    { label: "Alumni Terdaftar", value: metrics?.total_alumni ?? 156, icon: <Users size={22} />, color: "var(--admin-info)", bgColor: "var(--admin-info-bg)" },
  ];

  return (
    <div className="space-y-6 admin-animate-in">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--admin-fg)]">Dashboard</h1>
        <p className="text-sm text-[var(--admin-fg-muted)] mt-1">
          Selamat datang di Panel Admin CMS NESAS — SMK Negeri 1 Subang
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 admin-stagger">
        {displayCards.map((metric) => (
          <div key={metric.label} className="admin-metric-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="admin-metric-value">
                  {typeof metric.value === "number"
                    ? metric.value.toLocaleString("id-ID")
                    : metric.value}
                </p>
                <p className="admin-metric-label">{metric.label}</p>
              </div>
              <div
                className="p-2.5 rounded-xl"
                style={{
                  background: metric.bgColor,
                  color: metric.color,
                }}
              >
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 admin-card">
          <h2 className="text-lg font-semibold text-[var(--admin-fg)] mb-4">
            Aktivitas Terkini
          </h2>
          <div className="space-y-0">
            {RECENT_ACTIVITIES.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-3 border-b border-[var(--admin-border)] last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--admin-accent)] mt-2 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--admin-fg)]">
                    {activity.action}
                  </p>
                  <p className="text-sm text-[var(--admin-fg-muted)] truncate">
                    {activity.detail}
                  </p>
                </div>
                <span className="text-xs text-[var(--admin-fg-subtle)] whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-[var(--admin-fg)] mb-4">
            Info Cepat
          </h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg" style={{ background: "var(--admin-success-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--admin-success)" }}>
                PPDB Status
              </p>
              <p className="text-sm font-semibold text-[var(--admin-fg)] mt-1">
                {metrics?.is_ppdb_active ? "Periode 2026/2027 — Aktif" : "Periode Belum Aktif"}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: "var(--admin-info-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--admin-info)" }}>
                Akreditasi
              </p>
              <p className="text-sm font-semibold text-[var(--admin-fg)] mt-1">
                A (Unggul) — BAN-SM
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ background: "var(--admin-warning-bg)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--admin-warning)" }}>
                Ruang Kelas
              </p>
              <p className="text-sm font-semibold text-[var(--admin-fg)] mt-1">
                {metrics?.total_classrooms ?? 52} Ruang Kelas
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--admin-bg-secondary)]">
              <p className="text-xs font-medium text-[var(--admin-fg-muted)]">
                FAQ Terdaftar
              </p>
              <p className="text-sm font-semibold text-[var(--admin-fg)] mt-1">
                {metrics?.total_faqs ?? 12} Pertanyaan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
