import { PageHeader } from "@/components/dashboard/common/page-header";
import { TrainersTable } from "@/components/dashboard/trainer/trainers-table";
import { MapPin } from "lucide-react";

export default function TrainersPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
      <PageHeader
        icon={MapPin}
        title="Branch Management"
        subtitle="Create, edit, and manage your trainers."
      />
      <TrainersTable />
    </div>
  );
}
