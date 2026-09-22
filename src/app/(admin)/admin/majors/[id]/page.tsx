"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/admin/page-header";
import { FormField } from "@/components/admin/form-field";
import { majorFormSchema, type MajorFormValues } from "@/lib/validations/cms";
import type { MajorSubject, Career } from "@/types/cms";
import Link from "next/link";

// Mock data for editing
const MOCK_MAJOR = {
  id: 1,
  name: "Rekayasa Perangkat Lunak",
  slug: "rekayasa-perangkat-lunak",
  summary: "Mempelajari pengembangan aplikasi, web, dan mobile",
  description: "Program keahlian Rekayasa Perangkat Lunak (RPL) membekali siswa dengan kompetensi dalam merancang, mengembangkan, dan menguji perangkat lunak. Kurikulum mencakup pemrograman web, mobile, desktop, basis data, dan rekayasa perangkat lunak modern.",
};

const MOCK_SUBJECTS: MajorSubject[] = [
  { id: 1, major_id: 1, name: "Pemrograman Web", description: "HTML, CSS, JavaScript, PHP, React" },
  { id: 2, major_id: 1, name: "Basis Data", description: "MySQL, PostgreSQL, database design" },
  { id: 3, major_id: 1, name: "Pemrograman Mobile", description: "Flutter, React Native" },
  { id: 4, major_id: 1, name: "Algoritma & Struktur Data", description: null },
];

const MOCK_CAREERS: Career[] = [
  { id: 1, major_id: 1, name: "Web Developer", description: "Membangun aplikasi web" },
  { id: 2, major_id: 1, name: "Mobile Developer", description: "Membuat aplikasi mobile" },
  { id: 3, major_id: 1, name: "Software Engineer", description: null },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function MajorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const [saving, setSaving] = useState(false);

  // Subjects state
  const [subjects, setSubjects] = useState<MajorSubject[]>(isNew ? [] : MOCK_SUBJECTS);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectDesc, setNewSubjectDesc] = useState("");

  // Careers state
  const [careers, setCareers] = useState<Career[]>(isNew ? [] : MOCK_CAREERS);
  const [newCareerName, setNewCareerName] = useState("");
  const [newCareerDesc, setNewCareerDesc] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<MajorFormValues>({
    resolver: zodResolver(majorFormSchema) as any,
    defaultValues: isNew
      ? { name: "", slug: "", summary: "", description: "" }
      : MOCK_MAJOR,
  });

  const nameValue = watch("name");

  const handleAutoSlug = () => {
    if (nameValue) {
      setValue("slug", slugify(nameValue), { shouldDirty: true });
    }
  };

  const addSubject = () => {
    if (!newSubjectName.trim()) return;
    setSubjects((prev) => [
      ...prev,
      { major_id: Number(params.id) || 0, name: newSubjectName.trim(), description: newSubjectDesc.trim() || null },
    ]);
    setNewSubjectName("");
    setNewSubjectDesc("");
  };

  const removeSubject = (index: number) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const addCareer = () => {
    if (!newCareerName.trim()) return;
    setCareers((prev) => [
      ...prev,
      { major_id: Number(params.id) || 0, name: newCareerName.trim(), description: newCareerDesc.trim() || null },
    ]);
    setNewCareerName("");
    setNewCareerDesc("");
  };

  const removeCareer = (index: number) => {
    setCareers((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: MajorFormValues) => {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log("Saving major:", { ...data, subjects, careers });
      toast.success(isNew ? "Jurusan berhasil ditambahkan!" : "Jurusan berhasil diperbarui!");
      if (isNew) router.push("/admin/majors");
    } catch {
      toast.error("Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title={isNew ? "Tambah Jurusan Baru" : `Edit: ${MOCK_MAJOR.name}`}
        description={isNew ? "Buat program keahlian baru" : "Edit detail jurusan, mata pelajaran, dan peluang karir"}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/majors">
              <Button variant="outline" className="gap-2 border-[var(--admin-border)] text-[var(--admin-fg)]">
                <ArrowLeft size={16} /> Kembali
              </Button>
            </Link>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={saving}
              className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-2"
            >
              <Save size={16} />
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)]">
          <TabsTrigger value="basic" className="data-[state=active]:bg-[var(--admin-card-bg)]">Info Dasar</TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-[var(--admin-card-bg)]">
            Mata Pelajaran ({subjects.length})
          </TabsTrigger>
          <TabsTrigger value="careers" className="data-[state=active]:bg-[var(--admin-card-bg)]">
            Peluang Karir ({careers.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Info Dasar */}
        <TabsContent value="basic">
          <div className="admin-card space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField label="Nama Jurusan" required error={errors.name?.message}>
                <Input
                  {...register("name")}
                  onBlur={handleAutoSlug}
                  placeholder="e.g. Rekayasa Perangkat Lunak"
                  className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)]"
                />
              </FormField>
              <FormField label="Slug (URL)" required error={errors.slug?.message} hint="Otomatis dari nama, huruf kecil dan strip">
                <Input
                  {...register("slug")}
                  placeholder="rekayasa-perangkat-lunak"
                  className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] font-mono text-sm"
                />
              </FormField>
            </div>
            <FormField label="Ringkasan" error={errors.summary?.message} hint="1-2 kalimat deskripsi singkat">
              <textarea {...register("summary")} rows={2} className="admin-input resize-none" placeholder="Ringkasan singkat profil jurusan..." />
            </FormField>
            <FormField label="Deskripsi Lengkap" error={errors.description?.message} hint="Kurikulum, keunggulan, dan fasilitas">
              <textarea {...register("description")} rows={6} className="admin-input resize-none" placeholder="Penjelasan mendalam tentang jurusan ini..." />
            </FormField>
          </div>
        </TabsContent>

        {/* Tab 2: Mata Pelajaran */}
        <TabsContent value="subjects">
          <div className="admin-card space-y-4">
            <h3 className="text-base font-semibold text-[var(--admin-fg)]">Mata Pelajaran Kejuruan</h3>

            {/* Add new */}
            <div className="flex flex-col sm:flex-row gap-2 p-4 rounded-lg bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)]">
              <Input
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="Nama mata pelajaran"
                className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] flex-1"
              />
              <Input
                value={newSubjectDesc}
                onChange={(e) => setNewSubjectDesc(e.target.value)}
                placeholder="Deskripsi (opsional)"
                className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] flex-1"
              />
              <Button onClick={addSubject} disabled={!newSubjectName.trim()} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-1 shrink-0">
                <Plus size={16} /> Tambah
              </Button>
            </div>

            {/* List */}
            <div className="space-y-2">
              {subjects.length === 0 ? (
                <p className="text-sm text-[var(--admin-fg-muted)] text-center py-8">Belum ada mata pelajaran.</p>
              ) : (
                subjects.map((subj, idx) => (
                  <div key={subj.id || idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-bg)]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--admin-fg)]">{subj.name}</p>
                      {subj.description && (
                        <p className="text-xs text-[var(--admin-fg-muted)] truncate">{subj.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeSubject(idx)}
                      className="p-1 rounded hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-subtle)] hover:text-[var(--admin-danger)] transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Peluang Karir */}
        <TabsContent value="careers">
          <div className="admin-card space-y-4">
            <h3 className="text-base font-semibold text-[var(--admin-fg)]">Peluang Karir Lulusan</h3>

            {/* Add new */}
            <div className="flex flex-col sm:flex-row gap-2 p-4 rounded-lg bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)]">
              <Input
                value={newCareerName}
                onChange={(e) => setNewCareerName(e.target.value)}
                placeholder="Nama profesi/karir"
                className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] flex-1"
              />
              <Input
                value={newCareerDesc}
                onChange={(e) => setNewCareerDesc(e.target.value)}
                placeholder="Deskripsi (opsional)"
                className="bg-[var(--admin-input-bg)] border-[var(--admin-input-border)] text-[var(--admin-fg)] flex-1"
              />
              <Button onClick={addCareer} disabled={!newCareerName.trim()} className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-1 shrink-0">
                <Plus size={16} /> Tambah
              </Button>
            </div>

            {/* List */}
            <div className="space-y-2">
              {careers.length === 0 ? (
                <p className="text-sm text-[var(--admin-fg-muted)] text-center py-8">Belum ada data peluang karir.</p>
              ) : (
                careers.map((career, idx) => (
                  <div key={career.id || idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-bg)]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--admin-fg)]">{career.name}</p>
                      {career.description && (
                        <p className="text-xs text-[var(--admin-fg-muted)] truncate">{career.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeCareer(idx)}
                      className="p-1 rounded hover:bg-[var(--admin-danger-bg)] text-[var(--admin-fg-subtle)] hover:text-[var(--admin-danger)] transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
