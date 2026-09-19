'use client';

interface NesaiQuickRepliesProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const QUICK_QUESTIONS = [
  {
    emoji: '🎓',
    text: 'Apa saja jurusan di SMKN 1 Subang?',
  },
  {
    emoji: '📋',
    text: 'Kapan PPDB dibuka & apa persyaratannya?',
  },
  {
    emoji: '📍',
    text: 'Di mana alamat dan kontak SMKN 1 Subang?',
  },
  {
    emoji: '🏫',
    text: 'Apa saja fasilitas sekolah?',
  },
];

export function NesaiQuickReplies({ onSelect, disabled }: NesaiQuickRepliesProps) {
  return (
    <div className="nesai-quick-replies">
      <p className="nesai-quick-replies-label">Pertanyaan populer:</p>
      <div className="nesai-quick-replies-grid">
        {QUICK_QUESTIONS.map((q, index) => (
          <button
            key={index}
            type="button"
            className="nesai-quick-reply-btn"
            disabled={disabled}
            onClick={() => onSelect(q.text)}
          >
            <span className="nesai-quick-reply-emoji">{q.emoji}</span>
            <span className="nesai-quick-reply-text">{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
