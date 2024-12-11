import { CalendarDays } from "lucide-react";

type props = {
  title: string;
  desc: string;
};
export function PageHeader({ title, desc }: props) {
  return (
    <div className="border-b">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{desc}</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>Last updated: December 11, 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
