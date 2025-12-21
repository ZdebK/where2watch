import { Router, Request, Response } from 'express';
import { movieService } from '../services/movie.service';

const router = Router();

// GET /api/movies - Get all movies
router.get('/', async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// GET /api/movies/:id - Get movie by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

// POST /api/movies - Create new movie
router.post('/', async (req: Request, res: Response) => {
  try {
    const movieData = {
      ...req.body,
      releaseDate: req.body.releaseDate ? new Date(req.body.releaseDate) : undefined,
    };
    const movie = await movieService.createMovie(movieData);
    res.status(201).json(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ error: 'Failed to create movie' });
  }
});

// PUT /api/movies/:id - Update movie
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const movieData = {
      ...req.body,
      releaseDate: req.body.releaseDate ? new Date(req.body.releaseDate) : undefined,
    };
    const movie = await movieService.updateMovie(req.params.id, movieData);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

// DELETE /api/movies/:id - Delete movie
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const success = await movieService.deleteMovie(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

// GET /api/movies/streaming-sites/all - Get all streaming sites
router.get('/streaming-sites/all', async (req: Request, res: Response) => {
  try {
    const sites = await movieService.getAllStreamingSites();
    res.json(sites);
  } catch (error) {
    console.error('Error fetching streaming sites:', error);
    res.status(500).json({ error: 'Failed to fetch streaming sites' });
  }
});

export default router;
