-- Migration: 004_CreateMovieStreamingSitesTable
-- Description: Create junction table for many-to-many relationship between Movies and StreamingSites
-- Created: 2024-12-21

CREATE TABLE IF NOT EXISTS movie_streaming_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  movie_id UUID NOT NULL,
  streaming_site_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(movie_id, streaming_site_id),
  CONSTRAINT fk_movie_streaming_movie FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  CONSTRAINT fk_movie_streaming_site FOREIGN KEY (streaming_site_id) REFERENCES streaming_sites(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_movie_streaming_movie_id ON movie_streaming_sites(movie_id);
CREATE INDEX IF NOT EXISTS idx_movie_streaming_site_id ON movie_streaming_sites(streaming_site_id);
