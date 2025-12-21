import { useState, useEffect } from 'react';
import { Movie } from './movie-card';
import { MovieListHeader } from './movie-list-header';
import { MovieListFilters } from './movie-list-filters';
import { MovieGrid } from './movie-grid';
import { AddEditModal } from './add-edit-modal';
import { useAuth } from '../contexts/auth.context';
import { useStreamingSites } from '../contexts/streaming-sites.context';
import { useMovies } from '../hooks/useMovies';
import { useMovieFilters } from '../hooks/useMovieFilters';
import { apiClient } from '../api/client';
import { toast } from 'sonner';
import { convertDtoToMovie } from '../utils/movie.utils';

export function MovieList() {
  const { user, logout } = useAuth();
  const { streamingSites: platforms } = useStreamingSites();
  const { movies, isLoadingMore, hasMore, loadMoreRef, loadMore, updateMovie, addMovie, removeMovie, refetch } = useMovies();
  const {
    filteredMovies,
    searchQuery,
    setSearchQuery,
    activePlatforms,
    togglePlatform,
    activeGenre,
    setActiveGenre,
    activeYearRange,
    setActiveYearRange,
    sortBy,
    setSortBy,
  } = useMovieFilters(movies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const genres = ['all', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure'];

  // Reset infinite scroll when filters/sort changes (but not search - that's client-side)
  useEffect(() => {
    refetch();
  }, [activeGenre, activeYearRange, sortBy, activePlatforms.length]);

  const handleSaveMovie = async (movieData: Omit<Movie, 'id'> & { id?: string }) => {
    const requestData = {
      name: movieData.title,
      originalTitle: movieData.originalTitle,
      description: movieData.description,
      genre: movieData.genre,
      ageRating: movieData.rating,
      posterUrl: movieData.posterUrl,
      releaseDate: movieData.releaseDate?.toISOString(),
      streamingSiteNames: movieData.streamingSites,
      score: movieData.score,
      durationMinutes: movieData.durationMinutes,
      director: movieData.director,
      language: movieData.language,
      country: movieData.country,
    };

    try {
      if (movieData.id) {
        // Edit existing movie
        const updated = await apiClient.updateMovie(movieData.id, requestData);
        updateMovie(convertDtoToMovie(updated));
        toast.success('Movie updated successfully');
      } else {
        // Add new movie
        const created = await apiClient.createMovie(requestData);
        addMovie(convertDtoToMovie(created));
        // After adding, refresh and set sorting to newest (createdAt)
        setSortBy('newest');
        await refetch();
        toast.success('Movie added successfully');
      }
    } catch (error) {
      console.error('Failed to save movie:', error);
      toast.error('Failed to save movie');
    }
  };

  const handleDeleteMovie = async (movieId: string) => {
    try {
      await apiClient.deleteMovie(movieId);
      removeMovie(movieId);
      toast.success('Movie archived successfully');
    } catch (error) {
      console.error('Failed to archive movie:', error);
      toast.error('Failed to archive movie');
    }
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingMovie(null);
    setIsModalOpen(true);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--w2w-deep-navy)' }}
    >
      {/* Header */}
      <MovieListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userEmail={user?.email}
        onLogout={logout}
      />

      {/* Filters */}
      <MovieListFilters
        platforms={platforms}
        activePlatforms={activePlatforms}
        onTogglePlatform={togglePlatform}
        genres={genres}
        activeGenre={activeGenre}
        onGenreChange={setActiveGenre}
        yearRange={activeYearRange}
        onYearRangeChange={setActiveYearRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Movie Grid */}
      <div className="container mx-auto px-6 py-8">
        <MovieGrid
          movies={filteredMovies}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          onAddNew={handleAddNew}
          onEditMovie={handleEditMovie}
          loadMoreRef={loadMoreRef}
          onLoadMore={loadMore}
          isEmpty={movies.length === 0}
          emptyMessage={
            movies.length === 0
              ? 'No movies in database. Add your first movie!'
              : 'No movies match your filters.'
          }
        />
      </div>

      {/* Add/Edit Modal */}
      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMovie(null);
        }}
        onSave={handleSaveMovie}
        onDelete={handleDeleteMovie}
        movie={editingMovie}
      />
    </div>
  );
}
