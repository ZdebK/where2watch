import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Movie } from './entities/movie.entity';
import { StreamingSite } from './entities/streaming-site.entity';
import { User } from './entities/user.entity';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'where2watch',
      schema: process.env.DB_SCHEMA || 'public',
      ssl: process.env.DB_HOST?.includes('rds.amazonaws.com') ? {
        rejectUnauthorized: false
      } : false,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: [User, Movie, StreamingSite],
      autoLoadEntities: true,
    }),
    MoviesModule,
    AuthModule,
  ],
})
export class AppModule {}
