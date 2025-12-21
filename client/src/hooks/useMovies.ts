import { useCallback } from 'react';
import { useInfiniteScroll } from './useInfiniteScroll';
import { Movie } from '../components/movie-card';
import { apiClient } from '../api/client';
import { convertDtoToMovie } from '../utils/movie.utils';
import { toast } from 'sonner';

export function useMovies() {
  const fetchMovies = useCallback(async (pageSize: number, offset: number) => {
    try {
      const moviesFromApi = await apiClient.getAllMovies(pageSize, offset);
      return moviesFromApi.map(convertDtoToMovie);
    } catch (err) {
      console.error('[useMovies] fetch failed', err);
      toast.error('Failed to load movies from server');
      throw err;
    }
  }, []);

  const {
    items: movies,
    isLoadingMore,
    hasMore,
    loadMoreRef,
    loadMore,
    setItems: setMovies,
    refetch,
  } = useInfiniteScroll<Movie>({
    fetchFn: fetchMovies,
    pageSize: 10,
  });

  const updateMovie = useCallback((updatedMovie: Movie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
  }, [setMovies]);

  const addMovie = useCallback((newMovie: Movie) => {
    setMovies((prev) => [...prev, newMovie]);
  }, [setMovies]);

  const removeMovie = useCallback((movieId: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== movieId));
  }, [setMovies]);

  return {
    movies,
    isLoadingMore,
    hasMore,
    loadMoreRef,
    loadMore,
    updateMovie,
    addMovie,
    removeMovie,
    refetch,
  };
}
