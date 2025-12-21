interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function StarRating({ value, onChange, max = 10 }: StarRatingProps) {
  return (
    <div>
      <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
        Rating (0-{max})
      </label>
      <div className="flex items-center gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-2xl transition-all"
            style={{
              color: star <= value ? 'var(--w2w-orange)' : 'rgba(255, 255, 255, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label={`Rate ${star} out of ${max}`}
          >
            ★
          </button>
        ))}
        <span className="ml-4 text-base" style={{ color: 'var(--w2w-soft-gray)' }}>
          {value}/{max}
        </span>
      </div>
    </div>
  );
}
