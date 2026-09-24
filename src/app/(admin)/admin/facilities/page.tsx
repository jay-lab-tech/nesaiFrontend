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
import { facilityFormSchema, type FacilityFormValues } from "@/lib/validations/cms";
import { FACILITY_CATEGORIES, type Facility } from "@/types/cms";
import { facilityService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_FACILITIES: Facility[] = [
  { id: 1, name: "Laboratorium Komputer RPL", category: "Laboratorium & Bengkel", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 2, name: "Bengkel Otomotif", category: "Laboratorium & Bengkel", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 3, name: "Laboratorium Multimedia", category: "Laboratorium & Bengkel", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 4, name: "Lapangan Basket", category: "Fasilitas Olahraga", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 5, name: "Masjid Al-Hikmah", category: "Sarana Ibadah", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 6, name: "Perpustakaan", category: "Fasilitas Umum", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 7, name: "Aula Serbaguna", category: "Fasilitas Umum", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
  { id: 8, name: "Bengkel Kelistrikan", category: "Laboratorium & Bengkel", description: null, is_placeholder: false, created_at: "2026-09-01", updated_at: "2026-09-01" },
];

const CATEGORY_BADGE_MAP: Record<string, string> = {
  "Laboratorium & Bengkel": "admin-badge-blue",
  "Fasilitas Olahraga": "admin-badge-green",
  "Fasilitas Umum": "admin-badge-slate",
  "Sarana Ibadah": "admin-badge-purple",
};

export default function FacilitiesPage() {
  const [data, setData] = useState<Facility[]>(DEFAULT_FACILITIES);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Facility | null>(null);
  const [deleteItem, setDeleteItem] = useState<Facility | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FacilityFormValues>({
    resolver: zodResolver(facilityFormSchema) as any,
  });

  const selectedCategory = watch("category");

  const loadData = useCallback(async () => {
    try {
      const res = await facilityService.getAll();
      const list = unwrapList<Facility>(res);
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

  const openEdit = (item: Facility) => {
    setEditItem(item);
    reset({ name: item.name, category: item.category || "" });
    setDialogOpen(true);
  };

  const onSubmit = async (values: FacilityFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await facilityService.update(editItem.id, values);
        setData((prev) =>
          prev.map((f) => (f.id === editItem.id ? { ...f, ...values } : f))
        );
        toast.success("Fasilitas berhasil diperbarui!");
      } else {
        const res = await facilityService.create(values);
        const created = (res && res.data) ? (res.data as Facility) : {
          id: Date.now(),
          name: values.name,
          category: values.category || null,
          description: null,
          is_placeholder: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setData((prev) => [created, ...prev]);
        toast.success("Fasilitas berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      // Optimistic local update as fallback
      if (editItem) {
        setData((prev) =>
          prev.map((f) => (f.id === editItem.id ? { ...f, ...values } : f))
        );
        toast.success("Fasilitas berhasil diperbarui (offline/lokal)!");
      } else {
        const newItem: Facility = {
          id: Date.now(),
          name: values.name,
          category: values.category || null,
          description: null,
          is_placeholder: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setData((prev) => [newItem, ...prev]);
        toast.success("Fasilitas berhasil ditambahkan (offline/lokal)!");
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
      await facilityService.delete(deleteItem.id);
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("Fasilitas berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("Fasilitas berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Facility>[] = [
    {
      key: "name",
      label: "Nama Fasilitas",
      render: (item: Facility) => (
        <span className="font-medium text-[var(--admin-fg)]">{item.name}</span>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (item: Facility) => (
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
        title="Sarana & Prasarana"
        description="Kelola laboratorium, bengkel, ruang kelas, dan fasilitas lainnya"
        actions={
          <Button
            onClick={openCreate}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Plus size={16} />
            Tambah Fasilitas
          </Button>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Cari fasilitas..."
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
            {FACILITY_CATEGORIES.map((cat) => (
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
        getRowId={(item: Facility) => item.id}
        onEdit={openEdit}
        onDelete={(item: Facility) => setDeleteItem(item)}
        emptyMessage="Belum ada data fasilitas."
      />

      {/* Create / Edit Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">
              {editItem ? "Edit Fasilitas" : "Tambah Fasilitas"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Nama Fasilitas" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="e.g. Laboratorium Komputer RPL"
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
                  {FACILITY_CATEGORIES.map((cat) => (
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
        title="Hapus Fasilitas"
        description={`Apakah Anda yakin ingin menghapus "${deleteItem?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
