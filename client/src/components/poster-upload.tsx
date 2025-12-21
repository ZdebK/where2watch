import { Trash2 } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';

interface PosterUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

export function PosterUpload({ value, onChange, error }: PosterUploadProps) {
  return (
    <div>
      <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
        Poster URL *
      </label>
      <div className="flex flex-col gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://.../poster.jpg"
          className="w-full px-4 py-2 rounded-lg outline-none transition-all"
          style={{
            backgroundColor: 'var(--w2w-deep-navy)',
            color: 'var(--w2w-pure-white)',
            border: `1px solid ${error ? 'var(--w2w-error)' : 'transparent'}`,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--w2w-orange)';
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderColor = 'transparent';
          }}
        />

        {value && (
          <div className="relative w-32 h-48">
            <ImageWithFallback
              src={value}
              alt="Poster preview"
              className="w-32 h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 p-1 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--w2w-error)', color: 'white' }}
              aria-label="Remove poster"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
