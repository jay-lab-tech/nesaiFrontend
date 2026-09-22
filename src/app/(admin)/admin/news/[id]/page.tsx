"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Save, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { newsFormSchema, type NewsFormValues } from "@/lib/validations/cms";
import Link from "next/link";

const MOCK_NEWS = {
  title: "Juara 1 Lomba Kompetensi Siswa Tingkat Nasional",
  slug: "juara-1-lks-nasional",
  excerpt: "Siswa RPL SMKN 1 Subang meraih juara 1 pada ajang LKS Nasional bidang Web Development.",
  body: "## Prestasi Membanggakan\n\nSiswa program keahlian **Rekayasa Perangkat Lunak** SMK Negeri 1 Subang berhasil meraih juara pertama pada ajang **Lomba Kompetensi Siswa (LKS) Tingkat Nasional** yang diselenggarakan di Jakarta pada tanggal 15-18 September 2026.\n\n### Detail Kompetisi\n\n- **Bidang**: Web Development\n- **Peserta**: Ahmad Rizki Pratama (XII RPL 2)\n- **Pembimbing**: Bapak Dedi Supriatna, S.Kom\n\nKompetisi ini diikuti oleh perwakilan terbaik dari 34 provinsi se-Indonesia.",
  published_at: "2026-09-20T10:00:00",
};

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function NewsEditorPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema) as any,
    defaultValues: isNew ? { title: "", slug: "", excerpt: "", body: "", published_at: "" } : MOCK_NEWS,
  });

  const nameValue = watch("title");
  const bodyValue = watch("body");
  const publishedAt = watch("published_at");

  const handleAutoSlug = () => {
    if (nameValue) setValue("slug", slugify(nameValue), { shouldDirty: true });
  };

  const onSubmit = async (data: NewsFormValues) => {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Saving news:", data);
      toast.success(isNew ? "Berita berhasil dibuat!" : "Berita berhasil diperbarui!");
      if (isNew) router.push("/admin/news");
    } catch { toast.error("Gagal menyimpan."); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title={isNew ? "Tulis Berita Baru" : "Edit Berita"}
        description={isNew ? "Buat artikel berita atau pengumuman" : `Mengedit: ${MOCK_NEWS.title}`}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/news">
              <Button variant="outline" className="gap-2 border-[var(--admin-border)] text-[var(--admin-fg)]">
                <ArrowLeft size={16} /> Kembali
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="gap-2 border-[var(--admin-border)] text-[var(--admin-fg)]"
            >
              <Eye size={16} /> {showPreview ? "Editor" : "Preview"}
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={saving} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2">
              <Save size={16} /> {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="admin-card space-y-5">
            <FormField label="Judul Artikel" required error={errors.title?.message}>
              <Input {...register("title")} onBlur={handleAutoSlug} placeholder="Judul berita..." className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] text-lg font-medium" />
            </FormField>
            <FormField label="Slug (URL)" required error={errors.slug?.message}>
              <Input {...register("slug")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] font-mono text-sm" />
            </FormField>
            <FormField label="Excerpt / Ringkasan" error={errors.excerpt?.message} hint="1-2 kalimat untuk preview dan meta description">
              <textarea {...register("excerpt")} rows={2} className="admin-input resize-none" placeholder="Ringkasan singkat artikel..." />
            </FormField>
          </div>

          <div className="admin-card">
            <FormField label="Isi Artikel" error={errors.body?.message} hint="Mendukung format Markdown">
              {showPreview ? (
                <div className="min-h-[300px] p-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-secondary)] prose prose-sm max-w-none text-[var(--admin-fg)]">
                  {bodyValue ? (
                    <div dangerouslySetInnerHTML={{
                      __html: bodyValue
                        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/^- (.*$)/gm, '<li>$1</li>')
                        .replace(/\n/g, '<br/>')
                    }} />
                  ) : (
                    <p className="text-[var(--admin-fg-subtle)] italic">Belum ada konten.</p>
                  )}
                </div>
              ) : (
                <textarea {...register("body")} rows={16} className="admin-input resize-none font-mono text-sm" placeholder="Tulis isi artikel di sini... (Markdown supported)" />
              )}
            </FormField>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-4">
          <div className="admin-card space-y-4">
            <h3 className="text-sm font-semibold text-[var(--admin-fg)]">Pengaturan Publikasi</h3>
            <FormField label="Tanggal Terbit" error={errors.published_at?.message} hint="Kosongkan untuk menyimpan sebagai Draft">
              <Input type="datetime-local" {...register("published_at")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
            </FormField>
            <div className="p-3 rounded-lg border border-[var(--admin-border)]">
              <p className="text-xs font-medium text-[var(--admin-fg-muted)]">Status</p>
              <p className="text-sm font-semibold mt-1">
                {publishedAt ? (
                  <span className="admin-badge admin-badge-green">Dijadwalkan Terbit</span>
                ) : (
                  <span className="admin-badge admin-badge-amber">Draft</span>
                )}
              </p>
            </div>
          </div>

          <div className="admin-card">
            <h3 className="text-sm font-semibold text-[var(--admin-fg)] mb-3">Tips Penulisan</h3>
            <div className="space-y-2 text-xs text-[var(--admin-fg-muted)]">
              <p>• Gunakan <code className="px-1 py-0.5 rounded bg-[var(--admin-bg-secondary)]">**teks**</code> untuk <strong>bold</strong></p>
              <p>• Gunakan <code className="px-1 py-0.5 rounded bg-[var(--admin-bg-secondary)]">*teks*</code> untuk <em>italic</em></p>
              <p>• Gunakan <code className="px-1 py-0.5 rounded bg-[var(--admin-bg-secondary)]">## Heading</code> untuk heading</p>
              <p>• Gunakan <code className="px-1 py-0.5 rounded bg-[var(--admin-bg-secondary)]">- item</code> untuk list</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
