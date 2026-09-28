"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { getAuthToken } from "@/lib/api/cms-client";
import "./admin-globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const token = getAuthToken();
    if (!token && !isLoginPage) {
      router.replace("/admin/login");
    } else if (token && isLoginPage) {
      router.replace("/admin/dashboard");
    } else {
      setIsCheckingAuth(false);
    }
  }, [pathname, isLoginPage, router]);

  // If on login page, render clean layout without sidebar/header
  if (isLoginPage) {
    return (
      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen admin-layout`}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: "var(--admin-card-bg)",
                  border: "1px solid var(--admin-border)",
                  color: "var(--admin-fg)",
                },
              }}
            />
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    );
  }

  // If checking auth for protected admin pages, show smooth loading state
  if (isCheckingAuth) {
    return (
      <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen admin-layout flex items-center justify-center`}>
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 dark:bg-white/5 p-2 border border-black/5 dark:border-white/10 shadow-xs">
            <Image
              src="/images/logo-smkn-1-subang.png"
              alt="Logo SMKN 1 Subang"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div className="w-6 h-6 border-2 border-[var(--admin-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[var(--admin-fg-muted)] font-medium">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen admin-layout`}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          {/* Sidebar — Desktop: fixed, Mobile: off-canvas */}
          <div
            className={`
              fixed inset-y-0 left-0 z-40
              transform transition-transform duration-300 ease-in-out
              lg:translate-x-0
              ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <AdminSidebar
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </div>

          {/* Main Content */}
          <div
            className="transition-[margin] duration-300 min-h-screen flex flex-col"
            style={{
              marginLeft: `var(--content-margin, 0px)`,
            }}
          >
            <style>{`
              @media (min-width: 1024px) {
                :root {
                  --content-margin: ${
                    sidebarCollapsed
                      ? "var(--admin-sidebar-collapsed-width)"
                      : "var(--admin-sidebar-width)"
                  };
                }
              }
            `}</style>

            <AdminHeader
              onToggleMobileSidebar={() =>
                setMobileSidebarOpen(!mobileSidebarOpen)
              }
            />

            <main className="p-4 lg:p-6 max-w-[1400px] flex-1">
              {children}
            </main>
          </div>

          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "var(--admin-card-bg)",
                border: "1px solid var(--admin-border)",
                color: "var(--admin-fg)",
              },
            }}
          />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

