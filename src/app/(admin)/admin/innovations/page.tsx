"use client";

import { useState, useMemo } from "react";
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

// Mock majors for dropdown
const MOCK_MAJORS: Pick<Major, "id" | "name">[] = [
  { id: 1, name: "Rekayasa Perangkat Lunak" },
  { id: 2, name: "Teknik Komputer & Jaringan" },
  { id: 3, name: "Multimedia" },
  { id: 4, name: "Teknik Otomotif" },
  { id: 5, name: "Teknik Kelistrikan" },
];

const MOCK_DATA: Innovation[] = [
  { id: 1, name: "Motocimic", major_id: 4, major: { id: 4, name: "Teknik Otomotif", slug: "teknik-otomotif" }, description: "Motor listrik hemat energi inovasi siswa TO", has_haki: true, created_at: "2026-09-01" },
  { id: 2, name: "Nesasserator", major_id: 5, major: { id: 5, name: "Teknik Kelistrikan", slug: "teknik-kelistrikan" }, description: "Alat penghemat daya listrik otomatis", has_haki: true, created_at: "2026-09-01" },
  { id: 3, name: "Siborin", major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak" }, description: "Sistem informasi bimbingan konseling online", has_haki: false, created_at: "2026-09-01" },
  { id: 4, name: "Smart Greenhouse", major_id: 5, major: { id: 5, name: "Teknik Kelistrikan", slug: "teknik-kelistrikan" }, description: "Sistem kontrol rumah kaca berbasis IoT", has_haki: false, created_at: "2026-09-01" },
  { id: 5, name: "E-Library App", major_id: 1, major: { id: 1, name: "Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak" }, description: "Aplikasi perpustakaan digital sekolah", has_haki: false, created_at: "2026-09-01" },
];

export default function InnovationsPage() {
  const [data, setData] = useState<Innovation[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Innovation | null>(null);
  const [deleteItem, setDeleteItem] = useState<Innovation | null>(null);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InnovationFormValues>({
    resolver: zodResolver(innovationFormSchema) as any,
  });

  const filteredData = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.major?.name?.toLowerCase().includes(q)
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
      major_id: item.major_id,
      description: item.description || "",
      has_haki: item.has_haki,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (values: InnovationFormValues) => {
    try {
      const major = MOCK_MAJORS.find((m) => m.id === values.major_id);
      if (editItem) {
        setData((prev) =>
          prev.map((i) =>
            i.id === editItem.id
              ? {
                  ...i,
                  ...values,
                  major: major
                    ? { id: major.id, name: major.name, slug: "" }
                    : null,
                }
              : i
          )
        );
        toast.success("Karya inovasi berhasil diperbarui!");
      } else {
        const newItem: Innovation = {
          id: Date.now(),
          name: values.name,
          major_id: values.major_id || null,
          major: major ? { id: major.id, name: major.name, slug: "" } : null,
          description: values.description || null,
          has_haki: values.has_haki,
          created_at: new Date().toISOString(),
        };
        setData((prev) => [newItem, ...prev]);
        toast.success("Karya inovasi berhasil ditambahkan!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Gagal menyimpan data.");
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setData((prev) => prev.filter((i) => i.id !== deleteItem.id));
      toast.success("Karya inovasi berhasil dihapus!");
      setDeleteItem(null);
    } catch {
      toast.error("Gagal menghapus data.");
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Innovation>[] = [
    {
      key: "name",
      label: "Nama Inovasi",
      render: (item) => (
        <span className="font-medium text-[var(--admin-fg)]">{item.name}</span>
      ),
    },
    {
      key: "major",
      label: "Jurusan",
      render: (item) => (
        <span className="text-[var(--admin-fg-muted)]">
          {item.major?.name || "—"}
        </span>
      ),
    },
    {
      key: "has_haki",
      label: "HAKI",
      className: "text-center w-[100px]",
      render: (item) =>
        item.has_haki ? (
          <span className="admin-badge admin-badge-green gap-1 inline-flex items-center">
            <ShieldCheck size={12} /> Terdaftar
          </span>
        ) : (
          <span className="admin-badge admin-badge-slate gap-1 inline-flex items-center">
            <ShieldOff size={12} /> Belum
          </span>
        ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Karya Inovasi Siswa"
        description="Kelola produk inovasi karya siswa dan status HAKI"
        actions={
          <Button
            onClick={openCreate}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Plus size={16} />
            Tambah Inovasi
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari inovasi..."
        onSearch={setSearch}
        searchValue={search}
        onEdit={(item) => openEdit(item)}
        onDelete={(item) => setDeleteItem(item)}
        emptyMessage="Belum ada data karya inovasi."
      />

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[520px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--admin-fg)]">
              {editItem ? "Edit Karya Inovasi" : "Tambah Karya Inovasi Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Nama Produk Inovasi" required error={errors.name?.message}>
              <Input {...register("name")} placeholder="e.g. Motocimic" className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Jurusan Pembuat" error={errors.major_id?.message}>
              <Select
                value={watch("major_id") ? String(watch("major_id")) : ""}
                onValueChange={(v) => setValue("major_id", v ? Number(v) : null)}
              >
                <SelectTrigger className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]">
                  <SelectValue placeholder="Pilih jurusan" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
                  {MOCK_MAJORS.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)} className="text-[var(--admin-fg)]">
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Deskripsi" error={errors.description?.message}>
              <textarea {...register("description")} rows={3} className="admin-input resize-none" placeholder="Deskripsi fungsi dan keunggulan inovasi..." />
            </FormField>
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--admin-border)]">
              <div>
                <p className="text-sm font-medium text-[var(--admin-fg)]">Status HAKI</p>
                <p className="text-xs text-[var(--admin-fg-muted)]">Centang jika sudah terdaftar Hak Kekayaan Intelektual</p>
              </div>
              <Controller
                name="has_haki"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)]">
                Batal
              </Button>
              <Button type="submit" className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">
                {editItem ? "Simpan" : "Tambah"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Karya Inovasi"
        description={`Apakah Anda yakin ingin menghapus "${deleteItem?.name}"?`}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
