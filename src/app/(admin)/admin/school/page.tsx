"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, Globe, BarChart3, Info, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { schoolFormSchema, type SchoolFormValues } from "@/lib/validations/cms";

const EMPTY_SCHOOL: SchoolFormValues = {
  name: "",
  npsn: "",
  address: "",
  phone: "",
  email: "",
  accreditation: "",
  founded_year: null as unknown as number,
  area_size: "",
  principal_name: "",
  staff_count: null as unknown as number,
  student_count: null as unknown as number,
  classroom_count: null as unknown as number,
  description: "",
  vision: "",
  mission: "",
  social_links: { facebook: "", instagram: "", youtube: "", tiktok: "", website: "" },
};

export default function SchoolProfilePage() {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema) as any,
    defaultValues: EMPTY_SCHOOL,
  });

  useEffect(() => {
    (async () => {
      try {
        const { schoolService } = await import("@/lib/api/cms-endpoints");
        const response = await schoolService.get();
        const raw = response.data as unknown as Record<string, unknown>;
        const mapped: Record<string, unknown> = { ...(raw as Record<string, unknown>) };
        if (typeof raw.social_links === "string") {
          try {
            mapped.social_links = JSON.parse(raw.social_links as string);
          } catch {
            mapped.social_links = { facebook: "", instagram: "", youtube: "", tiktok: "", website: "" };
          }
        } else if (raw.social_links == null) {
          mapped.social_links = { facebook: "", instagram: "", youtube: "", tiktok: "", website: "" };
        }
        if (Array.isArray(mapped.vision)) mapped.vision = (mapped.vision as string[]).join("\n");
        if (Array.isArray(mapped.mission)) mapped.mission = (mapped.mission as string[]).join("\n");
        reset(mapped as unknown as SchoolFormValues);
      } catch {
        toast.error("Gagal memuat profil sekolah.");
      } finally {
        setLoading(false);
      }
    })();
  }, [reset]);

  const onSubmit = async (data: SchoolFormValues) => {
    setSaving(true);
    try {
      const { schoolService } = await import("@/lib/api/cms-endpoints");
      await schoolService.update(data as unknown as Record<string, unknown>);
      toast.success("Profil sekolah berhasil disimpan!");
      reset(data);
    } catch {
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title="Profil Sekolah"
        description="Kelola informasi umum, statistik, dan profil SMK Negeri 1 Subang"
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

      {loading ? <div className="admin-card text-sm text-[var(--admin-muted)]">Memuat…</div> : (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)]">
            <TabsTrigger value="info" className="gap-2 data-[state=active]:bg-[var(--admin-card-bg)]">
              <Info size={14} /> Info Umum
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2 data-[state=active]:bg-[var(--admin-card-bg)]">
              <BarChart3 size={14} /> Statistik
            </TabsTrigger>
            <TabsTrigger value="vision" className="gap-2 data-[state=active]:bg-[var(--admin-card-bg)]">
              <Eye size={14} /> Visi & Misi
            </TabsTrigger>
            <TabsTrigger value="social" className="gap-2 data-[state=active]:bg-[var(--admin-card-bg)]">
              <Globe size={14} /> Media Sosial
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Info Umum */}
          <TabsContent value="info">
            <div className="admin-card space-y-5">
              <h3 className="text-base font-semibold text-[var(--admin-fg)]">
                Informasi Umum Sekolah
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Nama Sekolah" htmlFor="name" required error={errors.name?.message}>
                  <Input id="name" {...register("name")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="NPSN" htmlFor="npsn" error={errors.npsn?.message} hint="8 digit Nomor Pokok Sekolah Nasional">
                  <Input id="npsn" {...register("npsn")} maxLength={8} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Akreditasi" htmlFor="accreditation" error={errors.accreditation?.message}>
                  <Input id="accreditation" {...register("accreditation")} placeholder="e.g. A (Unggul)" className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Tahun Berdiri" htmlFor="founded_year" error={errors.founded_year?.message}>
                  <Input id="founded_year" type="number" {...register("founded_year")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Luas Area" htmlFor="area_size" error={errors.area_size?.message} hint="e.g. 31.780 m² atau 3.2 Hektar">
                  <Input id="area_size" {...register("area_size")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Kepala Sekolah" htmlFor="principal_name" error={errors.principal_name?.message}>
                  <Input id="principal_name" {...register("principal_name")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
              </div>
              <FormField label="Alamat" htmlFor="address" error={errors.address?.message}>
                <textarea id="address" {...register("address")} rows={3} className="admin-input resize-none" />
              </FormField>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Telepon" htmlFor="phone" error={errors.phone?.message}>
                  <Input id="phone" type="tel" {...register("phone")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Email" htmlFor="email" error={errors.email?.message}>
                  <Input id="email" type="email" {...register("email")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
              </div>
              <FormField label="Deskripsi Profil" htmlFor="description" error={errors.description?.message}>
                <textarea id="description" {...register("description")} rows={4} className="admin-input resize-none" placeholder="Deskripsi selayang pandang profil sekolah..." />
              </FormField>
            </div>
          </TabsContent>

          {/* Tab 2: Statistik */}
          <TabsContent value="stats">
            <div className="admin-card space-y-5">
              <h3 className="text-base font-semibold text-[var(--admin-fg)]">
                Data Statistik Sekolah
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <FormField label="Jumlah Guru & Staf" htmlFor="staff_count" error={errors.staff_count?.message}>
                  <Input id="staff_count" type="number" min={0} {...register("staff_count")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Jumlah Siswa Aktif" htmlFor="student_count" error={errors.student_count?.message}>
                  <Input id="student_count" type="number" min={0} {...register("student_count")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Jumlah Rombel" htmlFor="classroom_count" error={errors.classroom_count?.message}>
                  <Input id="classroom_count" type="number" min={0} {...register("classroom_count")} className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
              </div>
              <div className="p-4 rounded-xl bg-[var(--admin-info-bg)] border border-[var(--admin-info)]/20">
                <p className="text-sm text-[var(--admin-info)] font-medium">
                  💡 Data statistik ini akan ditampilkan di halaman profil website publik dan digunakan oleh NESAI untuk menjawab pertanyaan pengunjung.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Visi & Misi */}
          <TabsContent value="vision">
            <div className="admin-card space-y-5">
              <h3 className="text-base font-semibold text-[var(--admin-fg)]">
                Visi & Misi Sekolah
              </h3>
              <FormField label="Visi" htmlFor="vision" error={errors.vision?.message}>
                <textarea id="vision" {...register("vision")} rows={3} className="admin-input resize-none" placeholder="Visi sekolah..." />
              </FormField>
              <FormField label="Misi" htmlFor="mission" error={errors.mission?.message} hint="Tulis setiap poin misi di baris baru">
                <textarea id="mission" {...register("mission")} rows={6} className="admin-input resize-none" placeholder="1. Misi pertama&#10;2. Misi kedua&#10;3. Misi ketiga" />
              </FormField>
            </div>
          </TabsContent>

          {/* Tab 4: Media Sosial */}
          <TabsContent value="social">
            <div className="admin-card space-y-5">
              <h3 className="text-base font-semibold text-[var(--admin-fg)]">
                Tautan Media Sosial
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Facebook" htmlFor="social_facebook" error={errors.social_links?.facebook?.message}>
                  <Input id="social_facebook" {...register("social_links.facebook")} placeholder="https://facebook.com/..." className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Instagram" htmlFor="social_instagram" error={errors.social_links?.instagram?.message}>
                  <Input id="social_instagram" {...register("social_links.instagram")} placeholder="https://instagram.com/..." className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="YouTube" htmlFor="social_youtube" error={errors.social_links?.youtube?.message}>
                  <Input id="social_youtube" {...register("social_links.youtube")} placeholder="https://youtube.com/@..." className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="TikTok" htmlFor="social_tiktok" error={errors.social_links?.tiktok?.message}>
                  <Input id="social_tiktok" {...register("social_links.tiktok")} placeholder="https://tiktok.com/@..." className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
                <FormField label="Website" htmlFor="social_website" error={errors.social_links?.website?.message} className="md:col-span-2">
                  <Input id="social_website" {...register("social_links.website")} placeholder="https://smkn1subang.sch.id" className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]" />
                </FormField>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>)}

    </div>
  );
}
