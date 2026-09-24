"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { DataTable, type Column } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { faqFormSchema, type FaqFormValues } from "@/lib/validations/cms";
import type { Faq } from "@/types/cms";
import { faqService } from "@/lib/api/cms-endpoints";
import { unwrapList } from "@/lib/api/public-endpoints";

const DEFAULT_FAQS: Faq[] = [
  { id: 1, question: "Bagaimana cara mendaftar PPDB di SMKN 1 Subang?", answer: "Pendaftaran PPDB dilakukan secara online melalui portal resmi PPDB Disdik Jawa Barat. Silakan kunjungi halaman PPDB untuk informasi jadwal dan syarat berkas.", sort_order: 1 },
  { id: 2, question: "Apa saja jurusan keahlian yang tersedia?", answer: "SMKN 1 Subang memiliki program keahlian unggulan: RPL, TKJ, DKV, Teknik Otomasi Industri, Bisnis Digital, dan Akuntansi.", sort_order: 2 },
  { id: 3, question: "Berapa biaya pendidikan di SMKN 1 Subang?", answer: "Sebagai SMK Negeri Pusat Keunggulan, biaya pendidikan reguler dibebaskan (gratis) sesuai ketentuan pemerintah provinsi Jawa Barat.", sort_order: 3 },
  { id: 4, question: "Apakah ada program magang di industri?", answer: "Ya, seluruh jurusan memiliki program Praktik Kerja Lapangan (PKL) minimal 6 bulan yang bekerja sama dengan industri mitra berskala nasional.", sort_order: 4 },
];

export default function FaqsPage() {
  const [data, setData] = useState<Faq[]>(DEFAULT_FAQS);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Faq | null>(null);
  const [deleteItem, setDeleteItem] = useState<Faq | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema) as any,
  });

  const loadData = useCallback(async () => {
    try {
      const res = await faqService.getAll();
      const list = unwrapList<Faq>(res);
      if (list.length > 0) setData(list);
    } catch {
      // Keep existing data
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredData = useMemo(() => {
    let result = [...data].sort((a, b) => a.sort_order - b.sort_order);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }
    return result;
  }, [data, search]);

  const openCreate = () => {
    setEditItem(null);
    reset({ question: "", answer: "", sort_order: data.length + 1 });
    setDialogOpen(true);
  };

  const openEdit = (item: Faq) => {
    setEditItem(item);
    reset({ question: item.question, answer: item.answer, sort_order: item.sort_order });
    setDialogOpen(true);
  };

  const onSubmit = async (values: FaqFormValues) => {
    setSaving(true);
    try {
      if (editItem) {
        await faqService.update(editItem.id, values);
        setData((prev) => prev.map((f) => f.id === editItem.id ? { ...f, ...values } : f));
        toast.success("FAQ berhasil diperbarui!");
      } else {
        await faqService.create(values);
        setData((prev) => [...prev, { id: Date.now(), ...values, created_at: new Date().toISOString() }]);
        toast.success("FAQ berhasil ditambahkan!");
      }
      setDialogOpen(false);
      loadData();
    } catch {
      if (editItem) {
        setData((prev) => prev.map((f) => f.id === editItem.id ? { ...f, ...values } : f));
        toast.success("FAQ berhasil diperbarui (lokal)!");
      } else {
        setData((prev) => [...prev, { id: Date.now(), ...values, created_at: new Date().toISOString() }]);
        toast.success("FAQ berhasil ditambahkan (lokal)!");
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
      await faqService.delete(deleteItem.id);
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("FAQ berhasil dihapus!");
      setDeleteItem(null);
      loadData();
    } catch {
      setData((prev) => prev.filter((f) => f.id !== deleteItem.id));
      toast.success("FAQ berhasil dihapus (lokal)!");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: Column<Faq>[] = [
    {
      key: "sort_order",
      label: "Urutan",
      render: (item: Faq) => (
        <span className="font-mono text-xs font-bold text-[var(--admin-fg-muted)]">
          #{item.sort_order}
        </span>
      ),
      className: "w-16",
    },
    {
      key: "question",
      label: "Pertanyaan",
      render: (item: Faq) => (
        <span className="font-medium text-[var(--admin-fg)] max-w-[300px] block">
          {item.question}
        </span>
      ),
    },
    {
      key: "answer",
      label: "Jawaban",
      render: (item: Faq) => (
        <span className="text-[var(--admin-fg-muted)] line-clamp-2 max-w-[400px] block">
          {item.answer}
        </span>
      ),
    },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Tanya Jawab / FAQ"
        description="Kelola pertanyaan yang sering diajukan seputar sekolah, jurusan, dan PPDB"
        actions={
          <Button
            onClick={openCreate}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Plus size={16} /> Tambah FAQ
          </Button>
        }
      />

      <div className="mb-6 max-w-sm">
        <input
          type="text"
          placeholder="Cari pertanyaan atau jawaban..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] outline-none focus:border-[var(--admin-primary)]"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        getRowId={(item: Faq) => item.id}
        onEdit={openEdit}
        onDelete={(item: Faq) => setDeleteItem(item)}
        emptyMessage="Belum ada FAQ."
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[var(--admin-fg)]">
              {editItem ? "Edit FAQ" : "Tambah FAQ Baru"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField label="Pertanyaan" error={errors.question?.message} required>
              <Input
                {...register("question")}
                placeholder="e.g. Bagaimana cara mendaftar PPDB?"
                className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
              />
            </FormField>

            <FormField label="Jawaban Resmi" error={errors.answer?.message} required>
              <textarea
                {...register("answer")}
                rows={4}
                placeholder="Tuliskan jawaban yang jelas dan informatif..."
                className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
              />
            </FormField>

            <FormField label="Nomor Urut Tampilan" error={errors.sort_order?.message}>
              <Input
                type="number"
                {...register("sort_order")}
                className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] w-24"
              />
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

      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title="Hapus FAQ"
        description={`Apakah Anda yakin ingin menghapus pertanyaan "${deleteItem?.question}"?`}
        confirmText="Hapus"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
