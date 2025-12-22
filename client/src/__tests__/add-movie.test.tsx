import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { AddEditModal } from '../components/add-edit-modal';
import { StreamingSitesContext } from '../contexts/streaming-sites.context';

// Create a mock provider for testing
const StreamingSitesProvider = ({ children, initialSites, isLoading }: any) => (
  <StreamingSitesContext.Provider value={{ streamingSites: initialSites, isLoading, error: null, refetch: async () => { } }}>
    {children}
  </StreamingSitesContext.Provider>
);

function renderWithProviders(ui: React.ReactElement) {
  // StreamingSitesPicker expects array of platform names (string[])
  const mockPlatforms = ['Netflix', 'Max', 'Disney+'];
  return render(
    <StreamingSitesProvider initialSites={mockPlatforms} isLoading={false}>
      {ui}
    </StreamingSitesProvider>
  );
}

describe('Add Movie', () => {
  it('submits form with required fields', async () => {
    const onSave = jest.fn();
    renderWithProviders(
      <AddEditModal isOpen={true} onSave={onSave} onClose={() => { }} />
    );
    fireEvent.change(screen.getByPlaceholderText(/Enter movie title/), { target: { value: 'Matrix' } });
    // Use getByLabelText for Release date
    fireEvent.change(screen.getByLabelText(/Release date/), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Genre/), { target: { value: 'Sci-Fi' } });
    fireEvent.change(screen.getByPlaceholderText(/https:\/\/\.\.\.\/poster\.jpg/), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.click(screen.getByText(/Add Movie/));
    expect(onSave).toHaveBeenCalled();
  });

  it('adds movie with multiple Streaming Sites', async () => {
    const onSave = jest.fn();
    renderWithProviders(
      <AddEditModal isOpen={true} onSave={onSave} onClose={() => { }} />
    );
    fireEvent.click(screen.getByText('Netflix'));
    fireEvent.change(screen.getByPlaceholderText(/Enter movie title/), { target: { value: 'Matrix' } });
    fireEvent.change(screen.getByLabelText(/Release date/), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText(/Genre/), { target: { value: 'Sci-Fi' } });
    fireEvent.change(screen.getByPlaceholderText(/https:\/\/\.\.\.\/poster\.jpg/), { target: { value: 'https://example.com/poster.jpg' } });
    fireEvent.click(screen.getByText(/Add Movie/));
    expect(onSave).toHaveBeenCalled();
  });
});
