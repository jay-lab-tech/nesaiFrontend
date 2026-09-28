"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus, ShieldCheck, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { innovationFormSchema, type InnovationFormValues } from "@/lib/validations/cms";
import type { Innovation, Major } from "@/types/cms";
import { innovationService, majorService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_MAJORS: Pick<Major, "id" | "name">[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak" },
  { id: 2, name: "Teknik Komputer & Jaringan" },
  { id: 3, name: "Multimedia & DKV" },
  { id: 4, name: "Teknik Otomasi Industri" },
  { id: 5, name: "Bisnis Digital" },
];

const DEFAULT_INNOVATIONS: Innovation[] = [
  { id: 1, name: "Sistem Smart Green House Berbasis IoT", major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "rpl" }, description: "Pengaturan suhu dan kelembaban otomatis via ESP32 dan dashboard web.", has_haki: true, created_at: "2026-09-01" },
  { id: 2, name: "Autonomous Inspection Rover Bot", major_id: 4, major: { id: 4, name: "Teknik Otomasi Industri", slug: "toi" }, description: "Robot pemantau jalur pipa sempit berbasis mikrokontroler.", has_haki: true, created_at: "2026-09-01" },
  { id: 3, name: "Aplikasi Kasir POS & Analitik", major_id: 5, major: { id: 5, name: "Bisnis Digital", slug: "bdp" }, description: "Solusi POS offline-first untuk UMKM lokal Subang.", has_haki: false, created_at: "2026-09-01" },
];

export default function InnovationsPage() {
  const [data, setData] = useState<Innovation[]>(DEFAULT_INNOVATIONS);
  const [majors, setMajors] = useState<Pick<Major, "id" | "name">[]>(DEFAULT_MAJORS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Innovation | null>(null);
  const [deleteItem, setDeleteItem] = useState<Innovation | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<InnovationFormValues>({
    resolver: zodResolver(innovationFormSchema) as any,
    defaultValues: {
      name: "",
      major_id: null,
      description: "",
      has_haki: false,
    },
  });

  const loadData = useCallback(async () => {
    try {
      const res = await innovationService.getAll();
      const list = unwrapList<Innovation>(res);
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
    return data.filter(
      (inv) =>
        inv.name.toLowerCase().includes(q) ||
        inv.major?.name.toLowerCase().includes(q) ||
        (inv.description || "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const openCreate = () => {
    setEditItem(null);
    reset({ name: "", major_id: null, description: "", has_haki: false });
    setDialogOpen(true);
  };

  const openEdit = (item: Innovation) => {
    setEditItem(item);
    reset({
      name: item.name,
      major_id: item.major_id || null,
      description: item.description || "",
      has_haki: item.has_haki,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (values: InnovationFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await innovationService.update(editItem.id, values);
        toast.success("Karya inovasi berhasil diperbarui!");
      } else {
        await innovationService.create(values);
        toast.success("Karya inovasi berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      const major = majors.find((m) => m.id === values.major_id);
      if (editItem) {
        setData((prev) =>
          prev.map((inv) =>
            inv.id === editItem.id
              ? {
                  ...inv,
                  name: values.name,
                  major_id: values.major_id ?? null,
                  major: major ? { id: major.id, name: major.name, slug: "" } : null,
                  description: values.description ?? null,
                  has_haki: values.has_haki,
                }
              : inv
          )
        );
        toast.success("Karya inovasi diperbarui (lokal)!");
      } else {
        const newItem: Innovation = {
          id: Date.now(),
          name: values.name,
          major_id: values.major_id ?? null,
          major: major ? { id: major.id, name: major.name, slug: "" } : null,
          description: values.description ?? null,
          has_haki: values.has_haki,
          created_at: new Date().toISOString(),
        };
        setData((prev) => [newItem, ...prev]);
        toast.success("Karya inovasi ditambahkan (lokal)!");
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
      await innovationService.delete(deleteItem.id);
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Karya inovasi berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Karya inovasi berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Innovation>[] = [
    {
      key: "name",
      label: "Nama Inovasi",
      render: (item: Innovation) => (
        <div>
          <p className="font-medium text-[var(--admin-fg)]">{item.name}</p>
          {item.description && (
            <p className="text-xs text-[var(--admin-fg-subtle)] mt-0.5 line-clamp-1">{item.description}</p>
          )}
        </div>
      ),
    },
    {
      key: "major",
      label: "Jurusan",
      render: (item: Innovation) => (
        <span className="text-xs text-[var(--admin-fg-muted)]">
          {item.major?.name || "Semua Jurusan"}
        </span>
      ),
    },
    {
      key: "has_haki",
      label: "Status HAKI",
      render: (item: Innovation) => (
        item.has_haki ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck size={13} /> Terdaftar
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            <ShieldOff size={13} /> Belum
          </span>
        )
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Karya Inovasi Siswa & Guru"
        description="Kelola produk inovatif, prototipe teknologi, dan sertifikasi HAKI"
        actions={
          <Button
            onClick={openCreate}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Plus size={16} /> Tambah Inovasi
          </Button>
        }
      />

      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Cari inovasi atau jurusan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        getRowId={(item: Innovation) => item.id}
        onEdit={openEdit}
        onDelete={(item) => setDeleteItem(item)}
        emptyMessage="Belum ada data karya inovasi."
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">
              {editItem ? "Edit Karya Inovasi" : "Tambah Karya Inovasi"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Nama Produk / Inovasi" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="e.g. Smart Greenhouse IoT"
                className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
              />
            </FormField>

            <FormField label="Jurusan Pembuat">
              <Controller
                name="major_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : "none"}
                    onValueChange={(val) => field.onChange(val === "none" ? null : Number(val))}
                  >
                    <SelectTrigger className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
                      <SelectValue placeholder="Pilih jurusan..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
                      <SelectItem value="none" className="text-[var(--admin-fg)]">Umum / Semua Jurusan</SelectItem>
                      {majors.map((m) => (
                        <SelectItem key={m.id} value={String(m.id)} className="text-[var(--admin-fg)]">
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <FormField label="Deskripsi Singkat">
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Jelaskan fungsi, spesifikasi, dan manfaat produk..."
                className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
              />
            </FormField>

            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)]">
              <div>
                <p className="text-sm font-medium text-[var(--admin-fg)]">Sertifikat HAKI</p>
                <p className="text-xs text-[var(--admin-fg-muted)]">Apakah produk telah terdaftar Hak Kekayaan Intelektual?</p>
              </div>
              <Controller
                name="has_haki"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--admin-border)]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-[var(--admin-border)] text-[var(--admin-fg)] hover:bg-[var(--admin-border)]"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white"
              >
                {saving ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Inovasi"
        description={`Apakah Anda yakin ingin menghapus inovasi "${deleteItem?.name}"?`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
