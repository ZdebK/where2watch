import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StreamingSite } from './streaming-site.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, name: 'original_title', nullable: true })
  originalTitle: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  score: number;

  @Column({ type: 'date', nullable: true, name: 'release_date' })
  releaseDate: Date;

  @Column({ type: 'int', nullable: true, name: 'duration_minutes' })
  durationMinutes: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  genre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  director: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  language: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'age_rating' })
  ageRating: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'poster_url' })
  posterUrl: string;

  @Column({ type: 'boolean', default: true, name: 'is_available' })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => StreamingSite, (site) => site.movies)
  @JoinTable({
    name: 'movie_streaming_sites',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'streaming_site_id',
      referencedColumnName: 'id',
    },
  })
  streamingSites: StreamingSite[];
}
