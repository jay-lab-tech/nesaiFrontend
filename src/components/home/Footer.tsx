import Link from 'next/link';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontak" className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: School Brand & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <GraduationCap className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-lg font-bold text-white tracking-tight leading-tight">
                  SMKN 1 SUBANG
                </p>
                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  NESAS • Pusat Keunggulan
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Sekolah Menengah Kejuruan Pusat Keunggulan yang berkomitmen melahirkan lulusan
              yang cerdas, kompeten, berdaya saing global, dan berakhlak mulia.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Jl. Arief Rahman Hakim No. 35, Dangdeur, Kec. Subang, Kabupaten Subang, Jawa Barat 41214</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>(0260) 411410</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>info@smkn1subang.sch.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>www.smkn1subang.sch.id</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <p className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Tautan Cepat
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-cyan-400 transition-colors">
                  Profil & Visi Misi
                </Link>
              </li>
              <li>
                <Link href="/jurusan" className="hover:text-cyan-400 transition-colors">
                  Program Keahlian
                </Link>
              </li>
              <li>
                <Link href="/fasilitas" className="hover:text-cyan-400 transition-colors">
                  Fasilitas Belajar
                </Link>
              </li>
              <li>
                <Link href="/prestasi" className="hover:text-cyan-400 transition-colors">
                  Prestasi Siswa
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-cyan-400 transition-colors">
                  Berita Terkini
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Layanan & Informasi */}
          <div className="lg:col-span-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Layanan & Informasi
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/ppdb" className="hover:text-cyan-400 transition-colors">
                  Pendaftaran PPDB 2026
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-cyan-400 transition-colors">
                  Kontak & Lokasi Sekolah
                </Link>
              </li>
              <li>
                <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Bursa Kerja Khusus (BKK)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Kerjasama Industri & Magang
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Lembaga Sertifikasi Profesi (LSP)
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Teaching Factory (TEFA) NESAS
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Sistem Informasi Siswa
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media & Accreditations */}
          <div className="lg:col-span-3">
            <p className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Media Sosial Resmi
            </p>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Ikuti akun media sosial kami untuk berita tercepat, dokumentasi kegiatan, dan info beasiswa.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram SMKN 1 Subang"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube SMKN 1 Subang"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook SMKN 1 Subang"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter SMKN 1 Subang"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
              <p className="text-[11px] font-semibold text-slate-200">Terakreditasi A (Unggul)</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SMK Negeri 1 Subang (NESAS). Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Syarat & Ketentuan</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">NESAI Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
