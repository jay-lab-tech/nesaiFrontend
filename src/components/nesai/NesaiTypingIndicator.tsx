'use client';

export function NesaiTypingIndicator() {
  return (
    <div className="nesai-typing-wrapper">
      <div className="nesai-avatar-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </svg>
      </div>
      <div className="nesai-typing-bubble">
        <div className="nesai-typing-dots">
          <span className="nesai-dot" />
          <span className="nesai-dot" />
          <span className="nesai-dot" />
        </div>
        <span className="nesai-typing-label">NESAI sedang mengetik</span>
      </div>
    </div>
  );
}
