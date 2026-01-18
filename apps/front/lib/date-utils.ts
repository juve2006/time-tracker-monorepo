import { format, parseISO } from 'date-fns';
import type { TimeEntry, GroupedTimeEntries } from '@/types/time-entry';

// Formats a date string to a human-readable format
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "EEEE, MMMM d, yyyy");
  } catch {
    return dateString;
  }
}

//Groups time entries by date and calculates totals
export function groupEntriesByDate(entries: TimeEntry[]): GroupedTimeEntries[] {
  const grouped = entries.reduce<Record<string, TimeEntry[]>>((acc, entry) => {
    // Normalize date to YYYY-MM-DD format
    const dateKey = entry.date.split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(entry);
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, entries]) => ({
      date,
      entries,
      totalHours: entries.reduce((sum, entry) => sum + entry.hours, 0),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Calculates grand total hours across all entries
export function calculateTotal(groupedEntries: GroupedTimeEntries[]): number {
  return groupedEntries.reduce((sum, group) => sum + group.totalHours, 0);
}

// Formats hours to two decimal places
export function formatHours(hours: number): string {
  return hours.toFixed(2);
}
