"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { alumniFormSchema, type AlumniFormValues } from "@/lib/validations/cms";
import type { Alumni, Major } from "@/types/cms";

const MOCK_MAJORS: Pick<Major, "id" | "name">[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak" },
  { id: 2, name: "Teknik Komputer & Jaringan" },
  { id: 3, name: "Multimedia" },
  { id: 4, name: "Teknik Otomotif" },
];

const MOCK_DATA: Alumni[] = [
  { id: 1, name: "Ahmad Rizki", major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "" }, headline: "Software Engineer at GoTo (Lulusan 2020)", story: "Berkat ilmu yang didapat di RPL SMKN 1 Subang, saya berhasil berkarir di industri teknologi." },
  { id: 2, name: "Siti Nurhaliza", major_id: 3, major: { id: 3, name: "Multimedia", slug: "" }, headline: "UI/UX Designer at Tokopedia (Lulusan 2019)", story: "Fondasi desain yang kuat dari jurusan Multimedia membantu saya berkembang." },
  { id: 3, name: "Dani Pratama", major_id: 2, major: { id: 2, name: "Teknik Komputer & Jaringan", slug: "" }, headline: "Network Engineer at Telkom (Lulusan 2021)", story: "Pelatihan jaringan di SMK sangat berharga di dunia kerja." },
];

export default function AlumniPage() {
  const [data, setData] = useState<Alumni[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Alumni | null>(null);
  const [deleteItem, setDeleteItem] = useState<Alumni | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AlumniFormValues>({
    resolver: zodResolver(alumniFormSchema) as any,
  });

  const filteredData = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((a) => a.name.toLowerCase().includes(q) || a.headline?.toLowerCase().includes(q));
  }, [data, search]);

  const openCreate = () => { setEditItem(null); reset({ name: "", major_id: null, headline: "", story: "" }); setDialogOpen(true); };
  const openEdit = (item: Alumni) => { setEditItem(item); reset({ name: item.name, major_id: item.major_id, headline: item.headline || "", story: item.story || "" }); setDialogOpen(true); };

  const onSubmit = async (values: AlumniFormValues) => {
    try {
      const major = MOCK_MAJORS.find((m) => m.id === values.major_id);
      if (editItem) {
        setData((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null } : i));
        toast.success("Data alumni berhasil diperbarui!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null, created_at: new Date().toISOString() }, ...prev]);
        toast.success("Data alumni berhasil ditambahkan!");
      }
      setDialogOpen(false);
    } catch { toast.error("Gagal menyimpan data."); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try { await new Promise((r) => setTimeout(r, 500)); setData((prev) => prev.filter((i) => i.id !== deleteItem.id)); toast.success("Data alumni berhasil dihapus!"); setDeleteItem(null); }
    catch { toast.error("Gagal menghapus."); }
    finally { setDeleting(false); }
  };

  const columns: Column<Alumni>[] = [
    { key: "name", label: "Nama Alumni", render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.name}</span> },
    { key: "major", label: "Jurusan", render: (item) => <span className="text-[var(--admin-fg-muted)]">{item.major?.name || "—"}</span> },
    { key: "headline", label: "Headline", render: (item) => <span className="text-[var(--admin-fg-muted)] line-clamp-1 max-w-[300px]">{item.headline || "—"}</span> },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader title="Testimoni Alumni" description="Kelola kisah sukses dan testimoni alumni" actions={
        <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"><Plus size={16} /> Tambah Alumni</Button>
      } />

      <DataTable columns={columns} data={filteredData} searchPlaceholder="Cari alumni..." onSearch={setSearch} searchValue={search} onEdit={(item) => openEdit(item)} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada data alumni." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[520px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
          <DialogHeader><DialogTitle className="text-[var(--admin-fg)]">{editItem ? "Edit Alumni" : "Tambah Alumni Baru"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Nama Lengkap" required error={errors.name?.message}>
              <Input {...register("name")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Jurusan Asal" error={errors.major_id?.message}>
              <Select value={watch("major_id") ? String(watch("major_id")) : ""} onValueChange={(v) => setValue("major_id", v ? Number(v) : null)}>
                <SelectTrigger className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"><SelectValue placeholder="Pilih jurusan" /></SelectTrigger>
                <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
                  {MOCK_MAJORS.map((m) => <SelectItem key={m.id} value={String(m.id)} className="text-[var(--admin-fg)]">{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Headline" error={errors.headline?.message} hint="e.g. Software Engineer at GoTo (Lulusan 2020)">
              <Input {...register("headline")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Cerita / Testimoni" error={errors.story?.message}>
              <textarea {...register("story")} rows={4} className="admin-input resize-none" placeholder="Testimoni, pengalaman, dan pesan motivasi..." />
            </FormField>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)]">Batal</Button>
              <Button type="submit" className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{editItem ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Alumni" description={`Hapus testimoni "${deleteItem?.name}"?`} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
