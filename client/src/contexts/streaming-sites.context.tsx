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

export function StreamingSitesProvider({ children }: { children: ReactNode }) {
  const fetchStreamingSites = useCallback(() => apiClient.getAllStreamingSites(), []);
  const handleError = useCallback((err: Error) => {
    // Log full error for diagnostics
    console.error('[StreamingSites] fetch failed', err);
  }, []);
  const hasFetched = useRef(false);

  const { data: streamingSites, isLoading, error, execute } = useApiCall(
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

  const platformNames = streamingSites?.map((site) => site.name) || [];

  const refetch = async () => {
    await execute();
  };

  return (
    <StreamingSitesContext.Provider
      value={{
        streamingSites: platformNames,
        isLoading,
        error,
        refetch,
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
