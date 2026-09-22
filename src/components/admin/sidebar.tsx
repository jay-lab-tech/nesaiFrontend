"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  School,
  Building2,
  Trophy,
  GraduationCap,
  Lightbulb,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Users,
  Newspaper,
  HelpCircle,
  FileText,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Menu Utama",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard size={20} />,
      },
    ],
  },
  {
    title: "Profil Lembaga",
    items: [
      {
        label: "Profil Sekolah",
        href: "/admin/school",
        icon: <School size={20} />,
      },
      {
        label: "Sarana & Prasarana",
        href: "/admin/facilities",
        icon: <Building2 size={20} />,
      },
      {
        label: "Ekstrakurikuler",
        href: "/admin/extracurriculars",
        icon: <Trophy size={20} />,
      },
    ],
  },
  {
    title: "Akademik & Inovasi",
    items: [
      {
        label: "Program Keahlian",
        href: "/admin/majors",
        icon: <GraduationCap size={20} />,
      },
      {
        label: "Karya Inovasi",
        href: "/admin/innovations",
        icon: <Lightbulb size={20} />,
      },
    ],
  },
  {
    title: "Kesiswaan & Alumni",
    items: [
      {
        label: "Informasi PPDB",
        href: "/admin/ppdb",
        icon: <ClipboardList size={20} />,
      },
      {
        label: "Statistik SPMB",
        href: "/admin/admission-stats",
        icon: <BarChart3 size={20} />,
      },
      {
        label: "Tracer Study",
        href: "/admin/alumni-tracking",
        icon: <TrendingUp size={20} />,
      },
      {
        label: "Testimoni Alumni",
        href: "/admin/alumni",
        icon: <Users size={20} />,
      },
    ],
  },
  {
    title: "Publikasi & Info",
    items: [
      {
        label: "Berita",
        href: "/admin/news",
        icon: <Newspaper size={20} />,
      },
      {
        label: "FAQ",
        href: "/admin/faqs",
        icon: <HelpCircle size={20} />,
      },
      {
        label: "Konten Dinamis",
        href: "/admin/contents",
        icon: <FileText size={20} />,
      },
    ],
  },
];

export function AdminSidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`admin-sidebar fixed left-0 top-0 h-screen flex flex-col z-40 ${
        collapsed ? "collapsed" : ""
      }`}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-[var(--admin-sidebar-border)] shrink-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--admin-accent)] text-[var(--admin-accent-fg)]">
          <Sparkles size={20} />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white tracking-wide truncate">
              NESAS CMS
            </span>
            <span className="text-[10px] text-[var(--admin-fg-subtle)] tracking-wider uppercase">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <div className="admin-sidebar-group-label">{group.title}</div>
            )}
            {collapsed && <div className="my-3 mx-3 h-px bg-[var(--admin-sidebar-border)]" />}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`admin-sidebar-item ${isActive ? "active" : ""} ${
                      collapsed ? "justify-center px-0" : ""
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-[var(--admin-sidebar-border)] p-3 shrink-0">
        <button
          onClick={onToggleCollapse}
          className="admin-sidebar-item w-full justify-center"
          title={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        >
          <ChevronLeft
            size={20}
            className={`transition-transform duration-200 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
          {!collapsed && <span className="truncate">Ciutkan</span>}
        </button>
      </div>
    </aside>
  );
}
