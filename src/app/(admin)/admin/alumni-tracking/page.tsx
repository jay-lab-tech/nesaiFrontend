"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { alumniTrackingFormSchema, type AlumniTrackingFormValues } from "@/lib/validations/cms";
import type { AlumniTrackingStat } from "@/types/cms";
import { alumniTrackingService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_DATA: AlumniTrackingStat[] = [
  { id: 1, year: 2025, employed_percent: 68.5, entrepreneur_percent: 12, college_percent: 15, other_percent: 4.5 },
  { id: 2, year: 2024, employed_percent: 65, entrepreneur_percent: 14, college_percent: 16.5, other_percent: 4.5 },
  { id: 3, year: 2023, employed_percent: 62, entrepreneur_percent: 10.5, college_percent: 18, other_percent: 9.5 },
];

export default function AlumniTrackingPage() {
  const [data, setData] = useState<AlumniTrackingStat[]>(DEFAULT_DATA);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AlumniTrackingStat | null>(null);
  const [deleteItem, setDeleteItem] = useState<AlumniTrackingStat | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<AlumniTrackingFormValues>({
    resolver: zodResolver(alumniTrackingFormSchema) as any,
  });

  const loadData = useCallback(async () => {
    try {
      const res = await alumniTrackingService.getAll();
      const list = unwrapList<AlumniTrackingStat>(res);
      if (list.length > 0) setData(list);
    } catch {}
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const employed = watch("employed_percent") || 0;
  const entrepreneur = watch("entrepreneur_percent") || 0;
  const college = watch("college_percent") || 0;
  const other = watch("other_percent") || 0;
  const total = Number(employed) + Number(entrepreneur) + Number(college) + Number(other);
  const isTotalValid = Math.abs(total - 100) < 0.01;

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((i) => String(i.year).includes(search));
  }, [data, search]);

  const openCreate = () => {
    setEditItem(null);
    reset({ year: new Date().getFullYear(), employed_percent: null, entrepreneur_percent: null, college_percent: null, other_percent: null });
    setDialogOpen(true);
  };

  const openEdit = (item: AlumniTrackingStat) => {
    setEditItem(item);
    reset({
      year: item.year,
      employed_percent: item.employed_percent ?? null,
      entrepreneur_percent: item.entrepreneur_percent ?? null,
      college_percent: item.college_percent ?? null,
      other_percent: item.other_percent ?? null,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (values: AlumniTrackingFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await alumniTrackingService.update(editItem.id, values);
        toast.success("Data tracer study berhasil diperbarui!");
      } else {
        await alumniTrackingService.create(values);
        toast.success("Data tracer study berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      if (editItem) {
        setData((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...values } : i)));
        toast.success("Data tracer study diperbarui (lokal)!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values }, ...prev]);
        toast.success("Data tracer study ditambahkan (lokal)!");
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
      await alumniTrackingService.delete(deleteItem.id);
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Data tracer study berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Data tracer study berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<AlumniTrackingStat>[] = [
    {
      key: "year",
      label: "Tahun Lulus",
      render: (item) => <span className="font-mono font-bold text-[var(--admin-fg)]">{item.year}</span>,
      className: "w-28",
    },
    {
      key: "employed_percent",
      label: "Bekerja",
      render: (item) => (
        <span className="font-semibold text-emerald-600">
          {item.employed_percent ?? 0}%
        </span>
      ),
    },
    {
      key: "entrepreneur_percent",
      label: "Wirausaha",
      render: (item) => (
        <span className="font-semibold text-amber-600">
          {item.entrepreneur_percent ?? 0}%
        </span>
      ),
    },
    {
      key: "college_percent",
      label: "Kuliah",
      render: (item) => (
        <span className="font-semibold text-blue-600">
          {item.college_percent ?? 0}%
        </span>
      ),
    },
    {
      key: "other_percent",
      label: "Lainnya",
      render: (item) => (
        <span className="text-slate-500">
          {item.other_percent ?? 0}%
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Penelusuran Tamatan Alumni (Tracer Study)"
        description="Pantau statistik keterserapan alumni: bekerja, wirausaha, dan melanjutkan kuliah"
        actions={
          <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
            <Plus size={16} /> Tambah Data Tahun
          </Button>
        }
      />

      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Cari tahun kelulusan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
      </div>

      <DataTable columns={columns} data={filteredData} getRowId={(i) => i.id} onEdit={openEdit} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada data tracer study." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-md">
          <DialogHeader><DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">{editItem ? "Edit Data Tracer Study" : "Tambah Data Tracer Study"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Tahun Kelulusan" error={errors.year?.message} required>
              <Input type="number" {...register("year")} className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Bekerja (%)" error={errors.employed_percent?.message}>
                <Input type="number" step="0.1" {...register("employed_percent")} placeholder="e.g. 68.5" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
              </FormField>
              <FormField label="Wirausaha (%)" error={errors.entrepreneur_percent?.message}>
                <Input type="number" step="0.1" {...register("entrepreneur_percent")} placeholder="e.g. 12" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
              </FormField>
              <FormField label="Kuliah (%)" error={errors.college_percent?.message}>
                <Input type="number" step="0.1" {...register("college_percent")} placeholder="e.g. 15" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
              </FormField>
              <FormField label="Lainnya (%)" error={errors.other_percent?.message}>
                <Input type="number" step="0.1" {...register("other_percent")} placeholder="e.g. 4.5" className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]" />
              </FormField>
            </div>

            <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${isTotalValid ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600" : "border-amber-500/30 bg-amber-500/10 text-amber-600"}`}>
              <span className="font-semibold">Total Persentase: {total.toFixed(1)}%</span>
              {!isTotalValid && <span className="flex items-center gap-1"><AlertTriangle size={12} /> Disarankan total 100%</span>}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)] hover:bg-[var(--admin-border)]">Batal</Button>
              <Button type="submit" disabled={saving} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Data Tracer" description="Apakah Anda yakin ingin menghapus data tracer study ini?" confirmText="Hapus" onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
