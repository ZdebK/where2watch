
import { createContext, useContext, ReactNode } from 'react';
import { useStreamingSitesData } from '../hooks/useStreamingSitesData.ts';

export interface StreamingSitesContextType {
  streamingSites: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}


export const StreamingSitesContext = createContext<StreamingSitesContextType | undefined>(undefined);

interface StreamingSitesProviderProps {
  children: ReactNode;
  initialSites?: string[];
}

export function StreamingSitesProvider({ children, initialSites }: StreamingSitesProviderProps) {
  const { streamingSites, isLoading, error, refetch } = useStreamingSitesData(initialSites);
  return (
    <StreamingSitesContext.Provider value={{ streamingSites, isLoading, error, refetch }}>
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
