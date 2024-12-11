import { PageHeader } from "~/components/PageHeader";
import { TableOfContents } from "~/components/TableOfContents";
import { TermsContent, termsSections } from "./TermsContent";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Terms of Service"
        desc="Please read these terms carefully before using our platform. By using our services, you agree to be bound by these terms."
      />
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <TermsContent />
          <TableOfContents sections={termsSections} />
        </div>
      </div>
    </div>
  );
}
