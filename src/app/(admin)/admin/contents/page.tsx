"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { contentFormSchema, type ContentFormValues } from "@/lib/validations/cms";
import { CONTENT_TYPES, type Content } from "@/types/cms";
import { contentService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_CONTENTS: Content[] = [
  { id: 1, title: "Sambutan Kepala Sekolah", slug: "sambutan-kepala-sekolah", type: "section", module: "home", body: "Selamat datang di website resmi SMKN 1 Subang...", is_published: true },
  { id: 2, title: "Banner Hero Utama", slug: "banner-hero-utama", type: "banner", module: "home", body: null, is_published: true },
  { id: 3, title: "Pengumuman PPDB Aktif", slug: "pengumuman-ppdb-aktif", type: "announcement", module: "home", body: "Pemberitahuan pendaftaran dibuka...", is_published: true },
  { id: 4, title: "Sejarah Sekolah Lengkap", slug: "sejarah-sekolah-lengkap", type: "page", module: "about", body: "SMKN 1 Subang berdiri sejak 1965...", is_published: true },
];

const TYPE_BADGE_MAP: Record<string, string> = {
  banner: "admin-badge-purple",
  announcement: "admin-badge-amber",
  section: "admin-badge-blue",
  page: "admin-badge-green",
};

export default function ContentsPage() {
  const [data, setData] = useState<Content[]>(DEFAULT_CONTENTS);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Content | null>(null);
  const [deleteItem, setDeleteItem] = useState<Content | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema) as any,
  });

  const selectedType = watch("type");

  const loadData = useCallback(async () => {
    try {
      const res = await contentService.getAll();
      const list = unwrapList<Content>(res);
      if (list.length > 0) setData(list);
    } catch {}
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredData = useMemo(() => {
    let result = data;
    if (search) { const q = search.toLowerCase(); result = result.filter((c) => c.title.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)); }
    if (filterType && filterType !== "all") result = result.filter((c) => c.type === filterType);
    return result;
  }, [data, search, filterType]);

  const openCreate = () => { setEditItem(null); reset({ title: "", slug: "", type: "section", module: "home", body: "", is_published: true }); setDialogOpen(true); };
  const openEdit = (item: Content) => { setEditItem(item); reset({ title: item.title, slug: item.slug, type: item.type, module: item.module || "", body: item.body || "", is_published: item.is_published }); setDialogOpen(true); };

  const onSubmit = async (values: ContentFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await contentService.update(editItem.id, values);
        toast.success("Konten berhasil diperbarui!");
      } else {
        await contentService.create(values);
        toast.success("Konten berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      if (editItem) {
        setData((prev) => prev.map((c) => (c.id === editItem.id ? { ...c, ...values } : c)));
        toast.success("Konten diperbarui (lokal)!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values, created_at: new Date().toISOString() }, ...prev]);
        toast.success("Konten ditambahkan (lokal)!");
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await contentService.delete(deleteItem.id);
      setData((prev) => prev.filter((c) => c.id !== deleteItem.id));
      toast.success("Konten berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((c) => c.id !== deleteItem.id));
      toast.success("Konten berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Content>[] = [
    {
      key: "title",
      label: "Judul Konten",
      render: (item) => (
        <div>
          <p className="font-medium text-[var(--admin-fg)]">{item.title}</p>
          <p className="text-xs text-[var(--admin-fg-subtle)] font-mono mt-0.5">/{item.slug}</p>
        </div>
      ),
    },
    {
      key: "type",
      label: "Tipe",
      render: (item) => (
        <span className={`admin-badge ${TYPE_BADGE_MAP[item.type] || "admin-badge-slate"}`}>
          {item.type}
        </span>
      ),
    },
    {
      key: "module",
      label: "Modul",
      render: (item) => <span className="text-xs text-[var(--admin-fg-muted)] font-mono">{item.module || "—"}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className={`admin-badge ${item.is_published ? "admin-badge-green" : "admin-badge-slate"}`}>
          {item.is_published ? "Dipublikasikan" : "Draft"}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Konten Halaman Dinamis"
        description="Kelola banner, section, pengumuman, dan halaman statis"
        actions={
          <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
            <Plus size={16} /> Tambah Konten
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Cari judul atau slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
            <SelectValue placeholder="Semua Tipe" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
            <SelectItem value="all" className="text-[var(--admin-fg)]">Semua Tipe</SelectItem>
            {CONTENT_TYPES.map((t) => <SelectItem key={t} value={t} className="text-[var(--admin-fg)]">{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <DataTable columns={columns} data={filteredData} getRowId={(i) => i.id} onEdit={openEdit} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada konten." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-lg">
          <DialogHeader><DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">{editItem ? "Edit Konten" : "Tambah Konten"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Judul Konten" error={errors.title?.message} required>
              <Input {...register("title")} placeholder="e.g. Sambutan Kepala Sekolah" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <FormField label="Slug Kunci Unik" error={errors.slug?.message} required>
              <Input {...register("slug")} placeholder="e.g. sambutan-kepala-sekolah" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Tipe Konten" error={errors.type?.message} required>
                <Select value={selectedType || ""} onValueChange={(val) => setValue("type", val)}>
                  <SelectTrigger className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
                    <SelectValue placeholder="Pilih tipe..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
                    {CONTENT_TYPES.map((t) => <SelectItem key={t} value={t} className="text-[var(--admin-fg)]">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Modul Terkait">
                <Input {...register("module")} placeholder="e.g. home, about, profile" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
              </FormField>
            </div>

            <FormField label="Isi Konten (Markdown / Teks)">
              <textarea {...register("body")} rows={6} placeholder="Isi teks atau format markdown konten..." className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]" />
            </FormField>

            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)]">
              <div>
                <p className="text-sm font-medium text-[var(--admin-fg)]">Publikasikan Konten</p>
                <p className="text-xs text-[var(--admin-fg-muted)]">Konten akan langsung aktif dan terbaca oleh API publik</p>
              </div>
              <Controller name="is_published" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)] hover:bg-[var(--admin-border)]">Batal</Button>
              <Button type="submit" disabled={saving} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Konten" description={`Apakah Anda yakin ingin menghapus konten "${deleteItem?.title}"?`} confirmText="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
