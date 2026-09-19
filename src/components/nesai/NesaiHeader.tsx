'use client';

interface NesaiHeaderProps {
  onClose: () => void;
  onClear: () => void;
}

export function NesaiHeader({ onClose, onClear }: NesaiHeaderProps) {
  return (
    <div className="nesai-header">
      <div className="nesai-header-info">
        <div className="nesai-header-avatar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
        <div className="nesai-header-text">
          <h3 className="nesai-header-title">NESAI</h3>
          <p className="nesai-header-subtitle">
            <span className="nesai-status-dot" />
            Asisten Virtual SMKN 1 Subang
          </p>
        </div>
      </div>
      <div className="nesai-header-actions">
        {/* Clear/Reset Button */}
        <button
          type="button"
          className="nesai-header-btn"
          onClick={onClear}
          aria-label="Reset percakapan"
          title="Reset percakapan"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </button>
        {/* Close/Minimize Button */}
        <button
          type="button"
          className="nesai-header-btn"
          onClick={onClose}
          aria-label="Tutup chat"
          title="Tutup chat"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
