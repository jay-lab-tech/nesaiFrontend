export function IndustryPartnersSection() {
  const PARTNERS = [
    { name: 'Google Cloud', type: 'Technology Partner' },
    { name: 'Microsoft Imagine Academy', type: 'Certification' },
    { name: 'Telkom Indonesia', type: 'Industry Partner' },
    { name: 'PT Astra International', type: 'Automotive & Tech' },
    { name: 'Cisco Networking Academy', type: 'Global Academy' },
    { name: 'MikroTik Academy', type: 'Certified Training' },
    { name: 'Kominfo RI', type: 'Digital Talent Scholarship' },
    { name: 'Indosat Ooredoo Hutchison', type: 'Telecom Partner' },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">
          Bekerjasama dengan lebih dari 50+ Perusahaan Nasional & Multinasional
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-center">
                {partner.name}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 text-center truncate w-full">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
