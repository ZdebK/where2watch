import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '../api/client';

export function useStreamingSitesData(initialSites?: string[]) {
    const [streamingSites, setStreamingSites] = useState<string[]>(initialSites ?? []);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSites = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const apiSites = await apiClient.getAllStreamingSites();
            setStreamingSites(apiSites.map(site => site.name));
        } catch (err: any) {
            setError(err?.message || 'Failed to load streaming sites');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialSites) {
            fetchSites();
        }
    }, [fetchSites, initialSites]);

    const refetch = fetchSites;

    return { streamingSites, isLoading, error, refetch };
}
