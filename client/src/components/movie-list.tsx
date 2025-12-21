import { useState, useMemo, useEffect } from 'react';
import { Search, Plus, LogOut } from 'lucide-react';
import { Logo } from './logo';
import { MovieCard, Movie } from './movie-card';
import { AddEditModal } from './add-edit-modal';
import { useAuth } from '../contexts/auth.context';
import { apiClient, MovieDTO } from '../api/client';
import { toast } from 'sonner';

export function MovieList() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'series'>('all');
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
  const [activeGenre, setActiveGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'a-z'>('popular');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  // Convert API DTO to UI model
  const convertDtoToMovie = (dto: MovieDTO): Movie => {
    return {
      id: dto.id,
      title: dto.name,
      year: dto.releaseDate ? new Date(dto.releaseDate).getFullYear() : new Date().getFullYear(),
      genre: dto.genre || 'Unknown',
      rating: dto.ageRating || 'Not Rated',
      description: dto.description || '',
      posterUrl: dto.posterUrl || '',
      streamingSites: dto.streamingSites?.map(site => site.name) || [],
    };
  };

  // Load movies from API
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoadingMovies(true);
        const moviesFromApi = await apiClient.getAllMovies();
        const convertedMovies = moviesFromApi.map(convertDtoToMovie);
        setMovies(convertedMovies);
      } catch (error) {
        console.error('Failed to load movies:', error);
        toast.error('Failed to load movies from server');
      } finally {
        setIsLoadingMovies(false);
      }
    };

    loadMovies();
  }, []);

  const platforms = ['Netflix', 'HBO', 'Prime Video', 'Disney+'];
  const genres = ['all', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Adventure'];

  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Platform filter
    if (activePlatforms.length > 0) {
      filtered = filtered.filter((movie) =>
        movie.streamingSites.some((site) => activePlatforms.includes(site))
      );
    }

    // Genre filter
    if (activeGenre !== 'all') {
      filtered = filtered.filter((movie) => movie.genre === activeGenre);
    }

    // Sorting
    if (sortBy === 'latest') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [movies, searchQuery, activePlatforms, activeGenre, sortBy]);

  const togglePlatform = (platform: string) => {
    setActivePlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSaveMovie = async (movieData: Omit<Movie, 'id'> & { id?: string }) => {
    try {
      const requestData = {
        name: movieData.title,
        description: movieData.description,
        genre: movieData.genre,
        ageRating: movieData.rating,
        posterUrl: movieData.posterUrl,
        releaseDate: new Date(movieData.year, 0, 1).toISOString(),
        streamingSiteNames: movieData.streamingSites,
      };

      if (movieData.id) {
        // Edit existing movie
        const updated = await apiClient.updateMovie(movieData.id, requestData);
        setMovies((prev) =>
          prev.map((m) => (m.id === movieData.id ? convertDtoToMovie(updated) : m))
        );
        toast.success('Movie updated successfully');
      } else {
        // Add new movie
        const created = await apiClient.createMovie(requestData);
        setMovies((prev) => [...prev, convertDtoToMovie(created)]);
        toast.success('Movie added successfully');
      }
    } catch (error) {
      console.error('Failed to save movie:', error);
      toast.error('Failed to save movie');
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
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: 'var(--w2w-graphite)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo className="text-2xl" />

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md mx-8">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--w2w-soft-gray)' }}
              />
              <input
                type="text"
                placeholder="Szukaj filmów lub seriali…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: 'var(--w2w-deep-navy)',
                  color: 'var(--w2w-pure-white)',
                }}
                onFocus={(e) => {
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 138, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Add Movie Button */}
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: 'var(--w2w-orange)',
                color: 'var(--w2w-pure-white)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 138, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Plus size={20} />
              Add Movie
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all ml-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'var(--w2w-pure-white)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 138, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              title={`Logged in as: ${user?.email}`}
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div
        className="sticky top-[73px] z-30 border-b"
        style={{
          backgroundColor: 'var(--w2w-graphite)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="container mx-auto px-6 py-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 mb-4">
            {(['all', 'movies', 'series'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-2 transition-all capitalize"
                style={{
                  color: activeTab === tab ? 'var(--w2w-orange)' : 'var(--w2w-soft-gray)',
                  borderBottom: activeTab === tab ? '2px solid var(--w2w-orange)' : '2px solid transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Platform Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span style={{ color: 'var(--w2w-soft-gray)' }}>Platforms:</span>
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className="px-3 py-1 rounded-lg transition-all text-sm"
                style={{
                  backgroundColor: activePlatforms.includes(platform)
                    ? 'var(--w2w-orange)'
                    : 'var(--w2w-deep-navy)',
                  color: activePlatforms.includes(platform)
                    ? 'var(--w2w-pure-white)'
                    : 'var(--w2w-soft-gray)',
                }}
              >
                {platform}
              </button>
            ))}
          </div>

          {/* Genre and Sort */}
          <div className="flex items-center gap-4">
            <select
              value={activeGenre}
              onChange={(e) => setActiveGenre(e.target.value)}
              className="px-4 py-2 rounded-lg outline-none text-sm"
              style={{
                backgroundColor: 'var(--w2w-deep-navy)',
                color: 'var(--w2w-soft-gray)',
              }}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'latest' | 'a-z')}
              className="px-4 py-2 rounded-lg outline-none text-sm"
              style={{
                backgroundColor: 'var(--w2w-deep-navy)',
                color: 'var(--w2w-soft-gray)',
              }}
            >
              <option value="popular">Popular</option>
              <option value="latest">Latest</option>
              <option value="a-z">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="container mx-auto px-6 py-8">
        {isLoadingMovies ? (
          <div className="text-center py-20">
            <p style={{ color: 'var(--w2w-soft-gray)' }}>Loading movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: 'var(--w2w-soft-gray)' }} className="mb-4">
              {movies.length === 0 ? 'No movies in database. Add your first movie!' : 'No movies match your filters.'}
            </p>
            {movies.length === 0 && (
              <button
                onClick={handleAddNew}
                className="px-6 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: 'var(--w2w-orange)',
                  color: 'var(--w2w-pure-white)',
                }}
              >
                Add Movie
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onEdit={handleEditMovie} />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AddEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMovie(null);
        }}
        onSave={handleSaveMovie}
        movie={editingMovie}
      />
    </div>
  );
}
