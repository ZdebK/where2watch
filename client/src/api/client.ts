import { getApiUrl } from '../utils/getApiUrl';
import type {
  MovieDTO,
  StreamingSiteDTO,
  CreateMovieRequest,
  UpdateMovieRequest,
} from '../../../shared/types/api';

export type {
  MovieDTO,
  StreamingSiteDTO,
  CreateMovieRequest,
  UpdateMovieRequest,
};

const API_BASE_URL = getApiUrl();

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

      // Handle empty responses gracefully (204, 205, or no body)
      const contentLength = response.headers.get('content-length');
      if (response.status === 204 || response.status === 205 || contentLength === '0') {
        return null as T;
      }

      const text = await response.text();
      if (!text) {
        return null as T;
      }

      return JSON.parse(text) as T;
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
