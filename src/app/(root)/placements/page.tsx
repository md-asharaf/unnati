import { fetchPlacements } from "@/queries/placements";
import { PlacementsInfinite } from "@/components/placements-infinite";

const LIMIT = 12;

export default async function PlacementsPage() {
  const data = await fetchPlacements(1, LIMIT);
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Placements</h1>
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {data.placements?.length > 0 ? (
          <PlacementsInfinite initialData={data} />
        ) : (
          <div className="text-center text-sm text-muted-foreground">No Placement available</div>
        )}
      </div>
    </main>
  );
}
