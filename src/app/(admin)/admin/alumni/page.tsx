"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
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
import { alumniService, majorService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_MAJORS: Pick<Major, "id" | "name">[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak" },
  { id: 2, name: "Teknik Komputer & Jaringan" },
  { id: 3, name: "Multimedia & DKV" },
  { id: 4, name: "Teknik Otomasi Industri" },
];

const DEFAULT_ALUMNI: Alumni[] = [
  { id: 1, name: "Ahmad Rizki", major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "" }, headline: "Software Engineer at GoTo (Lulusan 2020)", story: "Berkat ilmu yang didapat di RPL SMKN 1 Subang, saya berhasil berkarir di industri teknologi." },
  { id: 2, name: "Siti Nurhaliza", major_id: 3, major: { id: 3, name: "Multimedia & DKV", slug: "" }, headline: "UI/UX Designer at Tokopedia (Lulusan 2019)", story: "Fondasi desain yang kuat dari jurusan Multimedia membantu saya berkembang." },
  { id: 3, name: "Dani Pratama", major_id: 2, major: { id: 2, name: "Teknik Komputer & Jaringan", slug: "" }, headline: "Network Engineer at Telkom (Lulusan 2021)", story: "Pelatihan jaringan di SMK sangat berharga di dunia kerja." },
];

export default function AlumniPage() {
  const [data, setData] = useState<Alumni[]>(DEFAULT_ALUMNI);
  const [majors, setMajors] = useState<Pick<Major, "id" | "name">[]>(DEFAULT_MAJORS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Alumni | null>(null);
  const [deleteItem, setDeleteItem] = useState<Alumni | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AlumniFormValues>({
    resolver: zodResolver(alumniFormSchema) as any,
  });

  const selectedMajorId = watch("major_id");

  const loadData = useCallback(async () => {
    try {
      const res = await alumniService.getAll();
      const list = unwrapList<Alumni>(res);
      if (list.length > 0) setData(list);
    } catch {}

    try {
      const majorRes = await majorService.getAll();
      const majorList = unwrapList<Major>(majorRes);
      if (majorList.length > 0) {
        setMajors(majorList.map((m) => ({ id: m.id, name: m.name })));
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((a) => a.name.toLowerCase().includes(q) || a.headline?.toLowerCase().includes(q));
  }, [data, search]);

  const openCreate = () => { setEditItem(null); reset({ name: "", major_id: null, headline: "", story: "" }); setDialogOpen(true); };
  const openEdit = (item: Alumni) => { setEditItem(item); reset({ name: item.name, major_id: item.major_id, headline: item.headline || "", story: item.story || "" }); setDialogOpen(true); };

  const onSubmit = async (values: AlumniFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await alumniService.update(editItem.id, values);
        toast.success("Data alumni berhasil diperbarui!");
      } else {
        await alumniService.create(values);
        toast.success("Data alumni berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      const major = majors.find((m) => m.id === values.major_id);
      if (editItem) {
        setData((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null } : i));
        toast.success("Data alumni diperbarui (lokal)!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null, created_at: new Date().toISOString() }, ...prev]);
        toast.success("Data alumni ditambahkan (lokal)!");
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
      await alumniService.delete(deleteItem.id);
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Data alumni berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Data alumni berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Alumni>[] = [
    {
      key: "name",
      label: "Nama Alumni",
      render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.name}</span>,
    },
    {
      key: "major",
      label: "Jurusan",
      render: (item) => <span className="text-xs text-[var(--admin-fg-muted)]">{item.major?.name || "—"}</span>,
    },
    {
      key: "headline",
      label: "Headline / Posisi Karir",
      render: (item) => <span className="text-xs font-semibold text-[var(--admin-primary)]">{item.headline || "—"}</span>,
    },
    {
      key: "story",
      label: "Testimoni",
      render: (item) => <span className="text-xs text-[var(--admin-fg-muted)] line-clamp-1 max-w-[250px]">{item.story || "—"}</span>,
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Kisah & Testimoni Alumni"
        description="Kelola profil alumni berprestasi dan testimoni karir"
        actions={
          <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
            <Plus size={16} /> Tambah Alumni
          </Button>
        }
      />

      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Cari nama atau headline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
      </div>

      <DataTable columns={columns} data={filteredData} getRowId={(i) => i.id} onEdit={openEdit} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada data alumni." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-md">
          <DialogHeader><DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">{editItem ? "Edit Profil Alumni" : "Tambah Data Alumni"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Nama Lengkap" error={errors.name?.message} required>
              <Input {...register("name")} placeholder="e.g. Ahmad Rizki, S.Kom." className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <FormField label="Jurusan Alumni">
              <Select value={selectedMajorId ? String(selectedMajorId) : "none"} onValueChange={(val) => setValue("major_id", val === "none" ? null : Number(val))}>
                <SelectTrigger className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
                  <SelectValue placeholder="Pilih jurusan..." />
                </SelectTrigger>
                <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
                  <SelectItem value="none" className="text-[var(--admin-fg)]">Tidak ditentukan</SelectItem>
                  {majors.map((m) => <SelectItem key={m.id} value={String(m.id)} className="text-[var(--admin-fg)]">{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Headline / Profesi">
              <Input {...register("headline")} placeholder="e.g. Software Engineer at GoTo (Lulusan 2021)" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <FormField label="Kisah / Testimoni">
              <textarea {...register("story")} rows={3} placeholder="Testimoni pengalaman belajar di sekolah dan pesan motivasi..." className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]" />
            </FormField>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)] hover:bg-[var(--admin-border)]">Batal</Button>
              <Button type="submit" disabled={saving} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Alumni" description={`Apakah Anda yakin ingin menghapus data "${deleteItem?.name}"?`} confirmText="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
