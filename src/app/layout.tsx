import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { NesaiChatWidget } from "@/components/nesai/NesaiChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMKN 1 Subang — NESAS Pusat Keunggulan",
  description: "Website resmi SMKN 1 Subang — Informasi jurusan, PPDB, fasilitas, prestasi, dan asisten virtual cerdas NESAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <NesaiChatWidget />
      </body>
    </html>
  );
}
