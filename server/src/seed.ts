import { AppDataSource } from './config/database';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';
import { StreamingSite } from './entities/streaming-site.entity';

async function seed() {
    await AppDataSource.initialize();

    const userRepo = AppDataSource.getRepository(User);
    const streamingRepo = AppDataSource.getRepository(StreamingSite);
    const movieRepo = AppDataSource.getRepository(Movie);

    // Users
    await userRepo.save([
        { username: 'alice', email: 'alice@example.com', password: 'alice123' },
        { username: 'bob', email: 'bob@example.com', password: 'bob123' },
        { username: 'charlie', email: 'charlie@example.com', password: 'charlie123' },
    ]);

    // Streaming sites
    const netflix = streamingRepo.create({ name: 'Netflix' });
    const max = streamingRepo.create({ name: 'Max' });
    const disney = streamingRepo.create({ name: 'Disney+' });
    await streamingRepo.save([netflix, max, disney]);

    // Movies
    await movieRepo.save([
        {
            name: 'Matrix',
            genre: 'Sci-Fi',
            score: 8,
            posterUrl: 'https://example.com/poster.jpg',
            releaseDate: new Date('2022-01-01'),
            streamingSites: [netflix, max],
            year: 1999,
            ageRating: 'R',
            description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
            isAvailable: true,
        },
    ]);

    await AppDataSource.destroy();
    console.log('Seed complete!');
}

seed();
