import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MoviesService, CreateMovieDto, UpdateMovieDto } from './movies.service';
import { Movie } from '../entities/movie.entity';
import { StreamingSite } from '../entities/streaming-site.entity';

@Controller('api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    try {
      return await this.moviesService.getAllMovies();
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new HttpException('Failed to fetch movies', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('streaming-sites/all')
  async getAllStreamingSites(): Promise<StreamingSite[]> {
    try {
      return await this.moviesService.getAllStreamingSites();
    } catch (error) {
      console.error('Error fetching streaming sites:', error);
      throw new HttpException('Failed to fetch streaming sites', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    try {
      const movie = await this.moviesService.getMovieById(id);
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return movie;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error fetching movie:', error);
      throw new HttpException('Failed to fetch movie', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createMovie(@Body() movieData: CreateMovieDto): Promise<Movie> {
    try {
      const processedData = {
        ...movieData,
        releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate) : undefined,
      };
      return await this.moviesService.createMovie(processedData);
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new HttpException('Failed to create movie', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() movieData: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      const processedData = {
        ...movieData,
        releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate) : undefined,
      };
      const movie = await this.moviesService.updateMovie(id, processedData);
      if (!movie) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
      return movie;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error updating movie:', error);
      throw new HttpException('Failed to update movie', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string): Promise<void> {
    try {
      const success = await this.moviesService.deleteMovie(id);
      if (!success) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error deleting movie:', error);
      throw new HttpException('Failed to delete movie', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
