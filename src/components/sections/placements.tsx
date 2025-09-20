import Link from "next/link";
import { AnimatedHeading } from "../animated-heading";
import { User } from "lucide-react";
import { Placement } from "@/schemas";

interface PlacementsProps {
  placements: Placement[];
}

export function Placements({ placements }: PlacementsProps) {
  // Mock data for demo/testing
  const mockPlacements: Placement[] = [
    {
      id: "1",
      name: "Priyansh Nema",
      role: "DevOps Engineer, Brandsmashers",
      photoUrl: "",
      companyId: "c1",
      createdAt: new Date(),
      updatedAt: new Date(),
      company: { id: "c1", name: "Brandsmashers", isPremium: false, imageId: "", createdAt: new Date(), updatedAt: new Date(), logo: { id: "", url: "", type: "COMPANY", createdAt: new Date(), updatedAt: new Date() } },
    },
    {
      id: "2",
      name: "Rohit Sharma",
      role: "Cloud Architect, Google",
      photoUrl: "",
      companyId: "c2",
      createdAt: new Date(),
      updatedAt: new Date(),
      company: { id: "c2", name: "Google", isPremium: true, imageId: "", createdAt: new Date(), updatedAt: new Date(), logo: { id: "", url: "", type: "COMPANY", createdAt: new Date(), updatedAt: new Date() } },
    },
    {
      id: "3",
      name: "Nilesh Chandrawanshi",
      role: "Technical Support Engineer, RedHat",
      photoUrl: "",
      companyId: "c3",
      createdAt: new Date(),
      updatedAt: new Date(),
      company: { id: "c3", name: "RedHat", isPremium: true, imageId: "", createdAt: new Date(), updatedAt: new Date(), logo: { id: "", url: "", type: "COMPANY", createdAt: new Date(), updatedAt: new Date() } },
    },
    {
      id: "4",
      name: "Bhalendra Singh Rathore",
      role: "Technical Consultant, Yes Bank",
      photoUrl: "",
      companyId: "c4",
      createdAt: new Date(),
      updatedAt: new Date(),
      company: { id: "c4", name: "Yes Bank", isPremium: false, imageId: "", createdAt: new Date(), updatedAt: new Date(), logo: { id: "", url: "", type: "COMPANY", createdAt: new Date(), updatedAt: new Date() } },
    },
    {
      id: "5",
      name: "Paridhi Jha",
      role: "Sr Data Engineer Analyst, Optum",
      photoUrl: "",
      companyId: "c5",
      createdAt: new Date(),
      updatedAt: new Date(),
      company: { id: "c5", name: "Optum", isPremium: false, imageId: "", createdAt: new Date(), updatedAt: new Date(), logo: { id: "", url: "", type: "COMPANY", createdAt: new Date(), updatedAt: new Date() } },
    },
    {
      id: "6",
      name: "Diksha Shirke",
      role: "Associate Cloud Engineer, Gate6",
      photoUrl: "",
      companyId: "c6",
      createdAt: new Date(),
      updatedAt: new Date(),
      company: { id: "c6", name: "Gate6", isPremium: false, imageId: "", createdAt: new Date(), updatedAt: new Date(), logo: { id: "", url: "", type: "COMPANY", createdAt: new Date(), updatedAt: new Date() } },
    },
  ];

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center">
      <AnimatedHeading text="Our Recent Placements" />
      <h2 className="text-lg font-medium text-muted-foreground mt-4 mb-8 text-center">
        Meet our successful graduates who are now thriving in top tech companies.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {mockPlacements.map((placement) => (
          <div
            key={placement.id}
            className="bg-card rounded-xl shadow border border-secondary/40 p-6 flex items-center gap-6 hover:shadow-lg transition-shadow"
          >
            <div className="bg-secondary/30 rounded-full p-4 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <div className="font-bold text-lg md:text-xl text-foreground mb-1">
                {placement.name}
              </div>
              <div className="text-base text-muted-foreground mb-1">
                {placement.role}
              </div>
              <div className="text-sm text-secondary font-medium">
                {placement.company?.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
