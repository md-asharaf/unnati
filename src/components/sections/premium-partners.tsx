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
import { Image as Partner } from "@/schemas";
interface PremiumPartnersProps {
    partners: Partner[];
}
export const PremiumPartners = ({ partners }: PremiumPartnersProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center space-y-8 p-12 md:p-20 lg:p-24">
            <AnimatedHeading text="Our Premium Partners" />
            <Carousel
                opts={{
                    align: "center",
                }}
                className="w-full max-w-5xl mx-auto flex justify-center"
            >
                <CarouselContent>
                    {partners?.map((p, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-center"
                        >
                            <div className="p-1">
                                <Card className="bg-secondary w-40 h-40 flex items-center justify-center mx-auto transition-transform duration-300 hover:scale-105">
                                    <CardContent className="flex items-center justify-center w-full p-4">
                                        <div className="flex items-center justify-center w-full">
                                            <Image
                                                src={p.url || "/placeholder.svg"}
                                                alt={`Partner ${index + 1}`}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
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
