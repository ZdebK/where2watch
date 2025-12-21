import { Movie } from '../components/movie-card';
import { MovieDTO } from '../api/client';

export function convertDtoToMovie(dto: MovieDTO): Movie {
  return {
    id: dto.id,
    title: dto.name,
    originalTitle: dto.originalTitle,
    year: dto.releaseDate ? new Date(dto.releaseDate).getFullYear() : new Date().getFullYear(),
    genre: dto.genre || 'Unknown',
    rating: dto.ageRating || 'Not Rated',
    description: dto.description || '',
    posterUrl: dto.posterUrl || '',
    streamingSites: dto.streamingSites?.map(site => site.name) || [],
    score: dto.score,
    releaseDate: dto.releaseDate ? new Date(dto.releaseDate) : undefined,
    durationMinutes: dto.durationMinutes,
    director: dto.director,
    language: dto.language,
    country: dto.country,
    isAvailable: dto.isAvailable,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
  };
}
