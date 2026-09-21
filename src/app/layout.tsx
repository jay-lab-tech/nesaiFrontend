import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NesaiChatWidget } from "@/components/nesai/NesaiChatWidget";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMKN 1 Subang",
  description: "Website resmi SMKN 1 Subang — Informasi jurusan, PPDB, dan layanan sekolah",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar activeItem="Profil" />
        {children}
        <NesaiChatWidget />
      </body>
    </html>
  );
}
