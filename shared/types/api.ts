export interface StreamingSiteDTO {
  id: string;
  name: string;
  createdAt: string;
}

export interface MovieDTO {
  id: string;
  name: string;
  originalTitle?: string;
  description?: string;
  score?: number;
  releaseDate?: string;
  durationMinutes?: number;
  genre?: string;
  director?: string;
  language?: string;
  country?: string;
  ageRating?: string;
  posterUrl?: string;
  isAvailable?: boolean;
  createdAt: string;
  updatedAt: string;
  streamingSites: StreamingSiteDTO[];
}

export interface CreateMovieRequest {
  name: string;
  originalTitle?: string;
  description?: string;
  score?: number;
  releaseDate?: string;
  durationMinutes?: number;
  genre?: string;
  director?: string;
  language?: string;
  country?: string;
  ageRating?: string;
  posterUrl?: string;
  streamingSiteNames?: string[];
}

export interface UpdateMovieRequest extends Partial<CreateMovieRequest> {}
