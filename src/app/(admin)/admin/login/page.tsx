"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Sun,
  Moon,
  KeyRound,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Sync theme
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("admin-theme", next ? "dark" : "light");
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  // Quick fill demo credentials
  const fillDemoCredentials = () => {
    setEmail("admin@smkn1subang.sch.id");
    setPassword("admin12345");
    setErrorMessage(null);
    toast.info("Kredensial demo diisikan", {
      description: "admin@smkn1subang.sch.id / admin12345",
      duration: 3000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!email.trim()) {
      setErrorMessage("Silakan masukkan alamat email.");
      return;
    }
    if (!password) {
      setErrorMessage("Silakan masukkan kata sandi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await login({ email: email.trim(), password });

      if (res.success) {
        toast.success("Login Berhasil", {
          description: "Selamat datang kembali di Panel Admin NESAS.",
        });
        router.push("/admin/dashboard");
      } else {
        setErrorMessage(res.message);
        toast.error("Gagal Masuk", {
          description: res.message,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi gangguan koneksi ke server.";
      setErrorMessage(msg);
      toast.error("Kesalahan Sistem", { description: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[var(--admin-bg)] transition-colors duration-300">
      {/* Decorative ambient background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[var(--admin-primary-light)]/40 to-transparent dark:from-[var(--admin-primary-light)]/15 pointer-events-none blur-3xl -z-10" />
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[var(--admin-accent)]/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[var(--admin-primary)]/10 blur-3xl pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[var(--admin-fg-muted)] hover:text-[var(--admin-fg)] transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--admin-bg-secondary)]"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Website Utama</span>
        </Link>

        {/* Theme switcher */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle theme"
          className="p-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-card-bg)] text-[var(--admin-fg)] hover:bg-[var(--admin-bg-secondary)] transition-colors shadow-xs"
        >
          {isDark ? (
            <Sun size={18} className="text-[var(--admin-accent)]" />
          ) : (
            <Moon size={18} className="text-[var(--admin-fg-muted)]" />
          )}
        </button>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <div className="w-full max-w-md admin-animate-in">
          {/* Card */}
          <div className="admin-card relative shadow-xl border border-[var(--admin-card-border)] backdrop-blur-md bg-[var(--admin-card-bg)]/95">
            {/* Header / Brand */}
            <div className="text-center pb-6 border-b border-[var(--admin-border)]">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[var(--admin-bg-secondary)] border border-[var(--admin-border)] mb-3 shadow-xs">
                <Image
                  src="/images/logo-smkn-1-subang.png"
                  alt="Logo SMKN 1 Subang"
                  width={52}
                  height={52}
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[var(--admin-primary-light)] text-[var(--admin-primary)] dark:text-[var(--admin-primary)]">
                  <ShieldCheck size={13} />
                  Official CMS
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[var(--admin-fg)]">
                SMKN 1 SUBANG
              </h1>
              <p className="text-xs text-[var(--admin-fg-muted)] mt-1">
                Panel Manajemen Konten &amp; Layanan Terpadu NESAS
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mt-5 p-3.5 rounded-xl border border-[var(--admin-danger)]/30 bg-[var(--admin-danger-bg)] text-[var(--admin-danger)] flex items-start gap-2.5 text-xs font-medium admin-animate-in">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="admin-email"
                  className="block text-xs font-semibold text-[var(--admin-fg)]"
                >
                  Alamat Email Admin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--admin-fg-subtle)]">
                    <Mail size={16} />
                  </div>
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@smkn1subang.sch.id"
                    disabled={isSubmitting}
                    className="admin-input pl-10 h-11 text-sm rounded-xl focus:border-[var(--admin-primary)]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-semibold text-[var(--admin-fg)]"
                  >
                    Kata Sandi
                  </label>
                  <span className="text-[11px] text-[var(--admin-fg-muted)]">
                    Laravel Sanctum Auth
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--admin-fg-subtle)]">
                    <Lock size={16} />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={isSubmitting}
                    className="admin-input pl-10 pr-11 h-11 text-sm rounded-xl focus:border-[var(--admin-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--admin-fg-subtle)] hover:text-[var(--admin-fg)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Options: Remember me & Demo helper */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[var(--admin-border)] text-[var(--admin-primary)] focus:ring-[var(--admin-primary)] focus:ring-offset-0 cursor-pointer accent-[#1e3a5f]"
                  />
                  <span className="text-xs text-[var(--admin-fg-muted)] font-medium">
                    Ingat sesi saya
                  </span>
                </label>

                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--admin-accent)] hover:text-[var(--admin-accent-hover)] transition-colors hover:underline"
                >
                  <KeyRound size={12} />
                  Demo Akun
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full h-11 rounded-xl font-semibold text-sm
                    bg-[var(--admin-primary)] hover:bg-[var(--admin-primary-hover)]
                    text-[var(--admin-primary-fg)] shadow-md hover:shadow-lg
                    transition-all duration-200 flex items-center justify-center gap-2
                    disabled:opacity-60 disabled:cursor-not-allowed
                  `}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Memverifikasi Akun...</span>
                    </>
                  ) : (
                    <span>Masuk ke Panel Admin</span>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom info helper */}
            <div className="mt-6 pt-4 border-t border-[var(--admin-border)] text-center">
              <p className="text-[11px] text-[var(--admin-fg-subtle)]">
                Akses terbatas hanya untuk staf &amp; administrator terdaftar SMKN 1 Subang.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 px-6 z-10">
        <p className="text-xs text-[var(--admin-fg-subtle)]">
          &copy; {new Date().getFullYear()} SMK Negeri 1 Subang. Hak Cipta Dilindungi.
        </p>
      </footer>
    </div>
  );
}
