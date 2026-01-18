'use client';

import { useEffect, useRef } from 'react';
import { Clock, Calendar, Briefcase } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { GroupedTimeEntries } from '@/types/time-entry';
import {
  formatDate,
  groupEntriesByDate,
  calculateTotal,
  formatHours,
} from '@/lib/date-utils';
import { useTimeEntries } from '@/hooks/use-time-entries';

type TimeEntryHistoryProps = {
  refreshTrigger?: number;
};

function TimeEntryListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-2">
            {[1, 2].map((j) => (
              <Skeleton key={j} className="h-16 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type DateGroupProps = {
  group: GroupedTimeEntries;
};

function DateGroup({ group }: DateGroupProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">{formatDate(group.date)}</h3>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Clock className="h-3.5 w-3.5" />
          {formatHours(group.totalHours)}h
        </div>
      </div>
      <div className="space-y-2">
        {group.entries.map((entry) => (
          <div
            key={entry.id}
            className="flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{entry.project}</span>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {entry.description}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium sm:ml-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              {formatHours(entry.hours)}h
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimeEntryHistory({ refreshTrigger }: TimeEntryHistoryProps) {
  const { entries, isLoading, error, refetch } = useTimeEntries();
  const isFirstMount = useRef(true);

  // Refetch when refreshTrigger changes (but not on first mount)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (refreshTrigger !== undefined) {
      refetch();
    }
  }, [refreshTrigger, refetch]);

  const groupedEntries = groupEntriesByDate(entries);
  const total = calculateTotal(groupedEntries);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>History</CardTitle>
            <CardDescription>
              View all your logged time entries
            </CardDescription>
          </div>
          {!isLoading && entries.length > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
              <Clock className="h-5 w-5" />
              <div className="text-right">
                <p className="text-xs font-medium opacity-90">Total</p>
                <p className="text-lg font-bold">{formatHours(total)}h</p>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <TimeEntryListSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-destructive/10 p-3 mb-4">
              <Clock className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="font-semibold text-destructive">Error Loading Entries</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">No Time Entries Yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Start by adding your first time entry using the form above.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupedEntries.map((group) => (
              <DateGroup key={group.date} group={group} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
