import { API_BASE_URL } from './constants';
import type { TimeEntry, CreateTimeEntryInput } from '@/types/time-entry';

class ApiError extends Error {
  constructor(
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(
      errorData?.message || `HTTP error! status: ${response.status}`,
    );
  }
  return response.json();
}

export const timeEntryApi = {
  getAll: async (): Promise<TimeEntry[]> => {
    const response = await fetch(`${API_BASE_URL}/time-entry`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<TimeEntry[]>(response);
  },

  create: async (data: CreateTimeEntryInput): Promise<TimeEntry> => {
    const response = await fetch(`${API_BASE_URL}/time-entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<TimeEntry>(response);
  },
};

export { ApiError };
