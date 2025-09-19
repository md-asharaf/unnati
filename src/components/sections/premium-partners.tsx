"use client"
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AnimatedHeading } from "../animated-heading";
import { Company } from "@/schemas";
interface PremiumPartnersProps {
    partners: Company[];
}
export const PremiumPartners = ({ partners }: PremiumPartnersProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 p-12 md:p-20 lg:p-24">
            <AnimatedHeading text="Our Premium Partners" />
            <Carousel
                opts={{
                    align: "center",
                }}
                className="mx-auto max-w-6xl"
            >
                <CarouselContent>
                    {partners?.map((p, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-center"
                        >
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">
                                            <Image src={p.logo.url || "/placeholder.svg"} alt={p.name} height={200} width={200} className="object-cover h-full w-full" sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 20vw" />
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};
