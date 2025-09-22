import { Usp } from "@/schemas";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Laptop, Boxes } from "lucide-react";
import { AnimatedHeading } from "../animated-heading";

const mockUsps: Usp[] = [
  {
    id: "1",
    heading: "Classroom Training",
    subheading: "Traditional in-person learning with direct instructor interaction and peer collaboration.",
    bulletPoints: [
      "Face-to-face interaction",
      "Group discussions",
      "Hands-on lab sessions",
      "Immediate doubt clearing",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    heading: "Online Training Class",
    subheading: "Flexible virtual instructor-led training sessions at your convenient hours.",
    bulletPoints: [
      "Live interactive sessions",
      "Recorded sessions available",
      "Flexible scheduling",
      "Remote lab access",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    heading: "Corporate Training",
    subheading: "Customized training programs designed specifically for corporate teams and organizations.",
    bulletPoints: [
      "Customized curriculum",
      "On-site training options",
      "Bulk pricing",
      "Progress tracking",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const icons = [
  <Users key="users" size={48} className="text-accent" />,
  <Laptop key="laptop" size={48} className="text-accent" />,
  <Boxes key="boxes" size={48} className="text-accent" />,
];

export const TrainingModes = () => {
  return (
    <section className="w-full py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center bg-background">
      <AnimatedHeading text="Flexible Training Modes" />
      <p className="text-muted-foreground text-center mt-3 sm:mt-4 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base max-w-2xl">
        Choose the learning format that best fits your schedule and learning style
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full max-w-6xl">
        {mockUsps.map((usp, i) => (
          <Card key={usp.id} className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-background border border-accent/30 flex flex-col items-center p-5 sm:p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-accent/30 rounded-full p-5 sm:p-6 flex items-center justify-center">
                {icons[i]}
              </div>
            </div>
            <CardContent className="flex flex-col items-center p-0 w-full">
              <h3 className="text-base sm:text-lg font-bold mb-1.5 text-foreground text-center leading-snug">{usp.heading}</h3>
              <p className="text-muted-foreground mb-4 text-[11px] sm:text-xs md:text-sm text-center leading-relaxed max-w-xs">{usp.subheading}</p>
              <ul className="space-y-1.5 sm:space-y-2 text-left w-full max-w-xs mx-auto text-[11px] sm:text-xs md:text-sm">
                {usp.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-accent">
                    <span className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center hover:scale-105 transition-transform duration-300">
                      <span className="w-2 h-2 rounded-full bg-accent/50" />
                    </span>
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
