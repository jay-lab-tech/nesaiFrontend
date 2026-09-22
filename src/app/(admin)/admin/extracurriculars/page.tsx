"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  extracurricularFormSchema,
  type ExtracurricularFormValues,
} from "@/lib/validations/cms";
import { EXTRACURRICULAR_CATEGORIES, type Extracurricular } from "@/types/cms";
import { extracurricularService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_EXTRACURRICULARS: Extracurricular[] = [
  { id: 1, name: "Paskibra", category: "Kepemimpinan", created_at: "2026-09-01" },
  { id: 2, name: "Pramuka", category: "Kepemimpinan", created_at: "2026-09-01" },
  { id: 3, name: "PMR", category: "Kepemimpinan", created_at: "2026-09-01" },
  { id: 4, name: "Futsal", category: "Olahraga", created_at: "2026-09-01" },
  { id: 5, name: "Basket", category: "Olahraga", created_at: "2026-09-01" },
  { id: 6, name: "Band & Paduan Suara", category: "Seni & Budaya", created_at: "2026-09-01" },
  { id: 7, name: "Cyber Club", category: "Teknologi & Ilmiah", created_at: "2026-09-01" },
  { id: 8, name: "Robotik", category: "Teknologi & Ilmiah", created_at: "2026-09-01" },
  { id: 9, name: "Rohis", category: "Keagamaan", created_at: "2026-09-01" },
];

const CATEGORY_BADGE_MAP: Record<string, string> = {
  Kepemimpinan: "admin-badge-blue",
  Olahraga: "admin-badge-green",
  "Seni & Budaya": "admin-badge-purple",
  "Teknologi & Ilmiah": "admin-badge-amber",
  Keagamaan: "admin-badge-slate",
};

export default function ExtracurricularsPage() {
  const [data, setData] = useState<Extracurricular[]>(DEFAULT_EXTRACURRICULARS);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Extracurricular | null>(null);
  const [deleteItem, setDeleteItem] = useState<Extracurricular | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExtracurricularFormValues>({
    resolver: zodResolver(extracurricularFormSchema) as any,
  });

  const selectedCategory = watch("category");

  const loadData = useCallback(async () => {
    try {
      const res = await extracurricularService.getAll();
      const list = unwrapList<Extracurricular>(res);
      if (list.length > 0) setData(list);
    } catch {
      // Keep existing data fallback
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredData = useMemo(() => {
    let result = data;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.name.toLowerCase().includes(q));
    }
    if (filterCategory && filterCategory !== "all") {
      result = result.filter((f) => f.category === filterCategory);
    }
    return result;
  }, [data, search, filterCategory]);

  const openCreate = () => {
    setEditItem(null);
    reset({ name: "", category: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: Extracurricular) => {
    setEditItem(item);
    reset({ name: item.name, category: item.category || "" });
    setDialogOpen(true);
  };

  const onSubmit = async (values: ExtracurricularFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await extracurricularService.update(editItem.id, values);
        setData((prev) =>
          prev.map((f) => (f.id === editItem.id ? { ...f, ...values } : f))
        );
        toast.success("Ekstrakurikuler berhasil diperbarui!");
      } else {
        const res = await extracurricularService.create(values);
        const created = (res && res.data) ? (res.data as Extracurricular) : {
          id: Date.now(),
          name: values.name,
          category: values.category || null,
          created_at: new Date().toISOString(),
        };
        setData((prev) => [created, ...prev]);
        toast.success("Ekstrakurikuler berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      if (editItem) {
        setData((prev) =>
          prev.map((f) => (f.id === editItem.id ? { ...f, ...values } : f))
        );
        toast.success("Ekstrakurikuler berhasil diperbarui (offline/lokal)!");
      } else {
        const newItem: Extracurricular = {
          id: Date.now(),
          name: values.name,
          category: values.category || null,
          created_at: new Date().toISOString(),
        };
        setData((prev) => [newItem, ...prev]);
        toast.success("Ekstrakurikuler berhasil ditambahkan (offline/lokal)!");
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
      await extracurricularService.delete(deleteItem.id);
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("Ekstrakurikuler berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("Ekstrakurikuler berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Extracurricular>[] = [
    {
      key: "name",
      label: "Nama Ekstrakurikuler",
      render: (item: Extracurricular) => (
        <span className="font-medium text-[var(--admin-fg)]">{item.name}</span>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (item: Extracurricular) => (
        <span
          className={`admin-badge ${
            CATEGORY_BADGE_MAP[item.category || ""] || "admin-badge-slate"
          }`}
        >
          {item.category || "Tanpa Kategori"}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Ekstrakurikuler"
        description="Kelola kegiatan kesiswaan, organisasi, dan klub minat bakat"
        actions={
          <Button
            onClick={openCreate}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Plus size={16} />
            Tambah Ekstrakurikuler
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Cari ekstrakurikuler..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[220px] bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
            <SelectItem value="all" className="text-[var(--admin-fg)]">
              Semua Kategori
            </SelectItem>
            {EXTRACURRICULAR_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-[var(--admin-fg)]">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        getRowId={(item: Extracurricular) => item.id}
        onEdit={openEdit}
        onDelete={(item: Extracurricular) => setDeleteItem(item)}
        emptyMessage="Belum ada data ekstrakurikuler."
      />

      {/* Create / Edit Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">
              {editItem ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Nama Ekstrakurikuler" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="e.g. Cyber Club"
                className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
              />
            </FormField>

            <FormField label="Kategori" error={errors.category?.message}>
              <Select
                value={selectedCategory || ""}
                onValueChange={(val) => setValue("category", val)}
              >
                <SelectTrigger className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]">
                  <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)]">
                  {EXTRACURRICULAR_CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-[var(--admin-fg)]"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

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

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Ekstrakurikuler"
        description={`Apakah Anda yakin ingin menghapus "${deleteItem?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
