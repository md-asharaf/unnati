import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ImagesSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video bg-muted/30" />
                    <div className="flex items-center justify-between px-4 py-3">
                        <Skeleton className="h-5 w-16 bg-muted/30" />
                        <Skeleton className="h-4 w-24 bg-muted/30" />
                    </div>
                </Card>
            ))}
        </div>
    );
};
