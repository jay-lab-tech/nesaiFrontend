"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { ppdbFormSchema, type PpdbFormValues } from "@/lib/validations/cms";

// Mock data
const MOCK_PPDB: PpdbFormValues = {
  title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027",
  description: "SMK Negeri 1 Subang membuka pendaftaran peserta didik baru untuk 8 program keahlian unggulan. Pendaftaran dilakukan secara online melalui portal PPDB resmi.",
  requirements: [
    "Surat Keterangan Lulus / Ijazah SMP/MTs sederajat",
    "Fotokopi Kartu Keluarga (KK)",
    "Fotokopi Akta Kelahiran",
    "Rapor Semester 1 sampai 5",
    "Pas foto berwarna 3x4 (4 lembar)",
    "Surat Keterangan Sehat dari Dokter",
  ],
  schedule: [
    { stage: "Tahap 1 — Jalur Afirmasi & Prestasi", date: "10-15 Juni 2026", desc: "Pendaftaran online dan verifikasi dokumen" },
    { stage: "Tahap 2 — Jalur Zonasi", date: "20-25 Juni 2026", desc: "Seleksi berdasarkan jarak domisili" },
    { stage: "Tahap 3 — Jalur Perpindahan Orang Tua", date: "1-5 Juli 2026", desc: "Pendaftaran jalur mutasi" },
    { stage: "Pengumuman Hasil Seleksi", date: "10 Juli 2026", desc: "Pengumuman melalui website resmi" },
    { stage: "Daftar Ulang", date: "12-15 Juli 2026", desc: "Konfirmasi dan penyerahan berkas asli" },
  ],
  is_active: true,
};

export default function PpdbPage() {
  const [saving, setSaving] = useState(false);
  const [newRequirement, setNewRequirement] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<PpdbFormValues>({
    resolver: zodResolver(ppdbFormSchema) as any,
    defaultValues: MOCK_PPDB,
  });

  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule } = useFieldArray({
    control,
    name: "schedule",
  });

  const requirements = watch("requirements") || [];
  const isActive = watch("is_active");

  const addRequirement = () => {
    if (!newRequirement.trim()) return;
    setValue("requirements", [...requirements, newRequirement.trim()], { shouldDirty: true });
    setNewRequirement("");
  };

  const removeRequirement = (index: number) => {
    setValue(
      "requirements",
      requirements.filter((_, i) => i !== index),
      { shouldDirty: true }
    );
  };

  const onSubmit = async (data: PpdbFormValues) => {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Saving PPDB:", data);
      toast.success("Informasi PPDB berhasil disimpan!");
    } catch {
      toast.error("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Informasi PPDB"
        description="Kelola informasi Penerimaan Peserta Didik Baru"
        actions={
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={saving || !isDirty}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Save size={16} />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Status & Info Dasar */}
        <div className="admin-card space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[var(--admin-fg)]">Informasi Dasar</h3>
            <div className="flex items-center gap-3">
              <span className={`admin-badge ${isActive ? "admin-badge-green" : "admin-badge-red"}`}>
                {isActive ? "PPDB Aktif" : "PPDB Nonaktif"}
              </span>
              <Controller
                name="is_active"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
          </div>
          <FormField label="Judul PPDB" required error={errors.title?.message}>
            <Input {...register("title")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
          </FormField>
          <FormField label="Deskripsi" error={errors.description?.message}>
            <textarea {...register("description")} rows={3} className="admin-input resize-none" />
          </FormField>
        </div>

        {/* Persyaratan */}
        <div className="admin-card space-y-4">
          <h3 className="text-base font-semibold text-[var(--admin-fg)]">Persyaratan Pendaftaran</h3>
          <div className="flex gap-2">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
              placeholder="Tambah persyaratan baru..."
              className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"
            />
            <Button onClick={addRequirement} disabled={!newRequirement.trim()} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-1 shrink-0">
              <Plus size={16} /> Tambah
            </Button>
          </div>
          <div className="space-y-2">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--admin-border)]">
                <span className="text-xs font-bold text-[var(--admin-fg-subtle)] w-6 text-center">{idx + 1}</span>
                <span className="flex-1 text-sm text-[var(--admin-fg)]">{req}</span>
                <button onClick={() => removeRequirement(idx)} className="p-1 rounded hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-subtle)] hover:text-[var(--admin-danger)] transition-colors">
                  <X size={16} />
                </button>
              </div>
            ))}
            {requirements.length === 0 && (
              <p className="text-sm text-[var(--admin-fg-muted)] text-center py-4">Belum ada persyaratan.</p>
            )}
          </div>
        </div>

        {/* Jadwal Seleksi */}
        <div className="admin-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-[var(--admin-fg)]">Jadwal Seleksi</h3>
            <Button
              type="button"
              onClick={() => appendSchedule({ stage: "", date: "", desc: "" })}
              variant="outline"
              className="gap-1 border-[var(--admin-border)] text-[var(--admin-fg)]"
              size="sm"
            >
              <Plus size={14} /> Tambah Tahap
            </Button>
          </div>
          <div className="space-y-3">
            {scheduleFields.map((field, idx) => (
              <div key={field.id} className="p-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-secondary)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--admin-fg-subtle)]">Tahap {idx + 1}</span>
                  <button onClick={() => removeSchedule(idx)} className="p-1 rounded hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-subtle)] hover:text-[var(--admin-danger)] transition-colors">
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    {...register(`schedule.${idx}.stage`)}
                    placeholder="Nama tahap (e.g. Jalur Afirmasi)"
                    className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"
                  />
                  <Input
                    {...register(`schedule.${idx}.date`)}
                    placeholder="Tanggal (e.g. 10-15 Juni 2026)"
                    className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"
                  />
                </div>
                <Input
                  {...register(`schedule.${idx}.desc`)}
                  placeholder="Keterangan (opsional)"
                  className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"
                />
              </div>
            ))}
            {scheduleFields.length === 0 && (
              <p className="text-sm text-[var(--admin-fg-muted)] text-center py-4">Belum ada jadwal seleksi.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
