import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions<T> {
  fetchFn: (pageSize: number, offset: number) => Promise<T[]>;
  pageSize?: number;
  rootMargin?: string;
}

interface UseInfiniteScrollReturn<T> {
  items: T[];
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  loadMore: () => void;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  refetch: () => void;
}

export function useInfiniteScroll<T extends { id: string }>({
  fetchFn,
  pageSize = 10,
  rootMargin = '200px 0px 200px 0px',
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(
    async (nextOffset: number) => {
      try {
        setIsLoadingMore(true);
        const fetchedItems = await fetchFn(pageSize, nextOffset);

        setItems((prev) => {
          if (nextOffset === 0) {
            return fetchedItems;
          }
          // Merge with deduplication based on id
          const map = new Map(prev.map((item) => [item.id, item]));
          fetchedItems.forEach((item) => map.set(item.id, item));
          return Array.from(map.values());
        });

        setHasMore(fetchedItems.length === pageSize);
      } catch (err) {
        console.error('[useInfiniteScroll] fetch failed', err);
        throw err;
      } finally {
        setIsLoadingMore(false);
      }
    },
    [fetchFn, pageSize]
  );

  // Load first page
  useEffect(() => {
    loadPage(0);
  }, [loadPage]);

  // Load next page when offset changes (after initial)
  useEffect(() => {
    if (offset === 0) return;
    loadPage(offset);
  }, [offset, loadPage]);

  // Infinite scroll: trigger backend pagination when sentinel enters view
  const loadMoreItems = useCallback(() => {
    if (!hasMore) return;
    if (isLoadingMore) return;
    setOffset((current) => current + pageSize);
  }, [hasMore, isLoadingMore, pageSize]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreItems();
          }
        });
      },
      { rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMoreItems, hasMore, rootMargin]);

  const refetch = useCallback(() => {
    setOffset(0);
    setHasMore(true);
    loadPage(0);
  }, [loadPage]);

  return {
    items,
    isLoadingMore,
    hasMore,
    loadMoreRef,
    loadMore: loadMoreItems,
    setItems,
    refetch,
  };
}
