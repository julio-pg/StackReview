import { CalendarDays } from "lucide-react";

export function PageHeader() {
  return (
    <div className="border-b">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We take your privacy seriously. This policy explains how we collect,
            use, and protect your personal information.
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>Last updated: April 15, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
