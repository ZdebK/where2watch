import { Star } from 'lucide-react';
import { ImageWithFallback } from './image-with-fallback';

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  genre: string;
  rating: string;
  description: string;
  posterUrl: string;
  streamingSites: string[];
  score?: number;
  releaseDate?: Date;
  durationMinutes?: number;
  director?: string;
  language?: string;
  country?: string;
  isAvailable?: boolean;
  createdAt?: Date;
}

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
}

const platformIcons: Record<string, string> = {
  Netflix: 'N',
  Max: 'Max',
  'Prime Video': 'Prime',
  'Disney+': 'D+',
  'YouTube Premium': 'YT',
  'Canal+ Online': 'C+',
  'Apple TV+': 'Apple',
};

export function MovieCard({ movie, onEdit }: MovieCardProps) {
  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer bg-graphite transition-all duration-300 transform shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,138,0,0.2)]"
      onClick={() => onEdit(movie)}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-black/20">
        <ImageWithFallback
          src={movie.posterUrl || undefined}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        
        {/* Rating Badge */}
        {movie.score !== undefined && movie.score > 0 && (
          <div
            className="absolute top-2 right-2 flex items-center gap-2 px-2 py-1 rounded-md backdrop-blur-sm border border-orange-soft hover:bg-orange/20 hover:border-orange/80 hover:shadow-[0_4px_12px_rgba(255,138,0,0.35)] transition-colors duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 11, 20, 0.9), rgba(26, 29, 35, 0.92))',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
            }}
          >
            <Star size={14} className="text-orange fill-orange" />
            <span className="text-sm font-semibold text-pure-white">
              {Number(movie.score).toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-1 truncate text-pure-white">
          {movie.title}
        </h3>
        <p className="text-sm mb-3 text-soft-gray">
          {movie.year} • {movie.genre}
        </p>

        <div className="flex flex-wrap gap-2">
          {movie.streamingSites.map((site) => (
            <div
              key={site}
              className="px-2 py-1 rounded text-xs bg-deep-navy text-soft-gray"
            >
              {platformIcons[site] || site}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
