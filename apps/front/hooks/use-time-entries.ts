'use client';

import { useState, useEffect, useCallback } from 'react';
import { timeEntryApi, ApiError } from '@/lib/api';
import type { TimeEntry } from '@/types/time-entry';

type UseTimeEntriesReturn = {
  entries: TimeEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useTimeEntries(): UseTimeEntriesReturn {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await timeEntryApi.getAll();
      setEntries(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch time entries. Please try again.');
      }
      console.error('Error fetching time entries:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return {
    entries,
    isLoading,
    error,
    refetch: fetchEntries,
  };
}
