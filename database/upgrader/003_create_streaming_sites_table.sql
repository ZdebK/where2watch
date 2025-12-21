-- Migration: 003_CreateStreamingSitesTable
-- Description: Create StreamingSites table
-- Created: 2024-12-21

CREATE TABLE IF NOT EXISTS streaming_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_streaming_sites_name ON streaming_sites(name);
