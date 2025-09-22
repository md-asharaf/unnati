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
    const display = partners.slice(0, 10);
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 py-12 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10">
            <AnimatedHeading text="Our Premium Partners" />
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 mx-auto max-w-7xl w-full">
                {display.map((p) => (
                    <Card key={p.id} className="flex items-center justify-center bg-secondary/30 hover:bg-secondary/40 rounded-xl shadow-sm hover:shadow-md border border-transparent hover:border-accent/40 transition-all min-h-[90px] sm:min-h-[110px] md:min-h-[130px] lg:min-h-[150px] p-0 overflow-hidden">
                        <CardContent className="flex items-center justify-center h-full w-full p-2 sm:p-3 overflow-hidden">
                            <img
                                src={p.logo?.url || "/placeholder.svg"}
                                alt={p.name}
                                className="object-contain h-full w-full scale-95"
                                loading="lazy"
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
            {partners.length > display.length && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">+ {partners.length - display.length} more</p>
            )}
        </div>
    );
};
