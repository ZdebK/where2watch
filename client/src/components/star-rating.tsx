interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function StarRating({ value, onChange, max = 10 }: StarRatingProps) {
  return (
    <div>
      <label className="formLabel">
        Rating (0-{max})
      </label>
      <div className="flex items-center gap-2">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`btn-star ${star <= value ? 'active' : 'inactive'}`}
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
