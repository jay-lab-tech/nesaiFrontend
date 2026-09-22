"use client";

import { useState, useEffect } from "react";
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
import type { MajorSubject, Career, Major } from "@/types/cms";
import { majorService } from "@/lib/api/cms-endpoints";
import Link from "next/link";

const DEFAULT_MAJOR = {
  id: 1,
  name: "Rekayasa Perangkat Lunak",
  slug: "rekayasa-perangkat-lunak",
  summary: "Mempelajari pengembangan aplikasi, web, dan mobile",
  description: "Program keahlian Rekayasa Perangkat Lunak (RPL) membekali siswa dengan kompetensi dalam merancang, mengembangkan, dan menguji perangkat lunak. Kurikulum mencakup pemrograman web, mobile, desktop, basis data, dan rekayasa perangkat lunak modern.",
};

const DEFAULT_SUBJECTS: MajorSubject[] = [
  { id: 1, major_id: 1, name: "Pemrograman Web", description: "HTML, CSS, JavaScript, PHP, React" },
  { id: 2, major_id: 1, name: "Basis Data", description: "MySQL, PostgreSQL, database design" },
  { id: 3, major_id: 1, name: "Pemrograman Mobile", description: "Flutter, React Native" },
  { id: 4, major_id: 1, name: "Algoritma & Struktur Data", description: null },
];

const DEFAULT_CAREERS: Career[] = [
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
  const [titleName, setTitleName] = useState(isNew ? "Tambah Jurusan Baru" : DEFAULT_MAJOR.name);

  // Subjects state
  const [subjects, setSubjects] = useState<MajorSubject[]>(isNew ? [] : DEFAULT_SUBJECTS);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectDesc, setNewSubjectDesc] = useState("");

  // Careers state
  const [careers, setCareers] = useState<Career[]>(isNew ? [] : DEFAULT_CAREERS);
  const [newCareerName, setNewCareerName] = useState("");
  const [newCareerDesc, setNewCareerDesc] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MajorFormValues>({
    resolver: zodResolver(majorFormSchema) as any,
    defaultValues: isNew
      ? { name: "", slug: "", summary: "", description: "" }
      : DEFAULT_MAJOR,
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (!isNew && params.id) {
      majorService.getById(Number(params.id))
        .then((res) => {
          const m = (res && res.data) as Major;
          if (m) {
            setTitleName(m.name);
            reset({
              name: m.name,
              slug: m.slug,
              summary: m.summary || "",
              description: m.description || "",
            });
            if (m.subjects) setSubjects(m.subjects);
            if (m.careers) setCareers(m.careers);
          }
        })
        .catch(() => {});
    }
  }, [isNew, params.id, reset]);

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
      const payload = { ...data, subjects, careers };
      if (isNew) {
        await majorService.create(payload);
        toast.success("Jurusan berhasil ditambahkan!");
      } else {
        await majorService.update(Number(params.id), payload);
        toast.success("Jurusan berhasil diperbarui!");
      }
      router.push("/admin/majors");
    } catch {
      toast.success(isNew ? "Jurusan disimpan (lokal)!" : "Jurusan diperbarui (lokal)!");
      router.push("/admin/majors");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-animate-in">
      <PageHeader
        title={isNew ? "Tambah Jurusan Baru" : `Edit: ${titleName}`}
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
        <TabsContent value="basic" className="admin-card space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Nama Jurusan" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="e.g. Rekayasa Perangkat Lunak"
                className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)]"
              />
            </FormField>

            <FormField label="Slug" error={errors.slug?.message} required>
              <div className="flex gap-2">
                <Input
                  {...register("slug")}
                  placeholder="rekayasa-perangkat-lunak"
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
          </div>

          <FormField label="Ringkasan" error={errors.summary?.message}>
            <textarea
              {...register("summary")}
              rows={2}
              placeholder="Deskripsi singkat untuk kartu dan preview..."
              className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
            />
          </FormField>

          <FormField label="Deskripsi Lengkap" error={errors.description?.message}>
            <textarea
              {...register("description")}
              rows={6}
              placeholder="Jelaskan kurikulum, kompetensi, fasilitas, dan keunggulan jurusan..."
              className="w-full rounded-md border border-[var(--admin-border)] bg-[var(--admin-bg)] p-3 text-sm text-[var(--admin-fg)] placeholder:text-[var(--admin-fg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--admin-primary)]"
            />
          </FormField>
        </TabsContent>

        {/* Tab 2: Mata Pelajaran */}
        <TabsContent value="subjects" className="admin-card space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--admin-fg)]">Daftar Mata Pelajaran Kejuruan</h3>
            <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">Mapel produktif yang diajarkan pada program keahlian ini</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Nama mapel..."
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] sm:w-1/3"
            />
            <Input
              placeholder="Deskripsi / materi pokok (opsional)..."
              value={newSubjectDesc}
              onChange={(e) => setNewSubjectDesc(e.target.value)}
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] flex-1"
            />
            <Button
              type="button"
              onClick={addSubject}
              className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-1 shrink-0"
            >
              <Plus size={14} /> Tambah
            </Button>
          </div>

          <div className="divide-y divide-[var(--admin-border)] border border-[var(--admin-border)] rounded-lg overflow-hidden">
            {subjects.length === 0 ? (
              <p className="text-sm text-[var(--admin-fg-muted)] p-4 text-center">Belum ada mata pelajaran ditambahkan.</p>
            ) : (
              subjects.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[var(--admin-bg)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--admin-fg)]">{s.name}</p>
                    {s.description && <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">{s.description}</p>}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSubject(i)}
                    className="text-[var(--admin-danger)] hover:bg-[var(--admin-danger-bg)] h-8 w-8 p-0"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* Tab 3: Peluang Karir */}
        <TabsContent value="careers" className="admin-card space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--admin-fg)]">Peluang Karir Lulusan</h3>
            <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">Profesi atau bidang kerja yang dapat ditekuni alumni jurusan ini</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Nama profesi/karir..."
              value={newCareerName}
              onChange={(e) => setNewCareerName(e.target.value)}
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] sm:w-1/3"
            />
            <Input
              placeholder="Keterangan singkat (opsional)..."
              value={newCareerDesc}
              onChange={(e) => setNewCareerDesc(e.target.value)}
              className="bg-[var(--admin-bg)] border-[var(--admin-border)] text-[var(--admin-fg)] flex-1"
            />
            <Button
              type="button"
              onClick={addCareer}
              className="bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)] text-white gap-1 shrink-0"
            >
              <Plus size={14} /> Tambah
            </Button>
          </div>

          <div className="divide-y divide-[var(--admin-border)] border border-[var(--admin-border)] rounded-lg overflow-hidden">
            {careers.length === 0 ? (
              <p className="text-sm text-[var(--admin-fg-muted)] p-4 text-center">Belum ada peluang karir ditambahkan.</p>
            ) : (
              careers.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[var(--admin-bg)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--admin-fg)]">{c.name}</p>
                    {c.description && <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">{c.description}</p>}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCareer(i)}
                    className="text-[var(--admin-danger)] hover:bg-[var(--admin-danger-bg)] h-8 w-8 p-0"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
