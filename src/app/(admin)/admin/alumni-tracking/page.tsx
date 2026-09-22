"use client";

import { useState, useMemo } from "react";
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

const MOCK_DATA: AlumniTrackingStat[] = [
  { id: 1, year: 2025, employed_percent: 68.5, entrepreneur_percent: 12, college_percent: 15, other_percent: 4.5 },
  { id: 2, year: 2024, employed_percent: 65, entrepreneur_percent: 14, college_percent: 16.5, other_percent: 4.5 },
  { id: 3, year: 2023, employed_percent: 62, entrepreneur_percent: 10.5, college_percent: 18, other_percent: 9.5 },
];

export default function AlumniTrackingPage() {
  const [data, setData] = useState<AlumniTrackingStat[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AlumniTrackingStat | null>(null);
  const [deleteItem, setDeleteItem] = useState<AlumniTrackingStat | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<AlumniTrackingFormValues>({
    resolver: zodResolver(alumniTrackingFormSchema) as any,
  });

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

  const openCreate = () => { setEditItem(null); reset({ year: new Date().getFullYear(), employed_percent: null, entrepreneur_percent: null, college_percent: null, other_percent: null }); setDialogOpen(true); };
  const openEdit = (item: AlumniTrackingStat) => { setEditItem(item); reset(item); setDialogOpen(true); };

  const onSubmit = async (values: AlumniTrackingFormValues) => {
    try {
      if (editItem) {
        setData((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...values } : i));
        toast.success("Data tracer study berhasil diperbarui!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values }, ...prev]);
        toast.success("Data tracer study berhasil ditambahkan!");
      }
      setDialogOpen(false);
    } catch { toast.error("Gagal menyimpan data."); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try { await new Promise((r) => setTimeout(r, 500)); setData((prev) => prev.filter((i) => i.id !== deleteItem.id)); toast.success("Data berhasil dihapus!"); setDeleteItem(null); }
    catch { toast.error("Gagal menghapus."); }
    finally { setDeleting(false); }
  };

  const columns: Column<AlumniTrackingStat>[] = [
    { key: "year", label: "Tahun Lulus", className: "w-[120px]", render: (item) => <span className="admin-badge admin-badge-blue font-bold">{item.year}</span> },
    { key: "employed_percent", label: "Bekerja", className: "text-right", render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.employed_percent ?? "—"}%</span> },
    { key: "entrepreneur_percent", label: "Wirausaha", className: "text-right", render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.entrepreneur_percent ?? "—"}%</span> },
    { key: "college_percent", label: "Kuliah", className: "text-right", render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.college_percent ?? "—"}%</span> },
    { key: "other_percent", label: "Lainnya", className: "text-right", render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.other_percent ?? "—"}%</span> },
    {
      key: "total",
      label: "Total",
      className: "text-right w-[100px]",
      render: (item) => {
        const t = (item.employed_percent || 0) + (item.entrepreneur_percent || 0) + (item.college_percent || 0) + (item.other_percent || 0);
        const valid = Math.abs(t - 100) < 0.01;
        return (
          <span className={`font-bold ${valid ? "text-[var(--admin-success)]" : "text-[var(--admin-warning)]"}`}>
            {t.toFixed(1)}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader title="Tracer Study Alumni" description="Data penelusuran keterserapan alumni per tahun kelulusan" actions={
        <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"><Plus size={16} /> Tambah Data</Button>
      } />

      <DataTable columns={columns} data={filteredData} searchPlaceholder="Cari tahun..." onSearch={setSearch} searchValue={search} onEdit={(item) => openEdit(item)} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada data tracer study." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[520px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
          <DialogHeader><DialogTitle className="text-[var(--admin-fg)]">{editItem ? "Edit Data" : "Tambah Data Tracer Study"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Tahun Kelulusan" required error={errors.year?.message}>
              <Input type="number" {...register("year")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Bekerja (%)" error={errors.employed_percent?.message}>
                <Input type="number" step="0.01" min={0} max={100} {...register("employed_percent")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
              </FormField>
              <FormField label="Wirausaha (%)" error={errors.entrepreneur_percent?.message}>
                <Input type="number" step="0.01" min={0} max={100} {...register("entrepreneur_percent")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
              </FormField>
              <FormField label="Kuliah (%)" error={errors.college_percent?.message}>
                <Input type="number" step="0.01" min={0} max={100} {...register("college_percent")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
              </FormField>
              <FormField label="Lainnya (%)" error={errors.other_percent?.message}>
                <Input type="number" step="0.01" min={0} max={100} {...register("other_percent")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
              </FormField>
            </div>
            {/* Total Indicator */}
            <div className={`p-3 rounded-lg border flex items-center gap-2 ${isTotalValid ? "border-[var(--admin-success)] bg-[var(--admin-success-bg)]" : "border-[var(--admin-warning)] bg-[var(--admin-warning-bg)]"}`}>
              {!isTotalValid && <AlertTriangle size={16} className="text-[var(--admin-warning)] shrink-0" />}
              <p className={`text-sm font-medium ${isTotalValid ? "text-[var(--admin-success)]" : "text-[var(--admin-warning)]"}`}>
                Total: {total.toFixed(2)}% {isTotalValid ? "✓" : "— Idealnya 100%"}
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)]">Batal</Button>
              <Button type="submit" className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{editItem ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Data" description="Hapus data tracer study ini?" onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
