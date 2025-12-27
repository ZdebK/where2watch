// Fix TypeScript error for global.fetch
declare var global: typeof globalThis & { fetch?: any };
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieList } from '../components/movie-list';
import { AuthProvider } from '../contexts/auth.context';
import { StreamingSitesProvider } from '../contexts/streaming-sites.context';

import { mockFetchJson } from '../testUtils/mockFetch';

const TestAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

describe('Movie List', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches and displays movies after login', async () => {
    global.fetch = mockFetchJson([
      {
        id: '1',
        name: 'Matrix',
        originalTitle: 'The Matrix',
        description: 'A computer hacker learns about the true nature of reality.',
        genre: 'Sci-Fi',
        ageRating: 'PG-13',
        posterUrl: '',
        releaseDate: '1999-03-31',
        streamingSites: [{ name: 'Netflix' }],
        score: 8.7,
        durationMinutes: 136,
        director: 'Wachowski Sisters',
        language: 'English',
        country: 'USA',
      },
      {
        id: '2',
        name: 'Inception',
        originalTitle: 'Inception',
        description: 'A thief who steals corporate secrets through dream-sharing technology.',
        genre: 'Sci-Fi',
        ageRating: 'PG-13',
        posterUrl: '',
        releaseDate: '2010-07-16',
        streamingSites: [{ name: 'Netflix' }],
        score: 8.8,
        durationMinutes: 148,
        director: 'Christopher Nolan',
        language: 'English',
        country: 'USA',
      },
    ]);
    render(
      <TestAuthProvider>
        <StreamingSitesProvider initialSites={['Netflix', 'Hulu']}>
          <MovieList />
        </StreamingSitesProvider>
      </TestAuthProvider>
    );
    // Movie titles may be rendered in h3.mb-1 elements
    const movieTitles = await screen.findAllByRole('heading', { level: 3 });
    expect(movieTitles.some(h => h.textContent?.includes('Matrix'))).toBe(true);
    expect(movieTitles.some(h => h.textContent?.includes('Inception'))).toBe(true);
  });

  it('handles empty movie list', async () => {
    global.fetch = mockFetchJson([]);
    render(
      <TestAuthProvider>
        <StreamingSitesProvider initialSites={['Netflix', 'Hulu']}>
          <MovieList />
        </StreamingSitesProvider>
      </TestAuthProvider>
    );
    expect(await screen.findByText(/No movies in database/i)).toBeInTheDocument();
  });
});
