-- Associate existing movies with streaming sites
-- Finds movies by name and links them to streaming platforms

-- The Shawshank Redemption - Netflix, HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Shawshank Redemption'
  AND s.name IN ('Netflix', 'HBO Max')
ON CONFLICT DO NOTHING;

-- The Godfather - Paramount+
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Godfather'
  AND s.name = 'Paramount+'
ON CONFLICT DO NOTHING;

-- The Dark Knight - HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Dark Knight'
  AND s.name = 'HBO Max'
ON CONFLICT DO NOTHING;

-- Pulp Fiction - Netflix, Amazon Prime
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Pulp Fiction'
  AND s.name IN ('Netflix', 'Amazon Prime Video')
ON CONFLICT DO NOTHING;

-- Inception - Netflix, HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Inception'
  AND s.name IN ('Netflix', 'HBO Max')
ON CONFLICT DO NOTHING;

-- Forrest Gump - Paramount+, Netflix
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Forrest Gump'
  AND s.name IN ('Paramount+', 'Netflix')
ON CONFLICT DO NOTHING;

-- The Matrix - HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Matrix'
  AND s.name = 'HBO Max'
ON CONFLICT DO NOTHING;

-- Interstellar - Paramount+, Amazon Prime
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Interstellar'
  AND s.name IN ('Paramount+', 'Amazon Prime Video')
ON CONFLICT DO NOTHING;

-- Parasite - Hulu, Amazon Prime
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Parasite'
  AND s.name IN ('Hulu', 'Amazon Prime Video')
ON CONFLICT DO NOTHING;

-- The Lord of the Rings: The Return of the King - HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Lord of the Rings: The Return of the King'
  AND s.name = 'HBO Max'
ON CONFLICT DO NOTHING;

-- Oppenheimer - Amazon Prime
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Oppenheimer'
  AND s.name = 'Amazon Prime Video'
ON CONFLICT DO NOTHING;

-- The Avengers - Disney+
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Avengers'
  AND s.name = 'Disney+'
ON CONFLICT DO NOTHING;

-- Spider-Man: Across the Spider-Verse - Netflix
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Spider-Man: Across the Spider-Verse'
  AND s.name = 'Netflix'
ON CONFLICT DO NOTHING;

-- Dune - HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Dune'
  AND s.name = 'HBO Max'
ON CONFLICT DO NOTHING;

-- Everything Everywhere All at Once - Paramount+, Hulu
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Everything Everywhere All at Once'
  AND s.name IN ('Paramount+', 'Hulu')
ON CONFLICT DO NOTHING;

-- Guardians of the Galaxy - Disney+
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Guardians of the Galaxy'
  AND s.name = 'Disney+'
ON CONFLICT DO NOTHING;

-- Top Gun: Maverick - Paramount+
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Top Gun: Maverick'
  AND s.name = 'Paramount+'
ON CONFLICT DO NOTHING;

-- The Silence of the Lambs - Netflix, HBO Max
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Silence of the Lambs'
  AND s.name IN ('Netflix', 'HBO Max')
ON CONFLICT DO NOTHING;

-- Gladiator - Paramount+, Amazon Prime
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'Gladiator'
  AND s.name IN ('Paramount+', 'Amazon Prime Video')
ON CONFLICT DO NOTHING;

-- The Social Network - Netflix, Hulu
INSERT INTO movie_streaming_sites (movie_id, streaming_site_id)
SELECT m.id, s.id 
FROM movies m
CROSS JOIN streaming_sites s
WHERE m.name = 'The Social Network'
  AND s.name IN ('Netflix', 'Hulu')
ON CONFLICT DO NOTHING;
