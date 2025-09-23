import { PlacementsInfinite } from "@/components/placements-infinite";
import { db } from "@/lib/db";

export default async function PlacementsPage() {
  const placements = await db.placement.findMany({
    include: {
      company: {
        include: {
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Placements</h1>
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {placements?.length > 0 ? (
          <PlacementsInfinite initialData={{
            placements,
            page: 1,
            limit: 12,
            total: placements.length,
          }} />
        ) : (
          <div className="text-center text-sm text-muted-foreground">No Placement available</div>
        )}
      </div>
    </main>
  );
}
