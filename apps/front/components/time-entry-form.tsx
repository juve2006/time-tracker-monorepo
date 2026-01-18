"use client";

import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTimeEntryForm } from '@/hooks/use-time-entry-form';
import { PROJECTS, TIME_ENTRY_VALIDATION } from '@/lib/constants';

interface TimeEntryFormProps {
  onSuccess?: () => void;
}

export function TimeEntryForm({ onSuccess }: TimeEntryFormProps) {
  const { form, submitError, onSubmit } = useTimeEntryForm({ onSuccess });
  const {
    control,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const description = watch("description") || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Time Entry</CardTitle>
        <CardDescription>
          Log your work hours for a project. Maximum {TIME_ENTRY_VALIDATION.MAX_HOURS_PER_DAY} hours per day.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Submit Error Alert */}
          {submitError && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {submitError}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="date">
                Date <span className="text-destructive">*</span>
              </Label>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          errors.date && "border-destructive focus-visible:ring-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.date && (
                <p className="text-sm text-destructive">{errors.date.message}</p>
              )}
            </div>

            {/* Project Field */}
            <div className="space-y-2">
              <Label htmlFor="project">
                Project <span className="text-destructive">*</span>
              </Label>
              <Controller
                control={control}
                name="project"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id="project"
                      className={cn(errors.project && "border-destructive")}
                    >
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECTS.map((project) => (
                        <SelectItem key={project.value} value={project.label}>
                          {project.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.project && (
                <p className="text-sm text-destructive">{errors.project.message}</p>
              )}
            </div>
          </div>

          {/* Hours Field */}
          <div className="space-y-2">
            <Label htmlFor="hours">
              Hours <span className="text-destructive">*</span>
            </Label>
            <Input
              id="hours"
              type="number"
              step="0.25"
              min={TIME_ENTRY_VALIDATION.MIN_HOURS}
              max={TIME_ENTRY_VALIDATION.MAX_HOURS_PER_DAY}
              placeholder="Enter hours worked (e.g., 8)"
              {...register("hours")}
              className={cn(errors.hours && "border-destructive")}
            />
            <p className="text-xs text-muted-foreground">
              Minimum {TIME_ENTRY_VALIDATION.MIN_HOURS} hours, maximum{" "}
              {TIME_ENTRY_VALIDATION.MAX_HOURS_PER_DAY} hours per day
            </p>
            {errors.hours && (
              <p className="text-sm text-destructive">{errors.hours.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Work Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what you worked on..."
              rows={4}
              maxLength={TIME_ENTRY_VALIDATION.MAX_DESCRIPTION_LENGTH}
              {...register("description")}
              className={cn(errors.description && "border-destructive")}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Provide a clear description of your work</span>
              <span>
                {description.length}/{TIME_ENTRY_VALIDATION.MAX_DESCRIPTION_LENGTH}
              </span>
            </div>
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
