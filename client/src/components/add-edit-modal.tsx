import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Movie } from './movie-card';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Omit<Movie, 'id'> & { id?: string }) => void;
  movie?: Movie | null;
}

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure'];
const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
const platforms = ['Netflix', 'HBO', 'Prime Video', 'Disney+'];

export function AddEditModal({ isOpen, onClose, onSave, movie }: AddEditModalProps) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [genre, setGenre] = useState('Action');
  const [rating, setRating] = useState('PG-13');
  const [description, setDescription] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [streamingSites, setStreamingSites] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setYear(movie.year);
      setGenre(movie.genre);
      setRating(movie.rating);
      setDescription(movie.description);
      setPosterUrl(movie.posterUrl);
      setStreamingSites(movie.streamingSites);
    } else {
      resetForm();
    }
  }, [movie, isOpen]);

  const resetForm = () => {
    setTitle('');
    setYear(new Date().getFullYear());
    setGenre('Action');
    setRating('PG-13');
    setDescription('');
    setPosterUrl('');
    setStreamingSites([]);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!posterUrl.trim()) newErrors.posterUrl = 'Poster is required';
    if (streamingSites.length === 0) newErrors.streamingSites = 'At least one streaming site is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: movie?.id,
      title,
      year,
      genre,
      rating,
      description,
      posterUrl,
      streamingSites,
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const togglePlatform = (platform: string) => {
    setStreamingSites((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ backgroundColor: 'rgba(11, 13, 26, 0.8)' }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        style={{
          background: `linear-gradient(135deg, var(--w2w-graphite) 0%, var(--w2w-dark-violet) 100%)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ color: 'var(--w2w-pure-white)' }}>
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'var(--w2w-soft-gray)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
          }}>
          {/* Title */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title"
              className="w-full px-4 py-2 rounded-lg outline-none transition-all"
              style={{
                backgroundColor: 'var(--w2w-deep-navy)',
                color: 'var(--w2w-pure-white)',
                border: `1px solid ${errors.title ? 'var(--w2w-error)' : 'transparent'}`,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--w2w-orange)';
              }}
              onBlur={(e) => {
                if (!errors.title) e.target.style.borderColor = 'transparent';
              }}
            />
            {errors.title && (
              <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
                {errors.title}
              </p>
            )}
          </div>

          {/* Year and Genre */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Rating
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-4 py-2 rounded-lg outline-none transition-all"
              style={{
                backgroundColor: 'var(--w2w-deep-navy)',
                color: 'var(--w2w-pure-white)',
              }}
            >
              {ratings.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter movie description"
              rows={4}
              className="w-full px-4 py-2 rounded-lg outline-none transition-all resize-none"
              style={{
                backgroundColor: 'var(--w2w-deep-navy)',
                color: 'var(--w2w-pure-white)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--w2w-orange)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'transparent';
              }}
            />
          </div>

          {/* Poster Upload */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Poster
            </label>
            {posterUrl ? (
              <div className="relative">
                <img
                  src={posterUrl}
                  alt="Poster preview"
                  className="w-32 h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setPosterUrl('')}
                  className="absolute top-2 right-2 p-1 rounded-lg transition-colors"
                  style={{ backgroundColor: 'var(--w2w-error)', color: 'white' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:border-[var(--w2w-orange)]"
                style={{
                  borderColor: errors.posterUrl ? 'var(--w2w-error)' : 'var(--w2w-soft-gray)',
                  backgroundColor: 'var(--w2w-deep-navy)',
                }}
              >
                <Upload size={32} style={{ color: 'var(--w2w-soft-gray)' }} />
                <p style={{ color: 'var(--w2w-soft-gray)' }} className="mt-2">
                  Click to upload or drag & drop
                </p>
                <input type="file" className="hidden" accept="image/*" onChange={handlePosterUpload} />
              </label>
            )}
            {errors.posterUrl && (
              <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
                {errors.posterUrl}
              </p>
            )}
          </div>

          {/* Streaming Sites */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Streaming Sites
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => togglePlatform(platform)}
                  className="px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: streamingSites.includes(platform)
                      ? 'var(--w2w-orange)'
                      : 'var(--w2w-deep-navy)',
                    color: streamingSites.includes(platform)
                      ? 'var(--w2w-pure-white)'
                      : 'var(--w2w-soft-gray)',
                  }}
                >
                  {platform}
                  {streamingSites.includes(platform) && (
                    <X size={14} className="inline ml-1" />
                  )}
                </button>
              ))}
            </div>
            {errors.streamingSites && (
              <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
                {errors.streamingSites}
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 p-6 border-t"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: 'var(--w2w-deep-navy)',
              color: 'var(--w2w-soft-gray)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg transition-all"
            style={{
              backgroundColor: 'var(--w2w-orange)',
              color: 'var(--w2w-pure-white)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 138, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {movie ? 'Save Changes' : 'Add Movie'}
          </button>
        </div>
      </div>
    </div>
  );
}
