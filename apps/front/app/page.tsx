'use client';

import { useState, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { TimeEntryForm } from '@/components/time-entry-form';
import { TimeEntryHistory } from '@/components/time-entry-history';
import { Toast, useToast } from '@/components/ui/toast';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { toast, showToast, hideToast } = useToast();

  const handleFormSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
    showToast("Time entry saved successfully!", "success");
  }, [showToast]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-3 px-4 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Clock className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Time Tracker</h1>
            <p className="text-sm text-muted-foreground">
              Log and manage your work hours
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <TimeEntryForm onSuccess={handleFormSuccess} />
          </div>

          {/* History Section */}
          <div>
            <TimeEntryHistory refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
