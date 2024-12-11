import { PageHeader } from "~/components/PageHeader";
import { TableOfContents } from "~/components/TableOfContents";
import { LicenseContent, licenseSections } from "./LicenseContent";

export default function License() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="License Agreement"
        desc="This license agreement outlines the terms under which you may use our software and services."
      />
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
          <LicenseContent />
          <TableOfContents sections={licenseSections} />
        </div>
      </div>
    </div>
  );
}
