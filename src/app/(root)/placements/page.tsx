import { fetchPlacements } from "@/queries/placements";
import { PlacementsInfinite } from "@/components/placements-infinite";

const LIMIT = 12;

export default async function PlacementsPage() {
  const { data } = await fetchPlacements(1, LIMIT);
  console.log(data)
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Placements</h1>
      <PlacementsInfinite initialData={data} />
    </main>
  );
}
