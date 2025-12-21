import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { StreamingSite } from '../entities/streaming-site.entity';

export interface CreateMovieDto {
  name: string;
  originalTitle?: string;
  description?: string;
  score?: number;
  releaseDate?: Date;
  durationMinutes?: number;
  genre?: string;
  director?: string;
  language?: string;
  country?: string;
  ageRating?: string;
  posterUrl?: string;
  streamingSiteNames?: string[];
}

export interface UpdateMovieDto {
  name?: string;
  originalTitle?: string;
  description?: string;
  score?: number;
  releaseDate?: Date;
  durationMinutes?: number;
  genre?: string;
  director?: string;
  language?: string;
  country?: string;
  ageRating?: string;
  posterUrl?: string;
  streamingSiteNames?: string[];
}

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(StreamingSite)
    private streamingSiteRepository: Repository<StreamingSite>,
  ) {}

  async getAllMovies(limit = 10, offset = 0): Promise<Movie[]> {
    const take = Math.min(Math.max(limit, 1), 100);
    const skip = Math.max(offset, 0);

    return await this.movieRepository.find({
      relations: ['streamingSites'],
      order: {
        createdAt: 'DESC',
      },
      take,
      skip,
    });
  }

  async getMovieById(id: string): Promise<Movie | null> {
    return await this.movieRepository.findOne({
      where: { id },
      relations: ['streamingSites'],
    });
  }

  async createMovie(movieData: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create({
      name: movieData.name,
      originalTitle: movieData.originalTitle,
      description: movieData.description,
      score: movieData.score,
      releaseDate: movieData.releaseDate,
      durationMinutes: movieData.durationMinutes,
      genre: movieData.genre,
      director: movieData.director,
      language: movieData.language,
      country: movieData.country,
      ageRating: movieData.ageRating,
      posterUrl: movieData.posterUrl,
    });

    if (movieData.streamingSiteNames && movieData.streamingSiteNames.length > 0) {
      const sites = await this.getOrCreateStreamingSites(movieData.streamingSiteNames);
      movie.streamingSites = sites;
    }

    return await this.movieRepository.save(movie);
  }

  async updateMovie(id: string, movieData: UpdateMovieDto): Promise<Movie | null> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['streamingSites'],
    });

    if (!movie) {
      return null;
    }

    Object.assign(movie, {
      name: movieData.name ?? movie.name,
      originalTitle: movieData.originalTitle ?? movie.originalTitle,
      description: movieData.description ?? movie.description,
      score: movieData.score ?? movie.score,
      releaseDate: movieData.releaseDate ?? movie.releaseDate,
      durationMinutes: movieData.durationMinutes ?? movie.durationMinutes,
      genre: movieData.genre ?? movie.genre,
      director: movieData.director ?? movie.director,
      language: movieData.language ?? movie.language,
      country: movieData.country ?? movie.country,
      ageRating: movieData.ageRating ?? movie.ageRating,
      posterUrl: movieData.posterUrl ?? movie.posterUrl,
    });

    if (movieData.streamingSiteNames) {
      const sites = await this.getOrCreateStreamingSites(movieData.streamingSiteNames);
      movie.streamingSites = sites;
    }

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(id: string): Promise<boolean> {
    const result = await this.movieRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async getOrCreateStreamingSites(siteNames: string[]): Promise<StreamingSite[]> {
    const sites: StreamingSite[] = [];

    for (const name of siteNames) {
      let site = await this.streamingSiteRepository.findOne({ where: { name } });

      if (!site) {
        site = this.streamingSiteRepository.create({ name });
        site = await this.streamingSiteRepository.save(site);
      }

      sites.push(site);
    }

    return sites;
  }

  async getAllStreamingSites(): Promise<StreamingSite[]> {
    return await this.streamingSiteRepository.find();
  }
}
