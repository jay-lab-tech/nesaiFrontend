"use client";

import { useState, useMemo } from "react";
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

const MOCK_DATA: Content[] = [
  { id: 1, title: "Sambutan Kepala Sekolah", slug: "sambutan-kepala-sekolah", type: "section", module: "home", body: "Selamat datang di website resmi SMKN 1 Subang...", is_published: true },
  { id: 2, title: "Banner Hero Utama", slug: "banner-hero-utama", type: "banner", module: "home", body: null, is_published: true },
  { id: 3, title: "Pengumuman Libur Nasional", slug: "pengumuman-libur-nasional", type: "announcement", module: "home", body: "Pemberitahuan: Libur nasional tanggal...", is_published: true },
  { id: 4, title: "Halaman Tentang Kami", slug: "halaman-tentang-kami", type: "page", module: "about", body: "SMKN 1 Subang adalah...", is_published: false },
  { id: 5, title: "Informasi Kontak", slug: "informasi-kontak", type: "section", module: "contact", body: null, is_published: true },
];

const TYPE_BADGE_MAP: Record<string, string> = {
  banner: "admin-badge-purple",
  announcement: "admin-badge-amber",
  section: "admin-badge-blue",
  page: "admin-badge-green",
};

export default function ContentsPage() {
  const [data, setData] = useState<Content[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Content | null>(null);
  const [deleteItem, setDeleteItem] = useState<Content | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors } } = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema) as any,
  });

  const filteredData = useMemo(() => {
    let result = data;
    if (search) { const q = search.toLowerCase(); result = result.filter((c) => c.title.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)); }
    if (filterType && filterType !== "all") result = result.filter((c) => c.type === filterType);
    return result;
  }, [data, search, filterType]);

  const openCreate = () => { setEditItem(null); reset({ title: "", slug: "", type: "", module: "", body: "", is_published: false }); setDialogOpen(true); };
  const openEdit = (item: Content) => { setEditItem(item); reset({ title: item.title, slug: item.slug, type: item.type, module: item.module || "", body: item.body || "", is_published: item.is_published }); setDialogOpen(true); };

  const onSubmit = async (values: ContentFormValues) => {
    try {
      if (editItem) {
        setData((prev) => prev.map((c) => c.id === editItem.id ? { ...c, ...values } : c));
        toast.success("Konten berhasil diperbarui!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values, created_at: new Date().toISOString() }, ...prev]);
        toast.success("Konten berhasil ditambahkan!");
      }
      setDialogOpen(false);
    } catch { toast.error("Gagal menyimpan."); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try { await new Promise((r) => setTimeout(r, 500)); setData((prev) => prev.filter((c) => c.id !== deleteItem.id)); toast.success("Konten berhasil dihapus!"); setDeleteItem(null); }
    catch { toast.error("Gagal menghapus."); }
    finally { setDeleting(false); }
  };

  const columns: Column<Content>[] = [
    { key: "title", label: "Judul", render: (item) => (
      <div>
        <span className="font-medium text-[var(--admin-fg)]">{item.title}</span>
        <p className="text-xs text-[var(--admin-fg-subtle)] mt-0.5 font-mono">{item.slug}</p>
      </div>
    ) },
    { key: "type", label: "Tipe", className: "w-[130px]", render: (item) => <span className={`admin-badge ${TYPE_BADGE_MAP[item.type] || "admin-badge-slate"} capitalize`}>{item.type}</span> },
    { key: "module", label: "Modul", className: "w-[100px]", render: (item) => <span className="text-[var(--admin-fg-muted)] capitalize">{item.module || "—"}</span> },
    { key: "is_published", label: "Status", className: "w-[100px]", render: (item) => item.is_published ? <span className="admin-badge admin-badge-green">Publik</span> : <span className="admin-badge admin-badge-slate">Draft</span> },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader title="Konten Dinamis" description="Kelola blok konten modular website (banner, section, halaman)" actions={
        <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"><Plus size={16} /> Tambah Konten</Button>
      } />

      <DataTable columns={columns} data={filteredData} searchPlaceholder="Cari konten..." onSearch={setSearch} searchValue={search} onEdit={(item) => openEdit(item)} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada konten."
        filters={
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px] h-9 bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"><SelectValue placeholder="Semua Tipe" /></SelectTrigger>
            <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
              <SelectItem value="all" className="text-[var(--admin-fg)]">Semua Tipe</SelectItem>
              {CONTENT_TYPES.map((t) => <SelectItem key={t} value={t} className="text-[var(--admin-fg)] capitalize">{t}</SelectItem>)}
            </SelectContent>
          </Select>
        }
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[var(--admin-card-bg)] border-[var(--admin-border)] max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-[var(--admin-fg)]">{editItem ? "Edit Konten" : "Tambah Konten Baru"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Judul" required error={errors.title?.message}>
              <Input {...register("title")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Slug" required error={errors.slug?.message} hint="ID unik konten (huruf kecil, angka, strip)">
              <Input {...register("slug")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] font-mono text-sm" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Tipe Konten" required error={errors.type?.message}>
                <Select value={watch("type")} onValueChange={(v) => setValue("type", v)}>
                  <SelectTrigger className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                  <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
                    {CONTENT_TYPES.map((t) => <SelectItem key={t} value={t} className="text-[var(--admin-fg)] capitalize">{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Modul" error={errors.module?.message} hint="home, about, contact, dll">
                <Input {...register("module")} placeholder="e.g. home" className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
              </FormField>
            </div>
            <FormField label="Isi Konten" error={errors.body?.message}>
              <textarea {...register("body")} rows={6} className="admin-input resize-none" placeholder="Isi konten (Markdown / HTML)..." />
            </FormField>
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--admin-border)]">
              <div>
                <p className="text-sm font-medium text-[var(--admin-fg)]">Publikasikan</p>
                <p className="text-xs text-[var(--admin-fg-muted)]">Tampilkan konten ini di website publik</p>
              </div>
              <Controller name="is_published" control={control} render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)]">Batal</Button>
              <Button type="submit" className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{editItem ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Konten" description={`Hapus konten "${deleteItem?.title}"?`} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
