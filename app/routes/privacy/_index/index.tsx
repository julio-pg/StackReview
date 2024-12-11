import { PrivacyContent } from "./PrivacyContent";
import { PageHeader } from "./PageHeader";
import { TableOfContents } from "./TableOfContents";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <PrivacyContent />
          <TableOfContents />
        </div>
      </div>
    </div>
  );
}
