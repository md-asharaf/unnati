import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PartnersSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-[3/2]" />
                </Card>
            ))}
        </div>
    );
};
