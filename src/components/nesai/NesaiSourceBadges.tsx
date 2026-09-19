'use client';

interface NesaiSourceBadgesProps {
  sources: string[];
}

export function NesaiSourceBadges({ sources }: NesaiSourceBadgesProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="nesai-sources">
      <span className="nesai-sources-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        </svg>
        Sumber:
      </span>
      <div className="nesai-sources-list">
        {sources.map((source, index) => (
          <span key={index} className="nesai-source-badge">
            {source}
          </span>
        ))}
      </div>
    </div>
  );
}
