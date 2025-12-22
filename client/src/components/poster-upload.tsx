import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';

interface PosterUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

const IMAGE_EXTENSIONS = /(\.jpg|\.jpeg|\.png|\.webp|\.avif|\.gif)$/i;

export function PosterUpload({ value, onChange, error }: PosterUploadProps) {
  const [localError, setLocalError] = useState('');

  const validateUrl = (url: string) => {
    if (!url) {
      setLocalError('');
      return;
    }
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        setLocalError('URL must start with http or https');
        return;
      }
      // Basic hint: ensure it looks like an image URL
      const path = parsed.pathname.split('?')[0] || '';
      if (!IMAGE_EXTENSIONS.test(path)) {
        setLocalError('URL should point to an image (jpg, png, webp, avif, gif)');
        return;
      }
      setLocalError('');
    } catch {
      setLocalError('Invalid URL');
    }
  };
  return (
    <div>
      <label className="formLabel required">
        Poster URL
      </label>
      <div className="flex flex-col gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            setLocalError('');
            onChange(next);
          }}
          onBlur={(e) => validateUrl(e.target.value.trim())}
          placeholder="https://.../poster.jpg"
          className={`formField ${(error || localError) ? 'error' : ''}`}
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

      {(error || localError) && (
        <span className="formError">
          {error || localError}
        </span>
      )}
    </div>
  );
}
