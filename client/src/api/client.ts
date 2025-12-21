const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

export interface StreamingSiteDTO {
  id: string;
  name: string;
  createdAt: string;
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

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204) {
        return null as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Movie endpoints
  async getAllMovies(limit?: number, offset?: number): Promise<MovieDTO[]> {
    const params = new URLSearchParams();
    if (typeof limit === 'number') params.append('limit', String(limit));
    if (typeof offset === 'number') params.append('offset', String(offset));
    const query = params.toString();
    const endpoint = query ? `/movies?${query}` : '/movies';
    return this.request<MovieDTO[]>(endpoint);
  }

  async getMovieById(id: string): Promise<MovieDTO> {
    return this.request<MovieDTO>(`/movies/${id}`);
  }

  async createMovie(data: CreateMovieRequest): Promise<MovieDTO> {
    return this.request<MovieDTO>('/movies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMovie(id: string, data: UpdateMovieRequest): Promise<MovieDTO> {
    return this.request<MovieDTO>(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMovie(id: string): Promise<void> {
    return this.request<void>(`/movies/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllStreamingSites(): Promise<StreamingSiteDTO[]> {
    return this.request<StreamingSiteDTO[]>('/movies/streaming-sites/all');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
