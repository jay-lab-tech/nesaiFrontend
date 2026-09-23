"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getAuthUser,
  setAuthUser,
  removeAuthUser,
  apiLogin,
  apiLogout,
  apiGetMe,
  ApiError,
  type AuthUser,
} from "@/lib/api/cms-client";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync state with storage on mount
  useEffect(() => {
    const existingToken = getAuthToken();
    const existingUser = getAuthUser();

    setTokenState(existingToken);
    setUser(existingUser);
    setIsLoading(false);

    // If token exists, optionally verify / sync user with backend
    if (existingToken) {
      apiGetMe()
        .then((res) => {
          if (res?.data) {
            setUser(res.data);
            setAuthUser(res.data);
          }
        })
        .catch(() => {
          // If 401, cmsApiFetch already removes token and redirects
        });
    }
  }, []);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        const response = await apiLogin(credentials);

        if (response.success && response.data?.token) {
          const newToken = response.data.token;
          const newUser = response.data.user;

          setAuthToken(newToken);
          setAuthUser(newUser);

          setTokenState(newToken);
          setUser(newUser);

          return { success: true, message: response.message || "Login berhasil." };
        } else {
          throw new Error(response.message || "Gagal masuk.");
        }
      } catch (err) {
        let msg = "Terjadi kesalahan saat login.";
        if (err instanceof ApiError) {
          msg = err.message;
        } else if (err instanceof Error) {
          msg = err.message;
        }
        return { success: false, message: msg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
    } finally {
      removeAuthToken();
      removeAuthUser();
      setTokenState(null);
      setUser(null);
      setIsLoading(false);
      router.push("/admin/login");
    }
  }, [router]);

  return {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    login,
    logout,
  };
}
