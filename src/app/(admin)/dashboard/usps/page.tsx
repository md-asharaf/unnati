import { PageHeader } from "@/components/dashboard/common/page-header";
import { UspsTable } from "@/components/dashboard/usp/usps-table";
import { HelpCircle } from "lucide-react";
export default function UspsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
      <PageHeader
        icon={HelpCircle}
        title="USP Management"
        subtitle="Create, edit, and manage USPs."
      />
      <UspsTable />
    </div>
  );
}
