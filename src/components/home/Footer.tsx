import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/site-data';

const LINKS = [
  { label: 'Tentang sekolah', href: ROUTES.tentang },
  { label: 'Jurusan', href: ROUTES.jurusan },
  { label: 'Karya & Industri', href: ROUTES.karyaIndustri },
  { label: 'PPDB', href: ROUTES.ppdb },
  { label: 'Kontak', href: ROUTES.kontak },
];

// TODO(data-resmi): ganti alamat & kontak dengan data resmi sekolah.
const CONTACT = {
  address: 'Jl. Arief Rahman Hakim No. 35, Kelurahan Cigadung, Kecamatan Subang, Kabupaten Subang, Jawa Barat 41213',
  phone: '(0260) 411410',
  email: 'info@smkn1subang.sch.id',
};

export function Footer() {
  return (
    <footer id="kontak" className="bg-[var(--brand-strong)] text-[#edf2ef]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:py-16">
        <div>
          <div className="flex items-center gap-4">
            <Image src="/images/logo-smkn-1-subang.png" alt="Lambang SMK Negeri 1 Subang" width={58} height={58} className="h-[58px] w-[58px] object-contain" />
            <p className="font-school-heading text-3xl tracking-[-0.025em]">SMKN 1 Subang</p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#bac8c4]">Pendidikan vokasi untuk tumbuh sebagai pribadi berkarakter dan terampil di bidangnya.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Jelajahi</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-[#cbd7d3]">{LINKS.map((link) => <Link key={link.href} href={link.href} className="w-fit hover:text-white">{link.label}</Link>)}</div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Kontak</p>
          <address className="mt-4 not-italic text-sm leading-6 text-[#cbd7d3]">{CONTACT.address}</address>
          <p className="mt-4 text-sm text-[#cbd7d3]">{CONTACT.phone}<br />{CONTACT.email}</p>
        </div>
      </div>
      <div className="border-t border-white/15"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#9db0aa] sm:flex-row sm:justify-between sm:px-8"><span>© 2026 SMK Negeri 1 Subang</span><span>Website sekolah — informasi dan layanan publik</span></div></div>
    </footer>
  );
}
