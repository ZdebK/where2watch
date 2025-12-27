import React from 'react';
import { StreamingSitesProvider } from '../contexts/streaming-sites.context';

/**
 * Renders a component with all required providers for tests.
 * Optionally accepts initial streaming sites.
 */
export function renderWithProviders(ui: React.ReactElement, options?: { initialSites?: string[]; isLoading?: boolean }) {
    const mockPlatforms = options?.initialSites || ['Netflix', 'Max', 'Disney+'];
    return (
        <StreamingSitesProvider initialSites={mockPlatforms}>
            {ui}
        </StreamingSitesProvider>
    );
}
