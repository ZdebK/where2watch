import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Movie } from './movie-card';
import { useStreamingSites } from '../contexts/streaming-sites.context';
import { useMovieForm } from '../hooks/useMovieForm';
import { FormInput, FormTextarea, FormSelect } from './form-input';
import { StarRating } from './star-rating';
import { StreamingSitesPicker } from './streaming-sites-picker';
import { PosterUpload } from './poster-upload';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movie: Omit<Movie, 'id'> & { id?: string }) => void;
  onDelete?: (movieId: string) => void;
  movie?: Movie | null;
}

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure'];
const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

export function AddEditModal({ isOpen, onClose, onSave, onDelete, movie }: AddEditModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { streamingSites: platforms, isLoading: isPlatformsLoading } = useStreamingSites();
  const { formData, errors, updateField, togglePlatform, handleSubmit, resetForm, isValid } = useMovieForm(movie, isOpen);

  const handleClose = () => {
    setIsConfirmOpen(false);
    resetForm();
    onClose();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = handleSubmit(onSave, movie?.id);
    if (isSuccess) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ backgroundColor: 'rgba(11, 13, 26, 0.8)' }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 modal-gradient"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ color: 'var(--w2w-pure-white)' }}>
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={handleClose}
            className="btn-icon"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
          }}>
          
          {/* Title and Original Title */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Title"
              required
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter movie title"
              error={errors.title}
            />
            <FormInput
              label="Original title"
              value={formData.originalTitle}
              onChange={(e) => updateField('originalTitle', e.target.value)}
              placeholder="Original title"
            />
          </div>

          {/* Release Date, Duration, Director */}
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Release date"
              required
              type="date"
              value={formData.releaseDate}
              onChange={(e) => updateField('releaseDate', e.target.value)}
              error={errors.releaseDate}
            />
            <FormInput
              label="Duration (min)"
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => updateField('durationMinutes', e.target.value)}
              placeholder="120"
              min="1"
            />
            <FormInput
              label="Director"
              value={formData.director}
              onChange={(e) => updateField('director', e.target.value)}
              placeholder="Director name"
            />
          </div>

          {/* Star Rating */}
          <StarRating
            value={formData.score}
            onChange={(value) => updateField('score', value)}
          />

          {/* Genre and Age Rating */}
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Genre"
              required
              value={formData.genre}
              onChange={(e) => updateField('genre', e.target.value)}
              options={genres.map(g => ({ value: g, label: g }))}
              error={errors.genre}
            />
            <FormSelect
              label="Age rating"
              value={formData.rating}
              onChange={(e) => updateField('rating', e.target.value)}
              options={ratings.map(r => ({ value: r, label: r }))}
            />
          </div>

          {/* Language and Country */}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Language"
              value={formData.language}
              onChange={(e) => updateField('language', e.target.value)}
              placeholder="Polish, English, etc."
            />
            <FormInput
              label="Country of origin"
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
              placeholder="Poland, USA, etc."
            />
          </div>

          {/* Description */}
          <FormTextarea
            label="Description"
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Enter movie description"
            rows={4}
          />

          {/* Poster Upload */}
          <PosterUpload
            value={formData.posterUrl}
            onChange={(url) => updateField('posterUrl', url)}
            error={errors.posterUrl}
          />

          {/* Streaming Sites */}
          <StreamingSitesPicker
            platforms={platforms}
            selectedSites={formData.streamingSites}
            onToggle={togglePlatform}
            isLoading={isPlatformsLoading}
            error={errors.streamingSites}
          />
        </form>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-3 p-6 border-t"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          {/* Archive button - only for existing movies */}
          {movie && onDelete && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsConfirmOpen((open) => !open)}
                className="btn btn-danger flex items-center"
                title="Archive movie"
              >
                <Trash2 size={18} className="mr-2" />
                Archive
              </button>

              {isConfirmOpen && (
                <div
                  className="absolute right-0 rounded-lg shadow-lg border"
                  style={{
                    background: 'var(--w2w-graphite)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    minWidth: '240px',
                    zIndex: 50,
                    bottom: 'calc(100% + 14px)',
                  }}
                >
                  <div className="p-4 space-y-3">
                    <p className="text-sm" style={{ color: 'var(--w2w-pure-white)' }}>
                      Archive this movie? It will be hidden from the list.
                    </p>
                    <div
                      className="flex justify-end gap-3"
                      style={{ marginTop: '16px' }}
                    >
                      <button
                        type="button"
                        className="btn btn-secondary btn-compact"
                        onClick={() => setIsConfirmOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-compact"
                        onClick={() => {
                          onDelete(movie.id);
                          setIsConfirmOpen(false);
                          onClose();
                        }}
                      >
                        Yes, archive
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSubmit}
              disabled={!isValid}
              className="btn btn-primary"
              title={!isValid ? 'Please fill in all required fields' : ''}
            >
              {movie ? 'Save Changes' : 'Add Movie'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
