import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddEditModal } from '../components/add-edit-modal';
import { renderWithProviders } from '../testUtils/renderWithProviders';

describe('Add Movie', () => {
  it('submits form with required fields', async () => {
    const onSave = jest.fn();
    render(renderWithProviders(<AddEditModal isOpen={true} onSave={onSave} onClose={() => { }} />));
    fireEvent.change(screen.getByPlaceholderText(/Enter movie title/), { target: { value: 'Matrix' } });
    // Use getByLabelText for Release date
    fireEvent.change(screen.getByLabelText(/Release date/), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Genre/), { target: { value: 'Sci-Fi' } });
    fireEvent.change(screen.getByPlaceholderText('https://.../poster.jpg'), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.click(screen.getByText(/Add Movie/));
    expect(onSave).toHaveBeenCalled();
  });

  it('adds movie with multiple Streaming Sites', async () => {
    const onSave = jest.fn();
    render(renderWithProviders(<AddEditModal isOpen={true} onSave={onSave} onClose={() => { }} />));
    fireEvent.click(screen.getByText('Netflix'));
    fireEvent.change(screen.getByPlaceholderText(/Enter movie title/), { target: { value: 'Matrix' } });
    fireEvent.change(screen.getByLabelText(/Release date/), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Genre/), { target: { value: 'Sci-Fi' } });
    fireEvent.change(screen.getByPlaceholderText('https://.../poster.jpg'), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.click(screen.getByText(/Add Movie/));
    expect(onSave).toHaveBeenCalled();
  });
});
