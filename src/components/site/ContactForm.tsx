'use client';

import { useState } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="border border-slate-200 bg-white p-6 sm:p-8"
    >
      {sent ? (
        <p className="font-school-heading text-2xl">Pesan tercatat. Terima kasih sudah menghubungi sekolah.</p>
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Kotak pesan</p>
          <h3 className="font-school-heading mt-3 text-2xl font-semibold text-[#0f1e36]">Kirim pertanyaanmu.</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <input
              required
              placeholder="Nama"
              className="border-b border-[#9aaba8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#81928f]"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="border-b border-[#9aaba8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#81928f]"
            />
          </div>
          <textarea
            required
            placeholder="Pesan"
            rows={5}
            className="mt-7 w-full resize-none border-b border-[#9aaba8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#81928f]"
          />
          <button
            type="submit"
            className="mt-7 bg-[#0f1e36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#315e68]"
          >
            Kirim pesan
          </button>
        </>
      )}
    </form>
  );
}
