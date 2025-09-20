import { PageHeader } from "@/components/dashboard/common/page-header";
import { Handshake } from "lucide-react";
import { PlacementsTable } from "@/components/dashboard/placement/placements-table";

export default function PlacementsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
            <PageHeader
                icon={Handshake}
                title="Placement Management"
                subtitle="Create, edit, and manage placements."
            />
            <PlacementsTable />
        </div>
    );
}
