"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { News } from "@/types/cms";
import { newsService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_NEWS: News[] = [
  { id: 1, title: "Juara 1 Lomba Kompetensi Siswa Tingkat Nasional", slug: "juara-1-lks-nasional", excerpt: "Siswa RPL SMKN 1 Subang meraih juara 1 pada ajang LKS Nasional bidang Web Development.", published_at: "2026-09-20T10:00:00Z", created_at: "2026-09-19" },
  { id: 2, title: "Pembukaan PPDB 2026/2027 Resmi Dimulai", slug: "pembukaan-ppdb-2026", excerpt: "Pendaftaran peserta didik baru tahun ajaran 2026/2027 resmi dibuka untuk seluruh jalur.", published_at: "2026-09-15T08:00:00Z", created_at: "2026-09-14" },
  { id: 3, title: "Workshop IoT Bersama Telkom Indonesia", slug: "workshop-iot-telkom", excerpt: "Kolaborasi pembelajaran Internet of Things bersama para engineer dari Telkom Indonesia.", published_at: null, created_at: "2026-09-10" },
  { id: 4, title: "Penandatanganan MoU dengan Industri Mitra Baru", slug: "mou-industri-mitra", excerpt: "SMKN 1 Subang menambah 5 mitra industri baru untuk program magang dan sertifikasi.", published_at: "2026-09-05T12:00:00Z", created_at: "2026-09-04" },
  { id: 5, title: "Wisuda dan Pelepasan Siswa Kelas XII Angkatan 2026", slug: "wisuda-kelas-xii-2026", excerpt: null, published_at: null, created_at: "2026-09-01" },
];

export default function NewsPage() {
  const [data, setData] = useState<News[]>(DEFAULT_NEWS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deleteItem, setDeleteItem] = useState<News | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const res = await newsService.getAll();
      const list = unwrapList<News>(res);
      if (list.length > 0) setData(list);
    } catch {
      // Keep existing data
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredData = useMemo(() => {
    let result = data;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q));
    }
    if (filterStatus === "published") result = result.filter((n) => n.published_at);
    if (filterStatus === "draft") result = result.filter((n) => !n.published_at);
    return result;
  }, [data, search, filterStatus]);

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await newsService.delete(deleteItem.id);
      setData((prev) => prev.filter((n) => n.id !== deleteItem.id));
      toast.success("Berita berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((n) => n.id !== deleteItem.id));
      toast.success("Berita berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<News>[] = [
    {
      key: "title",
      label: "Judul",
      render: (item: News) => (
        <div className="max-w-[400px]">
          <Link href={`/admin/news/${item.id}`} className="font-medium text-[var(--admin-primary)] hover:underline line-clamp-1">
            {item.title}
          </Link>
          {item.excerpt && (
            <p className="text-xs text-[var(--admin-fg-subtle)] mt-0.5 line-clamp-1">{item.excerpt}</p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: News) => (
        <span className={`admin-badge ${item.published_at ? "admin-badge-green" : "admin-badge-amber"}`}>
          {item.published_at ? "Terbit" : "Draft"}
        </span>
      ),
    },
    {
      key: "published_at",
      label: "Tanggal Terbit",
      render: (item: News) => (
        <span className="text-xs text-[var(--admin-fg-muted)] whitespace-nowrap">
          {item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Berita & Pengumuman"
        description="Kelola publikasi artikel berita, liputan kegiatan, dan pengumuman sekolah"
        actions={
          <Link href="/admin/news/new">
            <Button className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
              <Plus size={16} /> Tulis Berita
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari judul berita..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
            <SelectItem value="all" className="text-[var(--admin-fg)]">Semua Status</SelectItem>
            <SelectItem value="published" className="text-[var(--admin-fg)]">Terbit</SelectItem>
            <SelectItem value="draft" className="text-[var(--admin-fg)]">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        getRowId={(item: News) => item.id}
        onEdit={(item: News) => {
          window.location.href = `/admin/news/${item.id}`;
        }}
        onDelete={(item: News) => setDeleteItem(item)}
        emptyMessage="Belum ada berita."
      />

      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Berita"
        description={`Apakah Anda yakin ingin menghapus artikel "${deleteItem?.title}"?`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
