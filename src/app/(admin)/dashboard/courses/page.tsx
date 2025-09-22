import { PageHeader } from "@/components/dashboard/common/page-header";
import { CoursesTable } from "@/components/dashboard/course/courses-table";
import { FileText } from "lucide-react";


export default function CoursesPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
            <PageHeader
                icon={FileText}
                title="Course Management"
                subtitle="Create, edit, and manage courses."
            />
            <CoursesTable />
        </div>
    );
}
