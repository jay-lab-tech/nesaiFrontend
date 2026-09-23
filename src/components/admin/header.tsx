"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

// Breadcrumb mapping
const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  school: "Profil Sekolah",
  facilities: "Sarana & Prasarana",
  extracurriculars: "Ekstrakurikuler",
  majors: "Program Keahlian",
  innovations: "Karya Inovasi",
  ppdb: "Informasi PPDB",
  "admission-stats": "Statistik SPMB",
  "alumni-tracking": "Tracer Study",
  alumni: "Testimoni Alumni",
  news: "Berita",
  faqs: "FAQ",
  contents: "Konten Dinamis",
};

export function AdminHeader({ onToggleMobileSidebar }: HeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Build breadcrumbs from pathname
  const segments = pathname
    .replace("/admin/", "")
    .split("/")
    .filter(Boolean);
  const currentLabel = ROUTE_LABELS[segments[0]] || segments[0] || "Dashboard";

  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("admin-theme", next ? "dark" : "light");
  };

  const handleLogout = async () => {
    setShowUserMenu(false);
    toast.loading("Mengakhiri sesi admin...", { id: "logout-action" });
    try {
      await logout();
      toast.success("Berhasil keluar dari panel CMS", { id: "logout-action" });
    } catch {
      toast.error("Gagal logout, membersihkan sesi lokal...", { id: "logout-action" });
    }
  };

  const displayName = user?.name || "Administrator CMS";
  const displayEmail = user?.email || "admin@smkn1subang.sch.id";
  const initialLetter = displayName.charAt(0).toUpperCase() || "A";

  return (
    <header className="admin-header flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--admin-bg-secondary)] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-[var(--admin-fg)]" />
        </button>

        {/* Mobile Brand Logo */}
        <Link
          href="/admin/dashboard"
          className="lg:hidden flex items-center gap-2 pr-2.5 border-r border-[var(--admin-border)] shrink-0"
        >
          <Image
            src="/images/logo-smkn-1-subang.png"
            alt="Logo SMKN 1 Subang"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-xs font-bold text-[var(--admin-fg)]">NESAS</span>
        </Link>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--admin-fg-muted)]">Admin</span>
          <span className="text-[var(--admin-fg-subtle)]">/</span>
          <span className="font-medium text-[var(--admin-fg)]">
            {currentLabel}
          </span>
          {segments.length > 1 && (
            <>
              <span className="text-[var(--admin-fg-subtle)]">/</span>
              <span className="text-[var(--admin-fg-muted)] capitalize">
                {segments[1] === "new" ? "Tambah Baru" : segments[1]}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--admin-bg-secondary)] transition-colors"
          aria-label="Toggle theme"
          title={isDark ? "Mode Terang" : "Mode Gelap"}
        >
          {isDark ? (
            <Sun size={18} className="text-[var(--admin-accent)]" />
          ) : (
            <Moon size={18} className="text-[var(--admin-fg-muted)]" />
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--admin-bg-secondary)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--admin-primary)] flex items-center justify-center text-white text-xs font-bold shadow-xs">
              {initialLetter}
            </div>
            <span className="hidden md:block text-sm font-medium text-[var(--admin-fg)] max-w-[120px] truncate">
              {displayName}
            </span>
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-xl shadow-lg z-50 overflow-hidden admin-animate-in">
                <div className="p-3 border-b border-[var(--admin-border)]">
                  <p className="text-sm font-medium text-[var(--admin-fg)] truncate">{displayName}</p>
                  <p className="text-xs text-[var(--admin-fg-muted)] truncate">{displayEmail}</p>
                </div>
                <div className="p-1">
                  <div className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-[var(--admin-fg-muted)]">
                    <div className="w-4 h-4 relative shrink-0">
                      <Image
                        src="/images/logo-smkn-1-subang.png"
                        alt="Logo SMKN 1 Subang"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                    </div>
                    <span className="truncate">Admin &bull; SMKN 1 Subang</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--admin-danger)] hover:bg-[var(--admin-danger-bg)] rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut size={16} />
                    Keluar Sesi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

