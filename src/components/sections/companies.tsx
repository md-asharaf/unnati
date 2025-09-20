import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Company } from "@/schemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { AnimatedHeading } from "../animated-heading";

interface CompaniesProps {
  companies: Company[];
}

export const Companies = ({ companies }: CompaniesProps) => {

  return (
    <section className="w-full py-16 space-y-8 px-4 flex flex-col items-center bg-background">
      <AnimatedHeading text='Our Students Works At' />
      <div className="w-full max-w-6xl relative">
        <Carousel opts={{ align: "center" }} className="mx-auto">
          <CarouselContent>
            {companies.map((company) => (
              <CarouselItem key={company.id} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-center">
                 <Card key={company.id} className="flex items-center justify-center hover:border-1 hover:border-secondary hover:bg-secondary-foreground bg-secondary/30 rounded-xl shadow-md min-h-[150px] max-h-[200px] p-0 overflow-hidden">
                        <CardContent className="flex items-center justify-center h-full w-full p-0 overflow-hidden">
                            <img
                                src={company.logo?.url || "/placeholder.svg"}
                                alt={company.name}
                                className="object-cover h-full w-full overflow-hidden"
                            />
                        </CardContent>
                    </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
