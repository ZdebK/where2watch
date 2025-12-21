import { useState, useMemo } from 'react';
import { Movie } from '../components/movie-card';

export type SortOption = 'popular' | 'latest' | 'a-z' | 'rating' | 'newest';
export type YearRange = 'all' | 'last-5' | 'last-10' | '2000s' | '90s' | '80s' | 'older';

interface UseMovieFiltersReturn {
  filteredMovies: Movie[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activePlatforms: string[];
  setActivePlatforms: (platforms: string[]) => void;
  togglePlatform: (platform: string) => void;
  activeGenre: string;
  setActiveGenre: (genre: string) => void;
  activeYearRange: YearRange;
  setActiveYearRange: (range: YearRange) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

export function useMovieFilters(movies: Movie[]): UseMovieFiltersReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatforms, setActivePlatforms] = useState<string[]>([]);
  const [activeGenre, setActiveGenre] = useState<string>('all');
  const [activeYearRange, setActiveYearRange] = useState<YearRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const normalizePlatform = (name: string) => {
    const key = name.trim().toLowerCase();
    if (key === 'amazon prime video' || key === 'prime video' || key === 'prime') return 'prime video';
    if (key === 'hbo max' || key === 'hbo' || key === 'max') return 'max';
    return key;
  };

  const filteredMovies = useMemo(() => {
    let filtered = [...movies];

    const normalizedActivePlatforms = activePlatforms.map(normalizePlatform);

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
        movie.streamingSites.some((site) => normalizedActivePlatforms.includes(normalizePlatform(site)))
      );
    }

    // Genre filter
    if (activeGenre !== 'all') {
      filtered = filtered.filter((movie) => movie.genre === activeGenre);
    }

    // Year range filter
    if (activeYearRange !== 'all') {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter((movie) => {
        const year = movie.year || (movie.releaseDate ? movie.releaseDate.getFullYear() : undefined);
        if (!year) return false;
        switch (activeYearRange) {
          case 'last-5':
            return year >= currentYear - 5;
          case 'last-10':
            return year >= currentYear - 10;
          case '2000s':
            return year >= 2000 && year <= 2009;
          case '90s':
            return year >= 1990 && year <= 1999;
          case '80s':
            return year >= 1980 && year <= 1989;
          case 'older':
            return year < 1980;
          default:
            return true;
        }
      });
    }

    // Sorting
    if (sortBy === 'latest') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const aCreated = a.createdAt ? a.createdAt.getTime() : 0;
        const bCreated = b.createdAt ? b.createdAt.getTime() : 0;
        return bCreated - aCreated;
      });
    } else if (sortBy === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => {
        const scoreA = a.score ? Number(a.score) : 0;
        const scoreB = b.score ? Number(b.score) : 0;
        return scoreB - scoreA; // Highest rating first
      });
    }

    return filtered;
  }, [movies, searchQuery, activePlatforms, activeGenre, activeYearRange, sortBy]);

  const togglePlatform = (platform: string) => {
    setActivePlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  return {
    filteredMovies,
    searchQuery,
    setSearchQuery,
    activePlatforms,
    setActivePlatforms,
    togglePlatform,
    activeGenre,
    setActiveGenre,
    activeYearRange,
    setActiveYearRange,
    sortBy,
    setSortBy,
  };
}
