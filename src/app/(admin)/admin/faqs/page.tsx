"use client";

import { useState, useMemo } from "react";
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

const MOCK_DATA: Faq[] = [
  { id: 1, question: "Bagaimana cara mendaftar PPDB di SMKN 1 Subang?", answer: "Pendaftaran PPDB dilakukan secara online melalui portal resmi PPDB. Silakan kunjungi halaman PPDB untuk informasi lengkap.", sort_order: 1 },
  { id: 2, question: "Apa saja jurusan yang tersedia?", answer: "SMKN 1 Subang memiliki 8 program keahlian unggulan, termasuk RPL, TKJ, Multimedia, Otomotif, Kelistrikan, Akuntansi, OTKP, dan BDP.", sort_order: 2 },
  { id: 3, question: "Berapa biaya sekolah per bulan?", answer: "Sebagai sekolah negeri, SMKN 1 Subang bebas biaya pendidikan (gratis) untuk siswa yang diterima melalui jalur reguler PPDB.", sort_order: 3 },
  { id: 4, question: "Apakah ada program magang di industri?", answer: "Ya, seluruh jurusan memiliki program Praktik Kerja Lapangan (PKL) yang bekerja sama dengan industri mitra.", sort_order: 4 },
  { id: 5, question: "Bagaimana cara menghubungi pihak sekolah?", answer: "Anda bisa menghubungi kami melalui telepon (0260) 411537 atau email smkn1subang@gmail.com, atau datang langsung ke alamat sekolah.", sort_order: 5 },
];

export default function FaqsPage() {
  const [data, setData] = useState<Faq[]>(MOCK_DATA);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Faq | null>(null);
  const [deleteItem, setDeleteItem] = useState<Faq | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema) as any,
  });

  const filteredData = useMemo(() => {
    let result = [...data].sort((a, b) => a.sort_order - b.sort_order);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }
    return result;
  }, [data, search]);

  const openCreate = () => { setEditItem(null); reset({ question: "", answer: "", sort_order: data.length + 1 }); setDialogOpen(true); };
  const openEdit = (item: Faq) => { setEditItem(item); reset({ question: item.question, answer: item.answer, sort_order: item.sort_order }); setDialogOpen(true); };

  const onSubmit = async (values: FaqFormValues) => {
    try {
      if (editItem) {
        setData((prev) => prev.map((f) => f.id === editItem.id ? { ...f, ...values } : f));
        toast.success("FAQ berhasil diperbarui!");
      } else {
        setData((prev) => [...prev, { id: Date.now(), ...values, created_at: new Date().toISOString() }]);
        toast.success("FAQ berhasil ditambahkan!");
      }
      setDialogOpen(false);
    } catch { toast.error("Gagal menyimpan."); }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try { await new Promise((r) => setTimeout(r, 500)); setData((prev) => prev.filter((f) => f.id !== deleteItem.id)); toast.success("FAQ berhasil dihapus!"); setDeleteItem(null); }
    catch { toast.error("Gagal menghapus."); }
    finally { setDeleting(false); }
  };

  const columns: Column<Faq>[] = [
    { key: "sort_order", label: "#", className: "w-[60px] text-center", render: (item) => <span className="text-xs font-bold text-[var(--admin-fg-subtle)]">{item.sort_order}</span> },
    { key: "question", label: "Pertanyaan", render: (item) => (
      <div className="max-w-[400px]">
        <p className="font-medium text-[var(--admin-fg)] line-clamp-1">{item.question}</p>
        <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5 line-clamp-1">{item.answer}</p>
      </div>
    ) },
  ];

  return (
    <div className="admin-animate-in">
      <PageHeader title="FAQ (Tanya Jawab)" description="Kelola pertanyaan yang sering diajukan" actions={
        <Button onClick={openCreate} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"><Plus size={16} /> Tambah FAQ</Button>
      } />

      <DataTable columns={columns} data={filteredData} searchPlaceholder="Cari FAQ..." onSearch={setSearch} searchValue={search} onEdit={(item) => openEdit(item)} onDelete={(item) => setDeleteItem(item)} emptyMessage="Belum ada FAQ." />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[520px] bg-[var(--admin-card-bg)] border-[var(--admin-border)]">
          <DialogHeader><DialogTitle className="text-[var(--admin-fg)]">{editItem ? "Edit FAQ" : "Tambah FAQ Baru"}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label="Pertanyaan" required error={errors.question?.message}>
              <Input {...register("question")} placeholder="Pertanyaan yang sering diajukan" className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <FormField label="Jawaban" required error={errors.answer?.message}>
              <textarea {...register("answer")} rows={4} className="admin-input resize-none" placeholder="Jawaban resmi..." />
            </FormField>
            <FormField label="Urutan Tampil" error={errors.sort_order?.message} hint="Angka kecil tampil lebih dulu">
              <Input type="number" min={0} {...register("sort_order")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] w-24" />
            </FormField>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="border-[var(--admin-border)] text-[var(--admin-fg)]">Batal</Button>
              <Button type="submit" className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white">{editItem ? "Simpan" : "Tambah"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)} title="Hapus FAQ" description={`Hapus FAQ "${deleteItem?.question}"?`} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
}
