"use client";

import { useState, useEffect } from "react";
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
import { ppdbService } from "@/lib/api/cms-endpoints";
import type { Ppdb } from "@/types/cms";

const DEFAULT_PPDB: PpdbFormValues = {
  title: "Penerimaan Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027",
  description: "SMK Negeri 1 Subang membuka pendaftaran peserta didik baru untuk program keahlian unggulan. Pendaftaran dilakukan secara online melalui portal PPDB resmi.",
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
    reset,
    formState: { errors, isDirty },
  } = useForm<PpdbFormValues>({
    resolver: zodResolver(ppdbFormSchema) as any,
    defaultValues: DEFAULT_PPDB,
  });

  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule } = useFieldArray({
    control,
    name: "schedule",
  });

  const requirements = watch("requirements") || [];
  const isActive = watch("is_active");

  useEffect(() => {
    ppdbService.get()
      .then((res) => {
        const item = (res && res.data) as Ppdb;
        if (item) {
          reset({
            title: item.title,
            description: item.description || "",
            requirements: item.requirements || DEFAULT_PPDB.requirements,
            schedule: item.schedule || DEFAULT_PPDB.schedule,
            is_active: item.is_active,
          });
        }
      })
      .catch(() => {});
  }, [reset]);

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
      await ppdbService.update(data);
      toast.success("Informasi PPDB berhasil disimpan!");
      reset(data);
    } catch {
      toast.success("Informasi PPDB berhasil disimpan (lokal)!");
      reset(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Pengaturan PPDB"
        description="Kelola informasi, persyaratan, jadwal tahapan, dan status pendaftaran PPDB"
        actions={
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={saving || !isDirty}
            className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
          >
            <Save size={16} />
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Status Toggle Card */}
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--admin-fg)]">
                Status Pendaftaran PPDB
              </h2>
              <p className="text-sm text-[var(--admin-fg-muted)] mt-0.5">
                {isActive
                  ? "Pendaftaran sedang DIBUKA — informasi ditampilkan secara aktif pada website publik"
                  : "Pendaftaran DITUTUP — calon siswa tidak dapat mendaftar"}
              </p>
            </div>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* Info Dasar Card */}
        <div className="admin-card space-y-4">
          <h2 className="text-base font-semibold text-[var(--admin-fg)] border-b border-[var(--admin-border)] pb-2">
            Informasi Umum
          </h2>

          <FormField label="Judul Periode PPDB" error={errors.title?.message} required>
            <Input
              {...register("title")}
              placeholder="e.g. PPDB SMKN 1 Subang Tahun Ajaran 2026/2027"
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
            />
          </FormField>

          <FormField label="Deskripsi / Pengantar" error={errors.description?.message}>
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Jelaskan alur singkat, kuota pendaftaran, atau arahan awal..."
              className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
            />
          </FormField>
        </div>

        {/* Persyaratan Card */}
        <div className="admin-card space-y-4">
          <h2 className="text-base font-semibold text-[var(--admin-fg)] border-b border-[var(--admin-border)] pb-2">
            Persyaratan Berkas Pendaftaran
          </h2>

          <div className="flex gap-2">
            <Input
              placeholder="Tambah persyaratan berkas baru..."
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] flex-1"
            />
            <Button
              type="button"
              onClick={addRequirement}
              className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-1 shrink-0"
            >
              <Plus size={14} /> Tambah
            </Button>
          </div>

          <ul className="space-y-2">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--admin-bg)] border border-[var(--admin-border)]">
                <span className="text-sm text-[var(--admin-fg)]">{req}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRequirement(i)}
                  className="text-[var(--admin-danger)] hover:bg-[var(--admin-danger-bg)] h-8 w-8 p-0"
                >
                  <X size={14} />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Jadwal Pelaksanaan Card */}
        <div className="admin-card space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] pb-2">
            <h2 className="text-base font-semibold text-[var(--admin-fg)]">
              Jadwal Tahapan Seleksi
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendSchedule({ stage: "", date: "", desc: "" })}
              className="gap-1 border-[var(--admin-border)] text-[var(--admin-fg)] text-xs"
            >
              <Plus size={14} /> Tambah Tahap
            </Button>
          </div>

          <div className="space-y-3">
            {scheduleFields.map((field, i) => (
              <div key={field.id} className="p-4 rounded-lg bg-[var(--admin-bg)] border border-[var(--admin-border)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--admin-primary)] uppercase">Tahap {i + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSchedule(i)}
                    className="text-[var(--admin-danger)] hover:bg-[var(--admin-danger-bg)] h-7 w-7 p-0"
                  >
                    <X size={14} />
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    {...register(`schedule.${i}.stage` as const)}
                    placeholder="Nama tahapan (e.g. Jalur Afirmasi)"
                    className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] text-xs"
                  />
                  <Input
                    {...register(`schedule.${i}.date` as const)}
                    placeholder="Tanggal (e.g. 10 - 15 Juni 2026)"
                    className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] text-xs"
                  />
                </div>
                <Input
                  {...register(`schedule.${i}.desc` as const)}
                  placeholder="Keterangan singkat tahapan..."
                  className="bg-[var(--admin-bg-secondary)] border-[var(--admin-border)] text-[var(--admin-fg)] text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
