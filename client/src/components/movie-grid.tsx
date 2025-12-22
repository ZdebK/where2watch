import { Plus } from 'lucide-react';
import { MovieCard, Movie } from './movie-card';

interface MovieGridProps {
  movies: Movie[];
  isLoadingMore: boolean;
  hasMore: boolean;
  onAddNew: () => void;
  onEditMovie: (movie: Movie) => void;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onLoadMore: () => void;
  isEmpty: boolean;
  emptyMessage: string;
}

export function MovieGrid({
  movies,
  isLoadingMore,
  hasMore,
  onAddNew,
  onEditMovie,
  loadMoreRef,
  onLoadMore,
  isEmpty,
  emptyMessage,
}: MovieGridProps) {
  if (isEmpty && isLoadingMore) {
    return (
      <div className="text-center py-20">
        <p className="text-soft-gray">Loading movies...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="mb-4 text-soft-gray">
          {emptyMessage}
        </p>
        {isEmpty && (
          <button
            onClick={onAddNew}
            className="btn btn-primary"
          >
            Add Movie
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Add Movie Card */}
        <div
          className="rounded-lg overflow-hidden cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-orange-tint border-2 border-dashed border-orange-strong hover:bg-[rgba(255,138,0,0.12)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,138,0,0.2)]"
          onClick={onAddNew}
        >
          <h3
            className="text-lg font-semibold text-orange"
            style={{ opacity: 0.75 }}
          >
            ADD MOVIE
          </h3>
          <Plus size={64} className="text-orange" style={{ opacity: 0.5 }} />
        </div>

        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onEdit={onEditMovie} />
        ))}
      </div>

      {hasMore && <div ref={loadMoreRef} className="h-1 w-full" aria-hidden="true" />}

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={onLoadMore}
            className="btn-load-more"
          >
            {isLoadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
      
      <div
        className="text-center text-sm mt-4 text-soft-gray"
        style={{ opacity: 0.5 }}
      >
        {isLoadingMore ? 'Loading more…' : hasMore ? 'Scroll or click “Load more”' : 'All movies loaded'}
      </div>
    </>
  );
}
