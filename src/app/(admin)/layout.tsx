"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full admin-layout">
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
              className="transition-[margin] duration-300"
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

              <main className="p-4 lg:p-6 max-w-[1400px]">
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
      </body>
    </html>
  );
}
