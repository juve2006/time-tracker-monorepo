import { z } from 'zod';
import { TIME_ENTRY_VALIDATION } from './constants';

export const timeEntrySchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  project: z.string().min(1, "Project is required"),
  hours: z.string()
    .min(1, "Hours is required")
    .refine((val) => !isNaN(parseFloat(val)), "Hours must be a valid number")
    .refine(
      (val) => parseFloat(val) >= TIME_ENTRY_VALIDATION.MIN_HOURS,
      `Hours must be at least ${TIME_ENTRY_VALIDATION.MIN_HOURS}`
    )
    .refine(
      (val) => parseFloat(val) <= TIME_ENTRY_VALIDATION.MAX_HOURS_PER_DAY,
      `Hours cannot exceed ${TIME_ENTRY_VALIDATION.MAX_HOURS_PER_DAY} per day`
    ),
  description: z.string()
    .min(1, "Description is required")
    .max(
      TIME_ENTRY_VALIDATION.MAX_DESCRIPTION_LENGTH,
      `Description cannot exceed ${TIME_ENTRY_VALIDATION.MAX_DESCRIPTION_LENGTH} characters`
    ),
});

export type TimeEntrySchema = z.infer<typeof timeEntrySchema>;
