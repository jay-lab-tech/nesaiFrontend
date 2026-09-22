"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { Major } from "@/types/cms";
import { majorService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_MAJORS: Major[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak", summary: "Mempelajari pengembangan aplikasi, web, dan mobile", subjects: [{id:1, major_id:1, name:"Pemrograman Web"},{id:2, major_id:1, name:"Basis Data"}], careers: [{id:1, major_id:1, name:"Web Developer"},{id:2, major_id:1, name:"Mobile Developer"}], created_at: "2026-09-01" },
  { id: 2, name: "Teknik Komputer & Jaringan", slug: "teknik-komputer-jaringan", summary: "Fokus pada infrastruktur jaringan dan administrasi server", subjects: [{id:3, major_id:2, name:"Administrasi Server"}], careers: [{id:3, major_id:2, name:"Network Engineer"}], created_at: "2026-09-01" },
  { id: 3, name: "Multimedia & DKV", slug: "multimedia", summary: "Desain grafis, animasi, dan produksi video", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 4, name: "Teknik Otomasi Industri", slug: "teknik-otomasi-industri", summary: "Mekatronika, robotika pabrik, dan PLC", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 5, name: "Bisnis Digital & Pemasaran", slug: "bisnis-digital", summary: "E-commerce dan strategi pemasaran digital", subjects: [], careers: [], created_at: "2026-09-01" },
  { id: 6, name: "Akuntansi & Keuangan Lembaga", slug: "akuntansi-keuangan-lembaga", summary: "Pembukuan, pelaporan keuangan, dan perpajakan", subjects: [], careers: [], created_at: "2026-09-01" },
];

export default function MajorsPage() {
  const [data, setData] = useState<Major[]>(DEFAULT_MAJORS);
  const [search, setSearch] = useState("");
  const [deleteItem, setDeleteItem] = useState<Major | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const res = await majorService.getAll();
      const list = unwrapList<Major>(res);
      if (list.length > 0) setData(list);
    } catch {
      // Keep fallback data
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
      await majorService.delete(deleteItem.id);
      setData((prev) => prev.filter((m) => m.id !== deleteItem.id));
      toast.success("Jurusan berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((m) => m.id !== deleteItem.id));
      toast.success("Jurusan berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Major>[] = [
    {
      key: "name",
      label: "Nama Jurusan",
      render: (item: Major) => (
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
      render: (item: Major) => (
        <span className="text-[var(--admin-fg-muted)] line-clamp-1 max-w-[300px]">
          {item.summary || "—"}
        </span>
      ),
    },
    {
      key: "subjects",
      label: "Mata Pelajaran",
      render: (item: Major) => (
        <span className="admin-badge admin-badge-blue">
          {item.subjects?.length ?? 0} Mapel
        </span>
      ),
    },
    {
      key: "careers",
      label: "Peluang Karir",
      render: (item: Major) => (
        <span className="admin-badge admin-badge-green">
          {item.careers?.length ?? 0} Karir
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Program Keahlian / Jurusan"
        description="Kelola data jurusan, kurikulum mata pelajaran, dan prospek karir"
        actions={
          <Link href="/admin/majors/new">
            <Button className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
              <Plus size={16} />
              Tambah Jurusan
            </Button>
          </Link>
        }
      />

      {/* Search Input */}
      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Cari jurusan atau slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        getRowId={(item: Major) => item.id}
        onEdit={(item: Major) => {
          window.location.href = `/admin/majors/${item.id}`;
        }}
        onDelete={(item: Major) => setDeleteItem(item)}
        emptyMessage="Belum ada data jurusan."
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Jurusan"
        description={`Apakah Anda yakin ingin menghapus "${deleteItem?.name}" beserta seluruh data mapel dan karir terkait?`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
