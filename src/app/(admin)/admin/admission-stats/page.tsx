"use client";

import { useState, useMemo } from "react";
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

const MOCK_MAJORS: Pick<Major, "id" | "name">[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak" },
  { id: 2, name: "Teknik Komputer & Jaringan" },
  { id: 3, name: "Multimedia" },
  { id: 4, name: "Teknik Otomotif" },
];

const MOCK_DATA: AdmissionStat[] = [
  { id: 1, major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "" }, year: 2026, applicant_count: 385 },
  { id: 2, major_id: 2, major: { id: 2, name: "Teknik Komputer & Jaringan", slug: "" }, year: 2026, applicant_count: 312 },
  { id: 3, major_id: 3, major: { id: 3, name: "Multimedia", slug: "" }, year: 2026, applicant_count: 275 },
  { id: 4, major_id: 4, major: { id: 4, name: "Teknik Otomotif", slug: "" }, year: 2026, applicant_count: 210 },
  { id: 5, major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "" }, year: 2025, applicant_count: 350 },
  { id: 6, major_id: 2, major: { id: 2, name: "Teknik Komputer & Jaringan", slug: "" }, year: 2025, applicant_count: 290 },
];

export default function AdmissionStatsPage() {
  const [data, setData] = useState<AdmissionStat[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<AdmissionStat | null>(null);
  const [deleteItem, setDeleteItem] = useState<AdmissionStat | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<AdmissionStatFormValues>({
    resolver: zodResolver(admissionStatFormSchema) as any,
  });

  const filteredData = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((i) => i.major?.name?.toLowerCase().includes(q) || String(i.year).includes(q));
  }, [data, search]);

  const openCreate = () => { setEditItem(null); reset({ major_id: 0, year: new Date().getFullYear(), applicant_count: 0 }); setDialogOpen(true); };
  const openEdit = (item: AdmissionStat) => { setEditItem(item); reset({ major_id: item.major_id, year: item.year, applicant_count: item.applicant_count }); setDialogOpen(true); };

  const onSubmit = async (values: AdmissionStatFormValues) => {
    try {
      const major = MOCK_MAJORS.find((m) => m.id === values.major_id);
      if (editItem) {
        setData((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null } : i));
        toast.success("Data statistik berhasil diperbarui!");
      } else {
        setData((prev) => [{ id: Date.now(), ...values, major: major ? { id: major.id, name: major.name, slug: "" } : null }, ...prev]);
        toast.success("Data statistik berhasil ditambahkan!");
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

  // Summary stats
  const totalByYear = useMemo(() => {
    const map: Record<number, number> = {};
    data.forEach((d) => { map[d.year] = (map[d.year] || 0) + d.applicant_count; });
    return Object.entries(map).sort(([a], [b]) => Number(b) - Number(a)).slice(0, 3);
  }, [data]);

  const columns: Column<AdmissionStat>[] = [
    { key: "year", label: "Tahun", className: "w-[100px]", render: (item) => <span className="admin-badge admin-badge-blue">{item.year}</span> },
    { key: "major", label: "Jurusan", render: (item) => <span className="font-medium text-[var(--admin-fg)]">{item.major?.name || "—"}</span> },
    { key: "applicant_count", label: "Jumlah Pendaftar", className: "text-right w-[150px]", render: (item) => <span className="font-semibold text-[var(--admin-fg)]">{item.applicant_count.toLocaleString("id-ID")}</span> },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader title="Statistik Pendaftar SPMB" description="Data jumlah pendaftar per jurusan per tahun" actions={
        <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"><Plus size={16} /> Tambah Data</Button>
      } />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 admin-stagger">
        {totalByYear.map(([year, total]) => (
          <div key={year} className="admin-metric-card">
            <p className="admin-metric-value">{Number(total).toLocaleString("id-ID")}</p>
            <p className="admin-metric-label">Total Pendaftar {year}</p>
          </div>
        ))}
      </div>

      <DataTable columns={columns} data={filteredData} searchPlaceholder="Cari jurusan atau tahun..." onSearch={setSearch} searchValue={search} onEdit={(item) => openEdit(item)} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada data statistik." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
          <DialogHeader><DialogTitle className="text-[var(--admin-fg)]">{editItem ? "Edit Data" : "Tambah Data Statistik"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Jurusan" required error={errors.major_id?.message}>
              <Select value={watch("major_id") ? String(watch("major_id")) : ""} onValueChange={(v) => setValue("major_id", Number(v))}>
                <SelectTrigger className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"><SelectValue placeholder="Pilih jurusan" /></SelectTrigger>
                <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
                  {MOCK_MAJORS.map((m) => <SelectItem key={m.id} value={String(m.id)} className="text-[var(--admin-fg)]">{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Tahun Seleksi" required error={errors.year?.message}>
              <Input type="number" {...register("year")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Jumlah Pendaftar" required error={errors.applicant_count?.message}>
              <Input type="number" min={0} {...register("applicant_count")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)]">Batal</Button>
              <Button type="submit" className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{editItem ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus Data" description="Apakah Anda yakin ingin menghapus data statistik ini?" onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
