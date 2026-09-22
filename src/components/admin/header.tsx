"use client";

import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

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

  return (
    <header className="admin-header flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--admin-bg-secondary)] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-[var(--admin-fg)]" />
        </button>

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
            <div className="w-8 h-8 rounded-full bg-[var(--admin-primary)] flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <span className="hidden md:block text-sm font-medium text-[var(--admin-fg)]">
              Admin
            </span>
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--admin-card-bg)] border border-[var(--admin-border)] rounded-xl shadow-lg z-50 overflow-hidden admin-animate-in">
                <div className="p-3 border-b border-[var(--admin-border)]">
                  <p className="text-sm font-medium text-[var(--admin-fg)]">Admin</p>
                  <p className="text-xs text-[var(--admin-fg-muted)]">admin@smkn1subang.sch.id</p>
                </div>
                <div className="p-1">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--admin-fg)] hover:bg-[var(--admin-bg-secondary)] rounded-lg transition-colors">
                    <User size={16} />
                    Profil Saya
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[var(--admin-danger)] hover:bg-[var(--admin-danger-bg)] rounded-lg transition-colors">
                    <LogOut size={16} />
                    Keluar
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
