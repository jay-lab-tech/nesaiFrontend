import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiPostFormData,
  type ApiResponse,
  type ApiPaginatedResponse,
} from "./cms-client";

import type {
  School,
  Major,
  MajorSubject,
  Career,
  Facility,
  Extracurricular,
  Innovation,
  AdmissionStat,
  AlumniTrackingStat,
  Alumni,
  News,
  Ppdb,
  Faq,
  Content,
  DashboardMetrics,
} from "@/types/cms";

// ── Query params type ──────────────────────────────────────

interface ListParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  [key: string]: string | number | undefined;
}

// ── 1. Dashboard ───────────────────────────────────────────

export const dashboardService = {
  getMetrics: () => apiGet<ApiResponse<DashboardMetrics>>("/dashboard/metrics"),
};

// ── 2. School (Single Instance) ────────────────────────────

export const schoolService = {
  get: () => apiGet<ApiResponse<School>>("/school"),
  update: (data: Partial<School>) => apiPut<ApiResponse<School>>("/school", data),
};

// ── 3. Majors ──────────────────────────────────────────────

export const majorService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Major>>("/majors", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Major>>(`/majors/${id}`),
  create: (data: Partial<Major>) =>
    apiPost<ApiResponse<Major>>("/majors", data),
  update: (id: number, data: Partial<Major>) =>
    apiPut<ApiResponse<Major>>(`/majors/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/majors/${id}`),
};

// ── 4. Major Subjects (nested under major) ─────────────────

export const majorSubjectService = {
  getAll: (majorId: number) =>
    apiGet<ApiResponse<MajorSubject[]>>(`/majors/${majorId}/subjects`),
  create: (majorId: number, data: Partial<MajorSubject>) =>
    apiPost<ApiResponse<MajorSubject>>(`/majors/${majorId}/subjects`, data),
  update: (majorId: number, id: number, data: Partial<MajorSubject>) =>
    apiPut<ApiResponse<MajorSubject>>(`/majors/${majorId}/subjects/${id}`, data),
  delete: (majorId: number, id: number) =>
    apiDelete(`/majors/${majorId}/subjects/${id}`),
};

// ── 5. Careers (nested under major) ────────────────────────

export const careerService = {
  getAll: (majorId: number) =>
    apiGet<ApiResponse<Career[]>>(`/majors/${majorId}/careers`),
  create: (majorId: number, data: Partial<Career>) =>
    apiPost<ApiResponse<Career>>(`/majors/${majorId}/careers`, data),
  update: (majorId: number, id: number, data: Partial<Career>) =>
    apiPut<ApiResponse<Career>>(`/majors/${majorId}/careers/${id}`, data),
  delete: (majorId: number, id: number) =>
    apiDelete(`/majors/${majorId}/careers/${id}`),
};

// ── 6. Facilities ──────────────────────────────────────────

export const facilityService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Facility>>("/facilities", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Facility>>(`/facilities/${id}`),
  create: (data: Partial<Facility>) =>
    apiPost<ApiResponse<Facility>>("/facilities", data),
  update: (id: number, data: Partial<Facility>) =>
    apiPut<ApiResponse<Facility>>(`/facilities/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/facilities/${id}`),
};

// ── 7. Extracurriculars ────────────────────────────────────

export const extracurricularService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Extracurricular>>("/extracurriculars", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Extracurricular>>(`/extracurriculars/${id}`),
  create: (data: Partial<Extracurricular>) =>
    apiPost<ApiResponse<Extracurricular>>("/extracurriculars", data),
  update: (id: number, data: Partial<Extracurricular>) =>
    apiPut<ApiResponse<Extracurricular>>(`/extracurriculars/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/extracurriculars/${id}`),
};

// ── 8. Innovations ─────────────────────────────────────────

export const innovationService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Innovation>>("/innovations", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Innovation>>(`/innovations/${id}`),
  create: (data: Partial<Innovation>) =>
    apiPost<ApiResponse<Innovation>>("/innovations", data),
  update: (id: number, data: Partial<Innovation>) =>
    apiPut<ApiResponse<Innovation>>(`/innovations/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/innovations/${id}`),
};

// ── 9. Admission Stats ─────────────────────────────────────

export const admissionStatService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<AdmissionStat>>("/admission-stats", params),
  getById: (id: number) =>
    apiGet<ApiResponse<AdmissionStat>>(`/admission-stats/${id}`),
  create: (data: Partial<AdmissionStat>) =>
    apiPost<ApiResponse<AdmissionStat>>("/admission-stats", data),
  update: (id: number, data: Partial<AdmissionStat>) =>
    apiPut<ApiResponse<AdmissionStat>>(`/admission-stats/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/admission-stats/${id}`),
};

// ── 10. Alumni Tracking Stats ──────────────────────────────

export const alumniTrackingService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<AlumniTrackingStat>>("/alumni-tracking-stats", params),
  getById: (id: number) =>
    apiGet<ApiResponse<AlumniTrackingStat>>(`/alumni-tracking-stats/${id}`),
  create: (data: Partial<AlumniTrackingStat>) =>
    apiPost<ApiResponse<AlumniTrackingStat>>("/alumni-tracking-stats", data),
  update: (id: number, data: Partial<AlumniTrackingStat>) =>
    apiPut<ApiResponse<AlumniTrackingStat>>(`/alumni-tracking-stats/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/alumni-tracking-stats/${id}`),
};

// ── 11. Alumni ─────────────────────────────────────────────

export const alumniService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Alumni>>("/alumni", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Alumni>>(`/alumni/${id}`),
  create: (data: Partial<Alumni>) =>
    apiPost<ApiResponse<Alumni>>("/alumni", data),
  update: (id: number, data: Partial<Alumni>) =>
    apiPut<ApiResponse<Alumni>>(`/alumni/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/alumni/${id}`),
};

// ── 12. News ───────────────────────────────────────────────

export const newsService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<News>>("/news", params),
  getById: (id: number) =>
    apiGet<ApiResponse<News>>(`/news/${id}`),
  create: (data: Partial<News>) =>
    apiPost<ApiResponse<News>>("/news", data),
  update: (id: number, data: Partial<News>) =>
    apiPut<ApiResponse<News>>(`/news/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/news/${id}`),
  uploadThumbnail: (id: number, formData: FormData) =>
    apiPostFormData<ApiResponse<News>>(`/news/${id}/thumbnail`, formData),
};

// ── 13. PPDB (Single Instance) ─────────────────────────────

export const ppdbService = {
  get: () => apiGet<ApiResponse<Ppdb>>("/ppdb"),
  update: (data: Partial<Ppdb>) => apiPut<ApiResponse<Ppdb>>("/ppdb", data),
};

// ── 14. FAQs ───────────────────────────────────────────────

export const faqService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Faq>>("/faqs", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Faq>>(`/faqs/${id}`),
  create: (data: Partial<Faq>) =>
    apiPost<ApiResponse<Faq>>("/faqs", data),
  update: (id: number, data: Partial<Faq>) =>
    apiPut<ApiResponse<Faq>>(`/faqs/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/faqs/${id}`),
};

// ── 15. Contents ───────────────────────────────────────────

export const contentService = {
  getAll: (params?: ListParams) =>
    apiGet<ApiPaginatedResponse<Content>>("/contents", params),
  getById: (id: number) =>
    apiGet<ApiResponse<Content>>(`/contents/${id}`),
  create: (data: Partial<Content>) =>
    apiPost<ApiResponse<Content>>("/contents", data),
  update: (id: number, data: Partial<Content>) =>
    apiPut<ApiResponse<Content>>(`/contents/${id}`, data),
  delete: (id: number) =>
    apiDelete(`/contents/${id}`),
};
