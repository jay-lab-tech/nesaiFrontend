"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export interface NavbarProps {
  activeItem?: string;
}

export const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Jurusan", href: "/jurusan" },
  { label: "Alumni", href: "/alumni" },
  { label: "Industry", href: "/industry" },
  { label: "PPDB", href: "/ppdb" },
  { label: "NESAI", href: "/nesai" },
] as const;

export default function Navbar({ activeItem = "Profil" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFFFF] border-b border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
      <nav
        aria-label="Navigasi Utama"
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* 1. Area Kiri: Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
        >
          <div className="relative flex h-10 w-9 items-center justify-center shrink-0">
            <Image
              src="/images/logo-smkn1subang.png"
              alt="Logo SMKN 1 Subang"
              width={36}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-[15px] sm:text-base font-bold tracking-tight text-[#0F172A] leading-tight uppercase">
              SMKN 1 SUBANG
            </span>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-wider text-[#06B6D4] leading-tight uppercase">
              NESAS BERAKSI
            </span>
          </div>
        </Link>

        {/* 2. Area Tengah: Menu Navigasi Desktop */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label.toLowerCase() === activeItem.toLowerCase();

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-sans text-[13px] lg:text-[14px] transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-[#06B6D4]"
                      : "font-medium text-[#475569] hover:text-[#06B6D4]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 3. Area Kanan: Call-to-Action / CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/ppdb"
            className="inline-flex items-center justify-center rounded-md bg-[#FF5722] px-4 py-2 font-sans text-[13px] lg:text-[14px] font-medium text-[#FFFFFF] shadow-sm transition-all duration-200 hover:bg-[#E64A19] active:scale-[0.98]"
          >
            Daftar PPDB
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#06B6D4] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive = item.label.toLowerCase() === activeItem.toLowerCase();

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block py-1.5 font-sans text-sm transition-colors duration-200 ${
                      isActive
                        ? "font-semibold text-[#06B6D4]"
                        : "font-medium text-[#475569] hover:text-[#06B6D4]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-md bg-[#FF5722] py-2.5 font-sans text-sm font-medium text-[#FFFFFF] shadow-sm transition-colors duration-200 hover:bg-[#E64A19]"
            >
              Daftar PPDB
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
