import { Suspense } from 'react';
import ViewLogsPageClient from './ViewLogsPageClient';

export default function LogsPage() {
  return (
    <Suspense fallback={<div className="text-center py-40 text-indigo-600 text-2xl font-semibold">Loading logs...</div>}>
      <ViewLogsPageClient />
    </Suspense>
  );
}
