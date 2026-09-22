"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/admin/page-header";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import type { News } from "@/types/cms";

const MOCK_DATA: News[] = [
  { id: 1, title: "Juara 1 Lomba Kompetensi Siswa Tingkat Nasional", slug: "juara-1-lks-nasional", excerpt: "Siswa RPL SMKN 1 Subang meraih juara 1 pada ajang LKS Nasional bidang Web Development.", published_at: "2026-09-20T10:00:00Z", created_at: "2026-09-19" },
  { id: 2, title: "Pembukaan PPDB 2026/2027 Resmi Dimulai", slug: "pembukaan-ppdb-2026", excerpt: "Pendaftaran peserta didik baru tahun ajaran 2026/2027 resmi dibuka untuk seluruh jalur.", published_at: "2026-09-15T08:00:00Z", created_at: "2026-09-14" },
  { id: 3, title: "Workshop IoT Bersama Telkom Indonesia", slug: "workshop-iot-telkom", excerpt: "Kolaborasi pembelajaran Internet of Things bersama para engineer dari Telkom Indonesia.", published_at: null, created_at: "2026-09-10" },
  { id: 4, title: "Penandatanganan MoU dengan Industri Mitra Baru", slug: "mou-industri-mitra", excerpt: "SMKN 1 Subang menambah 5 mitra industri baru untuk program magang dan sertifikasi.", published_at: "2026-09-05T12:00:00Z", created_at: "2026-09-04" },
  { id: 5, title: "Wisuda dan Pelepasan Siswa Kelas XII Angkatan 2026", slug: "wisuda-kelas-xii-2026", excerpt: null, published_at: null, created_at: "2026-09-01" },
];

export default function NewsPage() {
  const [data, setData] = useState<News[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deleteItem, setDeleteItem] = useState<News | null>(null);
  const [deleting, setDeleting] = useState(false);

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
    try { await new Promise((r) => setTimeout(r, 500)); setData((prev) => prev.filter((n) => n.id !== deleteItem.id)); toast.success("Berita berhasil dihapus!"); setDeleteItem(null); }
    catch { toast.error("Gagal menghapus."); }
    finally { setDeleting(false); }
  };

  const columns: Column<News>[] = [
    {
      key: "title",
      label: "Judul",
      render: (item) => (
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
      key: "published_at",
      label: "Status",
      className: "w-[130px]",
      render: (item) =>
        item.published_at ? (
          <span className="admin-badge admin-badge-green">Terbit</span>
        ) : (
          <span className="admin-badge admin-badge-amber">Draft</span>
        ),
    },
    {
      key: "created_at",
      label: "Dibuat",
      className: "w-[130px]",
      render: (item) => (
        <span className="text-sm text-[var(--admin-fg-muted)]">
          {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader title="Berita & Pengumuman" description="Kelola artikel berita dan pengumuman sekolah" actions={
        <Link href="/admin/news/new">
          <Button className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"><Plus size={16} /> Tulis Berita</Button>
        </Link>
      } />

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari berita..."
        onSearch={setSearch}
        searchValue={search}
        onDelete={(item) => setDeleteItem(item)}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <Link href={`/admin/news/${item.id}`} className="p-1.5 rounded-md hover:bg-[var(--admin-bg-secondary)] text-[var(--admin-fg-muted)] hover:text-[var(--admin-primary)] transition-colors" title="Edit">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
            </Link>
            <button onClick={() => setDeleteItem(item)} className="p-1.5 rounded-md hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-muted)] hover:text-[var(--admin-danger)] transition-colors" title="Hapus">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        )}
        emptyMessage="Belum ada berita."
        filters={
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px] h-9 bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
              <SelectItem value="all" className="text-[var(--admin-fg)]">Semua Status</SelectItem>
              <SelectItem value="published" className="text-[var(--admin-fg)]">Terbit</SelectItem>
              <SelectItem value="draft" className="text-[var(--admin-fg)]">Draft</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Berita" description={`Hapus berita "${deleteItem?.title}"?`} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
