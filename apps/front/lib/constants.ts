export const PROJECTS = [
  { value: 'internal', label: 'Internal' },
  { value: 'client-1', label: 'Client 1' },
  { value: 'client-2', label: 'Client 2' },
  { value: 'client-3', label: 'Client 3' },
  { value: 'personal', label: 'Personal Project' },
] as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const TIME_ENTRY_VALIDATION = {
  MIN_HOURS: 0.25,
  MAX_HOURS_PER_DAY: 24,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_PROJECT_LENGTH: 100,
} as const;
