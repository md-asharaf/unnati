import { Card } from "@/components/ui/card";
import { fetchTrainers } from "@/queries/trainers";
import { Trainer } from "@/schemas";

export default async function TrainersPage() {
  const { trainers } = await fetchTrainers();
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Our Trainers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <img src={trainer.photoUrl} alt={trainer.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="min-w-0">
                <div className="font-semibold truncate">{trainer.name}</div>
                <div className="text-xs text-muted-foreground truncate">{trainer.designation}</div>
              </div>
            </div>
            {trainer.bio && <div className="text-sm text-muted-foreground mb-1 line-clamp-3">{trainer.bio}</div>}
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>Exp: {trainer.experience} yrs</span>
              <span>Focus: {trainer.expertise}</span>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
