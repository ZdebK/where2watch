-- Migration: 005_SeedStreamingSites
-- Description: Add default streaming platforms
-- Created: 2025-12-21

INSERT INTO streaming_sites (id, name, created_at) VALUES
  (gen_random_uuid(), 'Netflix', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Max', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Prime Video', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Disney+', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Apple TV+', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Paramount+', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'SkyShowtime', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Canal+ Online', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Player', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'Hulu', CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'YouTube Premium', CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;
