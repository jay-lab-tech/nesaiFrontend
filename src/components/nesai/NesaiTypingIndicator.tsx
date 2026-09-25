'use client';

export function NesaiTypingIndicator() {
  return (
    <div className="flex flex-col items-start my-2 animate-in fade-in-50 duration-200">
      <span className="font-school-heading text-[11px] font-bold tracking-tight mb-1 px-1 text-[#172b3a]">
        NesAI
      </span>
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#dce5e1] rounded-2xl rounded-tl-xs shadow-2xs">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#172b3a] animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#e7ae32] animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#172b3a] animate-bounce" />
        </div>
        <span className="text-xs text-[#5d6a6e] font-medium">
          Mencari informasi SMKN 1 Subang...
        </span>
      </div>
    </div>
  );
}
