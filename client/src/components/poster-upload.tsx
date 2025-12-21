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
      <label className="formLabel required">
        Poster URL
      </label>
      <div className="flex flex-col gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://.../poster.jpg"
          className={`formField ${error ? 'error' : ''}`}
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
              className="absolute top-2 right-2 btn-icon btn-danger"
              aria-label="Remove poster"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {error && (
        <span className="formError">
          {error}
        </span>
      )}
    </div>
  );
}
