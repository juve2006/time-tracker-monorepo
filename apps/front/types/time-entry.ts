export type TimeEntry = {
  id: string;
  date: string;
  project: string;
  hours: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTimeEntryInput = {
  date: string;
  project: string;
  hours: number;
  description: string;
};

export type GroupedTimeEntries = {
  date: string;
  entries: TimeEntry[];
  totalHours: number;
};

export type TimeEntryFormData = {
  date: Date;
  project: string;
  hours: string;
  description: string;
};

export type ValidationErrors = {
  date?: string;
  project?: string;
  hours?: string;
  description?: string;
};
