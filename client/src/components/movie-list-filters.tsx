interface MovieListFiltersProps {
  platforms: string[];
  activePlatforms: string[];
  onTogglePlatform: (platform: string) => void;
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
  yearRange: 'all' | 'last-5' | 'last-10' | '2000s' | '90s' | '80s' | 'older';
  onYearRangeChange: (range: 'all' | 'last-5' | 'last-10' | '2000s' | '90s' | '80s' | 'older') => void;
  sortBy: 'popular' | 'latest' | 'a-z' | 'rating' | 'newest';
  onSortChange: (sort: 'popular' | 'latest' | 'a-z' | 'rating' | 'newest') => void;
}

const YEAR_RANGES = [
  { value: 'all' as const, label: 'All Years' },
  { value: 'last-5' as const, label: 'Last 5 years' },
  { value: 'last-10' as const, label: 'Last 10 years' },
  { value: '2000s' as const, label: '2000–2009' },
  { value: '90s' as const, label: '1990–1999' },
  { value: '80s' as const, label: '1980–1989' },
  { value: 'older' as const, label: 'Before 1980' },
];

const SORT_OPTIONS = [
  { value: 'popular' as const, label: 'Popular' },
  { value: 'latest' as const, label: 'Latest Release' },
  { value: 'newest' as const, label: 'Recently Added' },
  { value: 'rating' as const, label: 'Highest Rated' },
  { value: 'a-z' as const, label: 'A–Z' },
];

export function MovieListFilters({
  platforms,
  activePlatforms,
  onTogglePlatform,
  genres,
  activeGenre,
  onGenreChange,
  yearRange,
  onYearRangeChange,
  sortBy,
  onSortChange,
}: MovieListFiltersProps) {
  return (
    <div
      className="sticky top-[73px] z-30 border-b bg-graphite border-subtle"
    >
      <div className="container mx-auto px-6 py-4">
        {/* Platform Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-soft-gray">Platforms:</span>
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => onTogglePlatform(platform)}
              className={`px-3 py-1 rounded-lg transition-all text-sm ${
                activePlatforms.includes(platform) ? 'chip-active' : 'chip'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Genre, Year, Sort */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <select
                value={activeGenre}
                onChange={(e) => onGenreChange(e.target.value)}
                className={`filter-select select-chevron ${
                  activeGenre !== 'all' ? 'filter-select-active' : ''
                }`}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={yearRange}
                onChange={(e) => onYearRangeChange(e.target.value as MovieListFiltersProps['yearRange'])}
                className={`filter-select select-chevron ${
                  yearRange !== 'all' ? 'filter-select-active' : ''
                }`}
              >
                {YEAR_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-soft-gray text-sm">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'popular' | 'latest' | 'a-z' | 'rating' | 'newest')}
              className={`filter-select select-chevron ${
                sortBy !== 'popular' ? 'filter-select-active' : ''
              }`}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}