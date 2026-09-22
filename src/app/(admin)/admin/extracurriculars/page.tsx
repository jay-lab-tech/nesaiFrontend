"use client";

import { useState, useMemo } from "react";
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

// Mock data
const MOCK_DATA: Extracurricular[] = [
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
  const [data, setData] = useState<Extracurricular[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Extracurricular | null>(null);
  const [deleteItem, setDeleteItem] = useState<Extracurricular | null>(null);
  const [deleting, setDeleting] = useState(false);

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
    try {
      if (editItem) {
        setData((prev) =>
          prev.map((f) =>
            f.id === editItem.id ? { ...f, ...values } : f
          )
        );
        toast.success("Ekstrakurikuler berhasil diperbarui!");
      } else {
        const newItem: Extracurricular = {
          id: Date.now(),
          name: values.name,
          category: values.category || null,
          created_at: new Date().toISOString(),
        };
        setData((prev) => [newItem, ...prev]);
        toast.success("Ekstrakurikuler berhasil ditambahkan!");
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
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("Ekstrakurikuler berhasil dihapus!");
      setDeleteItem(null);
    } catch {
      toast.error("Gagal menghapus data.");
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Extracurricular>[] = [
    {
      key: "name",
      label: "Nama Ekskul",
      render: (item) => (
        <span className="font-medium text-[var(--admin-fg)]">{item.name}</span>
      ),
    },
    {
      key: "category",
      label: "Kategori",
      render: (item) =>
        item.category ? (
          <span
            className={`admin-badge ${
              CATEGORY_BADGE_MAP[item.category] || "admin-badge-slate"
            }`}
          >
            {item.category}
          </span>
        ) : (
          <span className="text-[var(--admin-fg-subtle)]">—</span>
        ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Ekstrakurikuler"
        description="Kelola daftar kegiatan ekstrakurikuler sekolah"
        actions={
          <Button
            onClick={openCreate}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Plus size={16} />
            Tambah Ekskul
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={filteredData}
        searchPlaceholder="Cari ekstrakurikuler..."
        onSearch={setSearch}
        searchValue={search}
        onEdit={(item) => openEdit(item)}
        onDelete={(item) => setDeleteItem(item)}
        emptyMessage="Belum ada data ekstrakurikuler."
        filters={
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[200px] h-9 bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
              <SelectItem value="all" className="text-[var(--admin-fg)]">Semua Kategori</SelectItem>
              {EXTRACURRICULAR_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-[var(--admin-fg)]">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--admin-fg)]">
              {editItem ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Nama Ekskul" htmlFor="ekskul-name" required error={errors.name?.message}>
              <Input id="ekskul-name" {...register("name")} placeholder="e.g. Paskibra" className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Kategori" error={errors.category?.message}>
              <Select value={selectedCategory || ""} onValueChange={(v) => setValue("category", v)}>
                <SelectTrigger className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
                  {EXTRACURRICULAR_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-[var(--admin-fg)]">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
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

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus Ekstrakurikuler"
        description={`Apakah Anda yakin ingin menghapus "${deleteItem?.name}"?`}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
