import { PageHeader } from "@/components/dashboard/common/page-header";
import { TestimonialsTable } from "@/components/dashboard/testimonial/testimonials-table";
import { HelpCircle } from "lucide-react";
export default function TestimonialsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 sm:max-w-6xl mx-auto w-full space-y-8 p-4">
      <PageHeader
        icon={HelpCircle}
        title="Testimonial Management"
        subtitle="Create, edit, and manage testimonials."
      />
      <TestimonialsTable />
    </div>
  );
}
