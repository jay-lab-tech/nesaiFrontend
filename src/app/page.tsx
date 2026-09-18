import { ApiHealth } from "@/components/api-health";

export default function Home() {
  return <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-20"><section><p className="text-sm font-semibold tracking-[0.2em] text-blue-700">NESAS</p><h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Development foundation is ready.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">The product interface will be implemented in features. This page verifies Next.js, Tailwind CSS, environment configuration, and the Laravel API connection.</p><ApiHealth /></section></main>;
}
