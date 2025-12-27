import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddEditModal } from '../components/add-edit-modal';
import { renderWithProviders } from '../testUtils/renderWithProviders';

describe('Edit Movie', () => {
  it('loads movie data into edit form', () => {
    const movie = {
      id: '1',
      title: 'Matrix',
      genre: 'Sci-Fi',
      score: 8,
      posterUrl: 'https://example.com/poster.jpg',
      releaseDate: new Date('2022-01-01'),
      streamingSites: [],
      year: 1999,
      rating: 'R',
      description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
    };
    render(renderWithProviders(<AddEditModal isOpen={true} movie={movie} onSave={jest.fn()} onClose={() => { }} />));
    expect(screen.getByDisplayValue('Matrix')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sci-Fi')).toBeInTheDocument();
  });

  it('saves changes and updates list', async () => {
    const onSave = jest.fn();
    const movie = {
      id: '1',
      title: 'Matrix',
      genre: 'Sci-Fi',
      score: 8,
      posterUrl: 'https://example.com/poster.jpg',
      releaseDate: new Date('2022-01-01'),
      streamingSites: [],
      year: 1999,
      rating: 'R',
      description: 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.',
    };
    render(renderWithProviders(<AddEditModal isOpen={true} movie={movie} onSave={onSave} onClose={() => { }} />));
    fireEvent.change(screen.getByLabelText(/Title/), { target: { value: 'Matrix Reloaded' } });
    fireEvent.click(screen.getByText(/Save Changes/));
    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({ title: 'Matrix Reloaded' }));
  });
});
