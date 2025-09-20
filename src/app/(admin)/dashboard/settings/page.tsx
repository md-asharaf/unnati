import { PageHeader } from "@/components/dashboard/common/page-header";
import { SettingsTable } from "@/components/dashboard/setting/settings-table";
import { FileText } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
      <PageHeader
        icon={FileText}
        title="Settings Management"
        subtitle="Create, edit, and manage settings."
      />
      <SettingsTable />
    </div>
  );
}
