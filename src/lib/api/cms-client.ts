import type { ApiResponse, ApiPaginatedResponse, ApiErrorResponse } from "@/types/cms";

// ── Configuration ──────────────────────────────────────────

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";

const ADMIN_PREFIX = "/admin";

// ── Token Management ───────────────────────────────────────

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cms_auth_token");
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("cms_auth_token", token);
}

export function removeAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cms_auth_token");
}

// ── Custom Error Class ─────────────────────────────────────

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// ── Core Fetch Wrapper ─────────────────────────────────────

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  isAdmin?: boolean;
  isFormData?: boolean;
}

async function cmsApiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, isAdmin = true, isFormData = false, ...fetchOptions } = options;

  const url = `${API_BASE_URL}${isAdmin ? ADMIN_PREFIX : ""}${endpoint}`;

  const headers: HeadersInit = {
    Accept: "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Add auth token for admin requests
  if (isAdmin) {
    const token = getAuthToken();
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  // Set content-type for JSON bodies (not FormData)
  if (body && !isFormData) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    body: isFormData ? (body as BodyInit) : body ? JSON.stringify(body) : undefined,
  });

  // Handle 401 Unauthorized — redirect to login
  if (response.status === 401) {
    removeAuthToken();
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new ApiError("Sesi Anda telah berakhir. Silakan login kembali.", 401);
  }

  // Handle 422 Validation Error
  if (response.status === 422) {
    let errorData: ApiErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      throw new ApiError("Data yang diberikan tidak valid.", 422);
    }
    throw new ApiError(
      errorData?.message || "Data yang diberikan tidak valid.",
      422,
      errorData?.errors
    );
  }

  // Handle other errors
  if (!response.ok) {
    let errorMessage = "Terjadi kesalahan pada server.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Response body is not JSON
    }
    throw new ApiError(errorMessage, response.status);
  }

  // Handle 204 No Content (e.g., successful DELETE)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// ── Public API Methods ─────────────────────────────────────

/** GET request to admin endpoint */
export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }
  return cmsApiFetch<T>(url, { method: "GET" });
}

/** GET request to public endpoint */
export async function publicApiGet<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) url += `?${queryString}`;
  }
  return cmsApiFetch<T>(url, { method: "GET", isAdmin: false });
}

/** POST request to admin endpoint */
export async function apiPost<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  return cmsApiFetch<T>(endpoint, { method: "POST", body: data });
}

/** PUT request to admin endpoint */
export async function apiPut<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  return cmsApiFetch<T>(endpoint, { method: "PUT", body: data });
}

/** DELETE request to admin endpoint */
export async function apiDelete<T = void>(endpoint: string): Promise<T> {
  return cmsApiFetch<T>(endpoint, { method: "DELETE" });
}

/** POST request with FormData (file uploads) */
export async function apiPostFormData<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  return cmsApiFetch<T>(endpoint, {
    method: "POST",
    body: formData,
    isFormData: true,
  });
}

/** Auth-specific: Login (no admin prefix) */
export async function apiLogin<T>(data: unknown): Promise<T> {
  return cmsApiFetch<T>("/auth/login", {
    method: "POST",
    body: data,
    isAdmin: false,
  });
}

/** Auth-specific: Logout */
export async function apiLogout(): Promise<void> {
  await cmsApiFetch<void>("/auth/logout", { method: "POST" });
  removeAuthToken();
}

/** Auth-specific: Get current user */
export async function apiGetMe<T>(): Promise<T> {
  return cmsApiFetch<T>("/auth/me", { method: "GET" });
}

// Re-export types for convenience
export type { ApiResponse, ApiPaginatedResponse, ApiErrorResponse };
