-- Migration: 002_CreateMoviesTable
-- Description: Create Movies table with all fields
-- Created: 2024-12-21

CREATE TABLE IF NOT EXISTS movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  original_title VARCHAR(255),
  description TEXT,
  score DECIMAL(3, 1),
  release_date DATE,
  duration_minutes INTEGER,
  genre VARCHAR(100),
  director VARCHAR(255),
  language VARCHAR(100),
  country VARCHAR(100),
  age_rating VARCHAR(50),
  poster_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_movies_name ON movies(name);
CREATE INDEX IF NOT EXISTS idx_movies_genre ON movies(genre);
CREATE INDEX IF NOT EXISTS idx_movies_is_available ON movies(is_available);
