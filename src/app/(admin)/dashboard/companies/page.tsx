import { PageHeader } from "@/components/dashboard/common/page-header";
import { Handshake } from "lucide-react";
import { CompaniesTable } from "@/components/dashboard/company/companies-table";

export default function CompaniesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
      <PageHeader
        icon={Handshake}
        title="Company Management"
        subtitle="Create, edit, and manage your company profiles with a modern interface."
      />
      <CompaniesTable />
    </div>
  );
}
