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
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={activeGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className={`px-4 py-2 rounded-lg outline-none text-sm bg-deep-navy text-soft-gray border transition-colors ${
              activeGenre !== 'all'
                ? 'border-orange/70 shadow-[0_0_0_1px_rgba(255,138,0,0.5)]'
                : 'border-subtle'
            }`}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>

          <select
            value={yearRange}
            onChange={(e) => onYearRangeChange(e.target.value as MovieListFiltersProps['yearRange'])}
            className={`px-4 py-2 rounded-lg outline-none text-sm bg-deep-navy text-soft-gray border border-subtle transition-colors ${
              yearRange !== 'all' ? 'border-orange/70 shadow-[0_0_0_1px_rgba(255,138,0,0.5)]' : ''
            }`}
          >
            <option value="all">All Years</option>
            <option value="last-5">Last 5 years</option>
            <option value="last-10">Last 10 years</option>
            <option value="2000s">2000–2009</option>
            <option value="90s">1990–1999</option>
            <option value="80s">1980–1989</option>
            <option value="older">Before 1980</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'popular' | 'latest' | 'a-z' | 'rating' | 'newest')}
            className={`px-4 py-2 rounded-lg outline-none text-sm bg-deep-navy text-soft-gray border border-subtle transition-colors ${
              sortBy !== 'popular' ? 'border-orange/70 shadow-[0_0_0_1px_rgba(255,138,0,0.5)]' : ''
            }`}
          >
            <option value="popular">Popular</option>
            <option value="latest">Latest Release</option>
            <option value="newest">Recently Added</option>
            <option value="rating">Highest Rated</option>
            <option value="a-z">A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}