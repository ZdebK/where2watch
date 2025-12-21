import { useState, useEffect } from 'react';
import { Movie } from '../components/movie-card';

export interface FormData {
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

interface UseMovieFormReturn {
  formData: FormData;
  errors: Record<string, string>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  togglePlatform: (platform: string) => void;
  handleSubmit: (onSave: (movie: Omit<Movie, 'id'> & { id?: string }) => void, movieId?: string) => boolean;
  resetForm: () => void;
  isValid: boolean;
}

export function useMovieForm(movie: Movie | null | undefined, isOpen: boolean): UseMovieFormReturn {
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

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      streamingSites: prev.streamingSites.includes(platform)
        ? prev.streamingSites.filter((p) => p !== platform)
        : [...prev.streamingSites, platform],
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const isValid = 
    formData.title.trim() !== '' &&
    formData.posterUrl.trim() !== '' &&
    formData.genre.trim() !== '' &&
    formData.releaseDate.trim() !== '';

  const handleSubmit = (onSave: (movie: Omit<Movie, 'id'> & { id?: string }) => void, movieId?: string): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.posterUrl.trim()) newErrors.posterUrl = 'Poster is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    if (!formData.releaseDate.trim()) newErrors.releaseDate = 'Release date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    onSave({
      id: movieId,
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
    return true;
  };

  return {
    formData,
    errors,
    updateField,
    togglePlatform,
    handleSubmit,
    resetForm,
    isValid,
  };
}
