import Link from 'next/link';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[430px] items-end overflow-hidden bg-[#12334a] pb-16 pt-32 text-white sm:min-h-[470px] sm:pb-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }} />
      <div className="absolute inset-0 bg-[#071c2d]/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#071c2d]/50 via-[#071c2d]/15 to-[#071c2d]/85" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="home-rise">
        <div className="mb-5 flex items-center gap-2 text-xs text-white/75"><Link href="/" className="hover:text-white">Beranda</Link><span>/</span><span>{eyebrow}</span></div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">{eyebrow}</p>
        <h1 className="font-school-heading max-w-4xl text-4xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">{description}</p>
        </div>
      </div>
    </section>
  );
}
