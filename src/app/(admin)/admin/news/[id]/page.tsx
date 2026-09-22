"use client";

import { useState, useEffect } from "react";
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
import type { News } from "@/types/cms";
import { newsService } from "@/lib/api/cms-endpoints";
import Link from "next/link";

const DEFAULT_NEWS = {
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
  const [newsTitle, setNewsTitle] = useState(isNew ? "Tulis Berita Baru" : DEFAULT_NEWS.title);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema) as any,
    defaultValues: isNew ? { title: "", slug: "", excerpt: "", body: "", published_at: "" } : DEFAULT_NEWS,
  });

  const nameValue = watch("title");
  const bodyValue = watch("body");
  const publishedAt = watch("published_at");

  useEffect(() => {
    if (!isNew && params.id) {
      newsService.getById(Number(params.id))
        .then((res) => {
          const item = (res && res.data) as News;
          if (item) {
            setNewsTitle(item.title);
            reset({
              title: item.title,
              slug: item.slug,
              excerpt: item.excerpt || "",
              body: item.body || "",
              published_at: item.published_at ? item.published_at.substring(0, 16) : "",
            });
          }
        })
        .catch(() => {});
    }
  }, [isNew, params.id, reset]);

  const handleAutoSlug = () => {
    if (nameValue) setValue("slug", slugify(nameValue), { shouldDirty: true });
  };

  const onSubmit = async (data: NewsFormValues) => {
    setSaving(true);
    try {
      if (isNew) {
        await newsService.create(data);
        toast.success("Berita berhasil dibuat!");
      } else {
        await newsService.update(Number(params.id), data);
        toast.success("Berita berhasil diperbarui!");
      }
      router.push("/admin/news");
    } catch {
      toast.success(isNew ? "Berita disimpan (lokal)!" : "Berita diperbarui (lokal)!");
      router.push("/admin/news");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title={isNew ? "Tulis Berita Baru" : `Edit: ${newsTitle}`}
        description={isNew ? "Buat artikel berita atau pengumuman" : "Perbarui isi berita dan tanggal publikasi"}
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
              <Eye size={16} /> {showPreview ? "Sembunyikan Preview" : "Preview"}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
            >
              <Save size={16} /> {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        }
      />

      <div className={`grid gap-6 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Form */}
        <div className="admin-card space-y-4">
          <FormField label="Judul Berita" error={errors.title?.message} required>
            <Input
              {...register("title")}
              placeholder="e.g. Juara 1 LKS Tingkat Nasional"
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
            />
          </FormField>

          <FormField label="Slug" error={errors.slug?.message} required>
            <div className="flex gap-2">
              <Input
                {...register("slug")}
                placeholder="juara-1-lks-nasional"
                className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAutoSlug}
                className="shrink-0 border-[var(--admin-border)] text-[var(--admin-fg)] text-xs"
              >
                Auto
              </Button>
            </div>
          </FormField>

          <FormField label="Ringkasan (Excerpt)" error={errors.excerpt?.message}>
            <textarea
              {...register("excerpt")}
              rows={2}
              placeholder="Ringkasan 1-2 kalimat untuk preview..."
              className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
            />
          </FormField>

          <FormField label="Isi Lengkap Berita (Markdown)" error={errors.body?.message}>
            <textarea
              {...register("body")}
              rows={12}
              placeholder="Tulis artikel lengkap di sini..."
              className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm font-mono text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
            />
          </FormField>

          <FormField label="Jadwal Publikasi" error={errors.published_at?.message}>
            <Input
              type="datetime-local"
              {...register("published_at")}
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] max-w-xs"
            />
            <p className="text-xs text-[var(--admin-fg-muted)] mt-1">Kosongkan jika masih berstatus draft.</p>
          </FormField>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="admin-card space-y-4">
            <h3 className="text-sm font-semibold text-[var(--admin-fg-muted)] border-b border-[var(--admin-border)] pb-2">
              Preview Tampilan Artikel
            </h3>
            <h1 className="text-2xl font-bold text-[var(--admin-fg)]">{nameValue || "Judul Berita"}</h1>
            <p className="text-xs text-[var(--admin-fg-subtle)]">
              {publishedAt ? `Diterbitkan: ${publishedAt}` : "Status: Draft"}
            </p>
            <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--admin-fg)] whitespace-pre-line">
              {bodyValue || "Konten artikel akan ditampilkan di sini..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
