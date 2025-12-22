import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from '../entities/movie.entity';
import { StreamingSite } from '../entities/streaming-site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, StreamingSite])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
