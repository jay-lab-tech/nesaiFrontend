"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { admissionStatFormSchema, type AdmissionStatFormValues } from "@/lib/validations/cms";
import type { AdmissionStat, Major } from "@/types/cms";
import { admissionStatService, majorService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_MAJORS: Pick<Major, "id" | "name">[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak" },
  { id: 2, name: "Teknik Komputer & Jaringan" },
  { id: 3, name: "Multimedia & DKV" },
  { id: 4, name: "Teknik Otomasi Industri" },
];

const DEFAULT_STATS: AdmissionStat[] = [
  { id: 1, major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "" }, year: 2026, applicant_count: 385 },
  { id: 2, major_id: 2, major: { id: 2, name: "Teknik Komputer & Jaringan", slug: "" }, year: 2026, applicant_count: 312 },
  { id: 3, major_id: 3, major: { id: 3, name: "Multimedia & DKV", slug: "" }, year: 2026, applicant_count: 275 },
  { id: 4, major_id: 4, major: { id: 4, name: "Teknik Otomasi Industri", slug: "" }, year: 2026, applicant_count: 210 },
];

export default function AdmissionStatsPage() {
  const [data, setData] = useState<AdmissionStat[]>(DEFAULT_STATS);
  const [majors, setMajors] = useState<Pick<Major, "id" | "name">[]>(DEFAULT_MAJORS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdmissionStat | null>(null);
  const [deleteItem, setDeleteItem] = useState<AdmissionStat | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AdmissionStatFormValues>({
    resolver: zodResolver(admissionStatFormSchema) as any,
  });

  const selectedMajorId = watch("major_id");

  const loadData = useCallback(async () => {
    try {
      const res = await admissionStatService.getAll();
      const list = unwrapList<AdmissionStat>(res);
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
    return data.filter((i) => i.major?.name?.toLowerCase().includes(q) || String(i.year).includes(q));
  }, [data, search]);

  const openCreate = () => {
    setEditItem(null);
    reset({ major_id: majors[0]?.id || 1, year: new Date().getFullYear(), applicant_count: 0 });
    setDialogOpen(true);
  };

  const openEdit = (item: AdmissionStat) => {
    setEditItem(item);
    reset({ major_id: item.major_id, year: item.year, applicant_count: item.applicant_count });
    setDialogOpen(true);
  };

  const onSubmit = async (values: AdmissionStatFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await admissionStatService.update(editItem.id, values);
        toast.success("Statistik berhasil diperbarui!");
      } else {
        await admissionStatService.create(values);
        toast.success("Statistik berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      const major = majors.find((m) => m.id === values.major_id);
      if (editItem) {
        setData((prev) => prev.map((s) => s.id === editItem.id ? { ...s, ...values, major: major ? { id: major.id, name: major.name, slug: "" } : s.major } : s));
        toast.success("Statistik diperbarui (lokal)!");
      } else {
        setData((prev) => [...prev, { id: Date.now(), ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null }]);
        toast.success("Statistik ditambahkan (lokal)!");
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
      await admissionStatService.delete(deleteItem.id);
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Statistik berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Statistik berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<AdmissionStat>[] = [
    {
      key: "year",
      label: "Tahun",
      render: (item) => <span className="font-mono font-bold text-[var(--admin-fg)]">{item.year}</span>,
      className: "w-24",
    },
    {
      key: "major",
      label: "Jurusan",
      render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.major?.name || "—"}</span>,
    },
    {
      key: "applicant_count",
      label: "Jumlah Pendaftar",
      render: (item) => (
        <span className="font-bold text-[var(--admin-primary)]">
          {item.applicant_count.toLocaleString("id-ID")} Siswa
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Statistik Pendaftar SPMB / PPDB"
        description="Pantau animo pendaftar per jurusan dan tahun ajaran"
        actions={
          <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
            <Plus size={16} /> Tambah Statistik
          </Button>
        }
      />

      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Cari jurusan atau tahun..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
      </div>

      <DataTable columns={columns} data={filteredData} getRowId={(i) => i.id} onEdit={openEdit} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada data statistik pendaftar." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-md">
          <DialogHeader><DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">{editItem ? "Edit Statistik" : "Tambah Data Pendaftar"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Jurusan" error={errors.major_id?.message} required>
              <Select value={selectedMajorId ? String(selectedMajorId) : ""} onValueChange={(val) => setValue("major_id", Number(val))}>
                <SelectTrigger className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
                  <SelectValue placeholder="Pilih jurusan..." />
                </SelectTrigger>
                <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
                  {majors.map((m) => <SelectItem key={m.id} value={String(m.id)} className="text-[var(--admin-fg)]">{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Tahun Seleksi" error={errors.year?.message} required>
              <Input type="number" {...register("year")} className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <FormField label="Jumlah Pendaftar" error={errors.applicant_count?.message} required>
              <Input type="number" {...register("applicant_count")} placeholder="e.g. 350" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)] hover:bg-[var(--admin-border)]">Batal</Button>
              <Button type="submit" disabled={saving} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Statistik" description="Apakah Anda yakin ingin menghapus data statistik ini?" confirmText="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
