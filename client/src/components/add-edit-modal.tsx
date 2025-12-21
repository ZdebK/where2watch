import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Movie } from './movie-card';
import { useStreamingSites } from '../contexts/streaming-sites.context';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Omit<Movie, 'id'> & { id?: string }) => void;
  movie?: Movie | null;
}

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure'];
const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

interface FormData {
  title: string;
  originalTitle: string;
  year: number;
  releaseDate: string;
  genre: string;
  rating: string;
  description: string;
  posterUrl: string;
  streamingSites: string[];
  score: number;
  durationMinutes: string;
  director: string;
  language: string;
  country: string;
  isAvailable: boolean;
}

const initialFormData: FormData = {
  title: '',
  originalTitle: '',
  year: new Date().getFullYear(),
  releaseDate: '',
  genre: 'Action',
  rating: 'PG-13',
  description: '',
  posterUrl: '',
  streamingSites: [],
  score: 0,
  durationMinutes: '',
  director: '',
  language: '',
  country: '',
  isAvailable: true,
};

export function AddEditModal({ isOpen, onClose, onSave, movie }: AddEditModalProps) {
  const { streamingSites: platforms, isLoading: isPlatformsLoading } = useStreamingSites();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        originalTitle: movie.originalTitle || '',
        year: movie.year,
        releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().split('T')[0] : '',
        genre: movie.genre,
        rating: movie.rating,
        description: movie.description,
        posterUrl: movie.posterUrl,
        streamingSites: movie.streamingSites,
        score: movie.score || 0,
        durationMinutes: movie.durationMinutes?.toString() || '',
        director: movie.director || '',
        language: movie.language || '',
        country: movie.country || '',
        isAvailable: movie.isAvailable ?? true,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [movie, isOpen]);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.posterUrl.trim()) newErrors.posterUrl = 'Poster is required';
    if (formData.streamingSites.length === 0) newErrors.streamingSites = 'At least one streaming site is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: movie?.id,
      title: formData.title,
      originalTitle: formData.originalTitle || undefined,
      year: formData.year,
      genre: formData.genre,
      rating: formData.rating,
      description: formData.description,
      posterUrl: formData.posterUrl,
      streamingSites: formData.streamingSites,
      score: formData.score || undefined,
      releaseDate: formData.releaseDate ? new Date(formData.releaseDate) : undefined,
      durationMinutes: formData.durationMinutes ? parseInt(formData.durationMinutes) : undefined,
      director: formData.director || undefined,
      language: formData.language || undefined,
      country: formData.country || undefined,
      isAvailable: formData.isAvailable,
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      streamingSites: prev.streamingSites.includes(platform)
        ? prev.streamingSites.filter((p) => p !== platform)
        : [...prev.streamingSites, platform],
    }));
  };

  if (!isOpen) return null;

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
          {/* Title and Original Title */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
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
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Original title
              </label>
              <input
                type="text"
                value={formData.originalTitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, originalTitle: e.target.value }))}
                placeholder="Original title"
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
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
          </div>

          {/* Release Date, Duration, Director */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Release date
              </label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, releaseDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              />
            </div>
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Duration (min)
              </label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={(e) => setFormData((prev) => ({ ...prev, durationMinutes: e.target.value }))}
                placeholder="120"
                min="1"
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              />
            </div>
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Director
              </label>
              <input
                type="text"
                value={formData.director}
                onChange={(e) => setFormData((prev) => ({ ...prev, director: e.target.value }))}
                placeholder="Director name"
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              />
            </div>
          </div>

          {/* Score (Stars) */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Rating (0-10)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, score: star }))}
                  className="text-2xl transition-all"
                  style={{
                    color: star <= formData.score ? 'var(--w2w-orange)' : 'rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ★
                </button>
              ))}
              <span className="ml-4 text-base" style={{ color: 'var(--w2w-soft-gray)' }}>
                {formData.score}/10
              </span>
            </div>
          </div>

          {/* Genre and Age Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Genre
              </label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData((prev) => ({ ...prev, genre: e.target.value }))}
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

            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Age rating
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
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
          </div>

          {/* Language and Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Language
              </label>
              <input
                type="text"
                value={formData.language}
                onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                placeholder="Polski, English, etc."
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              />
            </div>
            <div>
              <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
                Country of origin
              </label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                placeholder="Poland, USA, etc."
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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

          {/* Poster URL */}
          <div>
            <label style={{ color: 'var(--w2w-pure-white)' }} className="block mb-2">
              Poster URL
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="url"
                value={formData.posterUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, posterUrl: e.target.value }))}
                placeholder="https://.../poster.jpg"
                className="w-full px-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                  border: `1px solid ${errors.posterUrl ? 'var(--w2w-error)' : 'transparent'}`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--w2w-orange)';
                }}
                onBlur={(e) => {
                  if (!errors.posterUrl) e.target.style.borderColor = 'transparent';
                }}
              />

              {formData.posterUrl && (
                <div className="relative w-32 h-48">
                  <img
                    src={formData.posterUrl}
                    alt="Poster preview"
                    className="w-32 h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, posterUrl: '' }))}
                    className="absolute top-2 right-2 p-1 rounded-lg transition-colors"
                    style={{ backgroundColor: 'var(--w2w-error)', color: 'white' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>

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
              {isPlatformsLoading ? (
                <p style={{ color: 'var(--w2w-soft-gray)' }}>Loading platforms...</p>
              ) : (
                platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className="px-4 py-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: formData.streamingSites.includes(platform)
                        ? 'var(--w2w-orange)'
                        : 'var(--w2w-deep-navy)',
                      color: formData.streamingSites.includes(platform)
                        ? 'var(--w2w-pure-white)'
                        : 'var(--w2w-soft-gray)',
                    }}
                  >
                    {platform}
                    {formData.streamingSites.includes(platform) && (
                      <X size={14} className="inline ml-1" />
                    )}
                  </button>
                ))
              )}
            </div>
            {errors.streamingSites && (
              <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
                {errors.streamingSites}
              </p>
            )}
          </div>

          {/* Is Available Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isAvailable"
              checked={formData.isAvailable}
              onChange={(e) => setFormData((prev) => ({ ...prev, isAvailable: e.target.checked }))}
              className="w-5 h-5 rounded cursor-pointer"
              style={{
                accentColor: 'var(--w2w-orange)',
              }}
            />
            <label htmlFor="isAvailable" style={{ color: 'var(--w2w-pure-white)' }} className="cursor-pointer">
              Movie is available
            </label>
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
