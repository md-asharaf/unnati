import { HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/common/page-header";
import { FaqsTable } from "@/components/dashboard/faq/faqs-table";

export default function FaqsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
            <PageHeader
                icon={HelpCircle}
                title="FAQ Management"
                subtitle="Create, edit, and manage your FAQs with a modern interface."
            />
            <FaqsTable />
        </div>
    );
}
