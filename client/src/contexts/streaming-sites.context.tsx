import { createContext, useContext, useEffect, ReactNode, useCallback, useRef } from 'react';
import { apiClient } from '../api/client';
import { useApiCall } from '../hooks/useApiCall';

interface StreamingSitesContextType {
  streamingSites: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const StreamingSitesContext = createContext<StreamingSitesContextType | undefined>(undefined);

export function StreamingSitesProvider({ children, initialSites, isLoading = false }: { children: ReactNode; initialSites?: string[]; isLoading?: boolean }) {
  // If initialSites is provided (test/mock), use it instead of API
  const streamingSites = initialSites ?? [];
  const error = null;
  const refetch = async () => {};

  if (initialSites) {
    return (
      <StreamingSitesContext.Provider value={{ streamingSites, isLoading, error, refetch }}>
        {children}
      </StreamingSitesContext.Provider>
    );
  }

  const fetchStreamingSites = useCallback(() => apiClient.getAllStreamingSites(), []);
  const handleError = useCallback((err: Error) => {
    // Log full error for diagnostics
    console.error('[StreamingSites] fetch failed', err);
  }, []);
  const hasFetched = useRef(false);

  const { data: apiSites, isLoading: apiLoading, error: apiError, execute } = useApiCall(
    fetchStreamingSites,
    {
      errorMessage: 'Failed to load streaming sites',
      showErrorToast: false,
      onError: handleError,
    }
  );

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    execute();
  }, [execute]);

  const platformNames = apiSites?.map((site) => site.name) || [];
  const refetchApi = async () => {
    await execute();
  };

  return (
    <StreamingSitesContext.Provider
      value={{
        streamingSites: platformNames,
        isLoading: apiLoading,
        error: apiError,
        refetch: refetchApi,
      }}
    >
      {children}
    </StreamingSitesContext.Provider>
  );
}

export function useStreamingSites() {
  const context = useContext(StreamingSitesContext);
  if (context === undefined) {
    throw new Error('useStreamingSites must be used within a StreamingSitesProvider');
  }
  return context;
}
