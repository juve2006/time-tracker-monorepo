'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timeEntrySchema, type TimeEntrySchema } from '@/lib/validation';
import { timeEntryApi } from '@/lib/api';

interface UseTimeEntryFormProps {
  onSuccess?: () => void;
}

export function useTimeEntryForm({ onSuccess }: UseTimeEntryFormProps = {}) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<TimeEntrySchema>({
    resolver: zodResolver(timeEntrySchema),
    defaultValues: {
      project: "",
      hours: "",
      description: "",
    },
  });

  const onSubmit = async (data: TimeEntrySchema) => {
    setSubmitError(null);
    try {
      await timeEntryApi.create({
        date: data.date.toISOString(),
        project: data.project,
        hours: parseFloat(data.hours),
        description: data.description,
      });
      form.reset({
        project: "",
        hours: "",
        description: "",
        date: undefined
      });
      onSuccess?.();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return {
    form,
    submitError,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
