import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { Movie } from '../entities/movie.entity';
import { StreamingSite } from '../entities/streaming-site.entity';
import { User } from '../entities/user.entity';

// Load environment variables BEFORE creating DataSource
dotenv.config();

export const AppDataSource = new DataSource({
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
  migrations: [],
  subscribers: [],
});
