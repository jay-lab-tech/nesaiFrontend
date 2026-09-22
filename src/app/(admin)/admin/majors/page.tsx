"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Plus, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { Major } from "@/types/cms";

// Mock data
const MOCK_MAJORS: Major[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak", summary: "Mempelajari pengembangan aplikasi, web, dan mobile", subjects: [{id:1, major_id:1, name:"Pemrograman Web"},{id:2, major_id:1, name:"Basis Data"}], careers: [{id:1, major_id:1, name:"Web Developer"},{id:2, major_id:1, name:"Mobile Developer"}], created_at: "2026-09-01" },
  { id: 2, name: "Teknik Komputer & Jaringan", slug: "teknik-komputer-jaringan", summary: "Fokus pada infrastruktur jaringan dan administrasi server", subjects: [{id:3, major_id:2, name:"Administrasi Server"}], careers: [{id:3, major_id:2, name:"Network Engineer"}], created_at: "2026-09-01" },
  { id: 3, name: "Multimedia", slug: "multimedia", summary: "Desain grafis, animasi, dan produksi video", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 4, name: "Teknik Otomotif", slug: "teknik-otomotif", summary: "Perawatan dan perbaikan kendaraan bermotor", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 5, name: "Teknik Kelistrikan", slug: "teknik-kelistrikan", summary: "Instalasi dan pemeliharaan sistem kelistrikan", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 6, name: "Akuntansi & Keuangan Lembaga", slug: "akuntansi-keuangan-lembaga", summary: "Pembukuan, pelaporan keuangan, dan perpajakan", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 7, name: "Otomatisasi & Tata Kelola Perkantoran", slug: "otomatisasi-tata-kelola-perkantoran", summary: "Administrasi perkantoran modern", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 8, name: "Bisnis Daring & Pemasaran", slug: "bisnis-daring-pemasaran", summary: "E-commerce dan strategi pemasaran digital", subjects: [], careers: [], created_at: "2026-09-01" },
];

export default function MajorsPage() {
  const [data, setData] = useState<Major[]>(MOCK_MAJORS);
  const [search, setSearch] = useState("");
  const [deleteItem, setDeleteItem] = useState<Major | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredData = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.slug.toLowerCase().includes(q)
    );
  }, [data, search]);

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setData((prev) => prev.filter((m) => m.id !== deleteItem.id));
      toast.success("Jurusan berhasil dihapus!");
      setDeleteItem(null);
    } catch {
      toast.error("Gagal menghapus data.");
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Major>[] = [
    {
      key: "name",
      label: "Nama Jurusan",
      render: (item) => (
        <div>
          <Link
            href={`/admin/majors/${item.id}`}
            className="font-medium text-[var(--admin-primary)] hover:underline"
          >
            {item.name}
          </Link>
          <p className="text-xs text-[var(--admin-fg-subtle)] mt-0.5">
            /{item.slug}
          </p>
        </div>
      ),
    },
    {
      key: "summary",
      label: "Ringkasan",
      render: (item) => (
        <span className="text-[var(--admin-fg-muted)] line-clamp-1 max-w-[300px]">
          {item.summary || "—"}
        </span>
      ),
    },
    {
      key: "subjects",
      label: "Mapel",
      className: "text-center w-[80px]",
      render: (item) => (
        <span className="admin-badge admin-badge-blue">
          {item.subjects?.length || 0}
        </span>
      ),
    },
    {
      key: "careers",
      label: "Karir",
      className: "text-center w-[80px]",
      render: (item) => (
        <span className="admin-badge admin-badge-green">
          {item.careers?.length || 0}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Program Keahlian"
        description="Kelola jurusan, mata pelajaran kejuruan, dan peluang karir"
        actions={
          <Link href="/admin/majors/new">
            <Button className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
              <Plus size={16} />
              Tambah Jurusan
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari jurusan..."
        onSearch={setSearch}
        searchValue={search}
        onDelete={(item) => setDeleteItem(item)}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <Link
              href={`/admin/majors/${item.id}`}
              className="p-1.5 rounded-md hover:bg-[var(--admin-bg-secondary)] text-[var(--admin-fg-muted)] hover:text-[var(--admin-primary)] transition-colors"
              title="Detail"
            >
              <ExternalLink size={15} />
            </Link>
            <button
              onClick={() => setDeleteItem(item)}
              className="p-1.5 rounded-md hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-muted)] hover:text-[var(--admin-danger)] transition-colors"
              title="Hapus"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        )}
        emptyMessage="Belum ada data jurusan."
      />

      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Jurusan"
        description={`Apakah Anda yakin ingin menghapus jurusan "${deleteItem?.name}"? Semua mata pelajaran dan data karir terkait juga akan dihapus.`}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
