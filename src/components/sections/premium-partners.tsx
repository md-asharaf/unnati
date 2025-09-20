"use client"
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "../animated-heading";
import { Company } from "@/schemas";
interface PremiumPartnersProps {
    partners: Company[];
}
export const PremiumPartners = ({ partners }: PremiumPartnersProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 p-12 md:p-20 lg:p-24">
            <AnimatedHeading text="Our Premium Partners" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 xl:gap-8 mx-auto max-w-7xl">
                {partners?.map((p) => (
                    <Card key={p.id} className="flex items-center justify-center hover:border-1 hover:border-secondary hover:bg-secondary-foreground bg-secondary/30 rounded-xl shadow-md min-h-[150px] max-h-[200px] p-0 overflow-hidden">
                        <CardContent className="flex items-center justify-center h-full w-full p-0 overflow-hidden">
                            <img
                                src={p.logo?.url || "/placeholder.svg"}
                                alt={p.name}
                                className="object-cover h-full w-full overflow-hidden"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
