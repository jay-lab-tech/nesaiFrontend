"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/api/cms-client";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[var(--admin-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[var(--admin-fg-muted)]">Mengarahkan ke panel admin...</p>
      </div>
    </div>
  );
}
