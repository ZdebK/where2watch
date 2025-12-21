import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseApiCallOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  errorMessage?: string;
  showErrorToast?: boolean;
  fallbackData?: T;
}

interface UseApiCallReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Generic hook for handling API calls with loading, error states, and toast notifications
 * 
 * @example
 * const { data, isLoading, execute } = useApiCall(
 *   apiClient.getAllMovies,
 *   { errorMessage: 'Failed to load movies' }
 * );
 */
export function useApiCall<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiCallOptions<T> = {}
): UseApiCallReturn<T> {
  const {
    onSuccess,
    onError,
    errorMessage = 'An error occurred',
    showErrorToast = true,
    fallbackData,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await apiFunction(...args);
        setData(result);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : errorMessage;
        console.error(errorMessage, err);
        setError(errorMsg);
        
        if (fallbackData !== undefined) {
          setData(fallbackData);
        }
        
        if (showErrorToast) {
          toast.error(errorMsg);
        }
        
        if (onError) {
          onError(err instanceof Error ? err : new Error(errorMsg));
        }
        
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction, onSuccess, onError, errorMessage, showErrorToast, fallbackData]
  );

  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}
