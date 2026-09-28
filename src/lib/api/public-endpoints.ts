import { publicApiGet, type ApiResponse, type ApiPaginatedResponse } from "./cms-client";
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
} from "@/types/cms";

export interface MajorWithRelations extends Major {
  subjects?: MajorSubject[];
  careers?: Career[];
  innovations?: Innovation[];
  alumni?: Alumni[];
  admission_stats?: AdmissionStat[];
}

/**
 * Helper to safely extract list data whether backend returns a simple array
 * in `data` or a paginated object with `data.data`.
 */
export function unwrapList<T>(response: unknown): T[] {
  if (!response || typeof response !== "object") return [];
  const res = response as Record<string, unknown>;

  // Case 1: Paginated format { data: { data: [...] } }
  if (res.data && typeof res.data === "object" && Array.isArray((res.data as Record<string, unknown>).data)) {
    return (res.data as Record<string, unknown>).data as T[];
  }

  // Case 2: Direct array in { data: [...] }
  if (Array.isArray(res.data)) {
    return res.data as T[];
  }

  // Case 3: Top-level array
  if (Array.isArray(response)) {
    return response as T[];
  }

  return [];
}

/**
 * Helper to safely extract single item data from { data: item } or raw item.
 */
export function unwrapItem<T>(response: unknown): T | null {
  if (!response || typeof response !== "object") return null;
  const res = response as Record<string, unknown>;
  if (res.data && typeof res.data === "object" && !Array.isArray(res.data)) {
    return res.data as T;
  }
  return response as T;
}

export const publicService = {
  getSchool: () => publicApiGet<ApiResponse<School>>("/school"),

  getMajors: (params?: { search?: string; page?: number; per_page?: number }) =>
    publicApiGet<ApiResponse<Major[]> | ApiPaginatedResponse<Major>>("/majors", params),

  getMajorBySlug: (slug: string) =>
    publicApiGet<ApiResponse<MajorWithRelations>>(`/majors/${slug}`),

  getFacilities: (params?: { category?: string; search?: string }) =>
    publicApiGet<ApiResponse<Facility[]> | ApiPaginatedResponse<Facility>>("/facilities", params),

  getExtracurriculars: (params?: { category?: string; search?: string }) =>
    publicApiGet<ApiResponse<Extracurricular[]> | ApiPaginatedResponse<Extracurricular>>("/extracurriculars", params),

  getInnovations: (params?: { major_id?: number; search?: string }) =>
    publicApiGet<ApiResponse<Innovation[]> | ApiPaginatedResponse<Innovation>>("/innovations", params),

  getAdmissionStats: (params?: { major_id?: number; year?: number }) =>
    publicApiGet<ApiResponse<AdmissionStat[]>>("/admission-stats", params),

  getAlumniTrackingStats: (params?: { year?: number }) =>
    publicApiGet<ApiResponse<AlumniTrackingStat[]>>("/alumni-tracking-stats", params),

  getAlumni: (params?: { major_id?: number; search?: string }) =>
    publicApiGet<ApiResponse<Alumni[]> | ApiPaginatedResponse<Alumni>>("/alumni", params),

  getNews: (params?: { page?: number; per_page?: number; search?: string }) =>
    publicApiGet<ApiResponse<News[]> | ApiPaginatedResponse<News>>("/news", params),

  getNewsBySlug: (slug: string) =>
    publicApiGet<ApiResponse<News>>(`/news/${slug}`),

  getPpdb: () => publicApiGet<ApiResponse<Ppdb>>("/ppdb"),

  getFaqs: (params?: { search?: string }) =>
    publicApiGet<ApiResponse<Faq[]>>("/faqs", params),

  getContents: (params?: { type?: string; module?: string }) =>
    publicApiGet<ApiResponse<Content[]>>("/contents", params),

  getContentBySlug: (slug: string) =>
    publicApiGet<ApiResponse<Content>>(`/contents/${slug}`),
};
